import React from "react";
import {
  LoginButton,
  LoginDivide,
  LoginFormPanel,
  LoginInputGroup,
  LoginText,
  LoginTextValidate,
} from "./FormStyled";
import {
  FaElementor,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUserAlt,
} from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { dangKy } from "../../redux/actions/QuanLyNguoiDungActions";
import { GUI_THONG_BAO } from "../../redux/actions/types/QuanLyNguoiDungTypes";

const FormSignUp = (props) => {
  const { loginMessage } = useSelector(
    (rootReducer) => rootReducer.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();
  const formikSignUp = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      hoTen: "",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Tài khoản không được để trống"),
      matKhau: Yup.string()
        .required("Mật khẩu không được bỏ trống !")
        .min(6, "Mật tối thiểu 6 ký tự")
        .max(32, "Mật khẩu tối đa 32 ký tự"),
      email: Yup.string()
        .required("Email không được bỏ trống !")
        .email("Email không đúng định dạng"),
      soDt: Yup.string()
        .required("Số điện thoại không được bỏ trống !")
        .matches(
          /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
          "Số điện thoại không đúng định dạng"
        ),
      hoTen: Yup.string().required("Họ tên không được bỏ trống !"),
    }),
    onSubmit: (values) => {
      const action = dangKy(values);
      dispatch(action);
    },
  });
  return (
    <LoginFormPanel
      signIn={props.signIn}
      type="SignUp"
      onSubmit={formikSignUp.handleSubmit}
    >
      <h3>Đăng ký</h3>

      <LoginInputGroup>
        <span>
          <FaElementor />
        </span>
        <input
          type="text"
          placeholder="Họ và tên"
          name="hoTen"
          onChange={formikSignUp.handleChange}
          onBlur={formikSignUp.handleBlur}
        />
      </LoginInputGroup>
      {(formikSignUp.touched.hoTen && formikSignUp.errors.hoTen && (
        <LoginTextValidate>{formikSignUp.errors.hoTen}</LoginTextValidate>
      )) || <LoginDivide />}
      <LoginInputGroup>
        <span>
          <FaUserAlt />
        </span>
        <input
          type="text"
          placeholder="Tài khoản"
          name="taiKhoan"
          onChange={formikSignUp.handleChange}
          onBlur={formikSignUp.handleBlur}
        />
      </LoginInputGroup>
      {(formikSignUp.touched.taiKhoan && formikSignUp.errors.taiKhoan && (
        <LoginTextValidate>{formikSignUp.errors.taiKhoan}</LoginTextValidate>
      )) || <LoginDivide />}
      <LoginInputGroup>
        <span>
          <FaLock />
        </span>
        <input
          type="password"
          placeholder="Mật khẩu"
          name="matKhau"
          onChange={formikSignUp.handleChange}
          onBlur={formikSignUp.handleBlur}
        />
      </LoginInputGroup>
      {(formikSignUp.touched.matKhau && formikSignUp.errors.matKhau && (
        <LoginTextValidate>{formikSignUp.errors.matKhau}</LoginTextValidate>
      )) || <LoginDivide />}
      <LoginInputGroup>
        <span>
          <FaEnvelope />
        </span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={formikSignUp.handleChange}
          onBlur={formikSignUp.handleBlur}
        />
      </LoginInputGroup>
      {(formikSignUp.touched.email && formikSignUp.errors.email && (
        <LoginTextValidate>{formikSignUp.errors.email}</LoginTextValidate>
      )) || <LoginDivide />}
      <LoginInputGroup>
        <span>
          <FaPhone />
        </span>
        <input
          type="text"
          placeholder="Số điện thoại"
          name="soDt"
          onChange={formikSignUp.handleChange}
          onBlur={formikSignUp.handleBlur}
        />
      </LoginInputGroup>

      {(formikSignUp.touched.soDt && formikSignUp.errors.soDt && (
        <LoginTextValidate>{formikSignUp.errors.soDt}</LoginTextValidate>
      )) || <LoginDivide />}
      {loginMessage !== "" && (
        <LoginTextValidate>{loginMessage}</LoginTextValidate>
      )}
      <LoginButton type="submit" value="Đăng ký" />
      <LoginText>
        Bạn đã có tài khoản?{" "}
        <span
          onClick={() => {
            props.changeSignIn(!props.signIn);
            dispatch({ type: GUI_THONG_BAO, loginMessage: "" });
            formikSignUp.handleReset();
          }}
        >
          Hãy đăng nhập!
        </span>
      </LoginText>
    </LoginFormPanel>
  );
};

export default FormSignUp;
