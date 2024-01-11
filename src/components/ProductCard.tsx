import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'Products'> {
  title: string;
  category: string;
  img?: string;
  id: string
}

const ProductCard = ({title, category, img, navigation, id}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={()=> navigation.navigate('Product', {name: title, id } )}>
      {img ? (
        <Image source={{uri: img}} style={styles.img} />
      ) : (
        <Image source={require('../assets/box.png')} style={styles.img} />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={{color: 'black'}}>{category}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;
const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  img: {
    width: 80,
    aspectRatio: '3/2',
    objectFit: 'contain',
  },
});
