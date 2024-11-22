import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {CategoriesScreens, ProductScreen, ProductsSceens, SingupScreen} from '../screens'
import Headers from "../components/Headers"

const Stack = createNativeStackNavigator()

const Navigator = () => {
  return (
    
        <Stack.Navigator 
            screenOptions={{
                header: ({route})=> <Headers subtitle={route.name}/>
            }}>
            <Stack.Screen name= "Categorias" component={CategoriesScreens} />
            <Stack.Screen name= "Productos" component={ProductsSceens} />
            <Stack.Screen name= "Producto" component={ProductScreen} />
            <Stack.Screen name= "Redireccion" component={SingupScreen} />
        </Stack.Navigator>
    
  )
}

export default Navigator

