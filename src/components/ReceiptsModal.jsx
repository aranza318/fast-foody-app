import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import { colors } from '../global/colors';
import MyTypoText from './MyTypoText';

const ReceiptsModal = ({ modalVisible, receiptSelected, setModalVisible }) => {
  return (
    <Modal animationType="fade" visible={modalVisible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.content}>
        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.closeT}>x</Text>
        </Pressable>
        
        <View style={styles.textContainer}>
          <MyTypoText style={styles.modalTitle}>Detalles de la Compra</MyTypoText>
          
          {/* Información del recibo */}
          <MyTypoText style={styles.modalText}>Recibo: {receiptSelected.id}</MyTypoText>
          <MyTypoText style={styles.modalText}>Fecha: {new Date(receiptSelected.createdAt).toLocaleString()}</MyTypoText>
          <MyTypoText style={styles.modalText}>Total: ${receiptSelected.total}</MyTypoText>
          <MyTypoText style={styles.modalText}>Entrega con Delivery: <MyTypoText style={styles.modalText}>
          {receiptSelected.deliveryOption === "withDelivery" ? "Sí" : "No"}
          </MyTypoText>
          </MyTypoText>
          {/* Lista de productos en el carrito */}
          <MyTypoText style={styles.modalTitle}>Productos:</MyTypoText>
          {receiptSelected.cart && receiptSelected.cart.map((product, index) => (
            <MyTypoText key={index} style={styles.modalText}>
              - {product.title} (${product.price}) x {product.quantity} = ${product.price * product.quantity}
            </MyTypoText>
          ))}
        </View>
        </View>
      </View>
    </Modal>
  );
};


export default ReceiptsModal

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: colors.blue,
        flex: 1
    },
    content:{
        marginTop: 86
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 30,
    },
    closeT: {
        color: colors.pink,
        fontSize: 30,
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
    modalText: {
        color: "#fff",
        fontSize: 19,
        textAlign: "center",
        marginBottom: 19
    },
    modalDTW: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
    },
    buttonsC: {
        padding:30,
        flexDirection:'row',
        gap: 10,
    }
})