import AsyncStorage from '@react-native-async-storage/async-storage'
import { DAY_COLLECTION } from '@storage/storageConfig'
import { dayGetAll } from './dayGetAll'
import { sortDateNewToOld } from '@utils/sortDateNewToOld'
import { AppError } from '@utils/AppError'
import { dateValidation } from '@utils/validate'

export async function dayAdd(newDate: string) {
  try {
    const storedDays = await dayGetAll()
    const dateIsValid = dateValidation(newDate)

    if (!dateIsValid) {
      throw new AppError('Você deve informar uma data valida')
    }

    const updatedDays = storedDays.includes(newDate)
      ? JSON.stringify(storedDays)
      : JSON.stringify(sortDateNewToOld([...storedDays, newDate]))

    await AsyncStorage.setItem(DAY_COLLECTION, updatedDays)
  } catch (error) {
    // throw error
  }
}
