import { MealStorageDTO } from '@storage/meal/MealStorageDTO'
import { stringToDate } from './formatter'

export function dateValidation(date: string) {
  const today = new Date()
  const formattedDate = stringToDate(date)

  const validation = !(formattedDate > today || date.trim.length === 0)

  return validation
}

export function mealValidation(
  newMeal: MealStorageDTO,
  storedMeals: MealStorageDTO[],
) {
  const validation =
    !storedMeals.includes(newMeal) ||
    !(newMeal.name.trim.length < 0) ||
    !(newMeal.description.trim.length < 0) ||
    !(newMeal.timeInMinutes < 0)
  return validation
}
