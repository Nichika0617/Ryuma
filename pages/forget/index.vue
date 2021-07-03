<template>
  <div class="container">
    21
    <el-card class="forgot-pass-card">
      <div slot="header" class="pass-missd-header">
        <div class="pass-missed-title">パスワードをお忘れの方</div>
      </div>
      <el-input placeholder="ご登録されたメールアドレス" v-model="registered_mail_address"></el-input>
      <p class="password-reset-info">ご登録されたメールアドレスにパスワード再設定のご案内が送信されます。</p>
      <el-button type="success" class="btn-wrapper">送信する</el-button>

    </el-card>

  </div>
</template>
<script>
export default {
  data () {
    return {
      registered_mail_address: '',
      
    }
  },
  head(){
    return {
      title: 'パスワードを忘れました'
      }
  },
  methods: {
    
  },
  created() {
    
  },
}
</script>

<style scoped>

  .forgot-pass-card {
    max-width: 500px;
    margin: 0 auto;
  }

  .password-reset-info {
    margin: 8px 0 0;
    font-size: 12px;
    color: #888;
    line-height: 1.5;
  }

  .pass-missed-title {
    font-size: 22px;
    text-align: center;
    font-weight: 800;
  }

</style>