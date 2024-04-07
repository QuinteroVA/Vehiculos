import React, { useState } from 'react'
import { Modal, Portal, Text, IconButton, TextInput, Divider, Button } from 'react-native-paper';
import { styles } from '../../../theme/styles'
import { View } from 'react-native';
import { dbRealTime } from '../../../configs/firebaseConfig';
import { push, ref, set } from 'firebase/database';
//Interface indica los props que este componente va a manejar
interface Props {
  visible: boolean,
  setVisible: Function
}
interface CarForm {
  brand: string;
  model: string;
  descriptions: string;
}

export const NewCarComponent = ({ visible, setVisible }: Props) => {
  //Hook useState: Actualiza los datos del formulario
  const [carForm, setCarForm] = useState<CarForm>({
    brand: '',
    model: '',
    descriptions: ''
  })
  //Función que capture y actualice los valores del formulario
  const handlerSetCarForm = (key: string, value: string) => {
    setCarForm({ ...carForm, [key]: value })
  }
  //Función para guardar las cartas
  const handlerSaveCar = async () => {
    if (!carForm.brand || !carForm.model || !carForm.descriptions) {
      return
    }
    //console.log(carForm)
    const dbRef = ref(dbRealTime, 'cars')
    const saveCar = push(dbRef) //ubicación de almacenamiento
    try {
      await set(saveCar, carForm)
      //Limpiar los valores del formulario
      setCarForm({
        descriptions: '',
        model: '',
        brand: ''
      })
    } catch (e) {
      console.log(e)
    }
    setVisible(false)
  }

  return (
    <View>
      <Portal>
        <Modal visible={visible} contentContainerStyle={styles.modal}>
          <View style={styles.headerModal}>
            <Text variant='headlineMedium'>Nuevo Auto</Text>
            <IconButton icon='close' onPress={() => setVisible(false)} />
          </View>
          <Divider bold />
          <TextInput
            label='Marca: '
            mode='outlined'
            onChangeText={(value) => handlerSetCarForm('brand', value)}
          />
          <TextInput
            label='Modelo: '
            mode='outlined'
            onChangeText={(value) => handlerSetCarForm('model', value)}
          />
          <TextInput
            label='Descripción: '
            mode='outlined'
            onChangeText={(value) => handlerSetCarForm('descriptions', value)}
            multiline={true}
            numberOfLines={4}
          />
          <View style={styles.buttons2}>
            <Button style={styles.buttons} icon={'content-save-outline'} mode='contained' onPress={() => handlerSaveCar()}>Guardar</Button>
          </View>
        </Modal>
      </Portal>
    </View>
  )
}