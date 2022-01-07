import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AdminLogin.css';
import { useFormik } from 'formik';
import {useDispatch,useSelector} from 'react-redux';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungActions';

function AdminLogin() {

    const dispatch = useDispatch();

    const {userLogin} = useSelector(state=>state.QuanLyNguoiDungReducer);

    const Formik = useFormik({
        initialValues: {
          taiKhoan: '',
          matKhau: '',
        },
        onSubmit: values => {
    
            const action = dangNhapAction(values);
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
                <h1> Đăng nhập</h1>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    Formik.handleSubmit(event);
                    }}>
                    <h5>Tài khoản</h5>
                    <input name="taiKhoan" onChange={Formik.handleChange} placeholder="Nhập tài khoản" type='text'/>
                    <h5>Mật khẩu</h5>
                    <a>
                        Quên mật khẩu ?
                    </a>
                    <input name="matKhau" type="password" onChange={Formik.handleChange} placeholder="Nhập mật khẩu" />
                    <button className='login_signInButton'>Đăng nhập</button>
                </form>
                <button className='login_registerButton'>
                <NavLink to="/register">Đăng ký tài khoản</NavLink></button>
            </div>
        </div>
    )
}

export default AdminLogin
