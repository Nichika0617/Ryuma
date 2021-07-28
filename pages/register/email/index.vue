<template>
  <div class="container" style="margin-top: 30px; margin-bottom: 30px">
    <el-card class="regist-card">
      <h3 style="text-align: center">メールアドレスで登録する</h3>

      <el-form
        :model="register"
        :rules="rules"
        ref="register"
        label-width="150px"
      >
        <el-form-item label="ニックネーム" prop="nickname">
          <el-input v-model="register.nickname" 
          placeholder="琉大 太郎"></el-input>
        </el-form-item>

        <el-form-item label="パスワード" prop="password">
          <el-input
            type="password"
            v-model="register.password"
            auto-complete="off"
            show-password
            placeholder="6~30文字"
          ></el-input>
        </el-form-item>

        <el-form-item label="パスワード確認" prop="repeatPassword">
          <el-input
            type="password"
            v-model="register.repeatPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="メールアドレス"
          prop="email"
          v-bind:class="{ is_error: add_error }"
        >
          <!-- add_error が true の場合、 is_error cssを反映 -->
          <el-input v-model="register.email"
          placeholder="info@xxx.jp">
            
            <el-button
              slot="append"
              type="primary"
              @click="send_RegistCode('register')"
              >確認コードを送信</el-button
            >
          </el-input>
          <!-- <el-alert
            v-if="add_error"
            title="すでに登録されているメールアドレスです"
            type="error"
            :closable="false"
          ></el-alert> -->
        </el-form-item>

        <el-form-item label="確認コードを入力" prop="code">
          <el-input v-model="register.code"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('register')"
            >登録</el-button
          >
          <el-button @click="resetForm('register')">リセット</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { register } from "@/api/userApi";
import { sendCode } from "@/api/userApi";
export default {
  layout: "no-header" /*ヘッダーやログインボタンがここには出ないように．*/,
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("パスワードを入力してください"));
      } else {
        if (this.register.repeatPassword !== "") {
          this.$refs.register.validateField("repeatPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("もう一度パスワードを入力してください"));
      } else if (value !== this.register.password) {
        callback(
          new Error("パスワードが一致しません．もう一度入力してください．")
        );
      } else {
        callback();
      }
    };

    return {
      //
      register: {
        code: "",
        email: "",
        nickname: "",
        password: "",
        repeatPassword: "",
      },

      add_error: false,

      rules: {
        nickname: [
          {
            required: true,
            message: "ニックネームを入力してください",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "ニックネームは2~10文字にしてください",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "パスワードを入力してください",
            trigger: "blur",
          },
          {
            min: 6,
            max: 30,
            message: "パスワードは6~30文字にしてください",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
          // フォーカス(選択)を失ったとき blur
        ],
        repeatPassword: [
          {
            required: true,
            message: "もう一度パスワードを入力してください",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur" },
        ],
        email: [
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
        code: [
          {
            required: true,
            message: "確認コードを入力してください",
            trigger: "blur",
          },
          {
            pattern: /[0-9]+/,
            message: "正しいコードを入力してください",
            trigger: "blur",
          },
        ],
      },
    };
  },
  head() {
    return {
      title: "メールでサインアップ",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // let dataform = new FormData();
          // dataform.append('code', this.register.code);
          // console.log(this.register.code);
          // dataform.append('email', this.register.email);
          // dataform.append('nickname', this.register.nickname);
          // dataform.append('password', this.register.password);
          // dataform.append('repeatPassword', this.register.repeatPassword);

          this.add_error = false;
          this.postData(this.register);
          //   .then(res =>{
          //     //dataの中のものだからthis
          //     //成功した場合
          //     this.$message({
          //       message: '新規会員登録しました',
          //       type: 'success'
          //   });
          //     console.log("登録完了")
          //     this.$router.push('/login');

          //   }).catch((error) => {
          //     //例外発生
          //     this.$message({
          //       message: '登録できません',
          //       type: 'error'
          //     });
          //     this.add_error = true;
          //     console.log("登録失敗")
          //     resetForm('register')
          //     console.log(error,this.register)
          //   }
          // )
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    postData(formData) {
      console.log("以下を送信します\n" + JSON.stringify(formData));
      register(formData)
        .then((res) => {
          //このregisterはimportしたAPI dataではない．
          //成功した場合，
          this.$message({
            message: "新規会員登録しました",
            type: "success",
          });
          console.log("登録完了");
          this.$router.push("/login");
        })
        .catch((error) => {
          this.$message({
            message: "登録に失敗しました．" + error,
            type: "error",
          });
          this.add_error = true;
          //vueを通り抜けたがエラーの場合，メール重複エラー？」　今(7/27)は非表示にしてます．44行目
          console.log("登録失敗");
          // this.resetForm("register");
          console.log(error);
        });
    },

    send_RegistCode() {
      sendCode(this.register.email)
        .then((res) => {
          //成功した場合，
          this.$message({
            message: "入力されたメールアドレスに確認コードを送信しました．",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message({
            message: "エラーが発生しました．" + error,
            type: "error",
          });
        });
    },
    created() {

    },
  },
};
</script>

<style scoped>
.regist-card {
  max-width: 700px;
  margin: 0 auto;
}

.br-label {
  white-space: pre-line;
}

.is_error input {
  border-color: #f56c6c !important;
  /* スタイルの優先順位を上げる */
}
</style>