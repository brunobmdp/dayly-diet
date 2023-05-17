import clsx from 'clsx'
import { View, Text, ViewProps } from 'react-native'

type Props = ViewProps & {
  bgColor?: 'gray' | 'red' | 'green'
  title: string
  subtitle: string
}

export function StatisticCard({
  subtitle,
  title,
  bgColor = 'gray',
  ...rest
}: Props) {
  return (
    <View
      className={clsx(
        'p-4 bg-gray-600 rounded-lg justify-center items-center',
        {
          'bg-green-light': bgColor === 'green',
          'bg-red-light': bgColor === 'red',
        },
      )}
      {...rest}
    >
      <Text className="text-gray-100 text-xl font-nunito_bold">{title}</Text>
      <Text className="mt-2 text-gray-200 text-center text-sm font-nunito_regular">
        {subtitle}
      </Text>
    </View>
  )
}
