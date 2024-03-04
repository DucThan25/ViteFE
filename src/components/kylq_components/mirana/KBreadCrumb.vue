<template>
  <div class="breadcrumb-top">
    <div class="main-title">{{ title }}</div>
    <ul class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="/">
          <span class="nc-icon-outline ui-1_home-simple"></span> Trang chủ
        </a>
      </li>
      <li v-for="(item, index) in crumbs" :key="index" class="breadcrumb-item" >
        <router-link v-if="!item.active" :to="item.link">{{item.name}}</router-link>
        <span class="active" v-else>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "KBreadCrumb",
  props: {
    title: {
      type: String,
      default:''
    },
  },
  computed:{
    crumbs(){
        return this.list.map(x=>{
            return {
                name: x.name, 
                link: { name: "Ui.cards" },
                active: x.url&&x.url.includes(this.endPath)
            }
        })
    }
  },
  data(){
    return{
        list:[],
        endPath:''
    }
  },
  methods:{
    breadcrumbInit(){
        let menus=this.$root.context.getMenu()
        this.endPath=this.$router.currentRoute.path.split('/').pop()
        const menu=menus.find(x=>x.url&&x.url.includes(this.endPath))
        if(menu){
            this.list.push(menu)
            var menuPid=menus.find(x=>menu.p_id&&x.id==menu.p_id)
            while(menuPid){
                this.list.unshift(menuPid)
                menuPid=menus.find(x=>menuPid.p_id&&x.id==menuPid.p_id)
            }
        }
    }
  },
  mounted(){
    setTimeout(()=>{
        this.breadcrumbInit()
    },200)
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
