<template src='./index.template.html'></template>
<script>
export default {
  name: "Login",
  data: () => ({
    username: "",
    password: "",
    otpValue: "",
    loginFailedAccount: false,
    loginFailedOTP: false,
    currentSecretCode: "",
    authType: false
  }),
  created() {
      this.$_root.context.logOut();
      //this.$root.context.logOut();
  },
  computed: {
    stepOTP: function () {
      return this.currentSecretCode != "";
    },
    formTitle: function () {
      if (this.stepOTP) return "Xác thực OTP";
      else return "Đăng nhập";
    },
    formError: function () {
      return this.loginFailedAccount || this.loginFailedOTP;
    },
  },
  methods: {
    btnLogin_Click: async function () {
      this.$root.showLoading(true);

      try {
        let r = await this.doLogin();

        if (r.error == null) {
          this.loginFailedAccount = false;
          this.currentSecretCode = r.data.data.secretCode;
        } else {
          this.loginFailedAccount = true;
        }
      } catch (error) {

      } finally {
        this.$root.showLoading(false);
      }
    },
    doLogin: async function () {
          let url = "/quantri/user/login";
          let u = this.username;

          if(this.authType) {
              url = "/quantri/user/xacthuc_tapdoan";
              if(!u.endsWith("@vnpt.vn")){
                  u += "@vnpt.vn";
              }
          }

          try {
              let rs = await this.$_root.context.postWithOutToken(url, {
                      username: u,
                      password: this.password,
                  }
              );

              return rs;
          } catch (error) {
              return error.response.data;
          }
      },
    btnXacNhanOTP_Click: async function () {
      this.$root.showLoading(true);
      try {
        let res = await this.doVerifyOTP();
        if (res.error == "undefined" || res.error == null) {
          let r = res.data;
          this.$_root.context.authenticate(r);
          this.loginFailedOTP = false;
          this.redirectToHome();
        } else {
          this.loginFailedOTP = true;
        }
      } catch (error) {
      } finally {
        this.$root.showLoading(false);
      }
    },
    btnResetOTP_Click: async function () {
      this.$root.showLoading(true);
      try {
        let r = await this.doResetOTP();
        if (r.error == null) {
          this.$root.toastInfo(
            "Đã gửi lại số OTP đến số điện thoại trên tài khoản"
          );
        } else {
          this.$root.toastError(
            "Đã có lỗi xảy ra trong quá trình gửi lại số OTP"
          );
        }
      } catch (error) {
      } finally {
        this.$root.showLoading(false);
      }
    },
    btnDungTaiKhoanKhac_Click: function () {
      this.$root.showLoading(true);
      try {
        this.username = "";
        this.password = "";
        this.otpValue = "";
        this.currentSecretCode = "";
        this.loginFailedAccount = false;
        this.loginFailedOTP = false;
      } catch (error) {
      } finally {
        this.$root.showLoading(false);
      }
    },
    redirectToHome() {
      this.$router.push({ name: "Home" });
    },
    doResetOTP: async function () {
        try {
            let rs = await this.$_root.context.postWithOutToken(
                "/quantri/user/resendotp",
                {
                    secretCode: this.currentSecretCode,
                }
            );

            return rs;

        } catch (error) {
            return error.response.data;
        }
    },
    doVerifyOTP: async function () {
        try {
            let rs = await this.$_root.context.postWithOutToken(
                "/quantri/oauth/token",
                {
                    grant_type: "password",
                    client_id: "clientapp",
                    client_secret: "password",
                    otp: this.otpValue,
                    secretCode: this.currentSecretCode,
                }
            );

            return rs;

        } catch (error) {
            return error.response.data;
        }
    },
  },
};
</script>

<style scoped>
.login-wrapper .form-group .input-icon.-captcha .refresh {
  right: 0px;
  top: 0px;
  height: 100%;
  font-size: 80%;
}
.login-wrapper .acts {
  text-align: right;
  padding-top: 20px;
}
.login-wrapper .acts .btn {
  padding: 10px 20px;
}
.login-wrapper .acts .btn.btn-login {
  width: 100%;
}
.login-wrapper .acts .btn.btn-outline-light {
  float: left;
}
.login-wrapper .box-login {
  min-width: 360px;
}
.login-wrapper .box-login .head {
  font-family: "Roboto";
  font-weight: normal;
}
.login-wrapper .box-login .input-icon.-captcha .form-control {
  padding-right: 100px;
}
.login-wrapper .box-login .error {
  color: #d8ff00;
}
.login-wrapper .box-login .group-hinhthuc .check-action .name {
  color: #FFF;
  padding-left: 25px;
}
.login-wrapper .box-login .group-hinhthuc .check-action .name::before {
  margin-top: 2px;
  border-radius: 50%;
  border-color: #ced4da;
}
</style>
