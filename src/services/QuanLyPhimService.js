import { baseService } from "./baseService";
import { GROUPID } from "../util/settings/config";

export class QuanLyPhimService extends baseService {
  // constructor(){
  //     super();
  // }

  layDanhSachBanner = () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
  };

  layDanhSachPhim = (tenPhim = "") => {
    if (tenPhim.trim() !== "") {
      return this.get(
        `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`
      );
    }
    return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
  };

  themPhimUploadHinh = (formData) => {
    return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData);
  };

<<<<<<< HEAD
    layDanhSachPhim = (tenPhim='') => {
        if(tenPhim.trim()!==''){
            return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`);
        }
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
    }
=======
  layThongTinPhim = (maPhim) => {
    return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  };
>>>>>>> minh_duc

  CapNhatPhimUpload = (formData) => {
    return this.post(`api/QuanLyPhim/CapNhatPhimUpload`, formData);
  };

<<<<<<< HEAD
    layThongTinPhim = (maPhim) => {
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    }

    CapNhatPhimUpload = (formData) => {
        return this.post(`api/QuanLyPhim/CapNhatPhimUpload`,formData)
    }

    xoaPhim = (maPhim) => {
        return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`) 
    }
    
=======
  xoaPhim = (maPhim) => {
    return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  };
>>>>>>> minh_duc
}

export const quanLyPhimService = new QuanLyPhimService();
