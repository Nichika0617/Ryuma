<template>
  <div class="container">
    30
    <el-card class="pass-accept-card">
      <div>
        パスワードの設定が完了しました。<br>
        次回から新しいパスワードでログインできます。
      </div>
      <el-button type="success" style="margin-top: 20px"><nuxt-link to="/login" class="login">ログイン</nuxt-link></el-button>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      
    }
  },
  head(){
    return {
      title: '変更完了!'
      }
  },
  methods: {
    
  },
  created() {
    
  },
}
</script>

<style scoped>

  .pass-accept-card {
    max-width: 500px;
    margin: 0 auto;
    font-size: 16px;
    text-align: center;
    font-weight: 800;
    
  }

  .login {
    color: white;
    text-decoration: none;
  }
</style>