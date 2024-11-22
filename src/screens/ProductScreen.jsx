import { StyleSheet, View, Pressable, useWindowDimensions, Image, ScrollView, ActivityIndicator, Alert} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../global/colors";
import { LinearGradient } from "expo-linear-gradient";
import MyTypoText from "../components/MyTypoText";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { useGetProductQuery } from "../services/shopService";
import { clearUser } from '../features/auth/authSlice';
import { clearSessions } from '../db';
import Toast from "react-native-toast-message";
import ShowToast from "../components/ShowToast";

const ProductScreen = ({ navigation }) => {
  const productId = useSelector((state) => state.shopSlice.value.productId);
  const userEmail = useSelector((state) => state.authSlice.value.email); // Obtener el email del usuario
  const { width, height } = useWindowDimensions();

  const { data: productFound, error, isLoading } = useGetProductQuery(productId);
  const dispatch = useDispatch();
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
  const handleAddToCart = () => {
    if (userEmail === "demo@fastfoody.com") {
      // Si el usuario es invitado, redirigir al login
      Alert.alert(
        "Registro requerido",
        "Debes registrarte para agregar productos a tu pedido.",
        [
          {
            text: "Ir al inicio",
            onPress: () => {onLogout()}, // Ajusta según tu configuración
          },
          {
            text: "Cancelar",
            style: "cancel",
          },
        ]
      );
      return;
    }

    // Lógica para calcular precio y agregar al carrito
    const hasDiscount = productFound.discount && productFound.discount > 0;
    const finalPrice = hasDiscount
      ? productFound.price - productFound.price * (productFound.discount / 100)
      : productFound.price;

    dispatch(
      addItem({
        ...productFound,
        price: finalPrice,
        quantity: 1,
      })
    );

    Alert.alert("Producto agregado", "El producto se ha añadido a tu pedido", [
      { text: "OK" },
    ]);
  };

  return (
    <LinearGradient style={styles.try} colors={["#00cbf9", "#090979"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.white} />
      ) : error ? (
        <MyTypoText>Error al cargar</MyTypoText>
      ) : (
        <ScrollView style={styles.productContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon style={styles.goBack} name="arrow-back" color={colors.pink} size={24} />
          </Pressable>
          <MyTypoText style={styles.textBrand}>{productFound.brand}</MyTypoText>
          <MyTypoText style={styles.textTitle}>
            {productFound.title}
          </MyTypoText>
          <Image
            source={{ uri: productFound.mainImage }}
            alt={productFound.title}
            width="100%"
            height={width * 0.7}
            resizeMode="contain"
          />
          <MyTypoText style={styles.longDescription}>
            {productFound.longDescription}
          </MyTypoText>
          <View style={styles.tagsContainer}>
            <View style={styles.tags}>
              <MyTypoText style={styles.tagText}>Tags : </MyTypoText>
              {productFound.tags?.map((tag) => (
                <MyTypoText key={Math.random()} style={styles.tagText}>
                  {tag}
                </MyTypoText>
              ))}
            </View>
            {productFound.discount > 0 && (
              <View style={styles.discount}>
                <MyTypoText style={styles.discountText}>
                  🔥- {productFound.discount} %🔥
                </MyTypoText>
              </View>
            )}
          </View>
          {productFound.stock <= 0 && (
            <MyTypoText style={styles.nonStockText}>Sin Stock</MyTypoText>
          )}
          <MyTypoText style={styles.price1}>
            Precio: $ {productFound.price}
          </MyTypoText>
          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.95 : 1 },
              styles.addToCartButton,
            ]}
            onPress={handleAddToCart}
          >
            <MyTypoText style={styles.textAddToCart}>
              Agregar a mi pedido
            </MyTypoText>
          </Pressable>
        </ScrollView>
      )}
    </LinearGradient>
  );
};

export default ProductScreen;


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
    },
    try:{
      height: 605,
    }
})