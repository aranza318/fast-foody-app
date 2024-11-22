import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import { colors } from '../global/colors';
import MyTypoText from './MyTypoText';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';


const PlacesModal = ({ modalVisible, placeSelected, setModalVisible, handleDeletePlace }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.content}>
                <View style={styles.textContainer}>
                    <MyTypoText style={styles.modalTitle}>¿Eliminar este lugar?</MyTypoText>
                    <Text style={styles.arrowDown}>↓</Text>
                    <MyTypoText style={styles.modalDescription}>{placeSelected.title}</MyTypoText>
                    <View style={styles.modalButtons}>
                        <Pressable
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <MyTypoText style={styles.cancelText}>Cancelar y concervar direccion</MyTypoText>
                        </Pressable>
                        <Pressable
                            style={styles.deleteButton}
                            onPress={handleDeletePlace}
                        >
                            <MyTypoText style={styles.deleteText}>Si eliminar</MyTypoText><Icon name="delete" size={24} color="white" />
                        </Pressable>
                    </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default PlacesModal;

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: colors.blue,
        flex: 1
    },
    content:{
        marginTop: 89,
       
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
    modalDescription: {
        color: colors.white,
        fontSize: 29,
        textAlign: "center",
        marginBottom: 19
    },
    cancelText: {
        color: colors.white,
        fontSize: 19,
        marginBottom: 23,
        textDecorationLine: "underline"
    },
    deleteButton: {
        padding:30,
        flexDirection:'row',
        gap: 3,
        alignSelf: 'center'
    },
    deleteText:{
      color: colors.white,
      fontSize: 19
    },
    arrowDown:{
        color: colors.white,
        fontSize:19
    }
})