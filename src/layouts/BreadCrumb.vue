<template>
  <div class="breadcrumb-top">
    <div class="main-title">{{ title }}</div>
    <ul class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="/#/"
          ><span class="nc-icon-outline ui-1_home-simple"></span> Trang chủ
        </a>
      </li>
      <li v-for="item in crumbs" :key="item.path" class="breadcrumb-item">
        <router-link :key="item.path" :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
export default {
  props:{
  },
  computed: {
    // crumbs: function () {
    //   if(this.pathItems != null)
    //   {
    //     if(this.pathItems.length > 0)
    //       return this.pathItems.slice(0, this.pathItems.length);
    //     else return this.pathItems;
    //   }
    //   else
    //     return [];
    // },
    title: function(){
      if(this.crumbs && this.crumbs.length > 0) {
        window.document.title = "VNPT - "+this.crumbs[this.crumbs.length - 1].name;
        return this.crumbs[this.crumbs.length - 1].name;
      }
      else {
        window.document.title = import.meta.env.VNPT_APPNAME;//"VNPT - HỆ THỐNG ĐIỀU HÀNH SẢN XUẤT KINH DOANH TẬP TRUNG"
        return "Trang chủ";
      }
    },
    crumbs: function() {
      var routes = [];
      for(var item of this.menuItems.filter(x=>x.path && x.path!="/"))
      {
        if(this.$route.fullPath.indexOf(item.path)==0)
          routes.push(item);
      }
      return routes;
    },
    menuItems: function(){
      var routes = []
      for (var item of this.$router.options.routes) {
        routes.push({"path":item.path, "name": item.meta.name?item.meta.name:item.name});
        if(item.children && item.children.length > 0)
          for (var item1 of item.children)
          routes.push({"path":item.path+"/"+item1.path, "name": item1.meta.name?item1.meta.name:item1.name});
      }
      return routes;//this.getMenuFromStorage();
    },
    // currentPathItems: function () {
    //   return this.getMenuPath();
    // },
    // ...mapState(['header']),
  },
  methods: {
    // getHref: function (args) {
    //   if (args == null) return "javascript:void(0)";
    //   else if(args.indexOf("tag=")>=0) return args.substring(0,args.indexOf("tag=")+4)+encodeURIComponent(args.substring(args.indexOf("tag=")+4));
    //   else return args;
    // },
    // getMenuPath: function () {
    //   let url = this.getCurrentPath();
    //   if (url != "/#/") {
    //     return this.$_root.context.getMenuPath(url).reverse();
    //   } else return [];
    // },
    // getCurrentPath: function () {
    //   let path = this.$route.fullPath;
    //   return "/#" + path;
    // },
    // getMenuFromStorage: function () {
    //   return this.$_root.context.getMenu();
    // },
  },
};
</script>
