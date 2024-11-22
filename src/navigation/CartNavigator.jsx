import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";
import Headers from "../components/Headers";

const CartStack = createNativeStackNavigator();

const CartNavigator = () => {
  return (
    <CartStack.Navigator
      screenOptions={{
        header: ({ route }) => <Headers subtitle={route.name} />,
      }}
    >
      <CartStack.Screen component={CartScreen} name="Carrito" />
    </CartStack.Navigator>
  );
};

export default CartNavigator;
