import React, { Component } from 'react';
import '../Login/AdminLogin.css';
import { Formik, Form, Field, useFormik, ErrorMessage } from 'formik';
import { Link, NavLink } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungActions';
import * as yup from "yup";
import axios from 'axios';
import { values } from 'lodash';

const signupUserSchema = yup.object().shape({
    taiKhoan: yup.string().required("* Field is required!"),
    matKhau: yup.string().min(4).max(8).required("* Field is required!"),
    hoTen: yup.string().required("* Field is required!"),
    email: yup.string().required("* Field is required!").email("* email is invalid!"),
    soDt: yup.string().required("* Field is required!").matches(/[0-9]+$/),
    maNhom: yup.string().required("* Field is required!")
});

function SignUpScreen() {

    const dispatch = useDispatch();

    const _handleSubmit = values => {
        console.log(values);

        const action = dangKyAction(values);
        dispatch(action);
    }
    
  return <div className='login'>
  <Link to='/'>
      <img 
      className='login_logo' src='./logocybersoft.png'
      alt="logocybersoft" />
  </Link>
  <div className="login_container">
      <h1> Đăng ký</h1>
      <Formik
          initialValues={{
              taiKhoan: '',
              matKhau: '',
              email: '',
              soDt: '',
              maNhom: 'GP01',
              hoTen:'' 
          }}
      validationSchema={signupUserSchema}
      onSubmit={_handleSubmit} 
      render = {formikProps => (
          <Form>
              <h5>Tài khoản</h5>
              <Field
               name="taiKhoan"
               onChange={formikProps.handleChange}
               placeholder="Nhập tài khoản" 
               type='text'/>
               <ErrorMessage name='taiKhoan'>
                   {msg=><div>{msg}</div>}
               </ErrorMessage>
              <h5>Mật khẩu</h5>
              <Field name="matKhau" type="password" onChange={formikProps.handleChange} placeholder="Nhập mật khẩu" />
              <ErrorMessage name='matKhau'/>
              <h5>Email</h5>
              <Field name="email" type="text" onChange={formikProps.handleChange} placeholder="Nhập email" />
              <ErrorMessage name='email'/>
              <h5>Số điện thoại</h5>
              <Field name="soDt" type="text" onChange={formikProps.handleChange} placeholder="Nhập số điện thoại" />
              <ErrorMessage name='soDt'/>
              <h5>Họ tên</h5>
              <Field name="hoTen" type="text" onChange={formikProps.handleChange} placeholder="Nhập họ tên" />
              <ErrorMessage name='hoTen'/>
              <button className='login_signInButton'>Đăng ký</button>
          </Form>
      )}>
      </Formik>
  </div>
</div>;
}

export default SignUpScreen
