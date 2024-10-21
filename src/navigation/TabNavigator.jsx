import { createBottomTabNavigator } from "@react-navigation/bottom-tabs" 
import { NavigationContainer } from "@react-navigation/native"
import CartNavigator from "./CartNavigator"
import Navigator from "./Navigator"
import ReceiptsNavigator from "./ReceiptsNavigator"
import { colors } from "../global/colors"
import Icon from 'react-native-vector-icons/MaterialIcons'
import { StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    
    <NavigationContainer >
        <Tab.Navigator 
        initialRouteName="Shop"
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 90,
                paddingHorizontal: 5,
                paddingTop: 0,
                backgroundColor:  colors.blue,
                borderTopWidth: 0,
            }
        }}
        >
            <Tab.Screen 
            name="Shop" 
            component={Navigator} 
            options={{
                tabBarIcon: ({focused})=>(<Icon name="storefront" size={32} color={focused?colors.cyan:colors.mediumGrey} />)
            }}/>
            <Tab.Screen 
            name="Cart" 
            component={CartNavigator} 
            options={{
                tabBarIcon: ({focused})=>(<Icon name="shopping-cart" size={32} color={focused?colors.cyan:colors.mediumGrey} />)
            }}/>
            <Tab.Screen 
            name="Receipts" 
            component={ReceiptsNavigator} 
            options={{
                tabBarIcon: ({focused})=>(<Icon name="receipt-long" size={32} color={focused?colors.cyan:colors.mediumGrey} />)
            }}/>
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
    
})