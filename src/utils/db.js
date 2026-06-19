const DB_NAME = 'PawfectoDB';
const STORE_NAME = 'store';

// Initialize IndexedDB
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
};

// Set a value in IndexedDB
export const setDBValue = async (key, val) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(val, key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Get a value from IndexedDB
export const getDBValue = async (key) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Delete a value from IndexedDB
export const removeDBValue = async (key) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// ponytail: simplified migrateFromLocalStorage by removing speculative legacy fallbacks & redundant verification.
export const migrateFromLocalStorage = async () => {
  const keys = ['pawfecto_pets', 'pawfecto_expenses', 'pawfecto_reminders', 'pawfecto_theme', 'pawfecto_currency'];

  for (const key of keys) {
    const localVal = localStorage.getItem(key);
    if (localVal !== null) {
      try {
        const isJson = key.endsWith('pets') || key.endsWith('expenses') || key.endsWith('reminders');
        const parsedVal = isJson ? JSON.parse(localVal) : localVal;

        await setDBValue(key, parsedVal);
        localStorage.removeItem(key);
      } catch (err) {
        console.error(`Migration failed for key: ${key}.`, err);
      }
    }
  }
};

