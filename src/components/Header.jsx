import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'
import MyTypoText from './MyTypoText';
import { LinearGradient } from 'expo-linear-gradient';

const Header = ({subtitle}) => {

  return (
    <LinearGradient style={styles.try} colors={["#090979", "#00cbf9"]} start={{x:0, y:0}} end={{x:0, y:1}}>
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Fast Foody</Text>
      <MyTypoText style={styles.subtitle}>{subtitle}</MyTypoText>
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