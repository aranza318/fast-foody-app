import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { colors } from '../global/colors'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import CameraIcon from '../components/CameraIcon'
import { setProfilePicture } from '../features/auth/authSlice'
import { usePutProfilePictureMutation } from '../services/userService'
import { LinearGradient } from 'expo-linear-gradient'
import MyTypoText from '../components/MyTypoText'
import Toast from 'react-native-toast-message'
import ShowToast from '../components/ShowToast'

const ProfileScreen = () => {
    
    const user = useSelector(state=>state.authSlice.value.email)
    const image = useSelector(state=>state.authSlice.value.profilePicture)
    const localId = useSelector(state=>state.authSlice.value.localId)
    const dispatch = useDispatch()
    const [triggerPutProfilePicture, result]= usePutProfilePictureMutation()
    
    const verifyCameraPermissions = async()=>{
        const {granted} = await ImagePicker.requestCameraPermissionsAsync()
        if(!granted)return false
        return true
    }
    const pickImage = async () => {
        const permissionOk = await verifyCameraPermissions();
      
        if (permissionOk) {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            base64: true,
            quality: 0.7,
          });
      
          if (!result.canceled) {
            dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`));
            triggerPutProfilePicture({ image: `data:image/jpeg;base64,${result.assets[0].base64}`, localId });
          }
        } else {

          ShowToast("error", "Permisos denegados", "No tienes los permisos activos para usar la cámara.");
        }
      };
      
    return (
        <LinearGradient style={styles.try} colors={["#00cbf9","#090979"]} start={{x:0, y:0}} end={{x:1, y:1}}>
    <View style={styles.profileContainer}>
        <View style={styles.imageProfileContainer}>
             {
                image
                ?
                <Image source={{uri:image}} resizeMode='cover' style={styles.profileImage}/>
                :
                <Text style={styles.imageTxt}>{user.charAt(0).toUpperCase()}</Text>
             }
             <Pressable onPress={pickImage} style={({pressed})=>[{opacity: pressed ? 0.90 : 1}, styles.cameraIcon]}>
                <CameraIcon />
             </Pressable>
        </View>
        <MyTypoText style={styles.profileData}>Email:{user}</MyTypoText>
    </View>
    </LinearGradient>
  )
}


export default ProfileScreen

const styles = StyleSheet.create({
    profileContainer:{
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageProfileContainer:{
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colors.pink,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1,
        borderColor: colors.white
    },
    textProfilePlaceHolder:{
        color:colors.white,
        fontSize: 48,
    },
    profileData:{
        paddingVertical:16,
        fontSize: 20,
        color: colors.white
    },
    cameraIcon:{
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage:{
        width:128,
        height: 128,
        borderRadius: 128,
        borderWidth:2,
        borderColor: colors.white
    },
    try:{
        height: "100%",
    },
    imageTxt:{
        fontSize:69,
        fontFamily:'AfacadFlux',
        color: colors.white,
        textShadowColor: colors.black,
        textShadowOffset: { width: 2, height: 3 },
        textShadowRadius: 2,
        textAlign: "center"
    }
})