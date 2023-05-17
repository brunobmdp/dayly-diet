import AsyncStorage from '@react-native-async-storage/async-storage'
import { MEAL_COLLECTION } from '@storage/storageConfig'
import { MealStorageDTO } from './MealStorageDTO'
import { mealGetByDate } from './mealGetAllByDate'
import { sortMealByTime } from '@utils/sortMealsBytime'
import { mealValidation } from '@utils/validate'
import { AppError } from '@utils/AppError'
import { dayAdd } from '@storage/day/dayAdd'

export async function mealAddByDate(newMeal: MealStorageDTO) {
  try {
    const storedMeals = await mealGetByDate(newMeal.day)

    if (mealValidation(newMeal, storedMeals)) {
      throw new AppError('Essa refeição já está cadastrada')
    }

    const meals: MealStorageDTO[] = sortMealByTime([
      ...storedMeals.filter((meal) => meal.id !== newMeal.id),
      newMeal,
    ])

    await dayAdd(newMeal.day)
    const updateStoredMeals = JSON.stringify(meals)
    await AsyncStorage.setItem(
      `${MEAL_COLLECTION}-${newMeal.day}`,
      updateStoredMeals,
    )
  } catch (error) {
    throw error
  }
}
