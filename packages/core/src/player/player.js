/**
 * Player — @allago/core
 * Player abstraction first block.
 * Consumes MediaManager. Native HTML5 engine with injectable engine for tests.
 * No visual components.
 */

import { NotFoundError } from '../media/errors.js';
import { IncompatibleMediaError } from './errors.js';
import { createPlaybackEngine } from './engine.js';

export function createPlayer(mediaManager, engine = createPlaybackEngine()) {
  let state = 'idle';
  let currentMediaId = null;
  const listeners = new Map();

  function setState(next) {
    state = next;
    emit('statechange', { state });
  }

  function emit(event, payload) {
    const set = listeners.get(event);
    if (!set) {
      return;
    }
    for (const listener of [...set]) {
      listener(payload);
    }
  }

  function on(event, listener) {
    if (!listeners.has(event)) {
      listeners.set(event, new Set());
    }
    listeners.get(event).add(listener);
    return () => {
      listeners.get(event)?.delete(listener);
    };
  }

  function fail(error) {
    const failure = error instanceof Error ? error : new Error(String(error));
    setState('error');
    emit('error', { error: failure });
    throw failure;
  }

  const offPlay = engine.on('play', () => {
    setState('playing');
    emit('play', { mediaId: currentMediaId });
  });
  const offPause = engine.on('pause', () => {
    setState('paused');
    emit('pause', { mediaId: currentMediaId });
  });
  const offEnded = engine.on('ended', (payload) => {
    emit('ended', payload);
    currentMediaId = null;
    setState('idle');
  });
  const offError = engine.on('error', (payload) => {
    setState('error');
    emit('error', payload);
  });
  const offLoadedMetadata = engine.on('loadedmetadata', (payload) => emit('loadedmetadata', payload));
  const offTimeUpdate = engine.on('timeupdate', (payload) => emit('timeupdate', payload));

  async function play(mediaId) {
    setState('loading');
    const media = mediaManager.getMediaById(mediaId) || null;
    if (!media) {
      return fail(new NotFoundError(`Media "${mediaId}" was not found.`));
    }
    if (!media.kind) {
      return fail(new IncompatibleMediaError(`Media "${mediaId}" is not compatible with the MVP player.`));
    }
    currentMediaId = mediaId;
    try {
      await engine.load({ kind: media.kind, src: media.src });
      await engine.play();
    } catch (error) {
      return fail(error);
    }
    setState('playing');
  }

  function pause() {
    if (state === 'playing') {
      engine.pause();
    }
  }

  async function resume() {
    if (state !== 'paused' || currentMediaId === null) {
      return;
    }
    try {
      await engine.play();
    } catch (error) {
      return fail(error);
    }
  }

  function stop() {
    engine.stop();
    currentMediaId = null;
    setState('idle');
  }

  function seek(time) {
    engine.seek(time);
    emit('timeupdate', { currentTime: engine.getCurrentTime() });
  }

  function setVolume(volume) {
    engine.setVolume(volume);
    return volume;
  }

  function getVolume() {
    return engine.getVolume();
  }

  function getDuration() {
    return engine.getDuration();
  }

  function getCurrentTime() {
    return engine.getCurrentTime();
  }

  const player = {
    get state() {
      return state;
    },
    play,
    pause,
    resume,
    stop,
    seek,
    setVolume,
    getVolume,
    getDuration,
    getCurrentTime,
    on,
  };

  return player;
}
