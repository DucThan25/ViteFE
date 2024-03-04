<template>
  <div class="breadcrumb-top">
    <div class="main-title">{{ header.title }}</div>
    <ul class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="/">
          <span class="nc-icon-outline ui-1_home-simple"></span> Trang chủ
        </a>
      </li>
      <li v-for="(item, index) in header.list" :key="index" class="breadcrumb-item" >
        <router-link v-if="!item.active" :to="item.link">{{item.name}}</router-link>
        <span class="active" v-else>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
// Copy from folder component custom lại
export default {
  name: "breadcrumb",
  props: {
    header: {
      type: Object,
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
