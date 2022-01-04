import {
  CHI_TIET_PHIM,
  LAY_DANH_SACH_BANNER_PHIM,
  LAY_DANH_SACH_PHIM,
} from "../actions/types/FilmType";

const stateDefault = {
  mangPhim: [],
  mangBannerPhim: [],
  chiTietPhim: {},
};

export const FilmReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LAY_DANH_SACH_PHIM: {
      state.mangPhim = action.data;
      return { ...state };
    }
    case CHI_TIET_PHIM: {
      state.chiTietPhim = action.data;
      return { ...state };
    }
    case LAY_DANH_SACH_BANNER_PHIM: {
      state.mangBannerPhim = action.mangBannerPhim;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
