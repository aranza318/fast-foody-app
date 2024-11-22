import { Modal, View, Button, StyleSheet, Pressable, Alert, FlatList, ScrollView } from 'react-native';
import { colors } from '../global/colors';
import MyTypoText from './MyTypoText';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetPlacesQuery } from '../services/mapService';
import Icon from 'react-native-vector-icons/MaterialIcons';


const FinalCartModal = ({ visible, onClose, cart, total = 0, onConfirm }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState(null); // null, "withDelivery", or "noDelivery"
  const deliveryCost = 350; // Costo del delivery 

  const user = useSelector((state) => state.authSlice.value.email); 
  const { data: places = [], error, isLoading, refetch } = useGetPlacesQuery(undefined, { refetchOnMountOrArgChange: true });

  const finalTotal = deliveryOption === "withDelivery" ? total + deliveryCost : total;

  useEffect(() => {
    if (places.length > 0) {
     
      const userPlaces = places.filter((place) => place.user === user);
      if (userPlaces.length > 0) {
        setSelectedAddress(userPlaces[0]); 
      }
    }
  }, [places, user]);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>

      <View style={styles.modalContainer}>
        <View style={styles.content}>
        <View style={styles.textContainer}>
          <MyTypoText style={styles.modalTitle}>Confirma tu Pedido</MyTypoText>

          {/* Productos en el carrito */}
          <View style={styles.scrollProducts}>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.productRow}>
                <MyTypoText style={styles.txt}>{item.title} - ${item.price}</MyTypoText>
                <MyTypoText style={styles.txt}>Cantidad: {item.quantity}</MyTypoText>
              </View>
            )}
          /></View>

          {/* Selección del tipo de entrega */}
          <MyTypoText style={styles.sectionTitle}>Tipo de entrega:</MyTypoText>
            <View style={styles.deliveryOptions}>
              <Pressable
              style={[
              styles.halfButton,
              deliveryOption === "noDelivery" && styles.selectedOption,
              ]}
              onPress={() => {
              setDeliveryOption("noDelivery");
              setSelectedAddress(null); // Limpiar la dirección seleccionada
              }}
              >
                <MyTypoText style={styles.txt}>Sin delivery,        paso por el local</MyTypoText>
              </Pressable>
              <Pressable
              style={[
              styles.halfButton,
              deliveryOption === "withDelivery" && styles.selectedOption,
              ]}
              onPress={() => setDeliveryOption("withDelivery")}
              >
                <MyTypoText style={styles.txt}> Con delivery            (+${deliveryCost}) </MyTypoText>
              </Pressable>
          </View>

          {/* Selección de dirección (solo si es con delivery) */}
          {deliveryOption === "withDelivery" && (
           <>
             <MyTypoText style={styles.sectionTitle}> Selecciona una dirección:</MyTypoText>
              {isLoading ? (
                <MyTypoText>Cargando direcciones...</MyTypoText>
                ) : error ? (
                      <MyTypoText>{`Error: ${error.message}`}</MyTypoText>
                            ) : places.length === 0 ? (
                <MyTypoText style={styles.txt}> No tienes direcciones guardadas. Agrega una antes de continuar.</MyTypoText>
                ) : (
            <View style={styles.scrollContainer}>
              <FlatList
              data={places.filter((place) => place.user === user)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
             <Pressable
              onPress={() => setSelectedAddress(item)}
              style={[
                styles.addressItem,
                selectedAddress?.id === item.id && styles.selectedAddress,
              ]}
            >
              <View style={styles.addressContent}>
                <MyTypoText style={styles.txt}>{item.title}:</MyTypoText>
                <MyTypoText style={styles.txt}>{item.address}</MyTypoText>
                {selectedAddress?.id === item.id && (
                  <Icon
                    name="check"
                    size={20}
                    color="#fff"
                    style={styles.checkIcon}
                  />
                )}
              </View>
            </Pressable>
          )}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )}
  </>
)}


          {/* Total del pedido */}
          <MyTypoText style={styles.totalText}>Total: ${finalTotal.toFixed(2)}</MyTypoText>

          {/* Botones */}
          <View style={styles.modalButtons}>
            <Button title="X" onPress={onClose} style={styles.button} />
            <Pressable
              style={[
                styles.button,
                deliveryOption &&
                  (deliveryOption === "noDelivery" || selectedAddress) &&
                  styles.activeButton,
              ]}
              onPress={() => {
                if (deliveryOption === "withDelivery" && !selectedAddress) {
                  Alert.alert("Error", "Debes seleccionar una dirección para el delivery.");
                  return;
                }
                onConfirm({ deliveryOption, address: selectedAddress, total: finalTotal });
                onClose();
              }}
              disabled={
                !deliveryOption || (deliveryOption === "withDelivery" && !selectedAddress)
              }
            >
              <MyTypoText style={styles.buttonText}>Confirmar</MyTypoText>
            </Pressable>
            </View>
          </View>
        </View>
      </View>
      
    </Modal>
  );
};

export default FinalCartModal;

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: colors.blue,
        flex: 1
    },
    content:{
        marginTop: 60, 
        color: colors.white
    },
    textContainer: {
      backgroundColor: 'transparent',
      borderColor: colors.white,
      borderWidth: 1,
      borderRadius: 5,
      shadowColor: colors.pink,
      shadowOpacity: 1,
      shadowRadius: 1,
      shadowOffset: {width: 3, height:5},
      elevation: 10,
      color: colors.white,
      margin: 19,
      alignItems: "center",
    },
    modalTitle: {
        color: colors.white,
        fontSize:29,
        fontWeight: "bold",
        lineHeight: 90
    },
    button: {
        padding:30,
        flexDirection:'row',
        gap: 10,
    },
    productRow:{
      color:colors.white,
      fontSize: 19,
      alignContent: "center",
      alignSelf: "center", 
      padding:9
    },
    totalText:{
      color:colors.white,
      fontSize: 19,
      alignSelf: "center"
    },
    sectionTitle:{
      color:colors.white,
      fontSize: 19,
      marginBottom: 5,
      textDecorationLine: "underline"
    },
    txt: {
      color: colors.white,
      fontSize: 19,
      alignSelf: "center",
      marginBottom: 9, 
      alignContent:"center",
      textAlign: "center"
    },
    buttonText:{
      color: colors.white,
      fontSize: 19,
      alignSelf: "center"
    },
    deliveryOptions: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      overflow: "hidden",
    },
    halfButton: {
      flex: 1,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center"
    },
    selectedOption: {
      backgroundColor: colors.violet,
    },
    addressItem: {
      padding: 10,
      marginVertical: 5,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      backgroundColor: "transparent",
      margin:30
    },
    selectedAddress: {
      color: colors.blue,
      borderColor: colors.white, // Color del borde para la dirección seleccionada
      backgroundColor: colors.violet, 
    },
    addressContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width:"80%"
    },
    checkIcon: {
      marginLeft: 10,
    },
    scrollContainer: {
      maxHeight: 200,
      borderWidth: 1,
      borderColor: colors.white,
      borderRadius: 8,
      overflow: "hidden",
      marginVertical: 10,
    },
    scrollProducts: {
      maxHeight: 100,
      borderWidth: 1,
      borderColor: colors.white,
      borderRadius: 8,
      overflow: "hidden",
      marginVertical: 10,
    },
    productContainer:{
      paddingHorizontal:16
    },
})