<template>
  <div class="container" style="margin-top: 50px;">
   <!-- 21,24-->
    <el-card class="forgot-pass-card" v-if="show">
      <div slot="header" class="pass-missd-header">
        <div class="pass-missed-title">パスワードをお忘れの方</div>
      </div>
      <el-input placeholder="ご登録されたメールアドレス" v-model="registered_mail_address"></el-input>
      <p class="password-reset-info">ご登録されたメールアドレスにパスワード再設定のご案内が送信されます。</p>
      <el-button @click="show=!show" type="success" class="btn-wrapper">送信する</el-button>
    </el-card>

    <el-card class="sent-mail-card" v-if="!show">
      <div slot="header" class="sent-mail-header">
        <div class="sent-mail-title">メールを送信しました</div>
      </div>
    <p>{{ for_confirm_mail }}へメールを送信しました。メールに記載されたURLをクリックして、パスワードの変更を完了してください。
       メールが届かない場合、再度送信してください。</p>
       <el-button @click="show=!show" type="success" class="btn-wrapper">再度送信する</el-button>
    </el-card>

  </div>
</template>
<script>
export default {
  layout: "no-header", /*ヘッダーやログインボタンがここには出ないように．*/
  data () {
    return {
      registered_mail_address: '',
      for_confirm_mail: 'ryudaineko@ie.u-ryukyu.ac.jp',
      
      show: true
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
  
  .btn-wrapper {
    margin-top: 20px;
  }

  .sent-mail-card {
    max-width: 500px;
    margin: 0 auto;
  }

  .sent-mail-title {
    font-size: 22px;
    text-align: center;
    font-weight: 800;
  }

</style>