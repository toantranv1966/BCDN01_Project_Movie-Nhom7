import {
  CHI_TIET_PHIM,
  LAY_DANH_SACH_BANNER_PHIM,
  LAY_DANH_SACH_PHIM,
} from "../actions/types/FilmType";

const stateDefault = {
  mangPhim: [],
  mangBannerPhim: [],
  chiTietPhim: {},
  isLoadSuccess: false,
};

export const FilmReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LAY_DANH_SACH_PHIM: {
      state.mangPhim = action.data;
      state.isLoadSuccess = action.isLoadSuccess;
      return { ...state };
    }
    case CHI_TIET_PHIM: {
      state.chiTietPhim = action.data;
      return { ...state };
    }
    case LAY_DANH_SACH_BANNER_PHIM: {
      state.mangBannerPhim = action.mangBannerPhim;
      state.isLoadSuccess = action.isLoadSuccess;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
