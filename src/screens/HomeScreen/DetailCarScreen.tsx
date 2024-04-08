import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Car } from './HomeScreen'
import { ref, remove, update } from 'firebase/database'
import { dbRealTime } from '../../configs/firebaseConfig'

export const DetailCarScreen = () => {
  const navigation = useNavigation()
  //accedera a los parámetros de navegación
  const route = useRoute()
  //@ts-ignore
  const { car } = route.params
  const [detailForm, setDetailForm] = useState<Car>({
    id: '',
    brand: '',
    model: '',
    descriptions: '',
    image:'',
  })
  //Hook que carga los datos recibidos en el detailForm
  useEffect(() => {
    setDetailForm(car)
  }, [])
  //Función que permita actualizar la data del formulario
  const handlerSetDetailForm = (key: string, value: string) => {
    setDetailForm({ ...detailForm, [key]: value })
  }
  //Función que permite actualizar los autos
  const handlerUpdateCar = async () => {
    //Referencia a la base de datos
    const dbRef = ref(dbRealTime, 'cars/' + detailForm.id)
    await update(dbRef, { brand: detailForm.brand, model: detailForm.model, descriptions: detailForm.descriptions, image: detailForm.image })
    navigation.goBack()
  }
  //Función para eliminar auto
  const handlerDeleteCar = async () => {
    const dbRef = ref(dbRealTime, 'cars/' + detailForm.id)
    await remove(dbRef)
    navigation.goBack()
  }

  return (
    <View style={styles.contentHome}>
      <View style={styles.contentDetailCar}>
        <View style={styles.headerModal}>
          <Text style={{ paddingTop: 10, fontWeight: 'bold' }} variant='headlineMedium'>Gestionar Vehículo</Text>
        </View>
        <Divider bold />
        <TextInput
          label='Marca'
          mode='outlined'
          value={detailForm.brand}
          onChangeText={(value) => handlerSetDetailForm('brand', value)}
        />
        <TextInput
          label='Modelo'
          mode='outlined'
          value={detailForm.model}
          onChangeText={(value) => handlerSetDetailForm('model', value)}
        />
        <TextInput
          label='Descripción'
          mode='outlined'
          value={detailForm.descriptions}
          onChangeText={(value) => handlerSetDetailForm('descriptions', value)}
          multiline={true}
          numberOfLines={4}
        />
        <TextInput
          label='Imagen'
          mode='outlined'
          value={detailForm.image}
          onChangeText={(value) => handlerSetDetailForm('image', value)}
        />
        <View style={styles.buttons2}>
          <Button style={styles.buttons} mode='contained' icon='update' onPress={() => handlerUpdateCar()}>Actualizar</Button>
          <Button style={styles.buttons} mode='contained' icon='delete' onPress={() => handlerDeleteCar()}>Eliminar</Button>
        </View>
      </View>
    </View>
  )
}
