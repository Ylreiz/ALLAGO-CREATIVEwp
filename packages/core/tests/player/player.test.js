import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createMediaManager, NotFoundError } from '../../src/media/index.js';
import { createPlayer, IncompatibleMediaError } from '../../src/player/index.js';

function createFakePlaybackEngine() {
  const listeners = new Map();
  const state = { playing: false, duration: 0, currentTime: 0, volume: 1, error: null };
  function notify(event, payload) {
    const set = listeners.get(event);
    if (!set) {
      return;
    }
    for (const listener of [...set]) {
      listener(payload);
    }
  }
  const engine = {
    state,
    async load(source) {
      state.source = source;
      state.duration = (source && source.duration) || 0;
      notify('loadedmetadata', {});
    },
    async play() {
      if (state.error) {
        const error = state.error;
        state.error = null;
        throw error;
      }
      state.playing = true;
      notify('play', {});
    },
    pause() {
      state.playing = false;
      notify('pause', {});
    },
    stop() {
      state.playing = false;
      state.currentTime = 0;
      state.duration = 0;
    },
    seek(time) {
      state.currentTime = time;
      notify('timeupdate', { currentTime: time });
    },
    setVolume(volume) {
      state.volume = volume;
    },
    getVolume() {
      return state.volume;
    },
    getDuration() {
      return state.duration;
    },
    getCurrentTime() {
      return state.currentTime;
    },
    on(event, listener) {
      if (!listeners.has(event)) {
        listeners.set(event, new Set());
      }
      listeners.get(event).add(listener);
      return () => {
        listeners.get(event)?.delete(listener);
      };
    },
    emit(event, payload) {
      notify(event, payload);
    },
  };
  return engine;
}

function setup() {
  const mediaManager = createMediaManager();
  const engine = createFakePlaybackEngine();
  const player = createPlayer(mediaManager, engine);
  return { mediaManager, engine, player };
}

test('player starts idle and transitions to playing after play', async () => {
  const { mediaManager, player } = setup();
  assert.equal(player.state, 'idle');
  const asset = mediaManager.createMediaAsset({ id: 'pl-1', kind: 'audio', src: '/media/a.mp3' });
  await player.play('pl-1');
  assert.equal(player.state, 'playing');
});

test('play pause resume stop cycle updates states correctly', async () => {
  const { mediaManager, player } = setup();
  const asset = mediaManager.createMediaAsset({ id: 'pl-2', kind: 'audio', src: '/media/a.mp3' });
  await player.play('pl-2');
  player.pause();
  assert.equal(player.state, 'paused');
  await player.resume();
  assert.equal(player.state, 'playing');
  player.stop();
  assert.equal(player.state, 'idle');
});

test('player emits playback events and statechange', async () => {
  const { mediaManager, engine, player } = setup();
  const events = [];
  for (const event of ['play', 'pause', 'ended', 'error', 'timeupdate', 'loadedmetadata', 'statechange']) {
    player.on(event, (payload) => events.push({ event, payload }));
  }
  const asset = mediaManager.createMediaAsset({ id: 'pl-3', kind: 'video', src: '/media/v.mp4' });
  await player.play('pl-3');
  player.seek(5);
  engine.emit('ended', { mediaId: 'pl-3' });
  const names = events.map((entry) => entry.event);
  assert.ok(names.includes('loadedmetadata'));
  assert.ok(names.includes('play'));
  assert.ok(names.includes('timeupdate'));
  assert.ok(names.includes('ended'));
  assert.ok(names.includes('statechange'));
});

test('play with unknown media rejects NotFoundError', async () => {
  const { player } = setup();
  await assert.rejects(() => player.play('missing'), NotFoundError);
  assert.equal(player.state, 'error');
});

test('play with external media rejects IncompatibleMediaError', async () => {
  const { mediaManager, player } = setup();
  mediaManager.createExternalMedia({ id: 'pl-4', provider: 'spotify', type: 'audio', externalId: 'track-1' });
  await assert.rejects(() => player.play('pl-4'), IncompatibleMediaError);
  assert.equal(player.state, 'error');
});

test('volume and temporal controls work', () => {
  const { engine, player } = setup();
  player.setVolume(0.5);
  assert.equal(player.getVolume(), 0.5);
  assert.equal(engine.getVolume(), 0.5);
});

test('seek updates current time and emits timeupdate', async () => {
  const { mediaManager, engine, player } = setup();
  const asset = mediaManager.createMediaAsset({ id: 'pl-5', kind: 'audio', src: '/media/a.mp3' });
  await player.play('pl-5');
  player.seek(5);
  assert.equal(engine.getCurrentTime(), 5);
});

test('engine failure transitions to error', async () => {
  const { mediaManager, engine, player } = setup();
  engine.state.error = new Error('engine boom');
  const asset = mediaManager.createMediaAsset({ id: 'pl-6', kind: 'audio', src: '/media/a.mp3' });
  await assert.rejects(() => player.play('pl-6'), /engine boom/);
  assert.equal(player.state, 'error');
});

test('player instances are independent', async () => {
  const { mediaManager, player } = setup();
  const player2 = createPlayer(mediaManager, createFakePlaybackEngine());
  const asset = mediaManager.createMediaAsset({ id: 'pl-7', kind: 'audio', src: '/media/a.mp3' });
  await player.play('pl-7');
  assert.equal(player.state, 'playing');
  assert.equal(player2.state, 'idle');
});
