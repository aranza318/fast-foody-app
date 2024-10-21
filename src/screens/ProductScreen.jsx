import { StyleSheet, Text, View, Pressable, FlatList, useWindowDimensions, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../global/colors'
import { useEffect, useState } from 'react'
import products from '../data/products.json'
import { LinearGradient } from 'expo-linear-gradient'
import MyTypoText from '../components/MyTypoText'

const ProductScreen = ({route, navigation}) => {
    const [productFound, setProductFound]=useState({})
    const productId = route.params
    const { width, height } = useWindowDimensions()
    useEffect(()=>{
        setProductFound(products.find(product=>product.id===productId))
    }, [productId])
    return (
      <LinearGradient style={styles.try} colors={["#00cbf9","#090979"]} start={{x:0, y:0}} end={{x:1, y:1}}>
    <ScrollView style={styles.productContainer}>
      <Pressable onPress={()=>navigation.goBack()}><Icon style={styles.goBack} name="arrow-back" color={colors.pink} size={24}/></Pressable>  
      <MyTypoText style={styles.textBrand}>{productFound.brand}</MyTypoText>
      <MyTypoText style={styles.textTitle}>{productFound.title}</MyTypoText>
      <Image 
         source = {{uri: productFound.mainImage}}
         alt = {productFound.title}
         width = '100%'
         height = {width * .7}
         resizeMode = 'contain'
      />
      <MyTypoText style={styles.longDescription}>{productFound.longDescription}</MyTypoText>
      <View style={styles.tagsContainer}>
        <View style={styles.tags}>
        <MyTypoText style={styles.tagText}>Tags : </MyTypoText>
        {
         productFound.tags?.map(tag => <MyTypoText key={Math.random()} style={styles.tagText}>{tag}</MyTypoText>) 
        }
        </View>
        {
          productFound.discount > 0 && <View style={styles.discount}><MyTypoText style={styles.discountText}>🔥- {productFound.discount} %🔥</MyTypoText></View>
        }
      </View>
      {
        productFound.stock <= 0 && <MyTypoText style={styles.nonStockText}>Sin Stock</MyTypoText>
      }
      <MyTypoText style={styles.price1}>Precio: $ {productFound.price}</MyTypoText>
      <Pressable style={({pressed})=>[{opacity:pressed ? 0.95 : 1}, styles.addToCartButton]} onPress={null}>
      <MyTypoText style={styles.textAddToCart}> Agregar a mi pedido </MyTypoText>
      </Pressable>
    </ScrollView>
    </LinearGradient>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
    goBack:{
        padding: 9,
    },
    productContainer:{
      paddingHorizontal:16
    },
    textBrand:{
      color:colors.white
    },
    textTitle:{
      fontSize:28,
      fontWeight:'700',
      color:colors.white
    },
    longDescription:{
      fontSize:19,
      textAlign:'justify',
      paddingVertical:8,
      color:colors.white
    },
    tagsContainer:{
      flexDirection:'row',
      gap: 5,
      justifyContent:'space-between',
      alignItems:'center',
      marginVertical:8
    },
    tags:{
      flexDirection:'row',
      gap:5,
    },
    tagText:{
      fontWeight:'600',
      fontSize:14,
      color:colors.yellow
    },
    price1:{
      fontWeight:'500',
      fontSize: 36,
      alignSelf: 'center',
      padding: 9,
      color:colors.white
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
      color: colors.white,
      textAlign:'center',
      verticalAlign:'center',
      fontSize: 18,
    },
    nonStockText:{
      color:'red'
    },
    price:{
      fontSize:24,
      fontWeight:'700',
      alignSelf:'center',
      paddingVertical:16
    },
    addToCartButton:{
      padding:8,
      paddingHorizontal:16,
      backgroundColor:colors.pink,
      borderWidth: 3,
      borderColor: colors.white,
      borderRadius:16,
      marginVertical:16
    },
    textAddToCart:{
      color:colors.white,
      fontSize:24,
      textAlign:'center'
    }
})