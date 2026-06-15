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

// Safe Migration from LocalStorage to IndexedDB
export const migrateFromLocalStorage = async () => {
  // Support both current prefix ('pawfecto_') and legacy prefix ('pawsome_')
  const legacyKeys = [
    { local: 'pawfecto_pets', fallback: 'pawsome_pets', target: 'pawfecto_pets', isJson: true },
    { local: 'pawfecto_expenses', fallback: 'pawsome_expenses', target: 'pawfecto_expenses', isJson: true },
    { local: 'pawfecto_reminders', fallback: 'pawsome_reminders', target: 'pawfecto_reminders', isJson: true },
    { local: 'pawfecto_theme', fallback: 'pawsome_theme', target: 'pawfecto_theme', isJson: false },
    { local: 'pawfecto_currency', fallback: 'pawsome_currency', target: 'pawfecto_currency', isJson: false }
  ];

  for (const item of legacyKeys) {
    // Check if the current or legacy key exists in localStorage
    const localVal = localStorage.getItem(item.local) || localStorage.getItem(item.fallback);
    if (localVal !== null) {
      try {
        let parsedVal = localVal;
        if (item.isJson) {
          parsedVal = JSON.parse(localVal);
        }

        // 1. Write to IndexedDB under the clean target key
        await setDBValue(item.target, parsedVal);

        // 2. Verify by reading it back
        const verifiedVal = await getDBValue(item.target);
        if (JSON.stringify(verifiedVal) === JSON.stringify(parsedVal)) {
          // 3. Remove only after verification matches
          localStorage.removeItem(item.local);
          localStorage.removeItem(item.fallback);
          console.log(`Successfully migrated and verified key: ${item.target}`);
        } else {
          throw new Error('Data verification failed.');
        }
      } catch (err) {
        console.error(`Migration failed for key: ${item.target}. Leaving data in localStorage.`, err);
      }
    }
  }
};
