import axios from 'axios';
import { base_url } from '../../utils/base_url';
import {config} from '../../utils/axiosconfig';


const getProductsCategories = async() =>{
    const response = await axios.get(`${base_url}category/`);
    return response.data;
};

const createCategory = async(category) =>{
    const response = await axios.post(`${base_url}category/`, category, config);
    return response.data;
};

const updateProductsCategory = async(category) =>{
    const response = await axios.put(`${base_url}category/${category.id}`, {title:category.categoryData.title}, config);
    return response.data;
};

const getProductsCategory = async(id) =>{
    const response = await axios.get(`${base_url}category/${id}`, config);
    return response.data;
};

const deleteProductsCategory = async(id) =>{
    const response = await axios.delete(`${base_url}category/${id}`, config);
    return response.data;
};


const pcategoryService = {
    getProductsCategories,
    createCategory,
    updateProductsCategory,
    getProductsCategory,
    deleteProductsCategory,
};

export default pcategoryService;