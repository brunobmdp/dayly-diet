import { percentFormatter } from '@utils/formatter'
import { ArrowUpRight } from 'phosphor-react-native'
import {
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
  View,
} from 'react-native'
import theme from '@theme/index'
import clsx from 'clsx'

type Props = TouchableOpacityProps & {
  totalMealsInDiet: number
}

export function PercentageButton({ totalMealsInDiet = 1, ...rest }: Props) {
  const totalMealsInDietPercentage = percentFormatter.format(totalMealsInDiet)

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className={clsx(
        ' mt-8 rounded-lg justify-center items-center py-5 px-4 relative ',
        {
          'bg-green-light': totalMealsInDiet >= 0.5,
          'bg-red-light': totalMealsInDiet < 0.5,
        },
      )}
      {...rest}
    >
      <Text className="text-xxl text-gray-100 font-nunito_bold">
        {totalMealsInDietPercentage}
      </Text>
      <Text className="text-gray-200 font-nunito_regular text-sm">
        das refeições dentro da dieta
      </Text>
      <View className="absolute right-2 top-2">
        <ArrowUpRight
          size={24}
          color={clsx({
            [theme.colors.green.dark]: totalMealsInDiet >= 0.5,
            [theme.colors.red.dark]: totalMealsInDiet < 0.5,
          })}
        />
      </View>
    </TouchableOpacity>
  )
}
