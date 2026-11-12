/**
 * Media manager — @allago/core
 * Media Management first block.
 * Instance-isolated storage. Reusable infrastructure for future ALLAGO Creative projects.
 * No visual components, no players, no external platform SDKs.
 */

import { createMediaAsset as buildMediaAsset } from './asset.js';
import { createExternalMedia as buildExternalMedia } from './externalMedia.js';
import { createMediaCollection as buildMediaCollection } from './collection.js';
import { ConflictError, IntegrityError, NotFoundError, ValidationError } from './errors.js';
import { MEDIA_KINDS } from './asset.js';

export function createMediaManager() {
  const assets = new Map();
  const externals = new Map();
  const collections = new Map();
  const knownIds = new Set();

  function registerId(id) {
    if (knownIds.has(id)) {
      throw new ConflictError(`Media id "${id}" is already registered.`);
    }
    knownIds.add(id);
  }

  function createMediaAsset(input) {
    const asset = buildMediaAsset(input);
    registerId(asset.id);
    assets.set(asset.id, asset);
    return asset;
  }

  function createExternalMedia(input) {
    const external = buildExternalMedia(input);
    registerId(external.id);
    externals.set(external.id, external);
    return external;
  }

  function createMediaCollection(input) {
    const collection = buildMediaCollection(input);
    for (const item of collection.items) {
      const exists = assets.has(item) || externals.has(item);
      if (!exists) {
        throw new IntegrityError(`MediaCollection item "${item}" does not exist.`);
      }
    }
    registerId(collection.id);
    collections.set(collection.id, collection);
    return collection;
  }

  function getMediaById(id) {
    const external = externals.get(id);
    if (external) {
      return external;
    }
    const asset = assets.get(id);
    return asset || null;
  }

  function getMediaCollectionById(id) {
    return collections.get(id) || null;
  }

  function listMediaByCollection(collectionId) {
    const collection = collections.get(collectionId);
    if (!collection) {
      throw new NotFoundError(`MediaCollection "${collectionId}" was not found.`);
    }
    const mediaList = [];
    for (const item of collection.items) {
      const media = getMediaById(item);
      if (media) {
        mediaList.push(media);
      }
    }
    return mediaList;
  }

  function addMediaToCollection(collectionId, mediaId) {
    const collection = collections.get(collectionId);
    if (!collection) {
      throw new NotFoundError(`MediaCollection "${collectionId}" was not found.`);
    }
    const media = getMediaById(mediaId);
    if (!media) {
      throw new IntegrityError(`Media "${mediaId}" does not exist and cannot be added to a collection.`);
    }
    if (collection.items.includes(mediaId)) {
      return collection;
    }
    collection.items.push(mediaId);
    return collection;
  }

  function removeMediaFromCollection(collectionId, mediaId) {
    const collection = collections.get(collectionId);
    if (!collection) {
      throw new NotFoundError(`MediaCollection "${collectionId}" was not found.`);
    }
    const index = collection.items.indexOf(mediaId);
    if (index === -1) {
      return false;
    }
    collection.items.splice(index, 1);
    return true;
  }

  function updateMediaSrc(id, src) {
    const asset = assets.get(id);
    if (!asset) {
      throw new NotFoundError(`MediaAsset "${id}" was not found.`);
    }
    if (typeof src !== 'string' || src.trim() === '') {
      throw new ValidationError('MediaAsset src must be a non-empty string.');
    }
    asset.src = src;
    return asset;
  }

  function updateMediaMetadata(id, metadata) {
    const asset = assets.get(id);
    if (!asset) {
      throw new NotFoundError(`MediaAsset "${id}" was not found.`);
    }
    if (!metadata || typeof metadata !== 'object') {
      throw new ValidationError('MediaAsset metadata must be an object.');
    }
    asset.metadata = { ...asset.metadata, ...metadata };
    return asset;
  }

  function updateExternalMedia(id, patch) {
    const external = externals.get(id);
    if (!external) {
      throw new NotFoundError(`ExternalMedia "${id}" was not found.`);
    }
    if (!patch || typeof patch !== 'object') {
      throw new ValidationError('ExternalMedia update must be an object.');
    }
    if (patch.provider !== undefined) {
      if (typeof patch.provider !== 'string' || patch.provider.trim() === '') {
        throw new ValidationError('ExternalMedia provider must be a non-empty string.');
      }
      external.provider = patch.provider;
    }
    if (patch.type !== undefined) {
      if (!MEDIA_KINDS.includes(patch.type)) {
        throw new ValidationError('ExternalMedia type must be either "audio" or "video".');
      }
      external.type = patch.type;
    }
    if (patch.externalId !== undefined) {
      if (typeof patch.externalId !== 'string' || patch.externalId === '') {
        throw new ValidationError('ExternalMedia externalId must be a non-empty string.');
      }
      external.externalId = patch.externalId;
    }
    if (patch.reference !== undefined) {
      if (!patch.reference || typeof patch.reference !== 'object') {
        throw new ValidationError('ExternalMedia reference must be an object.');
      }
      external.reference = patch.reference;
    }
    if (patch.metadata !== undefined) {
      if (!patch.metadata || typeof patch.metadata !== 'object') {
        throw new ValidationError('ExternalMedia metadata must be an object.');
      }
      external.metadata = { ...external.metadata, ...patch.metadata };
    }
    return external;
  }

  function deleteMedia(id) {
    const asset = assets.get(id);
    const external = externals.get(id);
    const media = asset || external;
    if (!media) {
      return false;
    }
    assets.delete(id);
    externals.delete(id);
    knownIds.delete(id);
    for (const collection of collections.values()) {
      const index = collection.items.indexOf(id);
      if (index !== -1) {
        collection.items.splice(index, 1);
      }
    }
    return true;
  }

  const manager = {
    createMediaAsset,
    createExternalMedia,
    createMediaCollection,
    getMediaById,
    getMediaCollectionById,
    listMediaByCollection,
    addMediaToCollection,
    removeMediaFromCollection,
    updateMediaSrc,
    updateMediaMetadata,
    updateExternalMedia,
    deleteMedia,
  };

  return manager;
}
