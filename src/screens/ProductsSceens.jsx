import {useEffect, useState} from 'react'
import { FlatList, StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import FlatCard from '../components/FlatCard'
import { colors } from '../global/colors'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Search from '../components/Search'
import { LinearGradient } from 'expo-linear-gradient'
import MyTypoText from '../components/MyTypoText'
import { useSelector, useDispatch } from 'react-redux'
import { setProductId } from '../features/shop/shopSlice'
import { useGetProductsByCategoryQuery } from '../services/shopService';

const ProductsSceens = ({navigation, route}) => {
  const [productsFiltered, setProductsFiltered]=useState([])
  const [searchTitle, setSearchTitle]= useState("")
  const category = useSelector(state => state.shopSlice.value.categorySelected)


  const {data: productsFilteredByCategory, error, isLoading} = useGetProductsByCategoryQuery(category)
  
  const dispatch = useDispatch()

  useEffect(()=>{
    setProductsFiltered(productsFilteredByCategory)
    if(searchTitle){
      setProductsFiltered(productsFilteredByCategory.filter(product=>product.title.toLowerCase().includes(searchTitle.toLowerCase())))
    }
  },[searchTitle, productsFilteredByCategory])

  const renderProductsItem = ({item}) =>{
    return(
      
      <Pressable onPress={
        ()=> {
          dispatch(setProductId(item.id))
          navigation.navigate("Producto")
      }}>
      <FlatCard style={styles.productsContainer}>
        <View>
          <Image
              source= {{uri:item.mainImage}}
              style={styles.productImage}
              resizeMode="contain" 
          />
        </View>
        <View style={styles.productDescription}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.shortDescription}>{item.shortDescription}</Text>
          <View style={styles.tags}>
            <Text style={styles.tagText}>Tags : </Text>
            {
              <FlatList 
                  style={styles.tags}
                  data={item.tags}
                  keyExtractor={()=>Math.random()}
                  renderItem={({item})=>(<Text style={styles.tagText}>{item}</Text>)}
              />
            }
          </View>
          {
            item.discount>0 && <View style={styles.discount}><Text style={styles.discountText}>🔥 Descuento: {item.discount} % 🔥</Text></View>
          }
          {
            item.stock <= 0 && <Text style={styles.nonStockText}>Sin Stock</Text>
          }
          <MyTypoText style={styles.price}>Precio: $ {item.price}</MyTypoText>
        </View>
      </FlatCard>
      </Pressable>
    )
  }
  return (
    <LinearGradient style={styles.try} colors={["#00cbf9","#090979"]} start={{x:0, y:0}} end={{x:1, y:1}}>
    {
                isLoading
                    ?
                    <ActivityIndicator size="large" color={colors.white} />
                    :
                    error
                        ?
                        <Text>Error al cargar</Text>
                        :
                        <LinearGradient style={styles.try} colors={["#00cbf9","#090979"]} start={{x:0, y:0}} end={{x:1, y:1}}>
                        <View style= {styles.flat}>  
                            <Pressable onPress={() => navigation.goBack()}><Icon style={styles.goBack} name="arrow-back" size={24} /></Pressable>
                            <Search setSearchTitle={setSearchTitle} />
                              <FlatList
                                data={productsFiltered}
                                keyExtractor={item => item.id}
                                renderItem={renderProductsItem}     
                            />
                            
                        </View>
                        </LinearGradient>
            }
    </LinearGradient>
  )
}

export default ProductsSceens

const styles = StyleSheet.create({
  productsContainer:{
    flexDirection:'row',
    padding:20,
    paddingBottom:39,
    paddingEnd: 2,
    justifyContent:"flex-start",
    margin: 10,
    marginBottom: 8,
    alignItems: "center",
    gap: 10
  },
  productImage:{
    width:100,
    height:100,
  },
  productDescription:{
    width: "80%",
    padding: 20,
    gap: 10
  },
  productTitle:{
    fontFamily: 'AfacadFlux',
    fontWeight: '900',
    fontSize: 20,
    color: colors.white,
    width: 200
  },
  shortDescription:{
    color:colors.white,
    width: 198
  },
  tags:{
    flexDirection: 'row',
    gap: 5
  },
  tagText: {
    fontWeight: '600',
    fontSize:12,
    color: colors.yellow
  },
  price:{
    fontWeight: '800',
    fontSize: 18,
    color: colors.white
  },
  discount:{
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 12,
    borderColor: colors.green,
    borderWidth:  2,
    alignSelf: 'flex-start'
  },
  discountText:{
    color: colors.white
  },
  nonStockText:{
    color: 'red'
  }, 
  goBack:{
    padding:10,
    color: colors.pink
  },
  flat:{
    height: 605,
  },
  try:{
    height: 605,
  }
})