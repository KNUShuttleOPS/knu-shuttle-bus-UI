import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';

const UUID_KEY = 'device-uuid';
let cachedUUID = null;

export const loadUUID = async () => {
  if (cachedUUID) {
    return cachedUUID;
  }

  try {
    let storedUUID = await SecureStore.getItemAsync(UUID_KEY);
    if (storedUUID) {
      cachedUUID = storedUUID;
      return storedUUID;
    } else {
      const newUUID = uuidv4();
      await SecureStore.setItemAsync(UUID_KEY, newUUID);
      cachedUUID = newUUID;
      return newUUID;
    }
  } catch (error) {
    console.error('Failed to load or create UUID', error);
    throw error;
  }
};
