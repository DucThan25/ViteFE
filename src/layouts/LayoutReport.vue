<template>
  <div>
    <Loader />
    <HeaderStyle1 />
    <div class="d-flex">
      <div class="main-sidebar">
        <SidebarStyle />
      </div>
      <div class="main-report">
        <transition name="router-anim">
          <router-view />
        </transition>
        <FooterStyle />
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/vendor/font-awesome/css/font-awesome.min.css";
import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../assets/vendor/ap8/css/style.css";
import "../assets/vendor/nucleo/outline/css/style.css";
import "../assets/vendor/nucleo/glyph/css/style.css";
import "../assets/vendor/treegrid/css/jquery.treegrid.css";
import "../assets/vendor/select2/css/select2.min.css";
import "../assets/vendor/oneicon/style.css";
import "../assets/css/style.css";

import Loader from "@/components/Loader";
import SidebarStyle from "@/components/Reports/SidebarStyle";
import HeaderStyle1 from "@/components/HeaderStyle1";
import FooterStyle from "@/components/FooterStyle";
function initMenu() {
  $(".menus .down").click(function () {
    $(this).parent().siblings().removeClass("active");
    $(this).parent().toggleClass("open");
  });
  $(".nav-toggle").click(function () {
    $(".sidebar").toggleClass("show");
  });
  $(".overlay-common").click(function () {
    $(".sidebar").removeClass("show");
  });
}
export default {
  name: "Layout-1",
  components: {
    HeaderStyle1,
    FooterStyle,
    SidebarStyle,
    Loader,
  },
  beforeCreate() {},
  mounted() {
    document.body.classList = "";
    initMenu();
  },
  destroyed() {
    document.body.classList = "";
  },
};
</script>
<style>
.dashboard-header {
  position: relative;
}
.main-report {
  position: relative;
  width: 100%;
}
</style>
