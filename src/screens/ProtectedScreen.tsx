import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const ProtectedScreen = () => {
  const {user, logOut} = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProtectedScreen</Text>
      <Button title="Cerrar sesion" color="#5856D6" onPress={logOut} />
      <Text>{JSON.stringify(user, null, 5)}</Text>

    </View>
  )
}

export default ProtectedScreen
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 40,
      gap: 20,
    },
    title: {
      fontSize: 20,
    },
});
