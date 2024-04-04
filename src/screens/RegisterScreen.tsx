import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, MD3Colors, Snackbar, Text, TextInput } from "react-native-paper";
import { auth } from "../configs/firebaseConfig";
import { styles } from "../theme/styles";
import { CommonActions, useNavigation } from "@react-navigation/native";


interface RegisterForm{
  email: string,
  password: string
}

interface MessageSnackBar{
  visible: boolean,
  message: string,
  color: string
}

export const RegisterScreen = () => {
  //Hook Navegación
  const navigation=useNavigation()
  //Hook para mostrar la contraseña
  const [hiddenPassword, setHiddenPassword] = useState(true)
  //Hook useState: trabajar con el estado del formulario
  const [registerForm, setRegisterForm] = useState <RegisterForm>({
    email:"",
    password:""
  })
  //Hook useState: trabajar con el manejo de mensajes dinámicos
  const [messageSnackBar, setMessageSnackBar] = useState<MessageSnackBar>({
    visible: false,
    message: "",
    color: "#fff"
  })

  const [eyeIcon, setEyeIcon] = useState("eye");

  const togglePasswordVisibility = () => {
    setHiddenPassword(!hiddenPassword);
    setEyeIcon(hiddenPassword ? "eye-off" : "eye");
  };

  //Función para actualizar datos del formulario
  const handlerSetRegisterForm=(key: string, value: string)=>{
    setRegisterForm({...registerForm, [key]:value})
  };

  //Función que toma los datos del registro
  const handlerRegister = async ()=> {
    if(!registerForm.email || !registerForm.password){
      //Cambiar estado para visualizar mensaje
      setMessageSnackBar({
        visible: true,
        message: "Complete todos los campos",
        color:"#962841" })
      return;
    }
    //Registrar usuario
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        registerForm.email,
        registerForm.password
      );
      setMessageSnackBar({
        visible: true,
        message: "Registro exitoso",
        color:"#2d813f" })
    } catch (e) {
        console.log(e);
        setMessageSnackBar({
          visible: true,
          message: "No se completó el registro",
          color:"#962841" })
    }
  };

  return (
    <View style={styles.content}>
      <Text variant="headlineMedium">Regístrarse</Text>
      <TextInput
        mode="outlined"
        label="Correo"
        placeholder="Ingresar Correo"
        style={styles.inputs}
        onChangeText={(value)=>handlerSetRegisterForm('email', value)}
      />
      <TextInput
        mode="outlined"
        label="Contraseña"
        placeholder="Ingresar Contraseña"
        secureTextEntry={hiddenPassword}
        style={styles.inputs}
        onChangeText={(value)=>handlerSetRegisterForm('password', value)}
        right={<TextInput.Icon icon={eyeIcon} onPress={togglePasswordVisibility} />}
      />
      <Button
        icon="sing-up"
        mode="contained"
        onPress={() => handlerRegister()}
        style={styles.buttons}>
        Registrarse
      </Button>
      <Snackbar
        visible={messageSnackBar.visible}
        onDismiss={()=> setMessageSnackBar({...messageSnackBar, visible: false})}
        style={{backgroundColor: messageSnackBar.color}}>
        {messageSnackBar.message}
      </Snackbar>
      <Text 
        style={styles.textNavigation}
        onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Login'}))}
        >¿Ya estas registrado?. Click aquí
      </Text>
    </View>
  );
};