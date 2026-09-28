export type StoredStudyPhoto = {
  id: string;
  chapterKey: string;
  fileName: string;
  contentType: string;
  createdAt: number;
  blob: Blob;
};

const DATABASE_NAME = 'class-3-study-manager';
const DATABASE_VERSION = 1;
const STORE_NAME = 'study-photos';

function requestToPromise<T>(request: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Photo storage request failed.'));
  });
}

function transactionToPromise(transaction: IDBTransaction) {
  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error('Photo storage transaction failed.'));
    transaction.onabort = () => reject(transaction.error ?? new Error('Photo storage transaction was cancelled.'));
  });
}

function createPhotoId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function openPhotoDatabase() {
  if (typeof indexedDB === 'undefined') {
    return Promise.reject(new Error('This browser does not support local photo storage.'));
  }

  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('chapterKey', 'chapterKey', { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Could not open local photo storage.'));
  });
}

export async function listChapterPhotos(chapterKey: string) {
  const database = await openPhotoDatabase();
  try {
    const transaction = database.transaction(STORE_NAME, 'readonly');
    const request = transaction.objectStore(STORE_NAME).index('chapterKey').getAll(chapterKey);
    const photos = await requestToPromise(request);
    await transactionToPromise(transaction);
    return photos.sort((left, right) => right.createdAt - left.createdAt);
  } finally {
    database.close();
  }
}

export async function saveChapterPhoto(chapterKey: string, file: File) {
  const database = await openPhotoDatabase();
  const photo: StoredStudyPhoto = {
    id: createPhotoId(),
    chapterKey,
    fileName: file.name || 'study-photo',
    contentType: file.type || 'image/*',
    createdAt: Date.now(),
    blob: file,
  };

  try {
    const transaction = database.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).put(photo);
    await transactionToPromise(transaction);
    return photo;
  } finally {
    database.close();
  }
}

export async function deleteChapterPhoto(photoId: string) {
  const database = await openPhotoDatabase();
  try {
    const transaction = database.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).delete(photoId);
    await transactionToPromise(transaction);
  } finally {
    database.close();
  }
}