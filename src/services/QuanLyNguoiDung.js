import { baseService } from "./baseService";
import { GROUPID } from "../util/settings/config";

export class QuanLyNguoiDungService extends baseService {
  layDanhSachNguoiDung = (tukhoa = "") => {
    if (tukhoa.trim() !== "") {
      return this.get(
        `api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${tukhoa}`
      );
    }
    return this.get(
      `api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
    );
  };

  dangNhap = (thongTinDangNhap) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };

  dangKy = (thongTinDangKy) => {
    return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
  };

  layDanhSachLoaiNguoiDung = () => {
    return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
  };

  themNguoiDung = (formData) => {
    return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, formData);
  };

  layThongTinNguoiDung = (tuKhoa) => {
    return this.post(
      `/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${tuKhoa}`
    );
  };

  layThongTinLoaiNguoiDungAction = () => {
    return this.get(
      `api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung?MaNhom=${GROUPID}`
    );
  };
  s;
  capNhatThongTinNguoiDung = (formData) => {
    return this.post(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, formData);
  };

  xoaNguoiDung = (taiKhoan) => {
    return this.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
