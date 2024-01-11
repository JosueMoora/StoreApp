import { View, Image } from 'react-native'
import React from 'react'

const ReactLogo = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image source={require('../assets/react.png')} style={{width: 110, height: 100}} />
    </View>
  )
}

export default ReactLogo
