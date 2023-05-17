import AsyncStorage from '@react-native-async-storage/async-storage'
import { MEAL_COLLECTION } from '@storage/storageConfig'
import { MealStorageDTO } from './MealStorageDTO'
import { AppError } from '@utils/AppError'

export async function mealGetById(id: string, date: string) {
  try {
    const storage = await AsyncStorage.getItem(`${MEAL_COLLECTION}-${date}`)
    const meals: MealStorageDTO[] = JSON.parse(storage!)
    const meal = meals.find((meal) => meal.id === id)

    if (!meal) {
      throw new AppError('Essa refeição ainda não foi cadastrada')
    }

    return meal
  } catch (error) {
    throw error
  }
}
