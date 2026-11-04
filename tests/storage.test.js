import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createListingShareUrl,
  getListingIdFromHash,
  getSharedListingFromHash,
  isValidChat,
  isValidFavoriteId,
  isValidListing,
  parseListingPrice,
  readStoredArray,
  writeStoredValue
} from '../src/storage.js';

const listing = {
  id: 17,
  title: 'Демо',
  price: 250,
  category: 'Электроника',
  description: 'Проверка ссылки',
  location: 'Москва',
  date: 'Сегодня',
  views: 1,
  imageUrl: 'https://example.com/image.jpg',
  videoUrl: '',
  seller: { name: 'Автор', rating: 5, reviews: 0, avatarUrl: '' }
};

function useStorage(value, { throwOnRead = false, throwOnWrite = false } = {}) {
  globalThis.window = {
    localStorage: {
      getItem() {
        if (throwOnRead) throw new Error('Storage unavailable');
        return value;
      },
      setItem(key, storedValue) {
        if (throwOnWrite) throw new Error('Storage unavailable');
        this.value = storedValue;
      }
    }
  };
}

test('listing validation rejects invalid prices and incomplete records', () => {
  assert.equal(isValidListing(listing), true);
  assert.equal(isValidListing({ ...listing, price: Infinity }), false);
  assert.equal(isValidListing({ ...listing, price: -1 }), false);
  assert.equal(isValidListing({ ...listing, id: Infinity }), false);
  assert.equal(isValidListing({ ...listing, seller: null }), false);
});

test('chat and favorite validators reject malformed persisted data', () => {
  const chat = {
    id: 1,
    listingId: 17,
    listingTitle: 'Демо',
    listingPrice: 250,
    seller: listing.seller,
    messages: [{ id: 1, sender: 'user', text: 'Привет', timestamp: 'Сейчас' }],
    isTyping: false
  };
  assert.equal(isValidChat(chat), true);
  assert.equal(isValidChat({ ...chat, messages: null }), false);
  assert.equal(isValidFavoriteId(17), true);
  assert.equal(isValidFavoriteId('17'), false);
});

test('listing prices must be positive safe integers', () => {
  assert.equal(parseListingPrice('12500'), 12500);
  assert.equal(parseListingPrice('0'), null);
  assert.equal(parseListingPrice('-5'), null);
  assert.equal(parseListingPrice('1.5'), null);
  assert.equal(parseListingPrice('1e100'), null);
  assert.equal(parseListingPrice('not a price'), null);
});

test('stored arrays recover from malformed JSON, storage errors, and invalid rows', () => {
  useStorage('{bad json');
  assert.deepEqual(readStoredArray('items', [listing], isValidListing), [listing]);

  useStorage(JSON.stringify([listing, { ...listing, price: NaN }]));
  assert.deepEqual(readStoredArray('items', [], isValidListing), [listing]);

  useStorage(null, { throwOnRead: true });
  assert.deepEqual(readStoredArray('items', [listing], isValidListing), [listing]);
});

test('storage writes fail safely when browser storage is unavailable', () => {
  useStorage(null, { throwOnWrite: true });
  assert.doesNotThrow(() => writeStoredValue('items', [listing]));
});

test('share links carry listing details and can be restored from the URL fragment', () => {
  const shareUrl = createListingShareUrl('https://avitok.example/app', listing);
  const url = new URL(shareUrl);
  assert.equal(getListingIdFromHash(url.hash), '17');
  assert.deepEqual(getSharedListingFromHash(url.hash), listing);
});

test('oversized share links omit embedded data while retaining the listing route', () => {
  const largeListing = { ...listing, description: 'x'.repeat(7000) };
  const url = new URL(createListingShareUrl('https://avitok.example/app', largeListing));
  assert.equal(getListingIdFromHash(url.hash), '17');
  assert.equal(getSharedListingFromHash(url.hash), null);
});
