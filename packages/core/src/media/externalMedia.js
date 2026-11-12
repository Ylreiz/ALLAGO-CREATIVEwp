/**
 * External media entity — @allago/core
 * Media Management first block.
 * Third-party resources (provider + technical kind). No visual components.
 */

import { ValidationError } from './errors.js';
import { MEDIA_KINDS } from './asset.js';

export function createExternalMedia(input) {
  if (!input || typeof input !== 'object') {
    throw new ValidationError('ExternalMedia input must be an object.');
  }
  if (typeof input.provider !== 'string' || input.provider.trim() === '') {
    throw new ValidationError('ExternalMedia provider must be a non-empty string.');
  }
  if (!MEDIA_KINDS.includes(input.type)) {
    throw new ValidationError('ExternalMedia type must be either "audio" or "video".');
  }
  if (typeof input.externalId !== 'string' || input.externalId === '') {
    throw new ValidationError('ExternalMedia externalId must be a non-empty string.');
  }
  const reference = input.reference && typeof input.reference === 'object' ? input.reference : undefined;
  const metadata = input.metadata && typeof input.metadata === 'object' ? input.metadata : {};
  const id = resolveExternalMediaId(input.id);
  return { id, provider: input.provider, type: input.type, externalId: input.externalId, reference, metadata };
}

function resolveExternalMediaId(explicitId) {
  if (explicitId === undefined || explicitId === null) {
    return crypto.randomUUID();
  }
  if (typeof explicitId !== 'string' || explicitId === '') {
    throw new ValidationError('ExternalMedia id must be a non-empty opaque string when provided.');
  }
  return explicitId;
}
