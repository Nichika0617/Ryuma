<template>
  <div class="container" style="margin-top: 30px; margin-bottom:30px;">
    <el-card class="regist-card">
    <h3 style="text-align:center;">メールアドレスで登録する</h3>

  <el-form :model="register" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
    
    <el-form-item label="ニックネーム" prop="name">
        <el-input v-model="register.nickname"></el-input>      
    </el-form-item>

    <el-form-item label="パスワード" prop="password">
      <el-input type="password" v-model="register.password" auto-complete="off" show-password></el-input>
    </el-form-item>
  
    <el-form-item label="パスワード確認" prop="checkPass">
      <el-input type="password" v-model="register.repeatPassword" autocomplete="off"></el-input>
    </el-form-item>
  

    <el-form-item label="メールアドレス" prop="mail">
    <el-input v-model="register.email">
      <el-button slot="append" type="primary" @click="sendCode()">確認コードを送信</el-button>
    </el-input>
    </el-form-item>
    
    <el-form-item label="確認コードを入力" prop="code"> 
      <el-input v-model="register.code"></el-input>
    </el-form-item>
    
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登録</el-button>
    <el-button @click="resetForm('ruleForm')">リセット</el-button>
  </el-form-item>

  </el-form>
</el-card>
  
</div>
  
</template>

<script>
export default {
  layout: "no-header", /*ヘッダーやログインボタンがここには出ないように．*/
   data() {
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('パスワードを入力してください'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('もう一度パスワードを入力してください'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('パスワードが一致しません．もう一度入力してください．'));
        } else {
          callback();
        }
      };
      var mail_validate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('メールアドレスを入力してください'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('パスワードが一致しません．もう一度入力してください．'));
        } else {
          callback();
        }
      };

      return {
        register: {
          code:'',
          email:'',
          nickname: '',
          password: '',
          repeatPassword: ''
          },
    rules: {
      name: [
        { required: true, message: 'ニックネームを入力してください', trigger: 'blur' },
        { min: 2, max: 10, message: 'ニックネームは2~10文字にしてください', trigger: 'blur' }
      ],
      password: [
        { required: true, message: 'パスワードを入力してください', trigger: 'blur'},
        { min: 7, max: 30,message: 'パスワードは7~30文字にしてください', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
        // フォーカス(選択)を失ったとき blur
      ],
      checkPass: [
        { required: true, message: 'もう一度パスワードを入力してください', trigger: 'blur'},
        { validator: validatePass2, trigger: 'blur' }
      ],
      mail: [
        { required: true, message: 'メールアドレスを入力してください', trigger: 'blur'},
        { validator: mail_validate, trigger: 'blur' }
      ],
      code:[
        { required: true, message: '確認コードを入力してください', trigger: 'blur'},
        { type:'number', message: '正しいコードを入力してください',trigger: 'blur'}
      ]
      }
    };
  },
  head(){
    return {
      title: 'メールでサインアップ'
      }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('登録が完了しました．');
        } else {
          console.log('登録に失敗しました．入力を確認してください．');
          return false;
        }
      });
    },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      
      sendCode(){
        // ここにメールを送るコード
      }
    },
  created() {
    
  },
}
</script>

<style scoped>
  .regist-card {
    max-width: 700px;
    margin: 0 auto;
  }

.br-label {
  white-space: pre-line;
}
</style>