<template>
  <div>
    <!-- <HeaderStyle1 /> -->
    <!-- <SidebarStyle /> -->
    <Header :userName="userName" :nhanVien="nhanVien" />
    <SideBar :menuItems="menuItems" />
    <div class="main-wrapper">
        <!-- <Breadcrumb :header="header"></Breadcrumb> -->
        <transition name="router-anim">
            <router-view />
        </transition>
        <FooterStyle />
    </div>
    <Loader />
  </div>
</template>
<script>

// import '../assets/vendor/bootstrap/js/bootstrap.min.js'
import '../assets/vendor/font-awesome/css/font-awesome.min.css'
import '../assets/vendor/ap8/css/style.css'
import '../assets/vendor/nucleo/outline/css/style.css'
import '../assets/vendor/nucleo/glyph/css/style.css'
import '../assets/vendor/bootstrap/css/bootstrap.min.css'
import '../../node_modules/@syncfusion/ej2-base/styles/bootstrap4.css'
import '../../node_modules/@syncfusion/ej2-buttons/styles/bootstrap4.css'
import '../../node_modules/@syncfusion/ej2-calendars/styles/bootstrap4.css'
import '../../node_modules/@syncfusion/ej2-dropdowns/styles/bootstrap4.css'
import '../../node_modules/@syncfusion/ej2-inputs/styles/bootstrap4.css'
import '../../node_modules/@syncfusion/ej2-navigations/styles/bootstrap4.css'
import '../../node_modules/@syncfusion/ej2-popups/styles/bootstrap4.css'
import '../../node_modules/@syncfusion/ej2-splitbuttons/styles/bootstrap4.css'
import "../../node_modules/@syncfusion/ej2-vue-grids/styles/bootstrap4.css"
import '../assets/vendor/oneicon/style.css'
import '../assets/css/style.css'
// import '../assets/vendor/bootstrap-table/bootstrap-table.min.js'
import '../assets/css/custom.css'
// import '../assets/vendor/bootstrap/js/bootstrap.bundle.min.js'

import Loader from '@/components/Loader'
//import SideBar from '@/components/layout/SideBar'
import SideBar from "./SideBar";
import Header from '@/components/layout/Header'
//import HeaderStyle1 from '@/components/HeaderStyle1'
import FooterStyle from '@/components/layout/Footer'
// import Breadcrumb from '@/components/breadcrumb'
import { mapState } from 'vuex'

function initMenu () {
  $('.menus .down').click(function () {
    $(this).parent().siblings().removeClass('active')
    $(this).parent().toggleClass('open')
  })
  $('.nav-toggle').click(function () {
    $('.sidebar').toggleClass('show')
  })
  $('.overlay-common').click(function () {
    $('.sidebar').removeClass('show')
  })
}
export default {
  name: 'Layout-1',
  components: {
    //HeaderStyle1,
    Header,
    FooterStyle,
    //SidebarStyle,
    SideBar,
    Loader,
    //Breadcrumb
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
      // if (this.flag) return this.$_root.token.getUserName();
        console.log(this.$_root.context.user.getTenNhanVien());
        //console.log(this.$_root.context.user.getTenNhanVien());
        //console.log(this.$_root.token.getUserName());
      //return this.$_root.context.user.getTenNhanVien() ? this.$_root.context.user.getTenNhanVien() : this.$_root.token.getUserName();
    },
    ...mapState(['header']),
  },
  beforeCreate () {
  },
  mounted () {
    document.body.classList = ''
    // initMenu()
    //this.addCssFile("/static/css/style.css");
    this.addCssFile("/static/css/app.css");
  },
  methods:{
    addCssFile: function(path){
      let style = document.createElement('link');
      style.type = "text/css";
      style.rel = "stylesheet";
      style.href = path;
      document.head.appendChild(style);
    },
    getMenuPath: function () {
      let url = this.getCurrentPath();
      if (url != "/#/") {
        return this.$_root.context.getMenuPath(url).reverse();
      } else return [];
    },
    getCurrentPath: function () {
      let path = this.$route.fullPath;
      return "/#" + path;
    },
    getMenuFromStorage: function () {
      return this.$_root.context.getMenu();
    },
  },
  destroyed () {
    document.body.classList = ''
  }
}
</script>
<style>
    .vue-treeselect__control {
      height: 32px !important;
    }

    .vue-treeselect__placeholder, .vue-treeselect__single-value {
      line-height: 32px !important;
    }
</style>
