/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  RefreshControl,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ProductsContext} from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductsStackParams} from '../navigator/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'Products'> {}

const Products = ({navigation, route}: Props) => {
  const {products, loadProducts} = useContext(ProductsContext);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{marginRight: 20}}
          onPress={() => navigation.navigate('Product', {})}>
          <Text style={{color: 'black'}}>Agregrar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);
  const loadProductsBackend = () => {
    setRefreshing(true);
    loadProducts();
    setRefreshing(false);
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        data={products}
        keyExtractor={p => p._id}
        numColumns={2}
        renderItem={({item}) => (
          <ProductCard
            title={item.nombre}
            category={item.categoria.nombre}
            img={item.img}
            id={item._id}
            navigation={navigation}
            route={route}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadProductsBackend}
          />
        }
      />
    </View>
  );
};

export default Products;
