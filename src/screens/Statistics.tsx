import { Header } from '@components/Header'
import { StatisticCard } from '@components/StatisticCard'
import { percentFormatter } from '@utils/formatter'
import clsx from 'clsx'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function Statistics() {
  const proportionOfMealInDiet = 0.7799
  const headerColor = proportionOfMealInDiet < 0.5 ? 'red' : 'green'
  const proportionInPercentage = percentFormatter.format(proportionOfMealInDiet)
  return (
    <SafeAreaView
      className={clsx('flex-1 ', {
        'bg-green-light': headerColor === 'green',
        'bg-red-light': headerColor === 'red',
      })}
    >
      <Header
        colorStyle={headerColor}
        title={proportionInPercentage}
        size="large"
        subtitle="das refeições dentro da dieta"
      />
      <View className="flex-1 p-4 -mt-8 bg-gray-700 rounded-t-3xl items-center">
        <Text className="mt-4 mb-4 font-nunito_bold text-sm ">
          Estatísticas gerais
        </Text>
        <StatisticCard
          title="4"
          subtitle="melhor sequência de pratos dentro da dieta"
          className="mb-3 w-full"
        />
        <StatisticCard
          title="109"
          subtitle="refeições registradas"
          className="mb-3 w-full"
        />
        <View className="flex-row space-x-3">
          <StatisticCard
            className="flex-1"
            title="99"
            subtitle="refeições dentro da dieta"
            bgColor="green"
          />
          <StatisticCard
            className="flex-1"
            title="10"
            subtitle="refeições fora da dieta"
            bgColor="red"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
