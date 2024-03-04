<template>
  <div class="dashboard-header">
    <div class="nav-toggle">
      <span class="fa fa-bars"></span>
    </div>
    <div class="pull-left">
      <div class="logo">
        <a class="img">
          <img src="@/assets/img/logo.svg" />
        </a>
        <span class="text">{{ AppName }}</span>
      </div>
    </div>
    <div class="pull-right menus-right">
      <!-- <div class="item special">
        <a href="/#/home1" style="color:rgb(141, 190, 251);"><i class="fa fa-home" aria-hidden="true"></i></a>
        <a href="/#/"><i class="fa fa-home" aria-hidden="true"></i></a>
        <div class="more dropdown">
          <a href="javascript:void(0);" data-toggle="dropdown" class="favourite-menu"><i class="fa fa-star" aria-hidden="true"></i></a>
          <div class="dropdown-menu">
              <a href="#" @click.prevent="alert('chua xay dung!');">
                  <i class="fa fa-star" aria-hidden="true"></i> Menu yeu thich 1
              </a>
              <a href="#" @click.prevent="alert('chua xay dung!');">
                  <i class="fa fa-star" aria-hidden="true"></i> Menu yeu thich 2
              </a>
            </div>
        </div>
      </div>
      <div class="item more dropdown notify">
        <a href="javascript:void(0);" data-toggle="dropdown" class="favourite-menu">
        <img src="@/assets/img/Noti24px.svg" />
        </a>
        <span class="number">72</span>
        <div class="dropdown-menu">
          <a href="#" @click.prevent="alert('chua xay dung!');">
              Thông báo 1 ...
          </a>
          <a href="#" @click.prevent="alert('chua xay dung!');">
              Thông báo 2 ...
          </a>
        </div>
      </div> -->
      <div class="user item dropdown">
        <div class="user-image">
          <div class="avatar"></div>
          <div class="username">{{ nhanVien }}</div>
          <div class="pos">
            {{ userName }}
            <span class="logout"
              >(<button class="btn btn-link" @click="logout">{{ userName? "Đăng xuất":"Đăng nhập" }}</button>)</span
            >
          </div>
        </div>
        <!-- <div class="dropdown-menu">
          <router-link class="dropdown-item" to="/auth/login">Đăng xuất</router-link>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>

function mounteMenu() {
  $(".nav-toggle").click(function () {
    $(".sidebar").toggleClass("show");
    // if($(".sidebar").hasClass("show"))
    //   $(".sidebar").removeClass("show");
    // else
    //   $(".sidebar").addClass("show");
  });
  $(".sidebar-common").click(function () {
    $(".sidebar").removeClass("show");
  });
  $('.dropdown .favourite-menu').click(function () {
    $(".sidebar").removeClass("show");
  });
}
export default {
  name: "Header",
  props: {
    userName: "",
    nhanVien: ""
  },
  mounted: function(){
    mounteMenu();
  },
  computed: {
    userName: function () {
      return this.$_root.token.getUserName()?this.$_root.token.getUserName():"";//this.$_root.token.getPhanVungID()+ ' - ' + this.$_root.token.getUserName();
      // return "Admin";
    },
    nhanVien: function () {
      return this.$_root.token.getUserName()?this.$_root.context.user.getTenNhanVien()?this.$_root.context.user.getTenNhanVien():this.$_root.token.getUserName():"";
      // return "Admin";
    },
    version: function() {
      // const pkgVersion = require('@/../package.json').version;
      //return pkgVersion;
      return "1.0"
    },
    AppName: function() {
      return import.meta.env.VNPT_APPNAME;
    }
  },
  methods: {
    logout: async function () {
      try {
        await this.$_root.context.post("/quantri/user/logout", null);
      } catch (error) {
      } finally {
        this.$_root.context.logOut();
        if (this.$route.name != "Login") this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>
<style scoped>
div.special.item {

}
div.special.item a {
  font-size:2em; color:#fff; padding-left:20px;
}
div.special.item div.dropdown { float:right; }
div.special.item div.dropdown-menu {
  background-color:#2766b3; font-size:0.5em;
  width: 260px;
  border-color:#666;
  border-style:solid;
  border-width:0 0 1px 1px;
  overflow-y: scroll;
}
div.special.item div.dropdown-menu a { border-bottom:solid 1px #ccc; }
div.special.item div.dropdown-menu a:hover { cursor: pointer; background-color:#2766b3; color:#ccc; }
</style>
