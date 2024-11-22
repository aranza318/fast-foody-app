import { createNativeStackNavigator } from '@react-navigation/native-stack' 
import MyPlacesScreens from '../screens/MyPlacesScreens';
import Headers from '../components/Headers'

const Stack = createNativeStackNavigator();

const MyPlacesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({route}) => <Headers subtitle={route.name}/>
      }}
    >
       <Stack.Screen component={MyPlacesScreens} name="Mi ubicacion" />
    </Stack.Navigator>   
  )
}

export default MyPlacesNavigator