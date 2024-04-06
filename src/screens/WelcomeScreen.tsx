import React from "react";
import { View, } from 'react-native';
import { Button, Text, } from "react-native-paper";
import { styles } from "../theme/styles";
import { CommonActions, useNavigation } from "@react-navigation/native";

export const WelcomeScreen = () => {
  //Hook Navegación
  const navigation=useNavigation()
  
  return (
    <View style={styles.content}>
      <Text variant="headlineMedium">Bienvenido</Text>
      <Button mode="contained" 
        style={styles.buttons}
        onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Login'}))}
        >Entrar
      </Button>
    </View>
  );
};