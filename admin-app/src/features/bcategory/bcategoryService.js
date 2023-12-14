import axios from 'axios';
import { base_url } from '../../utils/base_url';
import {config} from '../../utils/axiosconfig';


const getBlogCategories = async() =>{
    const response = await axios.get(`${base_url}blogcategory/`);
    return response.data;
};

const createBlogCategorie = async(blogcategory) =>{
    const response = await axios.post(`${base_url}blogcategory/`, blogcategory, config);
    return response.data;
};


const updateBlogsCategory = async(bCategory) =>{
    const response = await axios.put(`${base_url}blogcategory/${bCategory.id}`, {title:bCategory.bCategoryData.title}, config);
    return response.data;
};

const getBlogsCategory = async(id) =>{
    const response = await axios.get(`${base_url}blogcategory/${id}`, config);
    return response.data;
};

const deleteBlogsCategory = async(id) =>{
    const response = await axios.delete(`${base_url}blogcategory/${id}`, config);
    return response.data;
};



const bcategoryService = {
    getBlogCategories,
    createBlogCategorie,
    updateBlogsCategory,
    getBlogsCategory,
    deleteBlogsCategory,
};

export default bcategoryService;