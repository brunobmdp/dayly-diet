import Alert from '@components/Alert'
import Button from '@components/Button'
import { Header } from '@components/Header'
import { Loading } from '@components/Loading'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MealStorageDTO } from '@storage/meal/MealStorageDTO'
import { mealGetById } from '@storage/meal/mealGetById'
import { AppError } from '@utils/AppError'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Alert as Alerts, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type RoutParams = {
  day: string
  id: string
}

export function Meal() {
  const [isLoading, setLoading] = useState(true)

  const [meal, setMeal] = useState<MealStorageDTO>({
    name: 'x-tudo',
    day: '12.08.2022',
    id: '7e0cb2fb-7858-4b09-82b7-cf15d49639b8',
    description: 'Xis completo da lancheria do bairro',
    isInDiet: false,
    timeInMinutes: 1500,
  })
  const [showAlert, setShowAlert] = useState(false)
  const { navigate } = useNavigation()

  const headerColor = meal.isInDiet ? 'green' : 'red'
  const isInDietText = meal.isInDiet ? 'dentro da dieta' : 'fora da dieta'

  const route = useRoute()
  const { day, id } = route.params as RoutParams

  function handleShowAlert() {
    setShowAlert(true)
  }
  function handleDismissAlert() {
    setShowAlert(false)
  }

  function handleConfirmDeleteButton() {
    navigate('home')
  }

  function handleEditMealButton() {
    navigate('form', {
      day: '09.04.2023',
      id: '7e0cb2fb-7858-4b09-82b7-cf15d49639b8',
    })
  }

  async function fetchMealById() {
    try {
      setLoading(true)
      const storedMeal = await mealGetById(day, id)
      storedMeal && setMeal(storedMeal)
    } catch (error) {
      error instanceof AppError
        ? Alerts.alert('Refeição', error.message)
        : Alerts.alert('Refeição', 'Refeição não existe')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMealById()

    console.log(meal)
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView
          className={clsx('flex-1', {
            'bg-green-light': meal.isInDiet,
            'bg-red-light': !meal.isInDiet,
          })}
        >
          {showAlert && (
            <Alert
              title="Deseja realmente excluir o registro da refeição?"
              onPressNegative={handleDismissAlert}
              onPressPositive={handleConfirmDeleteButton}
            />
          )}

          <Header title="Refeição" colorStyle={headerColor} />
          <View className="flex-1 bg-gray-700 px-6 py-10 -mt-7 space-y-6 rounded-3xl">
            <View className="space-y-2">
              <Text className="text-xl font-nunito_bold ">{meal.name}</Text>
              <Text className="text-md font-nunito_regular ">
                Xis completo da lancheria do bairro
              </Text>
            </View>
            <View className="space-y-2">
              <Text className="text-sm font-nunito_bold ">Data e hora</Text>
              <Text className="text-md font-nunito_regular ">
                12/08/2022 às 20:00
              </Text>
            </View>

            <View className="flex-row mr-auto items-center space-x-2 py-2 px-4 bg-gray-600 rounded-full">
              <View
                className={clsx('w-2 h-2  rounded-full', {
                  'bg-green-dark': meal.isInDiet,
                  'bg-red-dark': !meal.isInDiet,
                })}
              />
              <Text>{isInDietText}</Text>
            </View>
            <View className="space-y-2 flex-1">
              <Button
                className="mt-auto"
                title="Editar refeição"
                icon="pencil"
                onPress={handleEditMealButton}
              />
              <Button
                buttonStyle="secondary"
                title="Excluir refeição"
                icon="trash"
                onPress={handleShowAlert}
              />
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  )
}
