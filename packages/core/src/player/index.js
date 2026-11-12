/**
 * Player module — @allago/core
 * Player abstraction first block.
 * Public surface of the player module.
 */

export { createPlayer } from './player.js';
export { IncompatibleMediaError } from './errors.js';
export { NativePlaybackEngine, createPlaybackEngine } from './engine.js';
