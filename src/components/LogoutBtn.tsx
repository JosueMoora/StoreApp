import React, { useContext } from 'react'
import {Image, TouchableOpacity } from 'react-native'
import { AuthContext } from '../context/AuthContext'

const LogoutBtn = () => {
    const {logOut} = useContext(AuthContext)
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={logOut} >
        <Image source={require('../assets/logout.png')} style={{width: 20, height: 20, marginLeft: 20}} />
    </TouchableOpacity>
  )
}

export default LogoutBtn
