<template>
  <div class="container">
    25　
    <el-card class="new-pass-card">
      <div slot="header" class="new-pass-header">
        <div class="new-pass-title">新しいパスワードの入力</div>
      </div>
      <el-form :model="newpassForm">
        <div>新しいパスワード</div>
        <div style="margin-bottom: 20px;">
          <el-input
              placeholder="7文字以上の半角英数字"
              v-model="password"
              show-password>
          </el-input>
        </div>
        <div>新しいパスワードの確認</div>
        <div style="margin-bottom: 40px;">
          <el-input
              placeholder="新しいパスワードを再入力"
              v-model="confpassword"
              show-password>
          </el-input>
          <el-button type="success" style="margin-top: 20px;">パスワードを保存する</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      password: '',
      confpassword: '',
      
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

  .new-pass-title {
    font-size: 22px;
    text-align: center;
    font-weight: 800;
  }

</style>