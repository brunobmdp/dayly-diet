import { Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'

import clsx from 'clsx'

import Button from '@components/Button'

import positiveFeedback from '@assets/positiveFeedback.png'
import negativeFeedback from '@assets/negativeFeedback.png'

type RouteParams = {
  isInDiet: boolean
}

export function Feedback() {
  const { navigate } = useNavigation()

  const route = useRoute()
  const { isInDiet } = route.params as RouteParams

  const title = isInDiet ? 'Continue assim!' : 'Que pena!'
  const subtitle = isInDiet
    ? 'Você continua dentro da dieta. Muito bem!'
    : 'Você saiu da dieta dessa vez, mas continue se esforçando e não desista!'

  const feedbackImage = isInDiet ? positiveFeedback : negativeFeedback

  function handleBackHomeButton() {
    navigate('home')
  }

  return (
    <SafeAreaView className="flex-1 p-8 justify-center items-center">
      <Text
        className={clsx('text-xl text-center font-nunito_bold mb-2', {
          'text-green-dark': isInDiet,
          'text-red-dark': !isInDiet,
        })}
      >
        {title}
      </Text>
      <Text className="text-md text-center font-nunito_regular mb-10">
        {subtitle}
      </Text>
      <Image className="mb-8" source={feedbackImage} alt="" />
      <Button title="Ir para a página inicial" onPress={handleBackHomeButton} />
    </SafeAreaView>
  )
}
