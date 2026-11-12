/**
 * Playback engine — @allago/core
 * Player abstraction first block.
 * Native HTML5 engine adapter. Injectable for tests.
 */

export class NativePlaybackEngine {
  constructor() {
    this.element = null;
    this.volume = 1;
    this.listeners = new Map();
  }

  load(source) {
    if (this.element) {
      this.element.pause();
    }
    const element = document.createElement(source.kind === 'video' ? 'video' : 'audio');
    element.src = source.src;
    this.element = element;
    this.attach(element);
    return Promise.resolve();
  }

  attach(element) {
    const emit = (event) => this.emit(event, this.eventPayload(element, event));
    element.addEventListener('play', () => emit('play'));
    element.addEventListener('pause', () => emit('pause'));
    element.addEventListener('ended', () => emit('ended'));
    element.addEventListener('error', () => emit('error'));
    element.addEventListener('timeupdate', () => emit('timeupdate'));
    element.addEventListener('loadedmetadata', () => emit('loadedmetadata'));
    return () => {
      element.pause();
      element.removeAttribute('src');
      if (typeof element.load === 'function') {
        element.load();
      }
    };
  }

  eventPayload(element, event) {
    if (event === 'timeupdate') {
      return { currentTime: element.currentTime || 0 };
    }
    if (event === 'loadedmetadata') {
      return { duration: element.duration || 0 };
    }
    return {};
  }

  on(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(listener);
    return () => {
      this.listeners.get(event)?.delete(listener);
    };
  }

  emit(event, payload) {
    const set = this.listeners.get(event);
    if (!set) {
      return;
    }
    for (const listener of [...set]) {
      listener(payload || {});
    }
  }

  async play() {
    if (!this.element) {
      throw new Error('Playback engine has no media element loaded.');
    }
    return this.element.play();
  }

  pause() {
    if (this.element) {
      this.element.pause();
    }
  }

  stop() {
    if (this.element) {
      this.element.pause();
      this.element.removeAttribute('src');
    }
  }

  seek(time) {
    const element = this.element;
    if (element && element.readyState >= 1) {
      element.currentTime = time;
    }
  }

  setVolume(volume) {
    this.volume = volume;
    if (this.element) {
      this.element.volume = volume;
    }
  }

  getVolume() {
    return this.volume;
  }

  getDuration() {
    return this.element ? this.element.duration || 0 : 0;
  }

  getCurrentTime() {
    return this.element ? this.element.currentTime || 0 : 0;
  }
}

export function createPlaybackEngine() {
  return new NativePlaybackEngine();
}
