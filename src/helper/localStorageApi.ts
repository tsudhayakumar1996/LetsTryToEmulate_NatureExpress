export const setValInStorage = (key: string, val: string) => localStorage.setItem(key, val)

export const getValFromStorage = (key: string) => localStorage.getItem(key)

export const removeAllValFromStorage = () => localStorage.clear()
