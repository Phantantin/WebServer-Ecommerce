import React, { useEffect } from 'react'
import CustomInput from '../Components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup  from 'yup';
import { useFormik } from 'formik';
import { createCategory, getAProductCategory, resetState, updateAProductCategory } from '../features/pcategory/pcategorySlice';
import { useLocation, useNavigate } from 'react-router-dom';

let schema = Yup.object().shape({
    title: Yup.string().required("Category name is Required"),
  });

const Addcat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location =  useLocation();
    const getpCategoryId = location.pathname.split("/")[3];
    const newCategory = useSelector((state) => state.pCategory);
    const { isSuccess, isError, isLoading, createdCategory, categoryName, updatedCategory } = newCategory;
    useEffect(()=>{
      if(getpCategoryId !== undefined){
        dispatch(getAProductCategory(getpCategoryId));
      }else{
        dispatch(resetState());
      }
    },[getpCategoryId]);
    useEffect(() => {
        if (isSuccess && createdCategory) {
        toast.success("Category Added Successfullly!");
        }
        if(isSuccess && updatedCategory){
        toast.success("Category Update Successfullly!");
        navigate("/admin/list-category");
        }
        if (isError) {
        toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading]);

    const formik = useFormik({
      enableReinitialize: true,
        initialValues: {
          title: categoryName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
          if(getpCategoryId !== undefined){
            const data = {id: getpCategoryId, categoryData: values};
            dispatch(updateAProductCategory(data));
            dispatch(resetState());
          }else{
            dispatch(createCategory(values));
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
        {getpCategoryId !== undefined ? "Edit" : "Add"}  Category
        </h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput 
                    type="text" 
                    label="Enter Category" 
                    name="title"
                    onChng={formik.handleChange("title")}
                    onBlr={formik.handleBlur("title")}
                    val={formik.values.title}
                    id="brand"
                />
                <div className="error">
                    {
                        formik.touched.title && formik.errors.title
                    }
                 </div>
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                {getpCategoryId !== undefined ? "Edit" : "Add"} Category
                </button>
            </form>
        </div>
    </div>
  )
}

export default Addcat