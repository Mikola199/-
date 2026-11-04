function isValidId(id) {
  return Number.isFinite(id) || (typeof id === 'string' && id.length > 0);
}

export function isValidListing(listing) {
  return Boolean(
    listing &&
      typeof listing === 'object' &&
      isValidId(listing.id) &&
      typeof listing.title === 'string' &&
      Number.isFinite(listing.price) &&
      listing.price >= 0 &&
      typeof listing.category === 'string' &&
      typeof listing.description === 'string' &&
      typeof listing.location === 'string' &&
      typeof listing.date === 'string' &&
      Number.isFinite(listing.views) &&
      typeof listing.imageUrl === 'string' &&
      typeof listing.videoUrl === 'string' &&
      listing.seller &&
      typeof listing.seller.name === 'string' &&
      Number.isFinite(listing.seller.rating) &&
      Number.isFinite(listing.seller.reviews) &&
      typeof listing.seller.avatarUrl === 'string'
  );
}

export function isValidChat(chat) {
  return Boolean(
    chat &&
      typeof chat === 'object' &&
      isValidId(chat.id) &&
      isValidId(chat.listingId) &&
      typeof chat.listingTitle === 'string' &&
      Number.isFinite(chat.listingPrice) &&
      chat.seller &&
      typeof chat.seller.name === 'string' &&
      Number.isFinite(chat.seller.rating) &&
      Number.isFinite(chat.seller.reviews) &&
      typeof chat.seller.avatarUrl === 'string' &&
      Array.isArray(chat.messages) &&
      chat.messages.every(message =>
        message &&
        (typeof message.id === 'number' || typeof message.id === 'string') &&
        (message.sender === 'seller' || message.sender === 'user') &&
        typeof message.text === 'string' &&
        typeof message.timestamp === 'string'
      ) &&
      typeof chat.isTyping === 'boolean'
  );
}

export function isValidFavoriteId(id) {
  return typeof id === 'number' && Number.isFinite(id);
}

export function parseListingPrice(value) {
  const price = Number(value);
  return Number.isSafeInteger(price) && price > 0 ? price : null;
}

export function readStoredArray(key, fallback, isValidItem) {
  try {
    const stored = window.localStorage.getItem(key);
    if (stored === null) return fallback;

    const value = JSON.parse(stored);
    if (!Array.isArray(value)) {
      console.warn(`Ignoring invalid localStorage data for "${key}": expected an array.`);
      return fallback;
    }

    const validItems = value.filter(isValidItem);
    if (validItems.length !== value.length) {
      console.warn(`Ignoring invalid entries in localStorage key "${key}".`);
    }
    return validItems;
  } catch (error) {
    console.warn(`Unable to read localStorage key "${key}".`, error);
    return fallback;
  }
}

export function writeStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Unable to save localStorage key "${key}".`, error);
  }
}

export function removeStoredValue(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Unable to remove localStorage key "${key}".`, error);
  }
}

export function createListingShareUrl(baseUrl, listingOrId) {
  const url = new URL(baseUrl);
  const listing = typeof listingOrId === 'object' ? listingOrId : null;
  const params = new URLSearchParams({ listing: String(listing?.id ?? listingOrId) });
  if (listing && isValidListing(listing)) {
    params.set('data', JSON.stringify(listing));
  }
  url.hash = params.toString();
  if (url.toString().length > 6000) {
    params.delete('data');
    url.hash = params.toString();
  }
  return url.toString();
}

export function getListingIdFromHash(hash) {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const id = params.get('listing');
  return id === null ? null : id;
}

export function getSharedListingFromHash(hash) {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  try {
    const listing = JSON.parse(params.get('data'));
    return isValidListing(listing) && String(listing.id) === params.get('listing')
      ? listing
      : null;
  } catch {
    return null;
  }
}
