<template>
  <div class="breadcrumb-top">
    <div class="main-title">{{ title }}</div>
    <ul class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="/#/"
          ><span class="nc-icon-outline ui-1_home-simple"></span> Trang chủ
        </a>
      </li>
      <li v-for="item in crumbs" :key="item.url" class="breadcrumb-item">
        <a :href="getHref(item.url)">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props:{
    pathItems: []
  },
  computed: {
    crumbs: function () {
      if(this.pathItems != null)
      {
        if(this.pathItems.length > 0)
          return this.pathItems.slice(0, this.pathItems.length);
        else return this.pathItems;
      }
      else
        return [];
    },
    title: function(){
      if(this.pathItems && this.pathItems.length > 0) {
        window.document.title = "OneBSS - "+this.pathItems[this.pathItems.length - 1].displayName;
        return this.pathItems[this.pathItems.length - 1].displayName;
      }
      else {
        window.document.title = "OneBSS - HỆ THỐNG ĐIỀU HÀNH SẢN XUẤT KINH DOANH TẬP TRUNG"
        return "Trang chủ";
      }
    },
    menuItems: function(){
      return this.getMenuFromStorage();
    },
    currentPathItems: function () {
      return this.getMenuPath();
    },
    ...mapState(['header']),
  },
  methods: {
    getHref: function (args) {
      if (args == null) return "javascript:void(0)";
      else if(args.indexOf("tag=")>=0) return args.substring(0,args.indexOf("tag=")+4)+encodeURIComponent(args.substring(args.indexOf("tag=")+4));
      else return args;
    },
    getMenuPath: function () {
      let url = this.getCurrentPath();
      if (url != "/#/") {
        return this.$root.context.getMenuPath(url).reverse();
      } else return [];
    },
    getCurrentPath: function () {
      let path = this.$route.fullPath;
      return "/#" + path;
    },
    getMenuFromStorage: function () {
      return this.$root.context.getMenu();
    },
  },
};
</script>
