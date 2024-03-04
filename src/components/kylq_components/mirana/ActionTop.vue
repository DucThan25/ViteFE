<template>
  <div class="list-actions-top">
    <ul class="list">
      <li v-for="item in action_lines" :key="item.id" :title="item.tooltip" @click="onActionClick(item)" :class="{disabled: !item.active}">
        <a style="cursor: pointer;" v-if="item.visible==undefined||item.visible" :class="{disabled_color: !item.active}" > <span class="icon" :class="item.icon_class"></span> {{item.name}} </a>
      </li>
    </ul>
     <div v-if="isMore" class="more dropdown">
       <a style="cursor: pointer;" @click="toggleDropdown" :data-bss_action_top_identify="identify">
          <span class="icon -ap  icon-dots-three-vertical" :data-bss_action_top_identify="identify"></span>
       </a>
       <div class="dropdown-menu" :data-bss_action_top_identify="identify" :class="showDropdown">
          <li v-for="item in action_mores"  :key="item.id" :title="item.tooltip" @click="onActionClick(item)" :data-bss_action_top_identify="identify" :class="{disabled: !item.active}">
            <a style="cursor: pointer;" :data-bss_action_top_identify="identify" v-if="item.visible==undefined||item.visible" :class="{disabled_color: !item.active}" >
              <span class="dropdown-icon" :class="item.icon_class" :data-bss_action_top_identify="identify"></span> {{item.name}}
            </a>
          </li>
       </div>
     </div>
  </div>
</template>
<script>
// Example
// {
//   id:'chapnhan',
//   name:'Chấp nhận',
//   active: true,
//   tooltip: 'fsd',
//   visible: true
//   icon_class:'nc-icon-glyph ui-1_check-circle-08',
//   type:1 //1:in line, 2: in more
// }
export default {
  name: "ActionTop",
  props:{
      actions:{
          type:Array,
          default: () => []
      },
      isMore:{
        type:Boolean,
        default:false
      }
  },
  data(){
    return {
      showDropdown: '',
      identify: Date.now() + '-' + Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 1000),

    }
  },
  computed:{
    action_lines(){
      if(!this.isMore){
        return this.actions
      }
      return this.actions.filter(x=>x.type==undefined||x.type==1)
    },
    action_mores(){
      if(!this.isMore){
        return []
      }
      return this.actions.filter(x=>x.type!=undefined&&x.type==2)
    }
  },
  methods:{
    onActionClick(item){
      this.$emit('onActionClick', item)
      if(item.type!=undefined&&item.type==2){
        this.showDropdown = ''
      }
    },
    toggleDropdown () {
      this.showDropdown = !this.showDropdown ? 'show' : ''
    },
    considerHideDropdown (event) {
      if (event.target.getAttribute('data-bss_action_top_identify') != this.identify) {
        this.showDropdown = ''
      }
    },
  },
  mounted(){
    document.addEventListener('click', this.considerHideDropdown)
  }
}
</script>
<style scoped>
.disabled{
    pointer-events:none;
    opacity:0.7;
}
.disabled_color{
  color: gray !important;
}
</style>
