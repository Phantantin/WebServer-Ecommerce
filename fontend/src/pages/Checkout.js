import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi';
import watch2 from '../images/watch-1.jpg';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {config} from '../utils/axiosConfig';
import { createAnOrder } from '../features/user/userSlice';

const shippingSchema = yup.object({
    firstName: yup.string().required("First name is Required"),
    lastName: yup.string().required("Last name is Required"),
    address: yup.string().required("Address is Required"),
    state: yup.string().required("State is Required"),
    city: yup.string().required("City is Required"),
    country: yup.string().required("Country name is Required"),
    other: yup.string().required("Other is Required"),
    pincode: yup.number().required("Pincode name is Required"),
});
const Checkout = () => {
    const dispatch = useDispatch();
    const cartState = useSelector((state)=>state?.auth?.cartProducts);
    const [totalAmount, setTotalAmount] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState({razorpayPaymentId:"", razorpayOrderId:""})
    const [cartProductState, setCartProductState] = useState([]);
    console.log(paymentInfo, shippingInfo);
    useEffect(()=>{
        let sum =0;
        for (let index = 0; index < cartState?.length; index++) {
            sum = sum+(Number(cartState[index].quantity)*cartState[index].price)
           setTotalAmount(sum);
        }
    },[cartState]);

    const formik = useFormik({
        initialValues: {
            firstName:"",
            lastName:"",
            address:"",
            state:"",
            city:"",
            country:"",
            other:"",
            pincode:"",
        },
        validationSchema: shippingSchema,
        onSubmit: values => {
            setShippingInfo(values);
            setTimeout(() => {
                checkOutHandler()
            }, 300);
        },
      });
      console.log(shippingInfo);
      const loadSript =(src)=>{
        return new Promise((resolve)=>{
            const script = document.createElement("script");
            script.src = src;
            script.onload= ()=>{
                resolve(true);
            }
            script.onerror=()=>{
                resolve(false);
            }
            document.body.appendChild(script);
        })
      }

      useEffect(()=>{
        let items =[]
        for (let index = 0; index < cartState?.length; index++) {
            items.push({
                product: cartState[index].productId._id,
                quantity: cartState[index].quantity,
                color: cartState[index].color._id,
                price: cartState[index].price
            })
        }
        setCartProductState(items)
      },[]);
      

      const checkOutHandler = async()=>{
        const res = await loadSript("http://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            alert("Razorpay SDK failed to load")
            return;
        }
        const result = await axios.post("http://localhost:4000/api/user/order/checkout",{amount: totalAmount+5},config);
        if(!result){
            alert("Somrthing went wrong")
            return;
        }
        const {amount, id: order_id, currency} = result.data.order;
        console.log(amount);
        const options = {
            key: "rzp_test_6klRPPiLay9yFG", // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: currency,
            name: "Developer's Conner",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                };

                const result = await axios.post("http://localhost:4000/api/user/order/paymentVerification", data, config);
                setPaymentInfo({
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                })
                dispatch(createAnOrder({
                    totalPrice: totalAmount, 
                    totalPriceAfterDiscount:totalAmount,
                    orderItems:cartProductState,
                    paymentInfo,
                    shippingInfo
                }))
            },
            prefill: {
                name: "Dev Corner",
                email: "tantincva@gmail.com",
                contact: "9999999999",
            },
            notes: {
                address: "Developer's Conner Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
  return (
 <>
    <Container class1="checkout-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-7">
                    <div className="checkout-left-data">
                        <h3 className="website-name">
                            Dev Corner
                        </h3>
                        <nav style={{"--bs-breadcrumb-divider": ">"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/cart" className='text-dark total-price'>
                                        Cart
                                    </Link>
                                </li>
                                &nbsp; /
                                <li className="breadcrumb-item total-price active" aria-current="page">
                                    Information
                                </li>
                                &nbsp; /
                                <li className="breadcrumb-item total-price active">
                                        Shipping
                                </li>
                                &nbsp; /
                                <li className="breadcrumb-item total-price active" aria-current="page">
                                    Payment
                                </li>
                            </ol>
                        </nav>
                        <h4 className="title total">
                            Contact Information
                        </h4>
                        <p className="user-details total">
                            Chipdeep (tantincva@gmail.com)
                        </p>
                        <h4 className='mb-3'>Shipping Address</h4>
                        <form onSubmit={formik.handleSubmit} className='d-flex flex-wrap gap-15 justify-content-between' action="">
                            <div className='w-100'>
                                <select 
                                    className='form-control form-select' 
                                    name="country" id=""
                                    onChange={formik.handleChange("country")}
                                    onBlur={formik.handleBlur("country")}
                                    value={formik.values.country}
                                    >
                                    <option value="" selected disabled>
                                        Select Country
                                    </option>
                                    <option value="India">
                                        India
                                    </option>
                                </select>
                                <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.country && formik.errors.country
                                    }
                                </div>
                            </div>
                            <div className='flex-grow-1'>
                                <input type="text" 
                                    className="form-control" 
                                    placeholder='First Name'
                                    name='firstName'
                                    onChange={formik.handleChange("firstName")}
                                    onBlur={formik.handleBlur("firstName")}
                                    value={formik.values.firstName}
                                    />
                                    <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.firstName && formik.errors.firstName
                                    }
                                    </div>
                            </div>
                            <div className='flex-grow-1'>
                                <input type="text" 
                                    className="form-control" 
                                    placeholder='Last Name'
                                    name='lastName'
                                    onChange={formik.handleChange("lastName")}
                                    onBlur={formik.handleBlur("lastName")}
                                    value={formik.values.lastName}
                                    />
                                    <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.lastName && formik.errors.lastName
                                    }
                                    </div>
                            </div>
                            <div className='w-100'>
                                <input type="text" 
                                    className="form-control"
                                    placeholder='Address'
                                    name='address'
                                    onChange={formik.handleChange("address")}
                                    onBlur={formik.handleBlur("address")}
                                    value={formik.values.address}
                                    />
                                    <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.address && formik.errors.address
                                    }
                                    </div>
                            </div>
                            <div className='w-100'>
                                <input type="text" 
                                    className="form-control" 
                                    placeholder='Apartment, Suite, etc'
                                    name='other'
                                    onChange={formik.handleChange("other")}
                                    onBlur={formik.handleBlur("other")}
                                    value={formik.values.other}
                                    />
                                    <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.other && formik.errors.other
                                    }
                                    </div>
                            </div>
                            <div className='flex-grow-1'>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder='City'
                                    name='city'
                                    onChange={formik.handleChange("city")}
                                    onBlur={formik.handleBlur("city")}
                                    value={formik.values.city}
                                    />
                                    <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.city && formik.errors.city
                                    }
                                    </div>
                            </div>
                            <div className='flex-grow-1'>
                                <select 
                                    className='form-control form-select' 
                                    name='state'
                                    onChange={formik.handleChange("state")}
                                    onBlur={formik.handleBlur("state")}
                                    value={formik.values.state}
                                    id="">
                                    <option value="" selected disabled>
                                        Select State
                                    </option>
                                    <option value="Haryana">
                                        Haryana
                                    </option>
                                </select>
                                    <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.state && formik.errors.state
                                    }
                                    </div>
                            </div>
                            <div className='flex-grow-1'>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder='zipCode'
                                    name='pincode'
                                    onChange={formik.handleChange("pincode")}
                                    onBlur={formik.handleBlur("pincode")}
                                    value={formik.values.pincode}
                                    />
                                    <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.pincode && formik.errors.pincode
                                    }
                                    </div>
                            </div>
                            <div className="w-100">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to="/cart" className='text-dark'>
                                        <BiArrowBack className='me-2' />
                                        Return to cart
                                    </Link>
                                    <Link to="/cart" className='button'>
                                        Continue to Shipping
                                    </Link>
                                    <button  className='button' type='submit'>Pleace Order</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-5">
                    <div className='border-bottom py-4'>
                        {
                            cartState && cartState?.map((item, index)=>{
                                return(
                                    <div key={index} className="d-flex gap-10 mb-2 align-items-center">
                                        <div className='w-75 d-flex gap-10'>
                                            <div className='w-25 position-relative'>
                                                <span style={{top: "-10px", right: "2px"}} className="badge bg-secondary text-white rounded-circle p-2 position-absolute">
                                                    {item?.quantity}
                                                </span>
                                                <img width={100} height={100} src={item?.productId?.images[0]?.url} alt="" />
                                            </div>
                                            <div>
                                                <h5 className='total-price'>{item?.productId?.title}</h5>
                                                <p className='total-price'>{item?.color?.title}</p>
                                            </div>
                                        </div>
                                            <div className='flex-grow-1'>
                                                <h5 className='total'>$ {item?.price * item?.quantity}</h5>
                                            </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                    <div className='border-bottom py-4'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='total'>Subtotal</p>
                            <p className='total-price'>$ {totalAmount?totalAmount: "0"}</p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='mb-0 total'>Shipping</p>
                            <p className='mb-0 total-price'>$ 5</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
                        <h4 className='total'>Total</h4>
                        <h5 className='total-price'>$ {totalAmount?totalAmount+5: "0"}</h5>
                    </div>
                </div>
        </div>
    </Container>
 </>
  )
}

export default Checkout