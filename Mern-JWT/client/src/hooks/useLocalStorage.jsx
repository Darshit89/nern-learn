import { useCallback, useEffect, useState } from "react";

export const setLocalState = (key, value, skipParsing = false) =>
  localStorage.setItem(key, skipParsing ? `${value}` : JSON.stringify(value));

export const hasLocalState = (key) => !!localStorage.getItem(key);

export const getLocalaState = (key, skipParsing = false) => {
  if (hasLocalState(key)) {
    return skipParsing
      ? localStorage.getItem(key)
      : JSON.parse(localStorage.getItem(key));
  }
  return undefined;
};

export const removeLocalState = (key) => localStorage.removeItem(key);

const resetLocalState = () => localStorage.clear();

/**
 * useLocalState
 * @description This is a type safe implementation of localstorage module which serializes and deserializes with safety
 * @param {LocalStorageKey} `key` this key is the value refering which data will be store in local storage
 * @param {boolean} [skipParsing=false] `skipParsing` allow skipping of json parse in case of primitive types
 * @returns [state, setLocalStorage, unsetLocalState, resetLocalState]
 */
export const useLocalState = (key, skipParsing = false) => {
  const [state, setState] = useState(getLocalaState(key, skipParsing));

  useEffect(() => {
    if (!state) {
      removeLocalState(key);
    } else {
      setLocalState(key, state, skipParsing);
    }
  }, [key, skipParsing, state]);

  const setLocalStorage = useCallback((value) => {
    setState(value);
  }, []);

  const unsetLocalState = useCallback(() => {
    removeLocalState(key);
    setState(undefined);
  }, [key]);

  return [state, setLocalStorage, unsetLocalState, resetLocalState];
};
