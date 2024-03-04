<template>
  <div class="sidebar" id="SideBar">
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
      <ul class="menus">
<!--        <li v-for="route in $router.options.routes.filter(x=>!(x.children && x.children.length>0 && x.name != 'Home'))" :key="route.path" class="haschild">
            <router-link class="haschild" @click="CloseSideBar" v-for="route1 in route.children" :key="route1.path" :to="route.path+'/'+route1.path"><span class='menu-icon'></span><span class='menu-item-text'>{{ route1.meta.name }}</span></router-link>
        </li>

        <li v-for="route in $router.options.routes.filter(x=>x.children && x.children.length>0 && x.name != 'Home')" :key="route.path" class="haschild">
          <a onclick="$(this).parent().toggleClass('open'); return false;" href="#">
              <span class="menu-icon"></span>
              <span class="menu-item-text">{{ route.meta.name }}</span>
          </a>
          <span class='down' onclick='$(this).parent().toggleClass("open"); return false;'></span>
          <ul class="child">
              <router-link class="haschild" @click="CloseSideBar" v-for="route1 in route.children" :key="route1.path" :to="route.path+'/'+route1.path"><span class='menu-icon'></span><span class='menu-item-text'>{{ route1.meta.name }}</span></router-link>
          </ul>
        </li>-->

        <li class="haschild">
            <router-link class="haschild" @click="CloseSideBar" to="/"><span class='menu-icon'></span><span class='menu-item-text'>Test</span></router-link>
        </li>

        <li class="haschild">
            <a onclick="$(this).parent().toggleClass('open'); return false;" href="#">
                <span class="menu-icon"></span>
                <span class="menu-item-text">Quản trị</span>
            </a>
            <span class='down' onclick='$(this).parent().toggleClass("open"); return false;'></span>
            <ul class="child">
                <li>
                    <router-link class="haschild" @click="CloseSideBar" to="/admin/test"><span class='menu-icon'></span><span class='menu-item-text'>Test</span></router-link>
                </li>
            </ul>
        </li>
      </ul>
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
  },
  computed: {
  },
  updated() {
  },
  methods: {
    CloseSideBar: function() {
      document.getElementById("SideBar").classList.remove("show");
    }
  },
};
</script>
<style scoped>
  #app .sidebar .menus a { color: white }
  .sidebar ul.menus li ul { padding-left: 20px;}
  .sidebar ul.menus li  { border-bottom: solid 1px #EEE; }
</style>
