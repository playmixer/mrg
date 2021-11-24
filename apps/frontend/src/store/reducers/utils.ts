export const saveToStorage = (payload: object, storeName: string) => localStorage.setItem(storeName, JSON.stringify(payload))
