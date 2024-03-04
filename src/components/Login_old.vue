<script setup>
// import { ref } from 'vue'

// defineProps({
//   msg: String,
// })

// const count = ref(0)
</script>
<script>
import axios from 'axios'
export default {
  name: 'Login',
  components: {
  },
  data: () => ({
    txtUserName: '',
    txtPassword: '',
    txtOTP: '',
    step: 0,
    subthongbao: '',
  }),
  created: async function () {
  },
  computed: {
  },
  mounted () {
    
  },
  methods: {
    Login() {
      // console.log("Login");
      //axios.post('/Cntt/Login',{"username":this.txtUserName,"password":this.txtPassword},{
      this.$_root.context.postWithOutToken('/Cntt/Login',{"username":this.txtUserName,"password":this.txtPassword}).then((response) => {
        if(response.data.result && response.data.result[0] && response.data.result[0].userid) {
          //alert("Login thanh cong!");
          this.$emit('LoggedIn', {
            username: response.data.result[0].userid,
            token: response.data.token
          });

          this.$_root.context.authenticate(response.data.token);
          this.$router.push({ name: "Home" });
        }
        else this.subthongbao = ("Thông tin login chưa chính xác! Vui lòng xem lại.");
      }).catch((e)=>{ console.error(e); this.subthongbao = ("Có lỗi xảy ra trong quá trình login, hoặc thông tin login chưa chính xác. Vui lòng thử lại sau!");});
      // this.step = 1;
    },
    ConfirmOTP()
    {
      // console.log("OTP");
      this.$emit('LoggedIn', {
          username: this.txtUserName,
          token: "123"
      })
    },
  }
}
</script>

<template>
  <div class="login-container middle-page-content">
    <div class="container" v-if="step==0">
      <h1>Đăng nhập</h1>
      <div class="subthongbao">{{subthongbao}}</div>
      <div class="row">
        <!-- <label class="label">Tên đăng nhập</label> -->
        <div class="value"><input class="form-control" type="text" required v-model="txtUserName" placeholder="Tên đăng nhập" /></div>
      </div>
      <div class="row">
        <!-- <label class="label">Mật khẩu</label> -->
        <div class="value">
          <input class="form-control" type="password" required v-model="txtPassword" placeholder="Mật khẩu" />
        </div>
      </div>
      <div class="row">
        <div class="label"></div>
        <div class="value"><input class="btn btn-primary" type="submit" value="Đăng nhập" @click.prevent="Login" /></div>
      </div>
    </div>
    <div class="container" v-if="step==1">
      <h1>OTP</h1>
      <div class="row">
        <!-- <label class="label">OTP</label> -->
        <div class="value"><input class="form-control" type="password" required v-model="txtOTP" placeholder="OTP..." /></div>
      </div>
      <div class="row">
        <div class="label col-12"></div>
        <div class="value col-12"><input class="btn btn-primary" type="submit" value="Xác nhận" @click.prevent="ConfirmOTP" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.row { padding: 10px 0 0 0; }

.subthongbao {
  color: red;
  font-weight: bold;
}
.login-container {

}
</style>
