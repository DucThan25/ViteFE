import requestContext from "../utils/RequestContext";

export default {
    install: function (app, options) {
        var auth = app.config.globalProperties.$auth;

        app.config.globalProperties.$_root = {
          context: {
            get: async function (url, params) {
              return await requestContext.get(url, params);
            },
            post: async function (url, data) {
              return await requestContext.post(url, data);
            },
            postForm: async function (url, data) {
              return await requestContext.postForm(url, data);
            },
            getWithOutToken: async function (url, params) {
              return await requestContext.getWithOutToken(url, params);
            },
            postWithOutToken: async function (url, data) {
              return await requestContext.postWithOutToken(url, data);
            },
            viewImageUrl: function (url, module) {
              return requestContext.viewImageUrl(url, module);
            },
            getMenu: function () {
              return auth.getMenuFromStorage();
            },
            getMenuItemParents: function (parentID, menuItems) {
              let rs = [];
              let parent = menuItems.find((x) => x.id == parentID);
              if (parent != null) {
                rs.push(parent);
                if (parent.p_id != null) {
                  let ps = this.getMenuItemParents(parent.p_id, menuItems);
                  if (!(ps == null || ps.length == 0)) {
                    for (let i = 0; i < ps.length; i++) {
                      rs.push(ps[i]);
                    }
                  }
                }
              }
              return rs;
            },
            getMenuItem: function (url) {
              let menuItems = this.getMenu();
              return menuItems.find((x) => this.getHref(x.url) == url);
            },
            getMenuPath: function (url) {
              let rs = [];
              let menuItems = this.getMenu();
              let item = menuItems.find((x) => this.getHref(x.url) == url);
              if (item != null) {
                rs.push(item);
                if (item.p_id != null) {
                  let ps = this.getMenuItemParents(item.p_id, menuItems);
                  if (!(ps == null || ps.length == 0)) {
                    for (let i = 0; i < ps.length; i++) {
                      rs.push(ps[i]);
                    }
                  }
                }
              }
              return rs;
            },
            getHref: function (args) {
              if (args == null) return "javascript:void(0)";
              else if(args.indexOf("tag=")>=0) return args.substring(0,args.indexOf("tag=")+4)+encodeURIComponent(args.substring(args.indexOf("tag=")+4));
              else return args;
            },
            isAuthenticated: function(){
              return auth.isAuthenticated();
            },
            authenticate: function (stringToken) {
              auth.authenticate(stringToken);
            },
            configApplication: function(menuItems, clientInfo){
              auth.saveMenuToStorage(menuItems);
              auth.saveClientInfoToStorage(clientInfo);
            },
            logOut: function () {
              auth.destroy();
            },
            user: {
              getTenNhanVien: function () {
                return auth.getClientInfoProperty("ten_nv");
              },
              getTenDonVi: function () {
                return auth.getClientInfoProperty("ten_dv");
              },
              getSoDienThoai: function () {
                return auth.getClientInfoProperty("so_dt");
              },
              getMapConfigDefault: function(){
                return {
                  zoom: auth.getClientInfoProperty("default_zoom"),
                  longtitus: auth.getClientInfoProperty("longtitus"),
                  latitus: auth.getClientInfoProperty("latitus"),
                }
              },
              getProperty: function(name){
                return auth.getClientInfoProperty(name);
              }
            }
          },
          token: {
            getMaTinh: function () {
              return auth.getMaTinh();
            },
            getPhanVungID: function () {
              return auth.getPhanVungID();
            },
            getUserName: function () {
              return auth.getUserName();
            },
            getNhanVienID: function () {
              return auth.getNhanVienID();
            },
            getMaNhanVien: function () {
              return auth.getMaNhanVien();
            },
            getDonViID: function () {
              return auth.getDonViID();
            },
            getDonViDuLieuID: function () {
              return auth.getDonViDuLieuID();
            },
            getNguoiDungID: function () {
              return auth.getNguoiDungID();
            },
            getMaCCBS: function () {
              return auth.getMaCCBS();
            },
            getProperty: function(name){
              return auth.getProperty(name);
            },
            getIP: function(){
              return auth.getIP();
            },
            getMachine: function(){
              return auth.getMachine();
            },
            getThongTinNguoiDung: function() {
              return auth.getThongTinNguoiDung();
            },
          },
        };
    }
  }
