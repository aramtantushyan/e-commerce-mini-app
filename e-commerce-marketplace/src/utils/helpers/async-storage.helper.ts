import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataToAsyncStorage = async (key: string, value: string | object) => {
    try {
        const storingValue = JSON.stringify(value);
        const isSet = await AsyncStorage.setItem(key, storingValue);
        return true;
      } catch (e) {
        throw e;
        // saving error
      }
}

export const readDataFromAsyncStorage = async (key: string) => {
    try {
        const jsonData = await AsyncStorage.getItem(key);
        return jsonData != null ? JSON.parse(jsonData) : null;
      } catch (e) {
        throw e;
        // error reading value
      }
}

export const removeDataFromAsyncStorage = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
      } catch(e) {
        throw e;
        // remove error
      }
}