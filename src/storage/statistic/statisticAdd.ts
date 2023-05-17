import AsyncStorage from '@react-native-async-storage/async-storage'
import { STATISTIC_COLLECTION } from '@storage/storageConfig'
import { StatisticStorageDto } from './StatisticStorageDTO'

export async function statisticGetAll(statistics: StatisticStorageDto) {
  try {
    const storage = JSON.stringify(statistics)
    await AsyncStorage.setItem(STATISTIC_COLLECTION, storage)
  } catch (error) {
    throw error
  }
}
