<template>
  <div class="page">
    <Header :userName="userName" :nhanVien="nhanVien" />
    <SideBar :menuItems="menuItems" />
    <div class="main-wrapper">
      <Breadcrumb :pathItems="currentPathItems" />
      <div class="main-content" id="maincontent">
        <transition name="router-anim">
          <router-view />
        </transition>
      </div>
      <Footer />
    </div>
    <Loader />
  </div>
</template>
<style scoped>
#maincontent {
  background-color:#fff;
  /* height:100vh */
  }
  .main-wrapper { background-color:#fff;  }
</style>
<script>
import "../../node_modules/@syncfusion/ej2-vue-layouts/styles/bootstrap4.css";
import Loader from "@/components/Loader";
import SideBar from "./SideBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/BreadCrumb";
export default {
  name: "main-layout",
  components: {
    Header,
    Footer,
    SideBar,
    Loader,
    Breadcrumb,
  },
  data: function () {
    return {
      flag: false,
    };
  },
  created: async function () {
      //console.log(this.$_root.context.isAuthenticated())

      let s = false;
      if (this.$_root.context.isAuthenticated()) {
          try {
              let startUpInfoJSON = localStorage.getItem('startUpInfo');
              let startUpInfo = null;

              //console.log(startUpInfoJSON);

              if(startUpInfoJSON) startUpInfo = JSON.parse(startUpInfoJSON);

              //console.log(startUpInfo);

              if(!startUpInfo || !startUpInfo.data) {
                  startUpInfo = await this.$_root.context.get(
                      "/quantri/user/khoitao_ungdung",
                      {
                          p_idmodule: 12,
                      }
                  );
                  localStorage.setItem('startUpInfo', JSON.stringify(startUpInfo));
              }

              if (!(startUpInfo.data.data == null || startUpInfo.data.data == undefined)) {
                  this.$_root.context.configApplication(
                      startUpInfo.data.data.ds_chucnang,
                      startUpInfo.data.data.thongtin
                  );
                  this.flag = !this.flag;
                  s = true;
              }

          } catch (e) {}
      }

      if(s) {
          try {
              s = false;
              var check_token = await this.$_root.context.get("/web-hopdong/lapdatmoi/check_token", {});
              s = check_token.data.data=="ok";

              //console.log(check_token);
          } catch (e) { s = false;}
      }
      if (!s) {
          if (this.$route.name != "Login") this.$router.push({ name: "Login" });
      }
  },
  mounted: function () {
    this.addCssFile("/static/vendor/font-awesome/css/font-awesome.min.css");
    this.addCssFile("/static/vendor/bootstrap/css/bootstrap.min.css");
    this.addCssFile("/static/vendor/ap8/css/style.css");
    this.addCssFile("/static/vendor/nucleo/outline/css/style.css");
    this.addCssFile("/static/vendor/nucleo/glyph/css/style.css");
    this.addCssFile("/static/vendor/treegrid/css/jquery.treegrid.css");
    this.addCssFile("/static/vendor/select2/css/select2.min.css");
    this.addCssFile("/static/vendor/oneicon/style.css");
    this.addCssFile("/static/css/style.css");
    this.addCssFile("/static/css/app.css");
    this.addCssFile("/static/css/custom.css");
  },
  computed: {
    menuItems: function(){
      if (this.flag) return this.getMenuFromStorage();
      return this.getMenuFromStorage();
    },
    currentPathItems: function () {
      if (this.flag) return this.getMenuPath();
      return this.getMenuPath();
    },
    userName: function () {
      if (this.flag) return this.$_root.token.getUserName();
      return this.$_root.token.getUserName();
    },
    nhanVien: function () {
      if (this.flag) return this.$_root.token.getUserName();
      return this.$_root.context.user.getTenNhanVien();
    },
  },
  methods: {
    addCssFile: function (path) {
      let style = document.createElement("link");
      style.type = "text/css";
      style.rel = "stylesheet";
      style.href = path;
      document.head.appendChild(style);
    },
    getMenuPath: function () {
      let url = this.getCurrentPath();
      if (url != "/#/") {
        // return this.$_root.context.getMenuPath(url).reverse();
        return [];
      } else return [];
    },
    getCurrentPath: function () {
      // let path = this.$route.fullPath;
      let path = "";
      return "/#" + path;
    },
    getMenuFromStorage: function () {
      return this.$_root.context.getMenu();
      return null;
    },
  },
};
</script>
