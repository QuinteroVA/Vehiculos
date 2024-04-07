import React from "react";
import { Image, View, } from 'react-native';
import { Button, Text, } from "react-native-paper";
import { styles } from "../theme/styles";
import { CommonActions, useNavigation } from "@react-navigation/native";

export const WelcomeScreen = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.content}>
      <Text style={{ fontWeight: 'bold', color: '#683394' }} variant="displayMedium">Mi Carrito</Text>
      <Image
        style={styles.imageLogo}
        source={require('../../assets/image/logo.png')}
      />
      <Button mode="contained"
        style={styles.buttons}
        onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}
      >Entrar
      </Button>
    </View>
  );
};