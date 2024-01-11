/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import Background from '../components/Background';
import ReactLogo from '../components/ReactLogo';
import {loginStyle} from '../theme/loginTheme';
import Input from '../components/Input';
import {useForm} from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any>{}

const Login = ({navigation}: Props) => {

  const {signIn, removeError, errorMessage} = useContext(AuthContext)

  const {email, password, onChange} = useForm({
    email: '',
    password: '',
  });

  useEffect(()=> {
    if (errorMessage.length === 0) return
    Alert.alert('Login incorrecto', errorMessage, [{text: 'Ok', onPress: removeError}])
  },[errorMessage])

  const onLogin = () => {
    Keyboard.dismiss()
    signIn({correo: email, password})
  };

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyle.margin}>
          <ReactLogo />
          <Text style={loginStyle.title}>Login</Text>
          <Input
            title="Email"
            placeholder="usuario@gmail.com"
            onChange={value => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
            keyboardType="email-address"
          />
          <Input
            title="Contraseña"
            placeholder="********"
            onChange={value => onChange(value, 'password')}
            onSubmitEditing={onLogin}
            value={password}
          />
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={onLogin} activeOpacity={0.7} style={loginStyle.btn}>
              <Text style={loginStyle.label}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.replace('SignUp')}>
              <Text style={loginStyle.register}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
