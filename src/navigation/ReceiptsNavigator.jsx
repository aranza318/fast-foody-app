import { createNativeStackNavigator } from '@react-navigation/native-stack' 
import ReceiptsScreen from '../screens/ReceiptsScreen'
import Headers from '../components/Headers'

const Stack = createNativeStackNavigator();

const ReceiptsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({route}) => <Headers subtitle={route.name}/>
      }}
    >
       <Stack.Screen component={ReceiptsScreen} name="Recibos" />
    </Stack.Navigator>   
  )
}

export default ReceiptsNavigator

