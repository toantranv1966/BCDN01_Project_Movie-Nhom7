import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../Login/AdminLogin.css'
import { ErrorMessage, useFormik } from 'formik';
import {useDispatch,useSelector} from 'react-redux';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungActions';
import * as yup from "yup";
import {UserSchema} from "../../Validations/UserValidations";

function Register() {

    const dispatch = useDispatch();

    const Formik = useFormik({
        initialValues: {
          taiKhoan: '',
          matKhau: '',
          email: '',
          soDt: '',
          maNhom: 'GP01',
          hoTen:''
        },
        onSubmit: values => {
          console.log("Values",values);
    
            const action = dangKyAction(values);
            dispatch(action);

        },
      });
    
    return (
        <div className='login'>
            <Link to='/'>
                <img 
                className='login_logo' src='./logocybersoft.png'
                alt="logocybersoft" />
            </Link>
            <div className="login_container">
                <h1> Đăng ký</h1>
                <form onSubmit={async (event) => {
                    event.preventDefault();
                    Formik.handleSubmit(event);
                    const isValid = await UserSchema.isValid(Formik);
                    console.log(isValid);
                    }}>
                    <h5>Tài khoản</h5>
                    <input name="taiKhoan" onChange={Formik.handleChange} placeholder="Nhập tài khoản" type='text'/>
                    <h5>Mật khẩu</h5>
                    <input name="matKhau" type="password" onChange={Formik.handleChange} placeholder="Nhập mật khẩu" />
                    <h5>Email</h5>
                    <input name="email" type="email" onChange={Formik.handleChange} placeholder="Nhập email" />
                    <h5>Số điện thoại</h5>
                    <input name="soDt" type="number" onChange={Formik.handleChange} placeholder="Nhập số điện thoại" />
                    <h5>Họ tên</h5>
                    <input name="hoTen" type="text" onChange={Formik.handleChange} placeholder="Nhập họ tên" />
                    <button className='login_signInButton'>Đăng ký</button>
                </form>
            </div>
        </div>
    )
}

export default Register
