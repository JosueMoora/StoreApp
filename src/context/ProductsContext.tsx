import React, {createContext, useEffect, useState} from 'react';
import {Producto, ProductsResponse} from '../interfaces/appInterfaces';
import productsApi from '../api/productsApi';
import {ImagePickerResponse} from 'react-native-image-picker';
// import { ImagePickerResponse } from 'react-native-image-picker';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<any>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<any>; // TODO: cambiar ANY
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({children}: any) => {
  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await productsApi.get<ProductsResponse>('/productos?limite=50');
    // setProducts([...products, ...res.data.productos])
    setProducts(res.data.productos);
  };

  const addProduct = async (categoryId: string, productName: string) => {
    const res = await productsApi.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryId,
    });
    setProducts([...products, res.data]);
    return res.data;
  };
  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {
    const res = await productsApi.put<Producto>(`/productos/${productId}`, {
      nombre: productName,
      categoria: categoryId,
    });
    setProducts(products.map(p => (p._id === productId ? res.data : p)));
  };

  const deleteProduct = async (id: string) => {
    try {
      const {data} = await productsApi.delete<Producto>(`/productos/${id}`);
      setProducts(products.filter(product => product._id !== data._id));
      return data;
    } catch (error: any) {
      return error.response.data.msg;
    }
  };

  const loadProductById = async (id: string): Promise<Producto> => {
    const res = await productsApi.get<Producto>(`/productos/${id}`);
    return res.data;
  };

  const uploadImage = async (data: ImagePickerResponse, id: string) => {
    const file = {
      uri: data.assets![0].uri,
      type: data.assets![0].type,
      name: data.assets![0].fileName,
    };
    const formData = new FormData();
    formData.append('archivo', file);
    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-token': 'g8hergjeherijre',
        },
      };
      productsApi.put(`/uploads/productos/${id}`, formData, config)
      .then((response: any )=> {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(loadProducts)
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
