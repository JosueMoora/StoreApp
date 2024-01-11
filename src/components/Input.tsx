import { View, Text, KeyboardTypeOptions } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { loginStyle } from '../theme/loginTheme'

interface Props {
    title: string,
    placeholder: string
    onChange: (value: string) => void
    value: string
    keyboardType?: KeyboardTypeOptions
    onSubmitEditing?: () => void
}

const Input = ({title, placeholder, keyboardType, value, onSubmitEditing, onChange}: Props) => {
  return (
    <View>
      <Text style={loginStyle.label}>{title}</Text>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType={keyboardType}
          underlineColorAndroid="white"
          style={loginStyle.input}
          onChangeText={onChange}
          autoCapitalize={title === 'Nombre' ? 'words' : 'none'}
          secureTextEntry={title === 'Contraseña' ? true : false}
          autoCorrect={false}
          onSubmitEditing={onSubmitEditing}
          value={value}
        />
    </View>
  )
}

export default Input
