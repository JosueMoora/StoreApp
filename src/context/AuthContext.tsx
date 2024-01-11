import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginData, LoginResponse, RegisterData, Usuario} from '../interfaces/appInterfaces';
import {AuthState, authReducer} from './AuthReducer';
import productsApi from '../api/productsApi';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checknig' | 'autheticated' | 'not-authenticated';
  signUp: (obj: RegisterData) => void;
  signIn: (obj: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'checknig',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(()=>{
    checkToken()
   },[])

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token')
    if (!token) {return dispatch({type: 'notAuthenticated'})}

    const res = await productsApi.get('/auth')
    if (res.status !== 200) {
      return dispatch({type: 'notAuthenticated'})
    }
    await AsyncStorage.setItem('token', res.data.token)
    dispatch({
      type: 'signUp',
      payload: {
        token: res.data.token,
        user: res.data.usuario,
      },
    });
}

  const signIn = async ({correo, password}: LoginData) => {
    try {
      const {data} = await productsApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario,
        },
      });
      await AsyncStorage.setItem('token', data.token)
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Informacion Incorrecta',
      });
    }
  };
  const signUp = async ({nombre, correo, password}: RegisterData) => {
    try {
      const {data} = await productsApi.post<LoginResponse>('/usuarios', {
        nombre,
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario,
        },
      })
      await AsyncStorage.setItem('token', data.token)
    } catch (error: any) {
      console.log(error.response.data.errors);
      dispatch({
        type: 'addError',
        payload: error.response.data.errors[0].msg || 'Informacion Incorrecta',
      });
    }
  };
  const logOut = async () => {
    dispatch({type: 'logout'})
    await AsyncStorage.removeItem('token')
  };
  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
