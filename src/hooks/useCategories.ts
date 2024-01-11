import { useEffect, useState } from 'react'
import productsApi from '../api/productsApi'
import { Categoria, CategoriesResponse } from '../interfaces/appInterfaces'

export const useCategories = () => {
    const [categories, setCategories] = useState<Categoria[]>([])

    const getCategories = async () => {
        const {data} = await productsApi.get<CategoriesResponse>('/categorias')
        setCategories(data.categorias)
    }

    useEffect(()=> {
        getCategories()
    },[])
  return {categories}
}
