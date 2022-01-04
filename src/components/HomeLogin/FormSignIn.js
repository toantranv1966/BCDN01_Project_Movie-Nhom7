import React from "react";
import {
  LoginButton,
  LoginDivide,
  LoginFormPanel,
  LoginInputGroup,
  LoginText,
  LoginTextValidate,
} from "./FormStyled";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { dangNhap } from "../../redux/actions/QuanLyNguoiDungActions";
import { GUI_THONG_BAO } from "../../redux/actions/types/QuanLyNguoiDungTypes";

const FormSignIn = (props) => {
  const { loginMessage } = useSelector(
    (rootReducer) => rootReducer.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Tài khoản không được để trống"),
      matKhau: Yup.string().required("Mật khẩu không được bỏ trống !"),
    }),
    onSubmit: (values) => {
      const action = dangNhap(values);
      dispatch(action);
    },
  });
  return (
    <LoginFormPanel
      signIn={props.signIn}
      type="SignIn"
      onSubmit={formik.handleSubmit}
    >
      <h3>Đăng nhập</h3>
      <LoginInputGroup>
        <span>
          <FaUserAlt />
        </span>
        <input
          type="text"
          placeholder="Tài khoản"
          name="taiKhoan"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </LoginInputGroup>
      {(formik.touched.taiKhoan && formik.errors.taiKhoan && (
        <LoginTextValidate>{formik.errors.taiKhoan}</LoginTextValidate>
      )) || <LoginDivide />}
      <LoginInputGroup>
        <span>
          <FaLock />
        </span>
        <input
          type="password"
          placeholder="Mật khẩu"
          name="matKhau"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </LoginInputGroup>
      {(formik.touched.matKhau && formik.errors.matKhau && (
        <LoginTextValidate>{formik.errors.matKhau}</LoginTextValidate>
      )) || <LoginDivide />}
      {loginMessage !== "" && (
        <LoginTextValidate>{loginMessage}</LoginTextValidate>
      )}
      <LoginButton type="submit" value="Đăng nhập" />
      <LoginText>
        Bạn chưa có tài khoản?{" "}
        <span
          onClick={() => {
            props.changeSignUp(!props.signIn);
            dispatch({ type: GUI_THONG_BAO, loginMessage: "" });
            formik.handleReset();
          }}
        >
          , Hãy đăng ký!
        </span>
      </LoginText>
    </LoginFormPanel>
  );
};

export default FormSignIn;
