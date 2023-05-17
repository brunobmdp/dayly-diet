import { View, Text } from 'react-native'
import Button from './Button'

type Props = {
  title: string
  onPressPositive: () => void
  onPressNegative: () => void
}

export default function Alert({
  title,
  onPressPositive,
  onPressNegative,
}: Props) {
  return (
    <View className="h-full w-full bg-gray-100/70 absolute px-6 z-10 justify-center items-center">
      <View className="px-6 pt-10 pb-6 bg-gray-700 space-y-8 rounded-lg ">
        <Text className="text-lg font-nunito_bold text-gray-100 text-center">
          {title}
        </Text>
        <View className="flex-row space-x-3 justify-center items-center">
          <Button
            title="Cancelar"
            buttonStyle="secondary"
            onPress={onPressNegative}
          />
          <Button
            title="Sim, excluir"
            buttonStyle="primary"
            onPress={onPressPositive}
          />
        </View>
      </View>
    </View>
  )
}
