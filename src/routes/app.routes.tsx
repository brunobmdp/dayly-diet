import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Feedback } from '@screens/Feedback'
import { Home } from '@screens/Home'
import { Meal } from '@screens/Meal'
import { MealForm } from '@screens/MealForm'
import { Statistics } from '@screens/Statistics'

const { Navigator, Screen } = createNativeStackNavigator()

export default function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="feedback" component={Feedback} />
      <Screen name="meal" component={Meal} />
      <Screen name="form" component={MealForm} />
      <Screen name="statistics" component={Statistics} />
    </Navigator>
  )
}
