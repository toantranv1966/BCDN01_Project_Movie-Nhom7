import React, { useState } from "react";
import { Form, Input, Radio, DatePicker, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { themPhimUploadHinhAction } from "../../../../redux/actions/types/QuanLyPhimActions";
import { GROUPID } from "../../../../util/settings/config";

const AddNewFilm = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  //   Gởi action lên reducer
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },

    // Lưu dữ liệu vào formdata
    onSubmit: (values) => {
      values.maNhom = GROUPID;

      //   Tạo đối tượng formdata đưa giá trị values từ formik vào formdata
      let formdata = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formdata.append(key, values[key]);
        } else {
          formdata.append("File", values.hinhAnh, values.hinhAnh.name);
        }
    }
      dispatch(themPhimUploadHinhAction(formdata));
    },
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
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

  const handleChangeFiles = (e) => {
    //   Lấy file ra từ e
    let file = e.target.files[0];
    console.log("file", file);

    // Tạo đối tượng để đọc file
    if (
      file.type === "image/png" ||
      file.type === "image/gif" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        console.log(e.target.result);
        // Hình base 64
        setImgSrc(e.target.result);
      };
      //   Đem dữ liệu file lưu vào formik
      formik.setFieldValue("hinhAnh", file);
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
      <h3>Thêm mới phim</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim">
        <Input name="tenPhim" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name="trailer" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input name="moTa" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch("dangChieu")} />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch("sapChieu")} />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch onChange={handleChangeSwitch("hot")} />
      </Form.Item>
      <Form.Item label="Số sao">
        <InputNumber
          onChange={handleChangeInputNumber("danhGia")}
          min={1}
          max={10}
        />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input
          type="file"
          onChange={handleChangeFiles}
          accept="image/png, image/gif, image/jpeg,image/jpg"
        />
        <br />
        <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
      </Form.Item>
      <Form.Item label="Tác vụ">
        <button type="submit" className="bg-blue-300 text-white p-2">
          Thêm phim
        </button>
      </Form.Item>
    </Form>
  );
};

export default AddNewFilm;
