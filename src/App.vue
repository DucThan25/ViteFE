<template>
<!--    <div>
        <div class="login-wrapper">
            <div class="bg" :style="{ backgroundImage: 'url(/bg.svg)' }"></div>
        </div>
        <div id="main-wrapper">
            <div class="container">
                <router-view/>
            </div>
        </div>
    </div>-->

    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    chkLogin: false,
    step: 0,
    username: '',
    token: '',
  }),
  created: async function () {
  },
  computed: {
  },
  mounted () {

  },
  methods: {
    LoggedIn(data) {
      this.username = data.username;
      this.token = data.token;
      this.chkLogin = true;
    },
    showLoading: function(value) {
      if (value) {
          $('.overlay-common').addClass('show')
      } else {
          $('.overlay-common').removeClass('show')
      }
    },
    toastSuccess: function(arg) {
      this.$toast.success(arg)
    },
    toastError: function(arg) {
      this.$toast.error(arg)
    },
    toastWarning: function(arg) {
      this.$toast.warning(arg)
    },
    toastInfo: function(arg) {
      this.$toast.info(arg)
    }
  }
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.login-wrapper {
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  height: 100vh;
  overflow-y: auto;
}
.login-wrapper .bg {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-size: cover;
  background-position: center;
}
#main-wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow:auto;
}

.middle-page-content {
  position:absolute;
  width:100%;
  max-width: 800px;
  /* max-height: 500px; */
  background-color:#fff;
  border: double 2px #000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}
@media only screen and (max-width: 700px) {
  #main-content {width: 500px; }
}
@media only screen and (max-width: 500px) {
  #main-content {width: 100%; }
}
#main-content .container {
}
</style>
