/**
 * Player error types — @allago/core
 * Player abstraction first block.
 */

export class IncompatibleMediaError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IncompatibleMediaError';
  }
}
