import { StyleSheet, FlatList, Text, ActivityIndicator, Pressable } from 'react-native';
import FlatCard from '../components/FlatCard';
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import MyTypoText from '../components/MyTypoText';
import { useState, useEffect, useCallback } from 'react';
import { useGetReceiptsQuery } from '../services/receiptsServices';
import { setReceipts, setReceiptsError } from '../features/shop/shopSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ReceiptsModal from '../components/ReceiptsModal';
import Toast from 'react-native-toast-message';
import ShowToast from '../components/ShowToast';

const ReceiptsScreen = () => {
  const dispatch = useDispatch();
  const { data: receiptsData = [], error, isLoading, refetch } = useGetReceiptsQuery(undefined, { refetchOnMountOrArgChange: true });
  const receipts = useSelector(state => state.shopSlice.value.receipts);
  const user = useSelector(state=>state.authSlice.value.email)
  const [modalVisible, setModalVisible] = useState(false);
  const [receiptSelected, setReceiptSelected] = useState({});

  const handleSelectedReceipt = (item) => {
    setReceiptSelected(item);
  
    ShowToast("info", "Recibo seleccionado", `Has seleccionado el recibo con ID: ${item.id || "desconocido"}`);
  
    setModalVisible(true);
  };
  
  useFocusEffect(
    useCallback(() => {
      if (typeof refetch === 'function') {
        ShowToast("info", "Actualizando", "Refrescando los datos...");
        refetch(); 
      }
    }, [refetch])
  );

  useEffect(() => {
    if (receiptsData.length) {
      ShowToast( "info", "Datos actualizados", "Los recibos se han actualizado correctamente.");
  
      const userReceipts = receiptsData
        .filter((receipt) => receipt.user === user)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      dispatch(setReceipts(userReceipts));
    }
  
    if (error) {
      ShowToast( "error", "Error en los recibos", "No se pudieron cargar los datos de los recibos." );
      dispatch(setReceiptsError(error));
    }
  }, [receiptsData, error, dispatch, user]);
  

  const renderReceiptItem = ({ item }) => {
    const dateOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    return (
      <FlatCard style={styles.receiptContainer}>
        <MyTypoText style={styles.title}>Recibo: {item.id}</MyTypoText>
        <MyTypoText style={styles.title}>Usuario: {item.user}</MyTypoText>
        <MyTypoText style={styles.date}>Creado el {new Date(item.createdAt).toLocaleString('es-Ar', dateOptions)} Hs.</MyTypoText>
        <MyTypoText style={styles.total}>Total: ${item.total}</MyTypoText>
        <Pressable 
          style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, styles.showRecieptButton]} 
          onPress={() => handleSelectedReceipt(item)}
        >
          <Icon name="visibility" size={24} color={colors.darkGrey} style={styles.viewIcon} />
        </Pressable>
      </FlatCard>
    );
  };

  return (
    <LinearGradient style={styles.try} colors={["#00cbf9", "#090979"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.white} />
      ) : error ? (
        <Text>Error al cargar</Text>
      ) : (
        <>
          <FlatList
            data={receipts}
            keyExtractor={(item) => item.id}
            renderItem={renderReceiptItem} 
          />
          <ReceiptsModal 
            modalVisible={modalVisible}
            receiptSelected={receiptSelected}
            setModalVisible={setModalVisible}
          />
        </>
      )}
    </LinearGradient>
  );
};

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
  },
  try:{
    height: 605,
  }
})