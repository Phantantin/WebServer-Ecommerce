import React, { useEffect, useState } from 'react'
import CustomInput from '../Components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup  from 'yup';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { createCoupon, getACoupon, resetState, updateACoupon } from '../features/coupon/couponSlice';

let schema = Yup.object().shape({
    name: Yup.string().required("Coupon name is Required"),
    expriry: Yup.date().required("Expriry date is Required"),
    discount: Yup.number().required("Discount Percentage is Required"),

  });

const AddCoupon = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const getCouponId = location.pathname.split("/")[3];
    const navigate = useNavigate();
    const newCoupon= useSelector((state) => state.coupon);
    const { isSuccess, isError, isLoading, 
        createdCoupon, couponName, couponDiscount, couponExpriry, updatedCoupon } = newCoupon;
        
// console.log(dataCoupon.name);
    const changeDateFormet = (date)=>{
        const newDate = new Date(date).toLocaleDateString();
        const [day, month, year] = newDate.split("/");
        return [year, month, day].join("-");
        // const [month, day, year] = newDate.split("/");
        // return [year, day, month].join("-");
    };
    useEffect(()=>{
        if(getCouponId!==undefined){
            dispatch(getACoupon(getCouponId));
        }else{
            dispatch(resetState());
        }
    },[getCouponId]);
    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success("Coupon Added Successfullly!");
          }
        if (isSuccess && updatedCoupon  ) {
            toast.success("Coupon Update Successfullly!");
            navigate("/admin/coupon-list");
          }
        if (isError && couponName && couponDiscount && couponExpriry  ) {
            toast.error("Something Went Wrong!");
          }
    }, [isSuccess, isError, isLoading]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
        name: couponName || "",
        expriry: changeDateFormet(couponExpriry) || "",
        discount: couponDiscount || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if(getCouponId !== undefined){
                const data = {id: getCouponId, couponData: values};
                dispatch(updateACoupon(data));
                dispatch(resetState());

            }else{
                dispatch(createCoupon(values));
                formik.resetForm();
                setTimeout(()=>{
                navigate("/admin/coupon-list");
                dispatch(resetState());
                },300);
                }
        },
      });

  return (
    <div>
        <h3 className="mb-4 title">
        {getCouponId!==undefined ? "Edit" : "Add"} Coupon
        </h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput 
                    type="text"
                    name="name"
                    onChng={formik.handleChange("name")}
                    onBlr={formik.handleBlur("name")}
                    val={formik.values.name}
                    label="Enter Coupon Name"
                    id="name"
                    />
                    <div className="error">
                        {
                            formik.touched.name && formik.errors.name
                        }
                    </div>
                <CustomInput 
                    id="date"
                    type="date" 
                    label="Enter Expriry Date" 
                    name="expriry"
                    onChng ={formik.handleChange("expriry")}
                    onBlr ={formik.handleBlur("expriry")}
                    val={formik.values.expriry}
                    />
                    <div className="error">
                        {
                            formik.touched.expriry && formik.errors.expriry
                        }
                    </div>
                <CustomInput 
                    id="discount"
                    type="number" 
                    label="Enter Discount" 
                    name="discount"
                    onChng ={formik.handleChange("discount")}
                    onBlr ={formik.handleBlur("discount")}
                    val={formik.values.discount}
                    />
                    <div className="error">
                        {
                            formik.touched.discount && formik.errors.discount
                        }
                    </div>
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                {getCouponId!==undefined ? "Edit" : "Add"} Coupon
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddCoupon;