import { timeInMinutesToString } from '@utils/formatter'
import clsx from 'clsx'
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  View,
} from 'react-native'

type Props = TouchableOpacityProps & {
  title: string
  isInDiet: boolean
  timeInMinutes: number
}

export function MealCard({ title, isInDiet, timeInMinutes, ...rest }: Props) {
  const time = timeInMinutesToString(timeInMinutes)

  return (
    <TouchableOpacity
      className="flex-row justify-between items-center py-3.5 px-3 border border-gray-500 rounded-md mb-2 "
      activeOpacity={0.5}
      {...rest}
    >
      <Text
        className="pr-3 border-r border-gray-400 mr-3 text-xs text-gray-100 
        font-nunito_bold"
      >
        {time}
      </Text>
      <Text className="text-md flex-1 font-nunito_regular text-gray-200">
        {title}
      </Text>
      <View
        className={clsx('rounded-full w-3.5 h-3.5', {
          'bg-green-mid': isInDiet,
          'bg-red-mid': !isInDiet,
        })}
      />
    </TouchableOpacity>
  )
}
