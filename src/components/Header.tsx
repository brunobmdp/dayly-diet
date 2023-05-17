import clsx from 'clsx'
import { ArrowLeft } from 'phosphor-react-native'
import { View, Text, TouchableOpacity } from 'react-native'
import theme from '@theme/index'
import { useNavigation } from '@react-navigation/native'

type Props = {
  colorStyle?: 'gray' | 'green' | 'red'
  size?: 'small' | 'large'
  title: string
  subtitle?: string
}

export function Header({
  colorStyle = 'gray',
  size = 'small',
  title,
  subtitle,
}: Props) {
  const { navigate } = useNavigation()

  function handleBackButton() {
    navigate('home')
  }

  return (
    <View
      className={clsx(
        'bg-gray-500 h-[132] justify-center items-center relative',
        {
          'bg-green-light': colorStyle === 'green',
          'bg-red-light': colorStyle === 'red',
          'h-[200]': size === 'large',
        },
      )}
    >
      <Text
        className={clsx('font-nunito_bold text-lg text-gray-100', {
          'text-xxl': size === 'large',
        })}
      >
        {title}
      </Text>
      {!!subtitle && (
        <Text className="font-nunito_regular text-sm text-gray-200">
          {subtitle}
        </Text>
      )}
      <TouchableOpacity
        className="absolute top-14 left-6"
        activeOpacity={0.5}
        onPress={handleBackButton}
      >
        <ArrowLeft
          size={24}
          color={clsx({
            [theme.colors.gray[200]]: colorStyle === 'gray',
            [theme.colors.green.dark]: colorStyle === 'green',
            [theme.colors.red.dark]: colorStyle === 'red',
          })}
        />
      </TouchableOpacity>
    </View>
  )
}
