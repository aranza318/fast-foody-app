import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginScreen, SingupScreen} from '../screens'

const Stack = createNativeStackNavigator()

const AuthNavigator = () =>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
           <Stack.Screen name="Login" component={LoginScreen}/> 
           <Stack.Screen name="Signup" component={SingupScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator