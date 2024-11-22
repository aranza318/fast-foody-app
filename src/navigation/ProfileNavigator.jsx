import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import Headers from "../components/Headers";

const Stack = createNativeStackNavigator()

const ProfileNavigator =()=>(
    <Stack.Navigator
    screenOptions={{
        header: ({ route }) => <Headers subtitle={route.name} />,
      }}>
        <Stack.Screen name="Perfil" component={ProfileScreen}/>
    </Stack.Navigator>
)

export default ProfileNavigator