<template>
  <footer class='footer'>
    VNPT-IT &copy; 2021
  </footer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Footer',
  prop: {},
  computed: {
    ...mapGetters({
      appName: 'appName'
    })
  }
}
</script>
