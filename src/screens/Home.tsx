import { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Image, SectionList, SectionListData, Text, View } from 'react-native'

import logo from '@assets/Logo.png'

import Button from '@components/Button'
import { MealCard } from '@components/MealCard'
import { PercentageButton } from '@components/PercentageButton'
import { SafeAreaView } from 'react-native-safe-area-context'

type Meal = {
  id: string
  name: string
  timeInMinutes: number
  isInDiet: boolean
}

type DietDay = SectionListData<
  Meal,
  {
    day: string
  }
>

const daysInDietData: DietDay[] = [
  {
    day: '03.04.2023',
    data: [
      {
        id: '9f3b0c72-29d4-4ec4-b76e-31c1e4a4d4c2',
        name: 'Iogurte grego com granola',
        timeInMinutes: 10,
        isInDiet: true,
      },
      {
        id: '571e70d5-f346-4d8d-bc7a-0a4f4d4b4bf2',
        name: 'Suco de laranja natural',
        timeInMinutes: 5,
        isInDiet: true,
      },
      {
        id: '9e2c65d7-cb33-4e0e-974d-ef5f5cb5b5e5',
        name: 'Salada de frutas',
        timeInMinutes: 15,
        isInDiet: true,
      },
      {
        id: 'a3d201ae-75a6-44a6-ae51-3c880f2a9026',
        name: 'Sanduíche de frango',
        timeInMinutes: 20,
        isInDiet: true,
      },
      {
        id: '37e9f59c-6b27-4f2b-a97f-6a1918796f01',
        name: 'Bolo de cenoura',
        timeInMinutes: 30,
        isInDiet: false,
      },
      {
        id: '8c8df9dc-7a19-442d-b912-7a1c755f24d4',
        name: 'Pizza de mussarela',
        timeInMinutes: 40,
        isInDiet: false,
      },
    ],
  },
  {
    day: '02.04.2023',
    data: [
      {
        id: '4e61a582-4f60-47d5-bd70-b2e163416b92',
        name: 'Hambúrguer vegetariano',
        timeInMinutes: 1200,
        isInDiet: true,
      },
      {
        id: '7d1c3265-3b3e-4145-ba99-d158814f6d3f',
        name: 'Batatas assadas',
        timeInMinutes: 600,
        isInDiet: true,
      },
      {
        id: '6b53d47e-034f-4e04-a8aa-1e7c436c821d',
        name: 'Salada verde',
        timeInMinutes: 300,
        isInDiet: true,
      },
      {
        id: 'e47e8b2d-cb13-48de-9e84-7388c8e20669',
        name: 'Sopa de legumes',
        timeInMinutes: 45,
        isInDiet: true,
      },
    ],
  },
  {
    day: '01.04.2023',
    data: [
      {
        id: '1c322f6e-2b48-4b48-97b9-87d8af53557f',
        name: 'Salmão grelhado',
        timeInMinutes: 1200,
        isInDiet: true,
      },
      {
        id: '79ec6ea3-6e8b-4667-9512-2a9e21b8c1e7',
        name: 'Arroz branco',
        timeInMinutes: 600,
        isInDiet: false,
      },
      {
        id: 'a2d24e43-10ea-4362-bf44-029d2fa6e1ed',
        name: 'Espargos cozidos',
        timeInMinutes: 300,
        isInDiet: true,
      },
    ],
  },
  {
    day: '31.03.2023',
    data: [
      {
        id: '5730deed-04b3-4d8f-89cb-3c3a45e1d9d9',
        name: 'Panquecas com mel',
        timeInMinutes: 20,
        isInDiet: false,
      },
      {
        id: '5da6a91f-f8df-4b62-af2f-998e0c9de9ee',
        name: 'Café com leite',
        timeInMinutes: 5,
        isInDiet: true,
      },
      {
        id: '3b4a0c4d-b7d4-4a53-b7a4-bbf289d9f9ab',
        name: 'Ovos mexidos',
        timeInMinutes: 10,
        isInDiet: true,
      },
    ],
  },
  {
    day: '30.03.2023',
    data: [
      {
        id: 'c30149f9-39d8-4835-9e58-33829b0aa583',
        name: 'Salada de frutas',
        timeInMinutes: 15,
        isInDiet: true,
      },
      {
        id: '80fde0c7-b0e9-4879-a399-1a6b249c18f1',
        name: 'Sanduíche de peru',
        timeInMinutes: 20,
        isInDiet: true,
      },
      {
        id: 'd80d0f2e-c20c-4d29-bf25-4f4fc4c4a289',
        name: 'Suco de limão',
        timeInMinutes: 5,
        isInDiet: true,
      },
    ],
  },
  {
    day: '29.03.2023',
    data: [
      {
        id: 'e6a8b106-3652-4f72-b98d-ae8f43e4f63b',
        name: 'Torradas com queijo',
        timeInMinutes: 10,
        isInDiet: false,
      },
      {
        id: '292fbecf-1d28-4e09-86fb-874e2e8fa85e',
        name: 'Leite quente',
        timeInMinutes: 5,
        isInDiet: true,
      },
      {
        id: '7e0cb2fb-7858-4b09-82b7-cf15d49639b8',
        name: 'Iogurte com morangos',
        timeInMinutes: 15,
        isInDiet: true,
      },
    ],
  },
]

