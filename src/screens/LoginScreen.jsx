import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../global/colors";
import { useState, useEffect } from "react";
import { setUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation, useCheckEmailExistsQuery } from "../services/authService";
import MyTypoText from "../components/MyTypoText";
import { createSessionsTable, insertSession, clearSessions } from "../db";
import Icon from "react-native-vector-icons/MaterialIcons";
import ShowToast from "../components/ShowToast";
import Toast from "react-native-toast-message";

const textInputWidth = Dimensions.get("window").width * 0.7;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const [triggerLogin, result] = useLoginMutation();

  const { data: emailExistsData, isFetching: emailChecking } = useCheckEmailExistsQuery(email, { skip: !email });

  useEffect(() => {
    if (result.isSuccess) {
      ShowToast("success", "Inicio de sesión exitoso", "Te damos la bienvenida");
  
      dispatch(setUser(result.data));
  
      if (rememberMe) {
       
        clearSessions()
          .then(() => {
            createSessionsTable()
              .then(() => {
                insertSession({
                  localId: result.data.localId,
                  email: result.data.email,
                  token: result.data.idToken,
                })
                  .then(() => {
                    ShowToast("success", "Sesión guardada exitosamente");
                  })
                  .catch(error => {
                    ShowToast("error", "Error al guardar la sesión", error.message || "No se pudo guardar la sesión.");
                  });
              })
              .catch(error => {
                ShowToast("error", "Error al crear la tabla", error.message || "Hubo un problema al preparar la base de datos.");
              });
          })
          .catch(error => {
            ShowToast("error", "Error al eliminar las sesiones", error.message || "No se pudieron eliminar las sesiones previas.");
          });
      }
    }
  }, [result, rememberMe]);


  const onsubmit = async () => {
    if (!email || !password) {
      ShowToast("error", "Campos vacíos", "Por favor ingresa tu correo y contraseña.");
      return;
    }
  
    try {
      ShowToast("info", "Enviando datos de autenticación", `Email: ${email}`);
      
      const result = await triggerLogin({ email, password }).unwrap();
  
   
      if (email) {
       
        ShowToast("success", "Inicio de sesión exitoso", `Bienvenido ${email}`);
      } else {
        throw new Error("No se obtuvo el email del usuario.");
      }
      
    } catch (error) {
     
      ShowToast("error", "Error de autenticación", error.message || "Ocurrió un problema, intenta nuevamente.");
    }
  };
  
  return (
    <LinearGradient style={styles.try} colors={["#00cbf9", "#090979"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <View style={styles.thisContainer}>
        <Text style={styles.title}>Fast Foody</Text>
        <MyTypoText style={styles.subtitle}>✨Ingresa aquí✨</MyTypoText>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#EBEBEB"
            placeholder="Email"
            style={styles.textInput}
          />
          <TextInput
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#EBEBEB"
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry
          />
        </View>
        <View style={styles.rememberMe}>
          <MyTypoText style={styles.whiteText}>Mantener la sesión iniciada</MyTypoText>
          <Pressable onPress={() => setRememberMe(!rememberMe)}>
            <Icon
              name={rememberMe ? "toggle-on" : "toggle-off"}
              size={48}
              color={rememberMe ? colors.green : colors.lightGrey}
            />
          </Pressable>
        </View>
        <View style={styles.footTextContainer}>
          <MyTypoText style={styles.whiteText}>¿Aún no tienes una cuenta?</MyTypoText>
        </View>
        <View style={styles.footTextContainer}>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <MyTypoText style={{ ...styles.whiteText, ...styles.underLineText }}>
              👉 Crea una aquí 👈
            </MyTypoText>
          </Pressable>
        </View>
        <Pressable style={styles.btn} onPress={onsubmit}>
          <MyTypoText style={styles.btnTxt}>Iniciar sesión</MyTypoText>
        </Pressable>
        <View style={styles.guestOptionContainer}>
          <MyTypoText style={styles.whiteText}>¿Quieres ver qué hay de rico primero?</MyTypoText>
          <Pressable onPress={() => dispatch(setUser({ email: "demo@fastfoody.com", token: "demo" }))}>
            <MyTypoText style={{ ...styles.whiteText, ...styles.strongText }}>Entra como invitado por aquí</MyTypoText>
          </Pressable>
        </View>
      </View>
      <Toast />
    </LinearGradient>
  );
};

export default LoginScreen;

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
        textDecorationLine: 'underline'
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
    btnTxt:{
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
    rememberMe:{
        flexDirection:"row",
        gap:5,
        justifyContent:"space-around",
        alignItems:"center",
        marginVertical: 8
    }
})