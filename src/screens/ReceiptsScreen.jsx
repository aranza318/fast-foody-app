import { StyleSheet, Text, FlatList } from 'react-native'
import FlatCard from '../components/FlatCard'
import receipts from '../data/receipts.json'
import { colors } from '../global/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { LinearGradient } from 'expo-linear-gradient'
import MyTypoText from '../components/MyTypoText'

const ReceiptsScreen = () => {
  const renderReceiptItem = ({item})=>{
    let total = item.items.reduce((acumulador, item) => (acumulador += item.quantity * item.price),0)  
    dateOptions ={
      year: 'numeric',
      month:'2-digit',
      day:'2-digit',
      hour:'2-digit',
      minute:'2-digit',
      hour12: false
    };

    return(
      <FlatCard style={styles.receiptContainer}>
         <MyTypoText style={styles.title}>Recibo numero: {item.id}</MyTypoText>
         <MyTypoText style={styles.date}>Creado el {new Date(item.createdAt).toLocaleString('es-Ar', dateOptions)} Hs.</MyTypoText>
         <MyTypoText style={styles.total}>Total  ${total}</MyTypoText>
         <Icon name="visibility" size={24} color={colors.darkGrey} style = {styles.viewIcon} />
      </FlatCard>
    )
  }
  return (
    <LinearGradient style={styles.try} colors={["#00cbf9","#090979"]} start={{x:0, y:0}} end={{x:1, y:1}}>
    <FlatList
      data={receipts}
      keyExtractor={item => item.id}
      renderItem= {renderReceiptItem} 
    />
    </LinearGradient>
  )
}

export default ReceiptsScreen

const styles = StyleSheet.create({
  receiptContainer:{
    padding:20,
    justifyContent:"flex-start",
    margin:16,
    gap:10,
  },
  title:{
    fontWeight:'700',
    color: colors.white,
    fontSize:19
  },
  total:{
    fontSize:27,
    fontWeight:'700',
    color: colors.white
  },
  viewIcon:{
    alignSelf:'flex-end',
    color: colors.white
  },
  date:{
    color: colors.white,
    fontSize: 16
  }
})