export function Home() {
  const [daysInDiet, setDaysInDiet] = useState<DietDay[]>([])

  const { navigate } = useNavigation()

  const allMeals = daysInDiet
    .reduce((acc, item) => (acc = [...acc, ...item.data]), [] as Meal[])
    .reverse()
  const totalAmountOfMeals = allMeals.length
  const mealsInDiet = allMeals.reduce(
    (acc, meal) => (meal.isInDiet ? ++acc : acc),
    0,
  )

  const sequencies = allMeals.reduce(
    (sequence, meal) => {
      meal.isInDiet
        ? (sequence.actual = sequence.actual + 1)
        : (sequence.actual = 0)
      sequence.actual > sequence.best && (sequence.best = sequence.actual)
      return sequence
    },

    { actual: 0, best: 0 },
  )

  const proportionOfMealsInDiet = mealsInDiet / totalAmountOfMeals

  function handleShowStatistics() {
    navigate('statistics')
  }
  function handleNewMeal() {
    navigate('form', { day: '', id: '' })
  }

  function handleMealPage(day: string, id: string) {
    navigate('meal', { day, id })
  }

  useFocusEffect(
    useCallback(() => {
      setDaysInDiet(daysInDietData)
      console.log(sequencies)
    }, [sequencies]),
  )

  return (
    <SafeAreaView className="flex-1 p-6 bg-gray-700">
      <View className="flex-row justify-between">
        <Image source={logo} alt="" />
        <View
          className="rounded-full overflow-hidden h-10 w-10  border-2
        border-gray-100 justify-center items-center"
        >
          <Image
            className="h-10 w-10"
            source={{ uri: 'https://github.com/brunobmdp.png' }}
            alt=""
          />
        </View>
      </View>
      <PercentageButton
        totalMealsInDiet={proportionOfMealsInDiet}
        onPress={handleShowStatistics}
      />
      <Text className="mt-10 mb-2 text-md text-gray-100">Refeições</Text>
      <Button title="Nova refeição" icon="add" onPress={handleNewMeal} />
      <SectionList
        sections={daysInDiet}
        renderItem={({ item, section }) => (
          <MealCard
            title={item.name}
            isInDiet={item.isInDiet}
            timeInMinutes={item.timeInMinutes}
            onPress={() => handleMealPage(section.day, item.id)}
          />
        )}
        renderSectionHeader={({ section }) => (
          <Text className="pt-10 mb-2 text-lg text-gray-100 bg-gray-700 font-nunito_bold">
            {section.day}
          </Text>
        )}
        contentContainerStyle={[
          { paddingBottom: 30 },
          daysInDiet.length === 0 && { flex: 1 },
        ]}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
            <Text className="text-center text-md font-nunito_bold text">
              Você não tem nenhuma refeição cadastrada ainda, que tal começar
              hoje
            </Text>
          </View>
        )}
        stickySectionHeadersEnabled
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}
