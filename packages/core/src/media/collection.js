/**
 * Media collection entity — @allago/core
 * Media Management first block.
 */

import { ValidationError } from './errors.js';

export const MEDIA_COLLECTION_TYPES = [
  'album',
  'ep',
  'single',
  'playlist',
  'videography',
  'custom',
];

export function createMediaCollection(input) {
  if (!input || typeof input !== 'object') {
    throw new ValidationError('MediaCollection input must be an object.');
  }
  if (!MEDIA_COLLECTION_TYPES.includes(input.type)) {
    throw new ValidationError('MediaCollection type must be one of: album, ep, single, playlist, videography, custom.');
  }
  if (!Array.isArray(input.items)) {
    throw new ValidationError('MediaCollection items must be an array of media ids.');
  }
  const items = input.items.map((item) => {
    if (typeof item !== 'string' || item === '') {
      throw new ValidationError('MediaCollection items must be non-empty strings.');
    }
    return item;
  });
  const metadata = input.metadata && typeof input.metadata === 'object' ? input.metadata : {};
  const id = resolveMediaCollectionId(input.id);
  return { id, type: input.type, items, metadata };
}

function resolveMediaCollectionId(explicitId) {
  if (explicitId === undefined || explicitId === null) {
    return crypto.randomUUID();
  }
  if (typeof explicitId !== 'string' || explicitId === '') {
    throw new ValidationError('MediaCollection id must be a non-empty opaque string when provided.');
  }
  return explicitId;
}
