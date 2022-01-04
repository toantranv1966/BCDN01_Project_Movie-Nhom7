import { LAY_DANH_SACH_PHONG_VE } from "../actions/types/QuanLyVeType";

const stateDefault = {
  thongTinSuatChieu: {},
  danhSachGheDuocChon: [],
};

export const QuanLyVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LAY_DANH_SACH_PHONG_VE: {
      return {
        ...state,
        thongTinSuatChieu: action.thongTinSuatChieu,
      };
    }

    default:
      return { ...state };
  }
};
