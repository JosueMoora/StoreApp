/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useCategories} from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';
import DeleteBtn from '../components/DeleteBtn';

interface Props extends StackScreenProps<ProductsStackParams, 'Product'> {}

const Product = ({route, navigation}: Props) => {
  const {id = '', name = ''} = route.params;
  const {categories} = useCategories();
  const [tempImg, setTempImg] = useState('')
  const {loadProductById, addProduct, updateProduct, uploadImage} = useContext(ProductsContext);
  const {_id, nombre, categoriaId, img, onChange, setFormValue} = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: '',
  });

  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Nombre del producto',
      headerRight: () => {
        if (_id.length > 0) {
          return <DeleteBtn id={_id} route={route} navigation={navigation}/>
        }
      },
    });
  }, [nombre]);
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) {
      return;
    }
    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      nombre,
      img: product.img || '',
    });
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id)
    } else {
      const tempCategoryId = categoriaId || categories[0]._id
      const newProduct = await addProduct(tempCategoryId, nombre)
      onChange(newProduct._id, '_id')
    }
  };

  const takePhoto = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.5,
    },
     (resp) => {
      if (resp.didCancel) {return}
      if (!resp.assets![0].uri) {return}
      setTempImg(resp?.assets![0].uri)
      uploadImage(resp, _id)
    })
  }
  const photoGallery = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
    },
     (resp) => {
      if (resp.didCancel) {return}
      if (!resp.assets![0].uri) {return}
      setTempImg(resp?.assets![0].uri)
      uploadImage(resp, _id)
    })
  }

  return (
    <View style={styles.cotainer}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto:</Text>
        <TextInput
          placeholder="producto"
          value={nombre}
          style={styles.input}
          onChangeText={value => onChange(value, 'nombre')}
        />
        <Text style={styles.label}>Categoria</Text>

        <Picker
          selectedValue={categoriaId}
          onValueChange={itemValue => onChange(itemValue, 'categoriaId')}>
          {categories.map(c => (
            <Picker.Item key={c._id} label={c.nombre} value={c._id} style={{color: 'black'}} />
          ))}
        </Picker>

        <Button title="Guardar" color="#5856D6" onPress={saveOrUpdate} />
        {_id.length > 0 && (
          <View style={styles.btnContainer}>
            <Button title="camara" color="#5856D6" onPress={takePhoto} />
            <Button title="galeria" color="#5856D6" onPress={photoGallery} />
          </View>
        )}
        {(img.length > 0 &&  !tempImg) && (
          <Image
            source={{uri: img}}
            style={{width: '100%', height: 300, marginTop: 20, objectFit: 'contain'}}
          />
        )}
        {tempImg && (
          <Image
            source={{uri: tempImg}}
            style={{width: '100%', height: 300, marginTop: 20, objectFit: 'contain'}}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  label: {
    color: 'black',
    fontSize: 18,
    marginVertical: 5,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    color: 'black',
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    gap: 10,
  },
});

export default Product;
