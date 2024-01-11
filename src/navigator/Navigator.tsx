import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContext';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ProtectedScreen from '../screens/ProtectedScreen';
import Loading from '../screens/Loading';
import { ProductsNavigator } from './ProductsNavigator';

const Stack = createStackNavigator();

export const Navigator = () => {
  const {status} = useContext(AuthContext);
  return (
    <>
      {status === 'checknig' ? (
        <Loading />
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: 'white',
            },
          }}>
          {status === 'autheticated' ? (
            <>
            <Stack.Screen name="ProductsNavigator" component={ProductsNavigator} />
            <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      )}
    </>
  );
};
