import { FlatList, StyleSheet, Text, View, Image,Pressable } from 'react-native'
import React from 'react'
import cart from '../data/cart.json'
import { colors } from '../global/colors'
import FlatCard from '../components/FlatCard'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import MyTypoText from '../components/MyTypoText'

const CartScreen = () => {
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        setTotal(cart.reduce((acumulador, item)=>(acumulador+=item.price*item.quantity),0))
    },[cart])

    const FooterComponent = () => (
        <View style={styles.footerContainer}>
            <MyTypoText style={styles.footerTotal}>Total: $ {total} </MyTypoText>
            <Pressable style={({pressed})=>[{opacity:pressed ? 0.95 : 1}, styles.confirmButton]} onPress={null}>
               <MyTypoText style={styles.textConfirm}> Confirmar mi pedido </MyTypoText>
            </Pressable>
        </View>
    )

    const renderCartItem = ({ item }) => (
        <FlatCard style={styles.cartContainer}>
            <View>
                <Image
                    source={{ uri: item.mainImage }}
                    style={styles.cartImage}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.cartDescription}>
                <MyTypoText style={styles.title}>{item.title}</MyTypoText>
                <MyTypoText style={styles.description}>{item.shortDescription}</MyTypoText>
                <MyTypoText style={styles.price}>Precio: $ {item.price}</MyTypoText>
                <MyTypoText style={styles.price}>Cantidad: {item.quantity}</MyTypoText>
                
                <MyTypoText style={styles.total}>Total: $ {item.quantity * item.price}</MyTypoText>
                <Icon name="delete-outline" size={24} color="red" style={styles.trashIcon} />
            </View>
        </FlatCard>
    )

    return (
        <LinearGradient style={styles.try} colors={["#00cbf9","#090979"]} start={{x:0, y:0}} end={{x:1, y:1}}>
        <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<MyTypoText style={styles.cartScreenTitle}>Tu carrito:</MyTypoText>}
            ListFooterComponent={<FooterComponent />}
        />
        </ LinearGradient>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: "flex-start",
        margin: 16,
        alignItems: "center",
        gap: 10
    },
    cartImage: {
        width: 80,
        height: 80
    },
    cartDescription: {
        width: '80%',
        padding: 20,
    },
    title: {
        fontSize: 21,
        fontWeight: '700',
        color: colors.white
    },
    description: {
        marginBottom: 16,
        fontSize: 18,
        color: colors.white
    },
    total: {
        marginTop: 16,
        fontSize: 19,
        fontWeight: '700',
        color: colors.white
    },
    trashIcon: {
        alignSelf: 'flex-end',
        marginRight: 16,
    },
    footerContainer: {
        padding: 32,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTotal: {
        fontSize: 16,
        fontWeight: '700',
        fontSize: 21,
        color: colors.white
    },
    confirmButton: {
      padding:8,
      paddingHorizontal:16,
      backgroundColor:colors.pink,
      borderWidth: 3,
      borderColor: colors.white,
      borderRadius:16,
      marginVertical:16
    },
    textConfirm: {
        color: colors.white,
        fontSize: 25,
        fontWeight: '700'
    }, 
    cartScreenTitle: {
        fontSize: 21,
        fontWeight: '700',
        textAlign: "center",
        paddingVertical: 8,
        color: colors.white
    }, 
    price:{
        fontSize: 17,
        color: colors.white
    },

})