import { StyleSheet, Text } from 'react-native'


const MyTypoText = ({children, style}) => {
  return (
    
      <Text style={{...styles.textAF,...style}}>{children}</Text>
    
  )
}

export default MyTypoText

const styles = StyleSheet.create({
    textAF:{
        fontFamily:'AfacadFlux'
    }
})