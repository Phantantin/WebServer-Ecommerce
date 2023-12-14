import React, { useEffect } from 'react'
import BreadCrumb from './../components/BreadCrumb';
import Meta from './../components/Meta';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from '../features/user/userSlice';

const loginSchema = yup.object({
    email: yup.string().email("Email Should be valid").required("Email Addres is Required"),
    password: yup.string().required("Password is Required"),
});
const Login = () => {
  const authState = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: loginSchema,
        onSubmit: values => {
          dispatch(LoginUser(values));
          navigate('/')
          // navigate("/login" )
        },
      });

  const userState = useSelector((state)=>state);
  const {user, isLoading, isError, isSuccess, message} = userState.auth;

  useEffect(()=>{
    if(isSuccess){
      navigate("/");
    }
    else{
      navigate("");
    }
  },[user, isLoading, isError, isSuccess]);
  return (
<>
 <Meta title={"Login"}/>
  <BreadCrumb title='Login'/>
    <Container class1="login-wrapper home-wrapper-2 py-5" >
            <div className="row">
                <div className="col-12">
                <div className="auth-card">
                    <h3 className='text-center mb-3'>Login</h3>
                    <div className='error text-center text-danger'>
                      {message.message === "Rejected" ? "Wrong email or password" : ""}
                    </div>
                    <form  onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15' action="">
                        <CustomInput 
                            type="email" 
                            name='email' 
                            placeholder='Email' 
                            value={formik.values.email}
                            onChange={formik.handleChange("email")}
                            onBlur={formik.handleBlur("email")}
                        />
                            <div className="error text-danger">
                              {
                                formik.touched.email && formik.errors.email
                              }
                            </div>
                            <CustomInput 
                                type="password" 
                                name='password' 
                                placeholder='Password' 
                                value={formik.values.password}
                                onChange={formik.handleChange("password")}
                                onBlur={formik.handleBlur("password")}
                                />
                                <div className="error text-danger">
                                    {
                                    formik.touched.password && formik.errors.password
                                    }
                                </div>
                        <div>
                            <Link to="/forgot-password">Forgot Passowrd?</Link>
                            <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                                <button  type="submit" className='button border-0'>Login</button>
                                <Link to="/signup" className='button signup'>SignUp</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </div>
    </Container>

</>
  )
}

export default Login