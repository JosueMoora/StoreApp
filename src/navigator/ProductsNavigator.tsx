import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Products from '../screens/Products'
import Product from '../screens/Product'
import LogoutBtn from '../components/LogoutBtn'

const Stack = createStackNavigator<ProductsStackParams>()

export type ProductsStackParams = {
    Products: undefined,
    Product: {id?: string, name?: string }
}

export const ProductsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
        <Stack.Screen name="Products" component={Products} options={{headerLeft: ()=> <LogoutBtn /> }} />
        <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  )
}
