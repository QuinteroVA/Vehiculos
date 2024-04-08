import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { Car } from '../HomeScreen'
import { CommonActions, useNavigation } from '@react-navigation/native'

interface Props {
  car: Car,
}

export const CarCardComponent = ({ car }: Props) => {
  const navigation = useNavigation()
  return (
    <ScrollView>
      <View style={styles.containerImg}>
        <Image
          source={{ uri: car.image }}
          style={styles.imageCar}
        />
      </View>
      <Card style={styles.card}>
        <Card.Content style={styles.contentCar}>
          <View>
            <Text variant='labelLarge'>Marca: {car.brand}</Text>
            <Text variant='bodyMedium'>Modelo: {car.model}</Text>
            <Text style={styles.textDescriptions}>Descripciones</Text>
            <Text variant='bodyMedium'>{car.descriptions}</Text>
          </View>
          <View style={styles.icon}>
            <IconButton
              icon="circle-edit-outline"
              size={25}
              onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Detail', params: { car } }))}
            />
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}