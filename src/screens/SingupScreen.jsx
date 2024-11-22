import { StyleSheet, Text, View, TextInput, Dimensions, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../global/colors";
import { useState} from "react";
import { setUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import MyTypoText from "../components/MyTypoText";
import Toast from "react-native-toast-message";
import { useCheckEmailExistsQuery, useSignupMutation } from "../services/authService";
import ShowToast from "../components/ShowToast";

const textInputWidth = Dimensions.get('window').width * 0.7

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [triggerSignup] = useSignupMutation();
  const { data: emailCheckData, error: emailCheckError, refetch } = useCheckEmailExistsQuery(email, { skip: !email });

  const handleSubmit = async () => {
    if (!email) {
      ShowToast("error", "Error", "Por favor ingresa un correo válido.");
      return;
    }

    if (!password || password.length < 6) {
      ShowToast("error", "Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPass) {
      ShowToast("error", "Error", "Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      
      await refetch();

      if (emailCheckData && Object.keys(emailCheckData).length > 0) {
        ShowToast("error", "Error", "El correo ya está registrado. Usa otro.");
        setLoading(false);
        return;
      }

    
      const result = await triggerSignup({ email, password }).unwrap();
      ShowToast("success", "Usuario registrado", "¡Cuenta creada exitosamente!");
      dispatch(setUser(result));
      navigation.navigate("Login");
    } catch (error) {
      ShowToast("error", "Error", error.message || "Ocurrió un error, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient style={styles.try} colors={["#00cbf9", "#090979"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <View style={styles.thisContainer}>
        <Text style={styles.title}>Fast Foody</Text>
        <MyTypoText style={styles.subtitle}>🤩 Regístrate 🤩</MyTypoText>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#EBEBEB"
            placeholder="Correo electrónico"
            style={styles.textInput}
          />
          <TextInput
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#EBEBEB"
            placeholder="Contraseña"
            style={styles.textInput}
            secureTextEntry
          />
          <TextInput
            onChangeText={(text) => setConfirmPass(text)}
            placeholderTextColor="#EBEBEB"
            placeholder="Confirmar contraseña"
            style={styles.textInput}
            secureTextEntry
          />
        </View>
        <View style={styles.footTextContainer}>
          <MyTypoText style={styles.whiteText}>¿Ya tienes una cuenta?</MyTypoText>
        </View>
        <View style={styles.footTextContainer}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <MyTypoText style={{ ...styles.whiteText, ...styles.underLineText }}>
              👉 Inicia sesión 👈
            </MyTypoText>
          </Pressable>
        </View>
        <Pressable style={styles.btn} onPress={handleSubmit} disabled={loading}>
          <MyTypoText style={styles.btnTxt}>{loading ? "Cargando..." : "Crear cuenta"}</MyTypoText>
        </Pressable>
        <Toast />
      </View>
    </LinearGradient>
  );
};

export default SignupScreen

const styles = StyleSheet.create({
    thisContainer:{
      marginTop:131
    },
    title: {
      fontSize:39,
      fontFamily:'Pacifico',
      color: colors.white,
      marginTop:19,
      textShadowColor: colors.pink,
      textShadowOffset: { width: 2, height: 3 },
      textShadowRadius: 2,
       textAlign: "center"
    },
    subtitle: {
      fontSize:22,
      color:colors.white,
      fontWeight:700,
      letterSpacing: 3,
      textAlign: "center"
    },
    inputContainer:{
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center'
    },
    textInput:{
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: colors.cyan,
        width: textInputWidth,
        color: colors.white,
        borderRadius: 23,
        fontSize: 17
    },
    footTextContainer:{
        flexDirection: 'row',
        gap: 8,
        alignSelf: "center",
        fontSize: 15
    },
    whiteText:{
        color: colors.white,
        fontSize: 18
    },
    underLineText:{
        textDecorationLine:'underline',
    },
    strongText:{
        fontWeight: '900',
        fontSize: 19,
        textDecorationLine: 'underline',
        marginTop: 4
    },
    btn:{
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.pink,
        borderRadius: 16,
        marginTop: 32,
        borderColor: colors.white,
        borderWidth:1
    },
    btnTxt: {
        color: colors.white,
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: 8,
        textAlign: "center"
    },
    guestOptionContainer:{
        alignItems: 'center',
        marginTop: 64
    }, 
    try:{
        height: "100%",
        alignContent: "center",
        alignItems: "center"
    },
    error:{
        color: colors.green
    }
})