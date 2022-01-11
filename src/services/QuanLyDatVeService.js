import { baseService } from "./baseService";
// import { GROUPID } from "../util/settings/config";

// import React, { Component } from "react";

export default class QuanLyDatVeService extends baseService {
  // constructor() {
  //     super();
  // }

  taoLichChieu = (thongTinLichChieu) => {
    return this.post(`/api/QuanLyDatVe/TaoLichChieu`, thongTinLichChieu);
  };
}

export const quanLyDatVeService = new QuanLyDatVeService();
