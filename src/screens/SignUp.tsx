/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native'
import { loginStyle } from '../theme/loginTheme';
import ReactLogo from '../components/ReactLogo';
import Input from '../components/Input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any>{}

const SignUp = ({navigation}: Props) => {
  const {signUp, removeError, errorMessage} = useContext(AuthContext)

  const {email, password, name, onChange} = useForm({
    name: '',
    email: '',
    password: '',
  });
  useEffect(()=> {
    if (errorMessage.length === 0) return
    Alert.alert('Login incorrecto', errorMessage, [{text: 'Ok', onPress: removeError}])
  },[errorMessage])

  const onSignUp = () => {
    Keyboard.dismiss()
    signUp({nombre: name, correo: email, password})
  };
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#5856D6'}}

        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyle.margin}>
          <ReactLogo />
          <Text style={loginStyle.title}>Registrarse</Text>
          <Input
            title="Nombre"
            placeholder="pedro perez"
            onChange={value => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onSignUp}
          />
          <Input
            title="Email"
            placeholder="usuario@gmail.com"
            onChange={value => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onSignUp}
            keyboardType="email-address"
          />
          <Input
            title="Contraseña"
            placeholder="********"
            onChange={value => onChange(value, 'password')}
            onSubmitEditing={onSignUp}
            value={password}
          />
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={onSignUp} activeOpacity={0.7} style={loginStyle.btn}>
              <Text style={loginStyle.label}>Registrar</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.replace('Login')}>
              <Text style={loginStyle.register}>Iniciar sesion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

export default SignUp
