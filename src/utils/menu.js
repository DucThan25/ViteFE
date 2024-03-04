export default {
  data: {
    MENU_KEY: "VNPT-Menu",
    currentMenu: {
      id: 0,
	  path: "",
      popUp: {
        id: 0,
		path: "",
      }
    },
  },
  checkExists: function(routerPath){
    let menuUrl = this.getMenuUrl(routerPath);
    let menuItem = this.getMenuItem(menuUrl);
    return !(menuItem == null || menuItem == undefined);
  },
  setCurrentMenuItemFromRouter: function (routerPath, isPopup) {
    let menuUrl = this.getMenuUrl(routerPath);
	this.setCurrentPath(menuUrl, isPopup);
    let menuItem = this.getMenuItem(menuUrl);
    if(menuItem != null){
      this.setCurrentMenuItem(menuItem.id, isPopup);
    }
    else {
      this.setCurrentMenuItem(0, isPopup);
    }
  },
  setCurrentMenuItem: function (menuID, isPopup) {
    if (isPopup === true)
      this.data.currentMenu.popUp.id = menuID;
    else
	  this.data.currentMenu.id = menuID;
  },
  getCurrentMenuItem() {
    return this.data.currentMenu;
  },
  getCurrentMenuItemID() {
    let result = 0;
    let item = this.getCurrentMenuItem();
    if (!(item == null || item == undefined)) {
      if (item.popUp.id > 0) result = item.popUp.id;
      else result = item.id;
    }
    return result;
  },
  setCurrentPath: function (path, isPopup) {
	if (isPopup === true)
      this.data.currentMenu.popUp.path = path;
    else
      this.data.currentMenu.path = path;
  },
  getCurrentPath: function () {
	let result = "";
    let item = this.getCurrentMenuItem();
    if (!(item == null || item == undefined)) {
      if (item.popUp.id > 0) result = item.popUp.path;
      else result = item.path;
    }
    return result;
  },
  getMenuUrl: function (routerPath) {
    let result = routerPath;
    if (!(result == undefined || result == null)) {
      if (!result.startsWith("/#")) result = "/#" + result;
    }
    return result;
  },
  getMenuFromStorage: function () {
    if (localStorage.hasOwnProperty(this.data.MENU_KEY))
      return JSON.parse(localStorage.getItem(this.data.MENU_KEY));
    else return null;
  },
  saveMenuToStorage: function (menuString) {
    try {
      localStorage.removeItem(this.data.MENU_KEY);
      let m = [];
      let modules = this.getModules(menuString);
      modules.forEach((module) => {
        let r = this.getMenuSorted(module, null, menuString);
        for (let i = 0; i < r.length; i++) {
          m.push(r[i]);
        }
      });
      localStorage.setItem(this.data.MENU_KEY, JSON.stringify(m));
      return true;
    } catch (error) {
      return false;
    }
  },
  getModules: function (listItems) {
    let rs = [];
    let items = listItems
      .filter((f) => {
        return f.p_id == null;
      })
      .sort((a, b) => {
        if (a.stt < b.stt) return -1;
        else return 1;
      });
    for (let i = 0; i < items.length; i++) {
      const module = items[i].modul;
      if (!rs.includes(module)) rs.push(module);
    }
    return rs;
  },
  getMenuSorted: function (module, parentItem, listItems) {
    let rs = [];
    let items = listItems
      .filter((f) => {
        if (parentItem == null) return f.modul == module && f.p_id == null;
        else return f.p_id == parentItem.id;
      })
      .sort((a, b) => {
        if (a.stt < b.stt) return -1;
        else return 1;
      });
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      rs.push(item);
      let childs = this.getMenuSorted(module, item, listItems);
      for (let j = 0; j < childs.length; j++) {
        const child = childs[j];
        rs.push(child);
      }
    }
    return rs;
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
  getMenuPath: function (url) {
    let rs = [];
    let menuItems = this.getMenuFromStorage();
    // console.log(url,menuItems);
    url = decodeURIComponent(url);
    if (menuItems != null) {
      let item = menuItems.find((x) => x.url == url);
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
    }
    return rs;
  },
  getMenuItem: function (url) {
    let menuItems = this.getMenuFromStorage();
    if (menuItems != null) {
      return menuItems.find((x) => (x.url == url || x.url == this.getUrlDecode(url)));
    }
    else return null;
  },
  getUrlDecode: function (url) {
    let result = "";
    let paths = url.split("?");
    if (paths.length == 2) {
      let pss = "";
      let ps = paths[1].split("&");
      for (let i = 0; i < ps.length; i++) {
        if (pss != "")
          pss += "&";
        const cps = ps[i].split("=");
        if (cps.length == 2) {
          pss += cps[0] + "=" + decodeURIComponent(cps[1]);
        }
        else {
          pss += ps[i];
        }
      }
      result = paths[0] + "?" + pss;
    }
    else {
      result = url;
    }
    return result;
  },
  destroy: function () {
    try {
      localStorage.removeItem(this.data.MENU_KEY);
      return true;
    } catch (error) {
      return false;
    }
  },
}
