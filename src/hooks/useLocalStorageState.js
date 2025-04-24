import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    try {
      const storedValue = localStorage.getItem(key);
      // If value is null, or the string "undefined", fallback to initialState
      if (storedValue === null || storedValue === "undefined")
        return initialState;
      return JSON.parse(storedValue);
    } catch (error) {
      console.warn(`Error parsing localStorage key "${key}":`, error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing localStorage key "${key}":`, error);
    }
  }, [value, key]);

  return [value, setValue];
}
