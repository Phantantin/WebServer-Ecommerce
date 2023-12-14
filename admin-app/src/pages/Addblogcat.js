import React, { useEffect } from 'react'
import CustomInput from '../Components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup  from 'yup';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBlogCategory, getABlogCategory, resetState, updateABlogCategory } from '../features/bcategory/bcategorySlice';
let schema = Yup.object().shape({
    title: Yup.string().required("Blog Category name is Required"),
  });

const Addblogcat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBlogCatId = location.pathname.split("/")[3];
    const newBlogCategory = useSelector((state) => state.bCategory);
    const { isSuccess, isError, isLoading, createdCategories, bCategoryName,updatedBlogCategory } = newBlogCategory;
    useEffect(()=>{
      if(getBlogCatId !== undefined){
        dispatch(getABlogCategory(getBlogCatId));
      }else{
        dispatch(resetState());
      }
    },[getBlogCatId]);
    useEffect(() => {
        if (isSuccess && createdCategories) {
        toast.success("Blog Category Added Successfullly!");
        }
        if(isSuccess && updatedBlogCategory){
        toast.success("Blog Category Update Successfullly!");
        navigate("/admin/blog-category-list");
        }
        if (isError) {
        toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          title: bCategoryName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
          if(getBlogCatId !== undefined){
            const data = { id: getBlogCatId, bCategoryData: values};
            dispatch(updateABlogCategory(data));
            dispatch(resetState());
          }else{
            dispatch(createBlogCategory(values));
            formik.resetForm();
            setTimeout(()=>{
              dispatch(resetState());
            },300);
          }
          
        },
      });
  return (
    <div>
        <h3 className="mb-4 title">
        {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
        </h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput 
                    type="text" 
                    label="Enter Blog Category" 
                    name="title"
                    onChng ={formik.handleChange("title")}
                    onBlr ={formik.handleBlur("title")}
                    val={formik.values.title}
                    id="brand"
                    />
                <div className="error">
                    {
                        formik.touched.title && formik.errors.title
                    }
                </div>
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
                </button>
            </form>
        </div>
    </div>
  )
}

export default Addblogcat