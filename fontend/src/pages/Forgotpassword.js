import React from 'react'
import BreadCrumb from './../components/BreadCrumb';
import Meta from './../components/Meta';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordToken } from '../features/user/userSlice';

const emailSchema = yup.object({
    email: yup.string().email("Email Should be valid").required("Email Addres is Required"),
    
});

const Forgotpassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          email: "",
        },
        validationSchema: emailSchema,
        onSubmit: values => {
          dispatch(forgotPasswordToken(values));
        },
      });

      
  return (
<>
    <Meta title={"Forgotpassword"}/>
    <BreadCrumb title='Forgotpassword'/>
    <Container class1="login-wrapper home-wrapper-2 py-5" >
            <div className="row">
                <div className="col-12">
                <div className="auth-card">
                    <h3 className='text-center mb-3'>Reset Your Password</h3>
                    <p className="text-center mt-2 mb-3">
                        We will send you an email to reset your password
                    </p>
                    <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15' action="">
                        <CustomInput type="email" name='email' placeholder='Email'
                            value={formik.values.email}
                            onChange={formik.handleChange("email")}
                            onBlur={formik.handleBlur("email")}
                        />
                        <div className="error text-danger">
                              {
                                formik.touched.email && formik.errors.email
                              }
                            </div>
                        
                        <div>
                            <div className="mt-3 d-flex flex-column justify-content-center align-items-center gap-15">
                                <button className='button border-0' type="submit">Submit</button>
                                <Link to="/login">Cancel</Link>
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

export default Forgotpassword