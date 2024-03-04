<template>
  <div class="list-actions-top">
    <ul class="list">
      <li v-for="item in actions" :key="item.id" :title="item.tooltip" @click="$emit('onActionClick', item)" :class="{disabled: !item.active}">
        <a style="cursor: pointer;" v-if="item.visible==undefined||item.visible" :class="{disabled_color: !item.active}" > <span class="icon" :class="item.icon_class"></span> {{item.name}} </a>
      </li>
    </ul>
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
//   icon_class:'nc-icon-glyph ui-1_check-circle-08'
// }
export default {
  name: "ActionTop",
  props:{
      //id, name, active, icon_class
      actions:{
          type:Array,
          default: () => []
      }
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