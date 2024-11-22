import { StyleSheet, Text, View,Pressable } from 'react-native'
import { colors } from '../global/colors'
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../features/auth/authSlice'
import { clearSessions } from '../db'
import MyTypoText from './MyTypoText';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import ShowToast from './ShowToast'

const Header = ({subtitle}) => {
  const user = useSelector(state=>state.authSlice.value.email)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(clearUser());
    clearSessions()
      .then(() => {
        ShowToast("success", "Cerraste sesión");
      })
      .catch((error) => {
        ShowToast("error", "Error al eliminar la sesión", error.message || "No se pudo eliminar la sesión.");
      });
  };

  return (
    <LinearGradient style={styles.try} colors={["#090979", "#00cbf9"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Fast Foody</Text>
      <MyTypoText style={styles.subtitle}>{subtitle}</MyTypoText>
      {
        user &&  <Pressable onPress={onLogout} style={styles.access}><Icon name="logout" size={16} color="#fff" /></Pressable>
      }
    </View>
    </LinearGradient>
  )
}

export default Header

const styles = StyleSheet.create({
    headerContainer:{
        height:150,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
      fontSize:39,
      fontFamily:'Pacifico',
      color: colors.white,
      marginTop:19,
      textShadowColor: colors.pink,
      textShadowOffset: { width: 2, height: 3 },
      textShadowRadius: 2,
    },
    subtitle: {
      fontSize:22,
      color:colors.white,
      fontWeight:700
    }
})