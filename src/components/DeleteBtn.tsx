import {Alert, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext'
import { StackScreenProps } from '@react-navigation/stack'
import { ProductsStackParams } from '../navigator/ProductsNavigator'

interface Props extends StackScreenProps<ProductsStackParams, 'Product'> {
    id: string
}

const DeleteBtn = ({id, navigation}: Props) => {
    const {deleteProduct} = useContext(ProductsContext)

    const handleDelete = async () => {
        const data = await deleteProduct(id)
        if (data._id?.length > 0) {
            Alert.alert('Producto eliminiado', 'haz eliminado ' + data.nombre + ' con exito')
            return navigation.goBack()
        } else {
            Alert.alert('Error', data )
        }
    }
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handleDelete}>
      <Image source={require('../assets/trash.png')} style={{width: 30, height: 30, marginRight: 20}} />
    </TouchableOpacity>
  )
}

export default DeleteBtn
