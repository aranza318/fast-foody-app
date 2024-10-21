import { StyleSheet, TextInput } from 'react-native'
import { colors } from '../global/colors'

const Search = ({setSearchTitle}) => {
  return (
    <TextInput 
    placeholder='Buscá acá las piezas para tu proximo menú'
    onChangeText={(text)=>setSearchTitle(text)}
    style={styles.searchInput}
    />
  )
}

export default Search

const styles = StyleSheet.create({
    searchInput:{
        margin:5,
        borderWidth:1,
        borderColor: colors.pink,
        borderRadius:15,
        padding:5,
        paddingLeft:10,
        backgroundColor: colors.white
    }
})