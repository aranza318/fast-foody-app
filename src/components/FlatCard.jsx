import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'

const FlatCard = ({children,style}) => {
  return (
    <View style={{...styles.cardContainer, ...style}}>
      {children}
    </View>
  )
}

export default FlatCard

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'transparent',
        borderColor: colors.pink,
        borderWidth: 1,
        borderRadius: 5,
        shadowColor: colors.black,
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: {width: 3, height:5},
        elevation: 10,
        color: colors.white,
    }
})