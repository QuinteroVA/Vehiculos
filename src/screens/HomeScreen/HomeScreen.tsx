import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { signOut } from 'firebase/auth'
import { updateProfile } from 'firebase/auth';
import { auth, dbRealTime } from '../../configs/firebaseConfig';
import firebase from 'firebase/auth';
import { CarCardComponent } from '../../screens/HomeScreen/components/CarCardComponent';
import { onValue, ref } from 'firebase/database';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NewCarComponent } from '../../screens/HomeScreen/components/NewCarComponent';
//import { WelcomeScreen } from '../WelcomeScreen';
//Interface que nos ayude a trabajar con los datos del usuario
interface UserForm {
  name: string,
}
//Interface para trabajar la data de la carta
export interface Car {
  id: string,
  brand: string,
  model: string,
  descriptions: string,
  image: string,
}

export const HomeScreen = () => {
  //Hook de navegación
  const navigation = useNavigation()
  //Hook useState que permite controlar la visibilidad del modal
  const [showModalProfile, setShowModalProfile] = useState(false)
  //Hook useState que ayudará a controlar la visibilidad del modal new car
  const [showModalCar, setShowModalCar] = useState(false)
  //Hook que permita trabajar con los datos del usuario
  const [userForm, setUserForm] = useState<UserForm>({ name: '' })
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null)
  //Hook useState: para tomar la lista de carros
  const [cars, setCars] = useState<Car[]>([])
  //Hook useEffect: capturar la data del usuario logueado
  useEffect(() => {
    setUserAuth(auth.currentUser) //Datos del usuario logueado
    setUserForm({ name: auth.currentUser?.displayName ?? '' })
    getAllCars()
  }, [])
  //Función para tomar los datos del formulario y actualizar la data
  const handlerUpdateUserForm = (key: string, value: string) => {
    setUserForm({ ...userForm, [key]: value })
  };
  //Función que actualiza data de usuario logueado
  const handlerUpdateUser = async () => {
    try {
      await updateProfile(userAuth!, { displayName: userForm.name })
    } catch (e) {
      console.log(e)
    }
    setShowModalProfile(false)
  };
  //Función para obtener las carros almacenadas
  const getAllCars = () => {
    const dbRef = ref(dbRealTime, 'cars')
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      const getKeys = Object.keys(data)
      const listCars: Car[] = []
      getKeys.forEach((key) => {
        const value = { ...data[key], id: key }
        listCars.push(value)
      })
      setCars(listCars)
    });
  };

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: any) => setState({ open });
  const { open } = state;
  //Función para tomar las iniciales de los nombres del usuario
  const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    return names
      .map((n) => n.charAt(0))
      .join('')
      .toUpperCase();
  };
  //Función para cerrar sesión
  const handlerSignOut = async () => {
    try {
      await signOut(auth);
      navigation.dispatch(CommonActions.navigate({ name: 'Welcome' }))
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <View style={styles.contentHome}>
        <View style={styles.headerHome}>
          <Avatar.Text size={50} label={getInitials(userForm.name)} />
          <View>
            <Text style={{ fontWeight: 'bold' }} variant='bodyLarge'>Bienvenido</Text>
            <Text variant='labelLarge'>{userForm.name}</Text>
          </View>
          <View style={styles.icon}>
            <IconButton
              icon="account"
              size={25}
              mode='contained'
              onPress={() => setShowModalProfile(true)}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={cars}
            renderItem={({ item }) => <CarCardComponent car={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
          <View style={styles.headerModal}>
            <Text variant='headlineLarge'>Actualizar Usuario</Text>
            <IconButton icon='close' onPress={() => setShowModalProfile(false)} />
          </View>
          <Divider bold />
          <View>
            <TextInput
              mode='outlined'
              label='Nombre'
              value={userForm.name}
              onChangeText={(value) => handlerUpdateUserForm('name', value)}
            />
            <TextInput
              mode='outlined'
              label='Correo'
              value={userAuth?.email!}
              disabled
            />
          </View>
          <View style={styles.buttons2}>
            <Button style={styles.buttons} icon={'update'} mode='contained' onPress={() => handlerUpdateUser()}>Actualizar</Button>
          </View>
        </Modal>
      </Portal>
      <FAB.Group
        open={open} visible icon={open ? 'folder-eye-outline' : 'cog'}
        actions={[
          { icon: 'logout', label: 'Salir', onPress: () => handlerSignOut() },
          { icon: "car", label: 'Nuevo', onPress: () => setShowModalCar(true) },
        ]}
        onStateChange={onStateChange}
      /><NewCarComponent visible={showModalCar} setVisible={setShowModalCar} />
    </>
  )
}