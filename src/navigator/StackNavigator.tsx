import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../theme/styles';
import { View } from 'react-native';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { DetailCarScreen } from '../screens/HomeScreen/DetailCarScreen';
//Interface: Definir las propiedades de las rutas
interface Routes {
  name: string,
  screen: () => JSX.Element //elemento JSX
  headerShown?: boolean
  title?: string
}
const Stack = createStackNavigator();
export const StackNavigator = () => {
  //Hook para verificar si está logueado
  const [isAuth, setIsAuth] = useState(false)
  //Hook para controlar la carga inical del screen
  const [isLoading, setIsLoading] = useState(false)
  //Hook useEffect: Validar cual es el estadom de autenticación
  useEffect(() => {
    setIsLoading(true)
    onAuthStateChanged(auth, (user) => {
      if (user) { //Si existe un usuario autenticado
        setIsAuth(true)
      }
      setIsLoading(false)
    })
  }, [])
  //Arreglo de rutas para el usuario que no está autenticado
  const routesNoAuth: Routes[] = [
    { name: "Welcome", screen: WelcomeScreen },
    { name: "Login", screen: LoginScreen },
    { name: "Register", screen: RegisterScreen }
  ]
  //Arreglo de rutas para el usuario que está autenticado
  const routesAuth: Routes[] = [
    { name: "Home", screen: HomeScreen },
    { name: "Detail", screen: DetailCarScreen, headerShown: true, title: 'Detalle Auto' }
  ]
  return (
    <>
      {
        isLoading ? (
          <View style={styles.content}>
            <ActivityIndicator size={35} animating={true} />
          </View>
        ) : (
          <Stack.Navigator>
            {
              !isAuth ?
                routesNoAuth.map((item, index) => (
                  <Stack.Screen key={index} name={item.name} options={{ headerShown: false }} component={item.screen} />
                ))
                :
                routesAuth.map((item, index) => (
                  <Stack.Screen key={index} name={item.name} options={{ headerShown: false }} component={item.screen} />
                ))
            }
          </Stack.Navigator>
        )
      }
    </>
  );
}