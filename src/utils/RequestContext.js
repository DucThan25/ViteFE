import axios from "axios";
import token from "../plugins/token";
import menu from "./menu";

export default {
  async getOriginal(url, params) {
    var instance = axios.create();
    instance.interceptors.request.use(request => {
      request.baseURL = import.meta.env.VNPT_API;
      request.headers = {
        "Content-Type": "application/json",
        Authorization: token.getAuthorization(),
    //     SelectedMenuId: this.getCurrentMenuItemID(),
		// SelectedPath: this.getCurrentPath()
      };
      request.data = {};
      return request;
    });
    var begin = Date.now();
    var r = await instance.get(url, { params: params });
    if (import.meta.env.MODE !== "production") {
      console.info(
        "url: " + url + " (" + (Date.now() - begin) + "ms)"
      );
    }
    return r;
  },
  async get(url, params) {
    var r = await this.getOriginal(url, params)
    return r;
  },
  async postOriginal(url, data) {
    var instance = axios.create();
    instance.interceptors.request.use(request => {
      request.baseURL = import.meta.env.VNPT_API;
      request.headers = {
        "Content-Type": "application/json",
        Authorization: token.getAuthorization(),
    //     SelectedMenuId: this.getCurrentMenuItemID(),
		// SelectedPath: this.getCurrentPath()
      };
      return request;
    });
    var begin = Date.now();
    var r = await instance.post(url, data);
    if (import.meta.env.MODE !== "production") {
      console.info(
        "url: " + url + " (" + (Date.now() - begin) + "ms)"
      );
    }
    return r;
  },
  async postForm(url, data) {
    var instance = axios.create();
    instance.interceptors.request.use(request => {
      request.baseURL = import.meta.env.VNPT_API;
      request.headers = {
        "Content-Type": "multipart/form-data",
        Authorization: token.getAuthorization(),
      };
      return request;
    });
    var begin = Date.now();
    var r = await instance.post(url, data);
    if (import.meta.env.MODE !== "production") {
      console.info(
        "url: " + url + " (" + (Date.now() - begin) + "ms)"
      );
    }
    return r;
  },
  async post(url, data) {
    var r = await this.postOriginal(url, data);
    return r;
  },
  async postfile(url, data) {
    var r = await this.postForm(url, data);
    return r;
  },
  async getWithOutToken(url, params) {
    var instance = axios.create();

    instance.interceptors.request.use(request => {
      request.baseURL = import.meta.env.VNPT_API;
      request.headers = {
        "Content-Type": "application/json",
      };
      return request;
    });
    var r = await instance.get(url, { params: params });
    return r;
  },
  async postWithOutToken(url, data) {
    var instance = axios.create();
    instance.interceptors.request.use(request => {
      request.baseURL = import.meta.env.VNPT_API;
      request.headers = {
        "Content-Type": "application/json",
      };
      return request;
    });
    var begin = Date.now();
    var r = await instance.post(url, data).then(function (response) {
      console.info(
        "url: " + url + " (" + (Date.now() - begin) + "ms)"
      );
      return response;
    });
    return r;
  },
  // getCurrentMenuItemID(){
  //   return menu.getCurrentMenuItemID();
  // },
  // getCurrentPath(){
  //   return menu.getCurrentPath();
  // },
  // /**
  //  *
  //  * @param {*} url Giá trị đường dẫn hình ảnh trên máy chủ. Ví dụ: ECMS/26/2021-09-13/cdd0c32c-3891-4c6f-88cb-2bb300ac322f/1.jpg
  //  * @param {*} module nơi lưu trữ hình ảnh: ECMS, CABMAN, SUCO. Ví dụ: ECMS
  //  * @returns địa chỉ xem hình ảnh trên máy chủ
  //  */
  // viewImageUrl(url, module) {
  //   url = "/storage/viewImage?imageSource=" + url;
  //   switch (module) {
  //     case "ECMS":
  //       url = "/web-ecms" + url;
  //       break;
  //     case "CABMAN":
  //       url = "/web-cabman" + url;
  //       break;
  //     case "SUCO":
  //       url = "/web-suco" + url;
  //       break;
  //     default:
  //       url = "/web-ecms" + url;
  //       break;
  //   }
  //   return import.meta.env.VNPT_API + url;
  // }
}
