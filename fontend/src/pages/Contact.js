import React from 'react'
import BreadCrumb from './../components/BreadCrumb';
import Meta from './../components/Meta';
import {AiOutlineHome, AiOutlineMail} from 'react-icons/ai';
import {BiPhoneCall} from 'react-icons/bi'
import {BsInfoCircle} from 'react-icons/bs'
import Container from '../components/Container';
import  *as yup  from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createQuery } from './../features/contact/contactSlice';

const contactSchema = yup.object({
  name: yup.string().required("Name is Required"),
  email: yup.string().email("Email Should be valid").required("Email Addres is Required"),
  mobile: yup.string().required("Mobile no is Required"),
  comment: yup.string().required("Comment is Required"),

});
const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: values => {
      dispatch(createQuery(values));
    },
  });
  return (
  <>
    <Meta title={"Contact Us"}/>
    <BreadCrumb title='Contact Us'/>
      <Container class1="contact-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-12">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21552.54094082501!2d108.24493267859764!3d15.980844019999534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295cb3d313469c9!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiB2w6AgVHJ1eeG7gW4gdGjDtG5nIFZp4buHdCAtIEjDoG4!5e0!3m2!1svi!2s!4v1691031223149!5m2!1svi!2s" 
              width="600" 
              height="450" 
              className='border-0 w-100'
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mn-4">Contact</h3>
                  <form onSubmit={formik.handleSubmit} action="" className='d-flex flex-column gap-15'>
                    <div>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Name"
                        name="name"
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                        value={formik.values.name}
                         />
                    </div>
                    <div className='error'>
                      {
                        formik.touched.name && formik.errors.name
                      }
                    </div>
                    <div>
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder='Email'
                        name="email"
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        value={formik.values.email}
                         />
                    </div>
                    <div className='error'>
                      {
                        formik.touched.email && formik.errors.email
                      }
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        className="form-control" 
                        placeholder='Mobile'
                        name="mobile"
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                        value={formik.values.mobile}
                         />
                    </div>
                    <div className='error'>
                      {
                        formik.touched.mobile && formik.errors.mobile
                      }
                    </div>
                    <div>
                      <textarea 
                        className='w-100 form-control' 
                         id="" cols="30" 
                        name="comment"
                        onChange={formik.handleChange("comment")}
                        onBlur={formik.handleBlur("comment")}
                        value={formik.values.comment}
                        placeholder='Comments' rows="4">
                        </textarea>
                        <div className='error'>
                            {
                              formik.touched.comment && formik.errors.comment
                            }
                          </div>
                    </div>

                    <div>
                      <button className='button border-0'>Submit</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title mn-4">Get in touch with us</h3>
                  <div>
                    <ul className='ps-0'>
                      <li className='mb-3 d-flex gap-15 align-items-center'><AiOutlineHome  className='fs-5' />
                      <address className='mb-0'>
                          470, Tran Dai Nghia, Hoa Hai, Ngu Hanh Son, Da Nang.
                        </address>
                      </li>
                        
                      <li className='mb-3 d-flex gap-15 align-items-center'><BiPhoneCall className='fs-5' />
                        <a href="tel:+84 962187125">+84 962187125</a>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'><AiOutlineMail  className='fs-5' />
                        <a href="mailto:tantincva@gmail.com">tantincva@gmail.com</a>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'><BsInfoCircle  className='fs-5' />
                        <p className='mb-0'>Moday - Friday 14 PM -50 PM </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Container>
  </>
  )
}

export default Contact