import AsyncStorage from '@react-native-async-storage/async-storage'
import { DAY_COLLECTION } from '@storage/storageConfig'

export async function dayGetAll() {
  try {
    const storage = await AsyncStorage.getItem(DAY_COLLECTION)
    const days: string[] = storage ? JSON.parse(storage) : []
    return days
  } catch (error) {
    throw error
  }
}
