<template>
  <div class="container" style="margin-top: 50px;">
    <!--25
    forget/new_pw はメールないリンクより．-->
    <el-card class="new-pass-card">
      <div slot="header" class="new-pass-header">
        <div class="new-pass-title">新しいパスワードの入力</div>
      </div>
      <el-form :model="newpassForm">
        <div>新しいパスワード</div>
        <div style="margin-bottom: 20px;">
          <el-input
              placeholder="7文字以上の半角英数字"
              v-model="newpassForm.password"
              show-password>
          </el-input>
        </div>
        <div>新しいパスワードの確認</div>
        <div style="margin-bottom: 40px;">
          <el-input
              placeholder="新しいパスワードを再入力"
              v-model="newpassForm.confpassword"
              show-password>
          </el-input>
          <el-button type="success" style="margin-top: 20px;"><nuxt-link to="/forget/new_pw/success" class="save-pass">パスワードを保存する</nuxt-link></el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  layout: "no-header", /*ヘッダーやログインボタンがここには出ないように．*/
  data () {
    return {
      newpassForm:{
        password: '',
        confpassword: '',
      }
    }
  },
  head(){
    return {
      title: 'パスワード変更ページ'
      }
  },
  methods: {
    
  },
  created() {
    
  },
}
</script>

<style scoped>

  .new-pass-card {
    max-width: 500px;
    margin: 0 auto;
  }

  .new-pass-title {
    font-size: 22px;
    text-align: center;
    font-weight: 800;
  }

  .save-pass {
    color: white;
    text-decoration: none;
  }
</style>