import { FlatList, StyleSheet, View, Image, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'
import FlatCard from '../components/FlatCard'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { LinearGradient } from 'expo-linear-gradient'
import MyTypoText from '../components/MyTypoText'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, clearCart } from '../features/cart/cartSlice'
import { useGetProductInCartQuery } from '../services/shopService'
import { usePostReceiptMutation } from '../services/receiptsServices'
import { useState, useEffect } from 'react'
import FinalCartModal from '../components/FinalCartModal';


const CartScreen = ({ navigation }) => {
    const cart = useSelector((state) => state.cartSlice.value.cartItems);
    const total = useSelector((state) => state.cartSlice.value.total);
    const user = useSelector((state) => state.authSlice.value.email);
    const addresses = useSelector((state) => state.shopSlice.value.places); // Direcciones del usuario desde Redux
    const [modalVisible, setModalVisible] = useState(false);
    const [triggerPost] = usePostReceiptMutation();
    const dispatch = useDispatch();
  
    const productInCart = useSelector((state) => state.shopSlice.value.productInCart);
    const { data: productFound, error, isLoading } = useGetProductInCartQuery(productInCart);
  
    // Manejo de la carga de productos
    const renderCartItem = ({ item }) => {
      // Buscar el producto en productFound
      const productDetail = productFound?.find((product) => product.id === item.id) || item;
  
      // Si no se encuentra el producto, puede que sea necesario un valor predeterminado
      return (
        <FlatCard style={styles.cartContainer}>
          <View>
            <Image
              source={{ uri: productDetail.mainImage || item.mainImage }}
              style={styles.cartImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.cartDescription}>
            <MyTypoText style={styles.title}>{productDetail.title || item.title}</MyTypoText>
            <MyTypoText style={styles.description}>
              {productDetail.shortDescription || item.shortDescription}
            </MyTypoText>
            <MyTypoText style={styles.price}>Precio: $ {productDetail.price || item.price}</MyTypoText>
            <MyTypoText style={styles.price}>Cantidad: {item.quantity}</MyTypoText>
            <MyTypoText style={styles.total}>
              Total: $ {(item.quantity * (productDetail.price || item.price)).toFixed(2)}
            </MyTypoText>
  
            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, styles.deleteFromCartButton]}
              onPress={() => dispatch(removeItem(item))}
            >
              <Icon name="delete-outline" size={24} color="red" style={styles.trashIcon} />
            </Pressable>
          </View>
        </FlatCard>
      );
    };
  
    const FooterComponent = () => (
      <View style={styles.footerContainer}>
        <MyTypoText style={styles.footerTotal}>Total: $ {total.toFixed(2)}</MyTypoText>
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, styles.confirmButton]}
          onPress={() => {
            if (!cart.length) {
              Alert.alert('Error', 'El carrito está vacío.');
              return;
            }
            setModalVisible(true);
          }}
        >
          <MyTypoText style={styles.textConfirm}> Confirmar mi pedido </MyTypoText>
        </Pressable>
      </View>
    );
  
    return (
      <LinearGradient
        style={styles.try}
        colors={['#00cbf9', '#090979']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {cart.length > 0 ? (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<MyTypoText style={styles.cartScreenTitle}>Tu carrito:</MyTypoText>}
            ListFooterComponent={<FooterComponent />}
          />
        ) : (
          <View style={styles.cartEmpty}>
            <MyTypoText style={styles.cartEmptyText}>Aún no hay productos en el carrito</MyTypoText>
          </View>
        )}
  
        {/* Modal para confirmar el pedido */}
        <FinalCartModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          addresses={addresses}
          cart={cart}
          total={total || 0}
          onConfirm={({ deliveryOption, address, total: finalTotal }) => {
            triggerPost({
              cart,
              user,
              total: finalTotal,
              deliveryOption,
              address: address?.id || null,
              createdAt: Date.now(),
            });
            dispatch(clearCart());
            setModalVisible(false);
            navigation.navigate('Receipts');
          }}
        />
      </LinearGradient>
    );
  };
  
  export default CartScreen;  

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
    try:{
        height: 605,
    },
    cartEmpty:{
        alignContent: "center"
    },
    cartEmptyText:{
        textAlign: "center",
        marginTop: 23,
        fontSize: 23,
        color: colors.white,
        textDecorationLine: "underline"
    }
})