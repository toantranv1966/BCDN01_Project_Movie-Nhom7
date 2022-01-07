import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {Form,Input,Button,Select,Row,Col,Radio} from "antd";
import {DoubleLeftOutlined} from '@ant-design/icons';
import { useFormik } from "formik";
import {layThongTinLoaiNguoiDungAction,themNguoiDungAction} from '../../../../redux/actions/QuanLyNguoiDungActions'
import {GROUPID} from '../../../../util/settings/config';
import {Link} from 'react-router-dom'

const AddNewUser = () => {

  const {loaiNguoiDung} = useSelector(state=> state.QuanLyNguoiDungReducer)
  const [componentSize, setComponentSize] = useState("default");
//   Gởi action lên reducer
const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      "taiKhoan": "",
      "matKhau": "",
      "email": "",
      "soDt": "",
      "maNhom": "",
      "maLoaiNguoiDung": "",
      "hoTen": ""
    },

    // Lưu dữ liệu vào formdata
    onSubmit: (values) => {
      console.log("Values", values);
      values.maNhom = GROUPID;

      dispatch(themNguoiDungAction(values));

    //   Tạo đối tượng formdata đưa giá trị values từ formik vào formdata
    // let formData = new FormData();
    // for(let key in values){
    //   formData.append(key,values[key]);
    // }

    // dispatch(themNguoiDungAction(formData));
    },
  });

  useEffect(() => {
    const action = layThongTinLoaiNguoiDungAction();
    dispatch(action);

},[])

const handleChangeLoaiNguoiDung = (value) => {
  formik.setFieldValue('maLoaiNguoiDung', value);
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
      <h3 style={{margin:'20px 20px'}}>Thêm User</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>

    <Row style={{ margin:'16px 16px', padding: '30px 50px' }}>
      <Col span={12}>
        <Form.Item label="Tài khoản">
          <Input name="taiKhoan" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input type={'password'} name="matKhau" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Họ tên">
        <Input name="hoTen" onChange={formik.handleChange} />
      </Form.Item>
      <Link to={'/admin/users'}> <DoubleLeftOutlined />  Trở về</Link>
      </Col>
      <Col span={12}>
        <Form.Item label="Email">
          <Input type={'email'} name="email" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Số điện thoại">
        <Input name="soDt" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Loại người dùng">
            <Select 
              options={loaiNguoiDung?.map((lnd,index)=>({label:lnd.tenLoai,value:lnd.maLoaiNguoiDung}))}
              onChange={handleChangeLoaiNguoiDung} placeholder="Chọn loại người dùng" />
      </Form.Item>
      <Form.Item label="Tác vụ">
        <button type="submit" >Thêm User</button>
      </Form.Item>
      </Col>
    </Row>
    </Form>

  );
};

export default AddNewUser;
