import { StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from "../global/colors";

const CameraIcon = () =>{
    return(
        <View style={styles.iconContainer}>
            <Icon name="photo-camera" size={24} color="black"/>
        </View>
    )
}

export default CameraIcon

const styles = StyleSheet.create({
    iconContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: colors.green,
        width: 48,
        height: 48,
        borderRadius: 32,
        borderWidth:2,
        borderColor: colors.white
    }
})