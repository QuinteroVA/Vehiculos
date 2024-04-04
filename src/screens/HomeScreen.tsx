import React from 'react'
import { View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { styles } from '../theme/styles'
export const HomeScreen = () => {
	return (
    <View style={styles.contentHome}>
      <View style={styles.headerHome}>
        <Avatar.Text size={50} label="AQ" />        
        <View>
          <Text variant='bodyMedium'>Bienvenido</Text>
          <Text variant='labelLarge'>Angel Quintero</Text>
        </View>
      </View>
    </View>
  )
}
