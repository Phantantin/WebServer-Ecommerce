import React, { useEffect, useState } from 'react';
import CustomInput from '../Components/CustomInput';
import ReactQuill from 'react-quill';
import { ToastContainer, toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBlog, getABlog, resetState, updateABlog } from '../features/blogs/blogSlice';
import { getCategories } from './../features/bcategory/bcategorySlice';

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  category: Yup.string().required("Category is Required"),
});
const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  const [images, setImages] = useState([]);

  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state)=> state.bCategory.bCategories);
  const newBlog = useSelector((state)=> state.blog);
  const { isSuccess, isError, isLoading, createdBlog, 
    blogName, blogDesc, blogCategory, blogImages, updatedBlog } = newBlog;
    useEffect(()=>{
      if(getBlogId!==undefined){
        dispatch(getABlog(getBlogId));
        img.push(blogImages);
      }else{
        dispatch(resetState());
      }
      },[getBlogId]);
      useEffect(()=>{
        dispatch(resetState());
        dispatch(getCategories());
      },[]);
  

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Product Added Successfullly!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Product Update Successfullly!");
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i)=>{
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  useEffect(()=>{
    formik.values.images= img;
  },[blogImages]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      category: blogCategory || "",
      images: blogImages ||"",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getBlogId!==undefined){
        const data = {id: getBlogId, blogData: values};
        dispatch(updateABlog(data));
        dispatch(resetState());
      }else{
        dispatch(createBlog(values));
        formik.resetForm();
        setTimeout(()=>{
          dispatch(resetState());
        },300);
      }
    },
  });

  return (
    <div>
        <h3 className='mb-4 title'>
          {getBlogId!==undefined ? "Edit" : "Add"} Blog</h3>
        
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <div className='mt-4'>
                    <CustomInput 
                      type="text" 
                      label="Enter Blog Title" 
                      name="title"
                      onChng ={formik.handleChange("title")}
                      onBlr ={formik.handleBlur("title")}
                      val={formik.values.title}
                      />
                </div>
                <div className="error">
                  {
                    formik.touched.title && formik.errors.title
                  }
                </div>
                <select 
                  className='form-control py-3 mt-3' 
                  name="category"
                  onChange ={formik.handleChange("category")}
                  onBlur ={formik.handleBlur("category")}
                  value={formik.values.category}
                  id="">
                    <option value="">Select Blog Category</option>
                    {bCatState.map((i, j)=>{
                      return (
                        <option key={j} value={i.title}>
                          {i.title}
                        </option>
                      )
                      })
                    }
                </select>
                <div className="error">
                  {
                    formik.touched.category && formik.errors.category
                  }
                </div>
                <ReactQuill 
                    theme="snow" 
                    className='mt-3'
                    name="description"
                    onChange ={formik.handleChange("description")}
                    value={formik.values.description}
                />
                <div className="error">
                  {
                    formik.touched.description && formik.errors.description
                  }
                </div>
                <div className='bg-white border-1 p-5 text-center mt-3'>
                  <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                    {({getRootProps, getInputProps}) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
                <div className="showimages d-flex flex-wrap gap-3">
                  {imgState?.map((i,j)=>{
                    return (
                      <div className='position-relative' key={j}>
                        <button 
                          type="button"
                          onClick={()=> dispatch(delImg(i.public_id))}
                          className='btn-close position-absolute' 
                          style={{top: "10px",right: "10px"}}
                          >

                          </button>
                        <img src={i.url} alt="" width={200} height={200}/>
                      </div>
                    );
                  })}
                </div>
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                {getBlogId!==undefined ? "Edit" : "Add"} Blog
                </button>
            </form>
        </div>
    </div>
  )
}

export default Addblog