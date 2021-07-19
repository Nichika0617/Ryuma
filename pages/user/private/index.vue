<template>
  <div class="container">
    2　マイページ
    <el-card class="mypage-card">
      <div slot="header" class="clearfix">
        <div class="name-sell">
          <img class="trim-image-to-circle" src="https://2.bp.blogspot.com/-A8F_Yx7DQzc/W5H_uJBs5HI/AAAAAAABOvI/eSIYM1saVRw4op64Mee3t1GTO0MrLM9oACLcBGAs/s800/cat_boss_gang.png">
          <br>{{ username }}
          <br>出品数  {{ + num_sell }}
        </div>
      </div>
      お名前
      <el-input placeholder="例) 山田" v-model="profile.familyname" class="input-form"></el-input>
      <el-input placeholder="例) 太郎" v-model="profile.firstname" class="input-form"></el-input>
      お名前(カナ)
      <el-input placeholder="例) ヤマダ" v-model="profile.familyname_kana" class="input-form"></el-input>
      <el-input placeholder="例) タロウ" v-model="profile.firstname_kana" class="input-form"></el-input>
      メールアドレス
      <el-input placeholder="例) example.com" v-model="profile.mail" class="input-form"></el-input>
      電話番号
      <el-input placeholder="例) 09012345678" v-model="profile.phone_number" class="input-form"></el-input>
      <el-button class="custom-icon input-form" type="success" >変更する</el-button>

    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: '琉大猫',
      num_sell: 10,
      profile:{
        familyname: '',
        firstname: '',
        familyname_kana: '',
        firstname_kana: '',
        mail: '',
        phone_number: '',

      }
    }
  },
  head(){
    return {
      title: 'マイページ',
      }
  },
  methods: {
    
  },
  created() {
    
  },
}
</script>

<style scoped>
  .mypage-card {
    position: relative;
    left: 100%;
    width: 400px;
    transform: translateX(-100%);
  }
  .trim-image-to-circle {
    width:  100px;       /* ※縦横を同値に */
    height: 100px;       /* ※縦横を同値に */
    border-radius: 50%;  /* 角丸半径を50%にする(=円形にする) */
    border: 5px solid #00cc00;
  }
  .name-sell {
    text-align: center;
  }
  .input-form {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .custom-icon {
    width: 100%;
  }
</style>