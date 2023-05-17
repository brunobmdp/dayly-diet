import { View, ActivityIndicator } from 'react-native'
import theme from '@theme/index'

export function Loading() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator color={theme.colors.gray[100]} size="large" />
    </View>
  )
}
