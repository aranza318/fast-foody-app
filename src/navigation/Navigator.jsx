import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import {CategoriesScreens, ProductScreen, ProductsSceens} from '../screens'
import Header from "../components/Header"

const Stack = createNativeStackNavigator()

const Navigator = () => {
  return (
    
        <Stack.Navigator 
            screenOptions={{
                header: ({route})=> <Header subtitle={route.name}/>
            }}>
            <Stack.Screen name= "Categorias" component={CategoriesScreens} />
            <Stack.Screen name= "Productos" component={ProductsSceens} />
            <Stack.Screen name= "Producto" component={ProductScreen} />
        </Stack.Navigator>
    
  )
}

export default Navigator

