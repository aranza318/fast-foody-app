import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

import CartNavigator from "./CartNavigator";
import Navigator from "./Navigator";
import ReceiptsNavigator from "./ReceiptsNavigator";
import { colors } from "../global/colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from "react-native";
import ProfileNavigator from "./ProfileNavigator";
import MyPlacesNavigator from "./MyPlacesNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const user = useSelector((state) => state.authSlice.value.email);

  return (
    <Tab.Navigator
      initialRouteName="Shop"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: colors.blue,
          borderTopWidth: 0,
        },
      }}
    >
      {/* Pantalla siempre accesible */}
      <Tab.Screen
        name="Shop"
        component={Navigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="fastfood"
              size={32}
              color={focused ? colors.cyan : colors.mediumGrey}
            />
          ),
        }}
      />

      {/* Pantallas restringidas para usuarios demo */}
      {user !== "demo@fastfoody.com" && (
        <>
          <Tab.Screen
            name="Cart"
            component={CartNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="shopping-cart"
                  size={32}
                  color={focused ? colors.cyan : colors.mediumGrey}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Receipts"
            component={ReceiptsNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="receipt"
                  size={32}
                  color={focused ? colors.cyan : colors.mediumGrey}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="account-circle"
                  size={32}
                  color={focused ? colors.cyan : colors.mediumGrey}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Places"
            component={MyPlacesNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="location-on"
                  size={32}
                  color={focused ? colors.cyan : colors.mediumGrey}
                />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
    
})