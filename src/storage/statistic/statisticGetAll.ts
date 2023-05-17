import AsyncStorage from '@react-native-async-storage/async-storage'
import { STATISTIC_COLLECTION } from '@storage/storageConfig'
import { StatisticStorageDto } from './StatisticStorageDTO'

export async function statisticGetAll() {
  try {
    const storage = await AsyncStorage.getItem(STATISTIC_COLLECTION)
    const statistics: StatisticStorageDto = storage ? JSON.parse(storage) : {}
    return statistics
  } catch (error) {
    throw error
  }
}
