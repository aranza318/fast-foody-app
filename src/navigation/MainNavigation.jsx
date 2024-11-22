import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";
import Toast from 'react-native-toast-message';
import { fetchSession } from "../db";
import { setUser } from "../features/auth/authSlice";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const user = useSelector((state) => state.authSlice.value.email);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      (async () => {
        try {
          const session = await fetchSession();
          if (session.length) {
            dispatch(setUser(session[0]));
          }
        } catch (error) {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error al obtener la sesión',
            text2: error.message || 'Hubo un problema al intentar cargar tu sesión.',
            visibilityTime: 3000, 
          });
        }
      })();
    }
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          user === "demo@fastfoody.com" ? (
            <>
              {/* Solo acceso limitado para demo */}
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
            </>
          ) : (
            <>
              {/* Acceso completo para usuarios registrados */}
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
            </>
          )
        ) : (
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
