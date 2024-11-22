import { StyleSheet, Text, View, TextInput, Pressable, FlatList } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../global/colors';
import Toast from 'react-native-toast-message';
import FlatCard from '../components/FlatCard';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import MyTypoText from '../components/MyTypoText';
import { usePostPlaceMutation, useGetPlacesQuery, useDeletePlaceMutation } from '../services/mapService';
import { useSelector, useDispatch} from 'react-redux';
import { setPlaces, setPlacesError } from '../features/shop/shopSlice';
import { useFocusEffect } from '@react-navigation/native';
import PlacesModal from '../components/PlacesModal';
import ShowToast from '../components/ShowToast';

const MyPlacesScreen = () => {
    const [location, setLocation] = useState(null);
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const user = useSelector(state => state.authSlice.value.email); 
    const dispatch = useDispatch();
    const { data: places = [], error, isLoading, refetch } = useGetPlacesQuery(undefined, { refetchOnMountOrArgChange: true });
    const [postPlace] = usePostPlaceMutation();
    const [modalVisible, setModalVisible] = useState(false);
    const [placeSelected, setPlaceSelected] = useState({});
    const [deletePlace] = useDeletePlaceMutation();

    
    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            ShowToast("error", "Permiso denegado para acceder a la ubicación");
            return false;
        }
        return true;
    };

    const getLocation = async () => {
        const permissionOk = await getPermissions();
        if (!permissionOk) return;

        try {
            const location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
            ShowToast("success", "Ubicación obtenida");
            await reverseGeocode(location.coords.latitude, location.coords.longitude);
        } catch (error) {
            ShowToast("error", "No se pudo obtener la ubicación");
        }
    };

    const reverseGeocode = async (latitude, longitude) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
      
          if (data && data.address) {
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.hamlet ||
              "Ciudad no disponible";
      
            const formattedAddress = `${data.address.road || ''}, ${city}, ${data.address.country || ''}`;
            setAddress(formattedAddress);
          } else {
            setAddress("Dirección no disponible");
            ShowToast("info", "Geocodificación inversa", "Dirección no disponible.");
          }
        } catch (error) {
            ShowToast("error", "Error de geocodificación inversa", error.message || 'No se pudo obtener la dirección. Intenta nuevamente.');
          setAddress("Dirección no disponible");
        }
      };

    const savePlace = async () => {
        if (location && title) {
            const newPlace = {
                title,
                coords: { latitude: location.latitude, longitude: location.longitude },
                address: address || "Dirección no disponible",
                user, // Asociar el lugar al usuario actual
            };

            try {
                await postPlace(newPlace).unwrap();
                ShowToast("success", "Lugar guardado exitosamente");
                setTitle("");
                setLocation(null);
                setAddress("");
                refetch()
            } catch (error) {
                ShowToast("error", "No se pudo guardar el lugar");
            }
        } else {
            ShowToast("error", "No se completaron los datos correctamente");
        }
    };
    
    const handleDeletePlace = async () => {
        try {
          await deletePlace(placeSelected.id).unwrap();
      
          ShowToast("success", "Lugar eliminado exitosamente");
      
          refetch(); 
          setModalVisible(false); 
        } catch (error) {
          
          ShowToast( "error","Error al eliminar el lugar", 
                      error.message || "No se pudo completar la operación. Intenta nuevamente."
            );
        }
      };
      
      const handleSelectedPlace = (item) => {
        setPlaceSelected(item);
      
        ShowToast("info", "Lugar seleccionado", `Has seleccionado: ${item.name || "un lugar desconocido"}`
        );
      
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
        if (places.length) {
            // Filtrar lugares por el usuario actual
            const userPlaces = places.filter((place) => place.user === user);
            dispatch(setPlaces(userPlaces));
        }
        if (error) {
            dispatch(setPlacesError(error));
        }
    }, [places, error, dispatch, user]);

    const renderPlaceItem = ({ item }) => (
        <FlatCard style={styles.placeContainer}>
            <Pressable 
          style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, styles.showPlacesButton]} 
          onPress={() => handleSelectedPlace(item)}
        > 
          <Icon name="delete-outline" size={24} color="red" style={styles.trashIcon} />
        </Pressable><View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: item.coords.latitude,
                        longitude: item.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker coordinate={item.coords} title={item.title} />
                </MapView>
            </View>
            <View style={styles.placeDescriptionContainer}>
                <MyTypoText style={styles.mapTitle}>{item.title}</MyTypoText>
                <MyTypoText style={styles.address}>{item.address}</MyTypoText>
                <MyTypoText style={styles.email}>{item.user}</MyTypoText>
            </View>
            
        </FlatCard>
    );

    return (
        <LinearGradient style={styles.try} colors={["#00cbf9", "#090979"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={styles.container}>
                <MyTypoText style={styles.title}>Mi ubicación:</MyTypoText>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Ingresa un título"
                        onChangeText={text => setTitle(text)}
                        value={title}
                    />
                    <Pressable onPress={getLocation}>
                        <Icon name="location-on" color={colors.yellow} size={24} />
                    </Pressable>
                    <Pressable onPress={savePlace}>
                        <Icon name="add-circle" color={colors.green} size={32} />
                    </Pressable>
                </View>
                <MyTypoText style={styles.subtitle}>Lugares favoritos:</MyTypoText>
                {isLoading ? (
                    <Text>Cargando lugares...</Text>
                ) : error ? (
                    <Text>Error al cargar lugares</Text>
                ) : (
                    <>
                    <FlatList
                        data={places.filter((place) => place.user === user)} // Aplicar filtro directo
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderPlaceItem}
                    />
                    <PlacesModal 
                    modalVisible={modalVisible}
                    placeSelected={placeSelected}
                    setModalVisible={setModalVisible}
                    handleDeletePlace={handleDeletePlace}
                  />
                  </>
                )}
                <Toast />
            </View>
        </LinearGradient>
    );
};

export default MyPlacesScreen;

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 16 
    },
    title: { 
        fontSize: 25, 
        fontWeight: 'bold',
        color:colors.white
    },
    subtitle:{
        fontSize:19,
        color: colors.white
    },
    inputContainer: { 
        paddingVertical: 16,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around',
        marginBottom: 20 
    },
    textInput: { 
        flex: 1,  
        width: '80%',
        margin:5,
        borderWidth:1,
        borderColor: colors.pink,
        borderRadius:15,
        padding:5,
        paddingLeft:10,
        backgroundColor: colors.white
    },
    mapContainer: { 
        height: 150,
        width: 120,
        marginBottom: 10,
        borderRadius: 10,
        overflow: "hidden",
        elevation: 5,
        margin: 9
    },
    map: { 
        flex: 1,
        width: 120,
        height: 120,
        fontSize: 14
    },
    placeContainer: { 
        padding: 15,
        marginBottom: 20,
        flexDirection: "row",
        fontSize:14,
        color: colors.white
    },
    placeDescriptionContainer: { 
        padding: 7,
        width: '50%',
        margin: 28
    },
    mapTitle: { 
        fontWeight: 'bold',
        fontWeight: '700',
        color: colors.white,
        fontSize: 19
    },
    address: { 
        color: colors.white,
        fontSize: 15 
    },
    try:{
        height: 605,
    },
    email:{
        color: "transparent",
    }
});

