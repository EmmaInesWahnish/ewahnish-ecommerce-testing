const getItem = (key) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  };
  
  const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  const removeItem = (key) => localStorage.removeItem(key);
  
  const clearAll = () => localStorage.clear();
  
  export const LocalStorageService = { getItem, setItem, removeItem, clearAll };
  