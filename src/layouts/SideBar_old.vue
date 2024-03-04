<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <div class="search">
        <span class="icon nc-icon-outline ui-1_zoom"></span>
        <input
          type="text"
          v-model="txtSearch"
          placeholder="Tìm kiếm"
          class="form-control"
        />
      </div>
      <ul class="menus" v-html="menuHtml"></ul>
    </div>
    <div class="sidebar-common" :class="{hidden:!($route.fullPath && $route.fullPath!='/' && $route.fullPath!='/#/')}"></div>
    <FormDialog ref="formDialog" />
  </div>
</template>
<script>
import FormDialog from "../components/FormDialog";

export default {
  name: "SideBar",
  components: {
    FormDialog,
  },
  props: {
    menuItems: [],
  },
  data: function () {
    return {
      _menuItems: null,
      txtSearch: "",
    };
  },
  created: function () {
    // console.info('created');\
    this.listenOnMenu();
  },
  computed: {
    menuHtml: function () {
      if (this.menuItems != null)
        return this.getMenuHtml(this.getFiltered(this.txtSearch));
      else return "";
    },
  },
  updated() {
    // console.info('updated');
    this.listenOnMenu();
  },
  methods: {
    openPage: async function (path, args) {
      let arg = { path: this.getPath(path), args: args };
      if (!(arg.path == undefined || arg.path == null)) {

        let routes = this.$router.options.routes;
        let result = null;
        for (let i = 0; i < routes.length; i++) {
          let r = routes[i].children.find((x) => (x == undefined || x == null ? null : path.indexOf(routes[i].path + '/' + x.path)>=0))
          if (r && r.meta && r.meta.dialog === true) {
            result = await this.$refs.formDialog.showDialog(arg);
            break;
          }
        }
        if (!result) {
          if (this.$route.path !== arg.path) this.$router.push(arg.path);
        }
      }
      else {
        console.log("Chức năng đang truy cập chưa cài đặt đường dẫn");
      }
    },
    getPath: function (path) {
      let result = path;
      if (!(result == undefined || result == null)) {
        if (result.startsWith("/#")) result = result.substring(2);
      }
      return result;
    },
    getText: function (text) {
      return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
    },
    getFiltered: function (textFiltered) {
      let result = [];
      if (this.menuItems != null) {
        let items = this.menuItems.filter((item) => {
          return this.getText(item.name.toLowerCase()).includes(
            this.getText(textFiltered.toLowerCase())
          );
        });
        if (!(items == null || items.length == 0)) {
          for (let item of items) {
            let ck = result.findIndex((x) => x.id == item.id);
            if (ck < 0) {
              result.push(item);
              if (item.p_id != null) {
                let ps = this.getParents(item.p_id);
                if (!(ps == null || ps.length == 0)) {
                  for (let jtem of ps) {
                    ck = result.findIndex((x) => x.id == jtem.id);
                    if (ck < 0) result.push(jtem);
                  }
                }
              }
            }
          }
        }
      }
      return result.sort((a, b) => (a.stt < b.stt ? -1 : 1));
    },
    getParents: function (parentID) {
      let rs = [];
      let parent = this.menuItems.find((x) => x.id == parentID);
      if (parent != null) {
        rs.push(parent);
        if (parent.p_id != null) {
          let ps = this.getParents(parent.p_id);
          if (!(ps == null || ps.length == 0)) {
            for (let i = 0; i < ps.length; i++) {
              rs.push(ps[i]);
            }
          }
        }
      }
      return rs;
    },
    getMenuHtml: function (listItems) {
      let html = "";
      if (listItems != null) {
        let items = listItems.filter((f) => {
          return f.p_id == null;
        });
        if (items.length > 0) {
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            html += this.getMenuRecursive(item, listItems);
          }
        }
      }
      this.$nextTick(()=>this.listenOnMenu());
      return html;
    },
    getMenuRecursive: function (currentItem, listItems) {
      let tagSpanIcon = "<span class='menu-icon'></span>";
      // let tagSpanIcon =
      //   "<span class='menu-icon " +
      //   (currentItem.p_id == null
      //     ? "fa fa-angle-double-right"
      //     : "fa fa-circle-o") +
      //   "'></span>";
      if (currentItem.icon != null)
        tagSpanIcon =
          "<span class='menu-icon'><span class='" +
          currentItem.icon +
          "'></span></span>";
      let items = listItems.filter((f) => {
        return f.p_id == currentItem.id;
      });
      let href = this.getHref(currentItem.url);
      let tagA = "<a title='" + currentItem.mota_cn + "'";
      // if(currentItem.id==13190) console.log(currentItem,items,listItems,href,tagA);
      if (href.toLowerCase() == "javascript:void(0)") {
        if (items.length > 0) {
          tagA +=
            " href='" +
            href +
            "' onclick='$(this).parent().toggleClass(\"open\"); return false;'";
        }
      }
      else {
        if (items.length > 0) {
          tagA +=
            " href='" +
            "javascript:void(0)"+//href + // thay doi lai doan nay, neu co con thi khong dua url
            "' onclick='$(this).parent().toggleClass(\"open\"); return false;'";
        } else
          tagA += " data-url='" + href + "'";
      }
      // if (items.length > 0) {
      //   if (href.toLowerCase() == "javascript:void(0)") {
      //     tagA +=
      //       " onclick='$(this).parent().toggleClass(\"open\"); return false;'";
      //   }
      // }
      tagA +=
        ">" +
        tagSpanIcon +
        "<span class='menu-item-text'>" +
        currentItem.name +
        "</span></a>";
      let tagLi = "";
      if (items.length > 0) {
        let ul = "";
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          ul += this.getMenuRecursive(item, listItems);
        }
        tagLi =
          "<li class='haschild"+(this.txtSearch && this.txtSearch.trim().length>0?" open":"")+"'>" +
          tagA +
          "<span class='down' onclick='$(this).parent().toggleClass(\"open\"); return false;'></span><ul class='child'>" +
          ul +
          "</ul></li>";
      } else tagLi = "<li>" + tagA + "</li>";
      return tagLi;
    },
    listenOnMenu: function () {
      $(".sidebar .menus li a").on("click", (e) => {
        if (e.currentTarget.href.toLowerCase() != "javascript:void(0)") {
          $(".sidebar .menus li").removeClass("active");
          $(e.currentTarget).parent().addClass("active");
          $(".sidebar").removeClass("show");
          let url = $(e.currentTarget).data("url");
          this.openPage(url, e.currentTarget);
        }
      });
    },
    getHref: function (args) {
      if (args == null) return "javascript:void(0)";
      else if(args.indexOf("tag=")>=0) return args.substring(0,args.indexOf("tag=")+4)+encodeURIComponent(args.substring(args.indexOf("tag=")+4));
      else return args;
    },
  },
};
</script>
