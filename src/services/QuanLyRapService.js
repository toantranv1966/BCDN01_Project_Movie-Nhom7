import { baseService } from "./baseService";
// import {GROUPID} from '../util/settings/config';

// import React from 'react'

export default class QuanLyRapService extends baseService {
  // constructor() {
  //     super();
  // }

  layThongTinHeThongRap = () => {
    return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
  };

  layThongTinCumRam = (maHeThongRap) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
  };
}

export const quanLyRapService = new QuanLyRapService();
