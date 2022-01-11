import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {layThongTinNguoiDungAction,layThongTinLoaiNguoiDungAction,capNhatThongTinNguoiDungAction} from '../../../../redux/actions/QuanLyNguoiDungActions'
import {Form,Input,Button,Select,Row,Col} from "antd";
import {DoubleLeftOutlined} from '@ant-design/icons';

import { useFormik } from "formik";
import moment from "moment";
import {GROUPID} from '../../../../util/settings/config';
import {Link} from 'react-router-dom'


const EditUser = (props) => {
  const [componentSize, setComponentSize] = useState("default");
//   Kết nối Redux lấy thông tin phim về 
  const {thongTinTaiKhoan, loaiNguoiDung} = useSelector(state=> state.QuanLyNguoiDungReducer)

  const dispatch = useDispatch();

  useEffect(() => {
      let {id} = props.match.params;
      dispatch(layThongTinNguoiDungAction(id));

  },[])

  useEffect(() => {
    const action = layThongTinLoaiNguoiDungAction();
    dispatch(action)

},[])

  const formik = useFormik({
    // Sửa lỗi không chỉnh sửa form được : enableReinitialize:true,
      enableReinitialize:true,
      initialValues: {
        // Không cho user thay đổi trường mã phim
        taiKhoan: thongTinTaiKhoan.taiKhoan,
        matKhau: thongTinTaiKhoan.matKhau,
        email: thongTinTaiKhoan.email,
        soDt: thongTinTaiKhoan.soDt,
        "maNhom": "",
        maLoaiNguoiDung: thongTinTaiKhoan.maLoaiNguoiDung,
        hoTen: thongTinTaiKhoan.hoTen
    },

    // Lưu dữ liệu vào formdata
    onSubmit: (values) => {
      console.log("Values", values);
      values.maNhom = GROUPID;
      dispatch(capNhatThongTinNguoiDungAction(values));
    }
  });

  const handleChangeLoaiNguoiDung = (value) => {
    formik.setFieldValue('maLoaiNguoiDung', value)
  }

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (

    <Form
    onSubmitCapture={formik.handleSubmit}
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 14,
    }}
    layout="horizontal"
    initialValues={{
      size: componentSize,
    }}
    onValuesChange={onFormLayoutChange}
    size={componentSize}
  >
    <h3 style={{margin:'20px 20px'}}>Sửa người dùng</h3>

  <Row style={{ margin:'16px 16px', padding: '30px 50px' }}>
    <Col span={12}>
      <Form.Item label="Tài khoản">
        <Input name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} />
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Input type={'password'} name="matKhau" onChange={formik.handleChange} value={formik.values.matKhau} />
      </Form.Item>
      <Form.Item label="Họ tên">
      <Input name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen} />
    </Form.Item>
    <Link to={'/admin/users'}> <DoubleLeftOutlined />  Trở về</Link>
    </Col>
    <Col span={12}>
      <Form.Item label="Email">
        <Input type={'email'} name="email" onChange={formik.handleChange} value={formik.values.email} />
      </Form.Item>
      {/* <Form.Item label="Số điện thoại">
        <Input name="soDT" onChange={formik.handleChange} value={formik.values.soDt}/>
      </Form.Item> */}
      <Form.Item label="Số điện thoại">
        <Input name="soDt" onChange={formik.handleChange} value={formik.values.soDt}/>
      </Form.Item>
    <Form.Item label="Loại người dùng">
      <Select options={loaiNguoiDung?.map((lnd,index)=>({label:lnd.tenLoai,value:lnd.maLoaiNguoiDung}))}
      onChange={handleChangeLoaiNguoiDung} placeholder="Chọn loại người dùng"/>
          {/* <Select 
            options={state.loaiNguoiDung?.map((lnd,index)=>({label:lnd.tenLoai,value:lnd.maLoaiNguoiDung}))}
            onChange={handleChangeLoaiNguoiDung} placeholder="Chọn loại người dùng" /> */}
    </Form.Item>
    <Form.Item label="Tác vụ">
      <button type="submit" >Sửa</button>
    </Form.Item>
    </Col>
  </Row>
  </Form>

  );
};

export default EditUser;
