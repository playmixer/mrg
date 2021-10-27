export const saveToStorage = (payload, storeName) => localStorage.setItem(storeName, JSON.stringify(payload))
