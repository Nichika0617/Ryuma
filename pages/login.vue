<template>
  <div class="login-container" style="margin-top: 30px;">
    <el-card class="login-card">
      <div class="btn-wrapper">
        <el-button @click="handleGoogleLogin" type="success" style="">Login with Google</el-button>
      </div>
      
      <el-form 
      :model="userForm"
      :rules="rules"
      ref="userForm">
        <el-form-item label="メールアドレス" prop="email">
        <div style="margin-bottom: 20px;">
          <el-input
            v-model="userForm.email"
            clearable>
          </el-input>
          
        </div>
        </el-form-item>

        <el-form-item label="パスワード" prop="password">
        <div style="margin-bottom: 40px">
          <el-input
            v-model="userForm.password"
            show-password>
          </el-input>
        </div>
        </el-form-item>
      </el-form>

       
      <vue-recaptcha
      ref="recaptcha"
      @verify="onVerify"
      sitekey="6LeTCmwbAAAAAPZPEOKsYYf0NaYDEzO0srckmD4-"
      @expired="onExpired"
      ></vue-recaptcha>
      

      <div class="btn-wrapper" style="margin-top: 20px;">
        <el-button type="success" @click="submitLogin('userForm')">ログイン</el-button>

      <nuxt-link to="/forget">パスワードを忘れました</nuxt-link>
      </div>

    </el-card>
  </div>
</template>


<script>
import cookie from "js-cookie";
import { getLoginInfo } from "@/api/userApi";
import { googleLogin } from "@/api/googleApi";
import vueRecaptcha from "vue-recaptcha";
import { postLoginInfo } from "@/api/userApi";
export default {
  layout: "no-header", /*ヘッダーやログインボタンがここには出ないように．*/
  /* layout:"sign"　ってやつは書き換えました．意味があったらすみません！！ */
  data() {
    return {
      robot: true,
      userForm:{
        email: '',
        password: '',
      },
      // Validation:{
      //   result_mail: "",
      // },
      rules:{
        email:[
          {
            required: true,
            message: "メールアドレスを入力してください",
            trigger: "blur",
          },
          {
            type: "email",
            message: "正しいメールアドレスの形式で入力してください．",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "パスワードを入力してください",
            trigger: "blur",
          },
        ]
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
    submitLogin() {
      if (!this.robot) {
        this.$refs["userForm"].validate((valid) => {
          if (valid) {
            postLoginInfo(this.userForm)
              .then((response) => {/*成功した場合*/
                if (response.data.success) {
                  this.$message({
                    message:"ログインに成功しました．",
                    type:"success",
                  })
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
                  message: "ログインに失敗しました" + error
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

  //   checkForm() {
  //    var mailBool = false
  //    if (!this.userForm.email) {//空ならば
  //      this.Validation.result_mail="メールアドレスを入力してください"
  //    }
  //    else if (!this.checkString(this.userForm.email)){
  //      //空ではないが，　checkString関数でthis.mailをバリデーションしてfalseなら
  //      this.Validation.result_mail="正しいメールアドレスの形式で入力してください"
  //    } else {//正しく入力されたなら，
  //      mailBool = true
  //    }

  //    if(mailBool === true){
  //      this.submitLogin();
  //      this.Validation.result_mail="";
  //      console.log(this.userForm.email);
  //     //  this.userForm.email = "";
  //    }
  //  },
  //  checkString (mail){
  //    var regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  //    return regex.test(mail);
  //  }
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

  .text-red{
    color: red;
    font-size: 12px;
  }
    
  

</style>

