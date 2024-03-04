<template>
<div>
  <div class="login-wrapper">
    <div class="bg" :style="{ backgroundImage: 'url(' + background + ')' }"></div>
  </div>
</div>
</template>

<script>
import background from '@/assets/img/bg.gray.svg'
export default {
  name: 'Home',
  components: {
  },
  data: () => ({
      background: background
  }),
  created: async function () {
  },
  computed: {
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
