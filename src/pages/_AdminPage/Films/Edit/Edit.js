import React, { useState,useEffect } from "react";
import axios from "axios";

import {Form, Input, Button, Radio, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch,useSelector } from "react-redux";
import { themPhimUploadHinhAction } from "../../../../redux/actions/types/QuanLyPhimActions";
import {capNhatPhimUploadAction, layThongTinPhimAction} from "../../../../redux/actions/QuanLyPhimAction";
import {GROUPID} from '../../../../util/settings/config';


const Edit = (props) => {
  const [componentSize, setComponentSize] = useState("default");
//   Kết nối Redux lấy thông tin phim về 
const {thongTinPhim} = useSelector(state => state.QuanLyPhimReducer);
console.log('Thông tin phim',thongTinPhim);

  const [imgSrc, setImgSrc] = useState("");
//   Gởi action lên reducer
const dispatch = useDispatch();

useEffect(() => {

    let {id} = props.match.params;
    dispatch(layThongTinPhimAction(id));
    
}, [])

  const formik = useFormik({
    // Sửa lỗi không chỉnh sửa form được : enableReinitialize:true,
      enableReinitialize:true,
      initialValues: {
        // Không cho user thay đổi trường mã phim
      maPhim: thongTinPhim.maPhim,
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      hinhAnh: null,
      
    },

    // Lưu dữ liệu vào formdata
    onSubmit: (values) => {
      values.maNhom = GROUPID;

    //   Tạo đối tượng formdata đưa giá trị values từ formik vào formdata
    let formdata = new FormData();
    for(let key in values){
        if(key!=='hinhAnh'){
            formdata.append(key,values[key]);
        }else{
          if(values.hinhAnh !== null){
            formdata.append('File', values.hinhAnh, values.hinhAnh.name);
          }
        }
    }
    // Gọi Action : Cập nhật phim upload hình
    dispatch(capNhatPhimUploadAction(formdata));
    }
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFiles = async (e) => {
    //   Lấy file ra từ e
    let file = e.target.files[0];
    console.log("file", file);

    // Tạo đối tượng để đọc file
    if (
      file.type === 'image/png' ||
      file.type === 'image/gif' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg'
    ) {
      //   Đem dữ liệu file lưu vào formik ( hàm bất đồng bộ)
      await formik.setFieldValue('hinhAnh',file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      // Hàm bất đồng bộ site express
      reader.onload = (e) => {
        console.log(e.target.result);
        // Hình base 64
        setImgSrc(e.target.result);
      };
    
    // formik.setErrors() : Dùng để validation
    }
  };

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
      <h3>Sửa phim</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim" >
        <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa} />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)} />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch("dangChieu")} checked={formik.values.dangChieu} />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch("sapChieu")} checked={formik.values.sapChieu} />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch onChange={handleChangeSwitch("hot")} checked={formik.values.hot} />
      </Form.Item>
      <Form.Item label="Số sao">
        <InputNumber
          onChange={handleChangeInputNumber("danhGia")}
          min={1}
          max={10}
          value={formik.values.danhGia}
        />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input
          type="file"
          onChange={handleChangeFiles}
          accept="image/png, image/gif, image/jpeg,image/jpg"
        />
        <br />
        <img style={{ width: 150, height: 150 }} src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} alt="..." />
      </Form.Item>
      <Form.Item label="Tác vụ">
        <button type="submit" className="bg-blue-300 text-white p-2">
          Cập nhật
        </button>
      </Form.Item>
    </Form>
  );
};

export default Edit;
