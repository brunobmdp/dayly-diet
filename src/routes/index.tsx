import { View } from 'react-native'
import AppRoutes from './app.routes'
import { NavigationContainer } from '@react-navigation/native'

export function Routes() {
  return (
    <View className="flex-1 bg-gray-700">
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}
