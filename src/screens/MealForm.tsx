import { v4 as uuidV4 } from 'uuid'

import Button from '@components/Button'
import { Header } from '@components/Header'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import theme from '@theme/index'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MealStorageDTO } from '@storage/meal/MealStorageDTO'
import { dateFormatter, hoursToMinutes } from '@utils/formatter'
import { mealAddByDate } from '@storage/meal/mealAddByDate'
import { AppError } from '@utils/AppError'

type RouteParams = {
  day: string
  id: string
}

export function MealForm() {
  const [isNewMeal, setIsNewMeal] = useState<boolean>(true)

  const [mealNameInput, setMealNameInput] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [timeInput, setTimeInput] = useState('')
  const [isInDiet, setIsInDiet] = useState<boolean | null>(null)

  const { navigate } = useNavigation()

  const router = useRoute()
  const { day, id: mealId } = router.params as RouteParams

  const headerTitle = isNewMeal ? 'Nova refeição' : 'Editar refeição'
  const buttonTitle = isNewMeal ? 'Cadastrar refeição' : 'Salvar alterações'

  function handleDateInput(text: string) {
    const newText = text.replace(/[^0-9]/g, '')
    const formattedText = newText.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
    setDateInput(formattedText)
  }

  function handleTimeInput(text: string) {
    const newText = text.replace(/[^0-9]/g, '')
    const formattedText = newText.replace(/(\d{2})(\d{2})/, '$1:$2')
    setTimeInput(formattedText)
  }

  async function handleSaveMeal() {
    const newMeal: MealStorageDTO = {
      id: mealId.trim.length > 0 ? mealId : uuidV4(),
      name: mealNameInput,
      description: descriptionInput,
      day: dateFormatter(dateInput),
      timeInMinutes: hoursToMinutes(timeInput),
      isInDiet: isInDiet!,
    }

    try {
      await mealAddByDate(newMeal)
    } catch (error) {
      error instanceof AppError
        ? Alert.alert('Nova Refeição', error.message)
        : Alert.alert('Nova Refeição', 'Não foi possível adicionar a refeição')
    } finally {
      isNewMeal
        ? navigate('feedback', { isInDiet: isInDiet! })
        : navigate('meal', { day, id: mealId })
    }
  }
  function existingMeal() {
    setIsNewMeal(false)
  }

  useEffect(() => {
    mealId.trim.length > 0 && existingMeal()
  }, [mealId])

  return (
    <SafeAreaView className="flex-1 bg-gray-500">
      <Header title={headerTitle} colorStyle="gray" size="small" />
      <ScrollView className="flex-1 bg-gray-700 rounded-t-3xl -mt-7  px-6 py-10 space-y-6">
        <View>
          <Text className="text-xs font-nunito_bold mb-1">Nome</Text>
          <TextInput
            className="p-3.5  border border-gray-500 rounded-md focus:border-gray-300"
            cursorColor={theme.colors.gray[100]}
            value={mealNameInput}
            onChangeText={setMealNameInput}
          />
        </View>
        <View className="h-36">
          <Text className="text-xs font-nunito_bold mb-1">Descrição</Text>
          <View
            onTouchStart={() => console.log('tocou')}
            className="p-3.5 border border-gray-500 rounded-md flex-1 focus:border-gray-300"
          >
            <TextInput
              multiline
              cursorColor={theme.colors.gray[100]}
              value={descriptionInput}
              onChangeText={setDescriptionInput}
            />
          </View>
        </View>
        <View className="flex-row space-x-5">
          <View className="flex-1">
            <Text className="text-xs font-nunito_bold mb-1">Data</Text>
            <TextInput
              className="p-3.5  border border-gray-500 rounded-md focus:border-gray-300"
              cursorColor={theme.colors.gray[100]}
              placeholderTextColor={theme.colors.gray[400]}
              keyboardType="numeric"
              placeholder="dd/mm/aaaa"
              maxLength={10}
              value={dateInput}
              onChangeText={handleDateInput}
            />
          </View>
          <View className="flex-1">
            <Text className="text-xs font-nunito_bold mb-1">Hora</Text>
            <TextInput
              className="p-3.5  border border-gray-500 rounded-md focus:border-gray-300 "
              cursorColor={theme.colors.gray[100]}
              placeholderTextColor={theme.colors.gray[400]}
              keyboardType="numeric"
              placeholder="HH:mm"
              maxLength={5}
              value={timeInput}
              onChangeText={handleTimeInput}
            />
          </View>
        </View>

        <View>
          <Text className="text-xs font-nunito_bold mb-2">
            Está dentro da dieta?
          </Text>
          <View className="flex-row space-x-2">
            <TouchableOpacity
              className={clsx(
                'p-4 space-x-2 flex-1 flex-row justify-center items-center border border-gray-600 rounded-md bg-gray-600',
                { 'border-green-dark bg-green-light': isInDiet === true },
              )}
              onPress={() => setIsInDiet(true)}
              activeOpacity={0.5}
            >
              <View className="w-2 h-2 rounded-full bg-green-dark" />
              <Text className="text-sm font-nunito_bold">Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={clsx(
                'p-4 space-x-2 flex-1 flex-row justify-center items-center border border-gray-600 rounded-md bg-gray-600',
                { 'border-red-dark bg-red-light': isInDiet === false },
              )}
              onPress={() => setIsInDiet(false)}
              activeOpacity={0.5}
            >
              <View className="w-2 h-2 rounded-full bg-red-dark" />
              <Text className="text-sm font-nunito_bold">Não</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1">
          <Button
            className="mt-auto"
            title={buttonTitle}
            onPress={handleSaveMeal}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
