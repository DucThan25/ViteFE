<template>
  <component ref="currentComponent" :is="currentComponent" />
</template>
<script>
import menu from '../utils/menu'
export default {
  name: 'FormDialog',
  data: function() {
    return {
      currentComponent: null
    }
  },
  methods: {
    showDialog: async function(args) {
      let result = false
      this.currentComponent = await this.getComponent(args.path)
      if (this.currentComponent != null) {
        try {
          result = true
          if (this.$refs.currentComponent == undefined) {
            this.$nextTick(() => {
              if (this.$refs.currentComponent.$children && this.$refs.currentComponent.$children[0] && typeof this.$refs.currentComponent.$children[0].show === 'function') {
                this.$refs.currentComponent.$children[0].show()
                menu.setCurrentMenuItemFromRouter(args.path, true)
                this.$refs.currentComponent.$children[0].hide = function() {
                  this.isBlock = true
                  this.isHidden = true
                  this.isModalOverflowing = false
                  this.isShow = false
                  this.isVisible = false
                  menu.setCurrentMenuItem(0, true)
                }
              } else {
                this.$refs.currentComponent.show()
                menu.setCurrentMenuItemFromRouter(args.path, true)
                this.$refs.currentComponent.$children[0].hide = function() {
                  this.isBlock = true
                  this.isHidden = true
                  this.isModalOverflowing = false
                  this.isShow = false
                  this.isVisible = false
                  menu.setCurrentMenuItem(0, true)
                }
              }
            })
          } else {
            if (this.$refs.currentComponent.$children && this.$refs.currentComponent.$children[0] && typeof this.$refs.currentComponent.$children[0].show === 'function') {
              this.$refs.currentComponent.$children[0].show()
              menu.setCurrentMenuItemFromRouter(args.path, true)
              this.$refs.currentComponent.$children[0].hide = function() {
                this.isBlock = true
                this.isHidden = true
                this.isModalOverflowing = false
                this.isShow = false
                this.isVisible = false
                menu.setCurrentMenuItem(0, true)
              }
            } else {
              this.$refs.currentComponent.show()
              menu.setCurrentMenuItemFromRouter(args.path, true)
              this.$refs.currentComponent.$children[0].hide = function() {
                this.isBlock = true
                this.isHidden = true
                this.isModalOverflowing = false
                this.isShow = false
                this.isVisible = false
                menu.setCurrentMenuItem(0, true)
              }
            }
          }
        } catch (ex) {
          result = false
        }
      }
      return result
    },
    getComponent: async function(path) {
      let routes = this.$router.options.routes
      let result = null
      try {
        for (let i = 0; i < routes.length; i++) {
          let r = routes[i].children.find((x) => (x == undefined || x == null ? null : routes[i].path + '/' + x.path == path))
          if (r && r.meta) {
            if (r.meta.dialog === true) {
              if(r.component && r.meta.dialogfull)
                result = r.component;
              else if (r.component.components) result = r.component.components[Object.keys(r.component.components)[0]]
              else if (r.component.resolved) {
                // console.log('resolved',r.component.resolved.options.components[Object.keys(r.component.resolved.options.components)[0]].extendOptions)
                if(r.component.resolved.extendOptions)
                  result = r.component.resolved.extendOptions;
                else
                  result = r.component.resolved.options.components[Object.keys(r.component.resolved.options.components)[0]].extendOptions
                  ? r.component.resolved.options.components[Object.keys(r.component.resolved.options.components)[0]].extendOptions
                  : r.component.resolved.options.components[Object.keys(r.component.resolved.options.components)[0]] // truong hop la function
              } else if (typeof r.component == 'function') result = (await r.component()).default.extendOptions
              else result = r.component.components[Object.keys(r.component.components)[0]]
              break
            }
          }
        }
      } catch (ex) {
        result = null
      }
      return result
    }
  }
}
</script>
