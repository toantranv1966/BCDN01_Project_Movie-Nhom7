import axios from "axios";

export const domain = "http://movieapi.cyberlearn.vn";
const myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwMSIsIkhldEhhblN0cmluZyI6IjEyLzA0LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0OTcyMTYwMDAwMCIsIm5iZiI6MTYyMDkyNTIwMCwiZXhwIjoxNjQ5ODY5MjAwfQ.RkFKrifGWTY3MP0bQtIpvA5WpWWrcSkGjDSw01LwhuI";
//Cấu hình interceptor (cấu hình sẵn những tham số mặc định cho tất cả api)
export const http = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn",
  timeout: 30000,
});
http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      TokenCybersoft: myToken,
      Authorization: `Bearer ${myToken}`,
    };
    return config;
  },
  (errors) => {
    return Promise.reject(errors);
  }
);
