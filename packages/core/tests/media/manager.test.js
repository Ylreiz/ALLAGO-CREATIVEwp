import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  createMediaManager,
  ValidationError,
  NotFoundError,
  ConflictError,
  IntegrityError,
} from '../../src/media/index.js';

test('createMediaAsset preserves manual id and returns entity', () => {
  const manager = createMediaManager();
  const asset = manager.createMediaAsset({
    id: 'asset-1',
    kind: 'audio',
    src: '/media/ylreiz/track-01.mp3',
    metadata: { classification: 'music', title: 'Cancion' },
  });
  assert.equal(asset.id, 'asset-1');
  assert.equal(asset.kind, 'audio');
  assert.equal(asset.src, '/media/ylreiz/track-01.mp3');
  assert.deepEqual(asset.metadata, { classification: 'music', title: 'Cancion' });
});

test('createMediaAsset generates id when not provided', () => {
  const manager = createMediaManager();
  const asset = manager.createMediaAsset({ kind: 'video', src: '/media/ylreiz/clip-01.mp4' });
  assert.ok(typeof asset.id === 'string' && asset.id.length > 0);
});

test('createMediaAsset throws ValidationError for invalid kind', () => {
  const manager = createMediaManager();
  assert.throws(() => manager.createMediaAsset({ kind: 'image', src: '/media/x.png' }), ValidationError);
});

test('createMediaAsset throws ValidationError for empty src', () => {
  const manager = createMediaManager();
  assert.throws(() => manager.createMediaAsset({ kind: 'audio', src: '   ' }), ValidationError);
});

test('createMediaAsset throws ConflictError for duplicate manual id', () => {
  const manager = createMediaManager();
  manager.createMediaAsset({ id: 'asset-dup', kind: 'audio', src: '/media/a.mp3' });
  assert.throws(() => manager.createMediaAsset({ id: 'asset-dup', kind: 'audio', src: '/media/b.mp3' }), ConflictError);
});

test('createExternalMedia validates provider, type and externalId', () => {
  const manager = createMediaManager();
  const external = manager.createExternalMedia({
    id: 'ext-1',
    provider: 'spotify',
    type: 'audio',
    externalId: 'track-123',
    reference: { url: 'https://open.spotify.com/track/123' },
    metadata: { classification: 'music' },
  });
  assert.equal(external.id, 'ext-1');
  assert.equal(external.provider, 'spotify');
  assert.equal(external.type, 'audio');
  assert.equal(external.externalId, 'track-123');
  assert.deepEqual(external.metadata, { classification: 'music' });
  assert.throws(() => manager.createExternalMedia({ provider: 'spotify', type: 'image', externalId: 'x' }), ValidationError);
  assert.throws(() => manager.createExternalMedia({ provider: '   ', type: 'audio', externalId: 'x' }), ValidationError);
});

test('createMediaCollection validates type and items, and throws IntegrityError for unknown media', () => {
  const manager = createMediaManager();
  assert.throws(() => manager.createMediaCollection({ type: 'unknown', items: ['asset-1'] }), ValidationError);
  assert.throws(() => manager.createMediaCollection({ type: 'album', items: 'not-an-array' }), ValidationError);
  assert.throws(() => manager.createMediaCollection({ type: 'album', items: ['missing-media'] }), IntegrityError);

  manager.createMediaAsset({ id: 'asset-1', kind: 'audio', src: '/media/a.mp3' });
  const collection = manager.createMediaCollection({ id: 'col-1', type: 'album', items: ['asset-1'] });
  assert.equal(collection.id, 'col-1');
  assert.equal(collection.type, 'album');
  assert.deepEqual(collection.items, ['asset-1']);
});

test('getMediaById and getMediaCollectionById return null for unknown ids', () => {
  const manager = createMediaManager();
  assert.equal(manager.getMediaById('missing'), null);
  assert.equal(manager.getMediaCollectionById('missing'), null);
});

test('listMediaByCollection throws NotFoundError for unknown collection and lists media', () => {
  const manager = createMediaManager();
  assert.throws(() => manager.listMediaByCollection('missing'), NotFoundError);

  manager.createMediaAsset({ id: 'asset-1', kind: 'audio', src: '/media/a.mp3' });
  const collection = manager.createMediaCollection({ id: 'col-1', type: 'album', items: ['asset-1'] });
  manager.addMediaToCollection('col-1', 'asset-1');
  const mediaList = manager.listMediaByCollection('col-1');
  assert.equal(mediaList.length, 1);
  assert.equal(mediaList[0].id, 'asset-1');
});

