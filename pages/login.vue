<template>
  <div class="login-container" style="margin-top: 30px;">
    <el-card class="login-card">
      <div class="btn-wrapper">
        <el-button @click="handleGoogleLogin" type="success" style="">Login with Google</el-button>
      </div>
      
      <el-form :model="loginForm">
        <div style="margin-bottom: 20px;">
          <el-input
            placeholder="メールアドレス"
            v-model="loginForm.mail_address"
            clearable>
          </el-input>
        </div>
        
        <div style="margin-bottom: 40px;">
          <el-input
            placeholder="パスワード"
            v-model="loginForm.password"
            show-password>
          </el-input>
        </div>
      </el-form>

       
      <vue-recaptcha
      ref="recaptcha"
      @verify="onVerify"
      sitekey="6LeTCmwbAAAAAPZPEOKsYYf0NaYDEzO0srckmD4-"
      @expired="onExpired"
      ></vue-recaptcha>
      

      <div class="btn-wrapper" style="margin-top: 20px;">
        <el-button type="success" @click="request">ログイン</el-button>

      <nuxt-link to="/forget/new_pw">パスワードを忘れました</nuxt-link>
      </div>

    </el-card>
  </div>
</template>


<script>
import cookie from "js-cookie";
import { getLoginInfo } from "@/api/userApi";
import { googleLogin } from "@/api/googleApi";
import vueRecaptcha from "vue-recaptcha";
export default {
  layout: "no-header", /*ヘッダーやログインボタンがここには出ないように．*/
  /* layout:"sign"　ってやつは書き換えました．意味があったらすみません！！ */
  data() {
    return {
      robot: true,
      loginForm:{
        mail_address: '',
        password: '',
      }
    };
  },
  head() {
    return {
      title: 'パスワードの設定完了',
      script: [
        {
          src: "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
          async: true,
          defer: true,
        },
      ],
    };
  },
  methods: {
    request(){
/*      getLoginInfo(loginForm).then(())
         axiosの使い方を調べる 

      }*/
    }, 
    submitLogin() {
      if (!this.user.robot) {
        this.$refs["userForm"].validate((valid) => {
          if (valid) {
            login(this.user)
              .then((response) => {/*成功した場合*/
                if (response.data.success) {
                  //tokenをcookieに入れる
                  cookie.set("ryus_token", response.data.data.token, {
                    expires: 1,
                    domain: "localhost",
                  });
                  //tokenでユーザ情報をGet
                  getLoginInfo().then((response) => {
                    //ユーザ情報をcookieに入れる
                    cookie.set("ryus_user", response.data.data.userInfo, {
                      expires: 1,
                      domain: "localhost",
                    });
                    //jump to homepage
                    window.location.href = "/";
                  });
                }
              })
              .catch((error) => {/**エラーをキャッチした場合*/
                this.$message({
                  type: "error",
                  message: error.data.message,
                });
              });
          }
        });
      } else {
        this.$message({
          type: "info",
          message: "Please check the captcha",
        });
      }
    },

    async handleGoogleLogin() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (googleUser) {
          googleLogin(googleUser.getAuthResponse().id_token).then((response) => {
            cookie.set("ryus_token", response.data.token, {
              expires: 1,
              domain: "localhost",
            });
            //tokenでユーザ情報をGet
            getLoginInfo().then((response) => {
              //ユーザ情報をcookieに入れる
              cookie.set("ryus_user", response.data.userInfo, {
                expires: 1,
                domain: "localhost",
              });
              //jump to homepage
              window.location.href = "/";
            });
          });
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    onVerify(response) {
      if (response) {
        this.robot = false;
      }
    },
    onExpired() {
      this.robot = true;
    },
    fetchData() {
      let userStr = cookie.get("ryus_user");
      if (userStr) {
        this.loginInfo = JSON.parse(userStr);
      }
    },
    handleLogout() {
      cookie.remove("ryus_token");
      cookie.remove("ryus_user");
      window.location.href = "/";
    },
  },
  components: { vueRecaptcha },
};
</script>
<style scoped>

  .login-card {
    max-width: 500px;
    margin: 0 auto;
  }

  .btn-wrapper {
    display: inline-flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 20px;
    
  }
    
  

</style>

