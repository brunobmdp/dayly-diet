import { MealStorageDTO } from '@storage/meal/MealStorageDTO'

function mealCompare(mealA: MealStorageDTO, mealB: MealStorageDTO) {
  let result = 0
  mealA.timeInMinutes < mealB.timeInMinutes ? (result = -1) : (result = 1)

  return result
}

export function sortMealByTime(meals: MealStorageDTO[]) {
  return meals.sort(mealCompare)
}