test('addMediaToCollection rules: unknown collection NotFoundError, unknown media IntegrityError, idempotent add', () => {
  const manager = createMediaManager();
  manager.createMediaAsset({ id: 'asset-1', kind: 'audio', src: '/media/a.mp3' });
  const collection = manager.createMediaCollection({ id: 'col-1', type: 'album', items: [] });

  assert.throws(() => manager.addMediaToCollection('missing', 'asset-1'), NotFoundError);
  assert.throws(() => manager.addMediaToCollection('col-1', 'missing-media'), IntegrityError);

  manager.addMediaToCollection('col-1', 'asset-1');
  const collectionAfterAdd = manager.addMediaToCollection('col-1', 'asset-1');
  assert.equal(collectionAfterAdd.items.length, 1);
});

test('removeMediaFromCollection rules: not included returns false, unknown collection NotFoundError', () => {
  const manager = createMediaManager();
  manager.createMediaAsset({ id: 'asset-1', kind: 'audio', src: '/media/a.mp3' });
  const collection = manager.createMediaCollection({ id: 'col-1', type: 'album', items: ['asset-1'] });

  assert.equal(manager.removeMediaFromCollection('col-1', 'asset-1'), true);
  assert.equal(manager.removeMediaFromCollection('col-1', 'asset-1'), false);
  assert.throws(() => manager.removeMediaFromCollection('missing', 'asset-1'), NotFoundError);
});

test('updateMediaSrc updates asset and throws NotFoundError for unknown or wrong type ids', () => {
  const manager = createMediaManager();
  manager.createMediaAsset({ id: 'asset-1', kind: 'audio', src: '/media/a.mp3' });
  manager.createExternalMedia({ id: 'ext-1', provider: 'spotify', type: 'audio', externalId: 'track-123' });

  assert.throws(() => manager.updateMediaSrc('missing', '/media/new.mp3'), NotFoundError);
  assert.throws(() => manager.updateMediaSrc('ext-1', '/media/new.mp3'), NotFoundError);

  const asset = manager.updateMediaSrc('asset-1', '/media/new.mp3');
  assert.equal(asset.src, '/media/new.mp3');
});

test('updateMediaMetadata merges partial metadata for asset', () => {
  const manager = createMediaManager();
  manager.createMediaAsset({ id: 'asset-1', kind: 'audio', src: '/media/a.mp3', metadata: { title: 'Original' } });
  assert.throws(() => manager.updateMediaMetadata('missing', { title: 'X' }), NotFoundError);

  const asset = manager.updateMediaMetadata('asset-1', { title: 'Nuevo' });
  assert.equal(asset.metadata.title, 'Nuevo');
});

test('updateExternalMedia applies allowed patch fields and throws NotFoundError for unknown id', () => {
  const manager = createMediaManager();
  manager.createExternalMedia({ id: 'ext-1', provider: 'spotify', type: 'audio', externalId: 'track-123' });
  assert.throws(() => manager.updateExternalMedia('missing', { provider: 'youtube' }), NotFoundError);

  const external = manager.updateExternalMedia('ext-1', { provider: 'youtube', metadata: { classification: 'soundtrack' } });
  assert.equal(external.provider, 'youtube');
  assert.equal(external.type, 'audio');
  assert.deepEqual(external.metadata, { classification: 'soundtrack' });
});

test('deleteMedia returns false for unknown id and removes media from collections', () => {
  const manager = createMediaManager();
  assert.equal(manager.deleteMedia('missing'), false);

  manager.createMediaAsset({ id: 'asset-1', kind: 'audio', src: '/media/a.mp3' });
  const collection = manager.createMediaCollection({ id: 'col-1', type: 'album', items: ['asset-1'] });
  manager.addMediaToCollection('col-1', 'asset-1');

  assert.equal(manager.deleteMedia('asset-1'), true);
  assert.equal(manager.getMediaById('asset-1'), null);
  const collectionAfterDelete = manager.getMediaCollectionById('col-1');
  assert.equal(collectionAfterDelete.items.length, 0);
});
