/**
 * Media asset entity — @allago/core
 * Media Management first block.
 * Own resources only (kind: audio | video). No visual components.
 */

import { ValidationError } from './errors.js';

export const MEDIA_KINDS = ['audio', 'video'];

export function createMediaAsset(input) {
  if (!input || typeof input !== 'object') {
    throw new ValidationError('MediaAsset input must be an object.');
  }
  if (!MEDIA_KINDS.includes(input.kind)) {
    throw new ValidationError('MediaAsset kind must be either "audio" or "video".');
  }
  if (typeof input.src !== 'string' || input.src.trim() === '') {
    throw new ValidationError('MediaAsset src must be a non-empty string.');
  }
  const metadata = input.metadata && typeof input.metadata === 'object' ? input.metadata : {};
  const id = resolveMediaAssetId(input.id);
  return { id, kind: input.kind, src: input.src, metadata };
}

function resolveMediaAssetId(explicitId) {
  if (explicitId === undefined || explicitId === null) {
    return crypto.randomUUID();
  }
  if (typeof explicitId !== 'string' || explicitId === '') {
    throw new ValidationError('MediaAsset id must be a non-empty opaque string when provided.');
  }
  return explicitId;
}
