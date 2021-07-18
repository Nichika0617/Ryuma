<template>

    <!--14,問い合わせここにはお問い合わせフォームを作成します-->
    
  <div class="container" style="margin-top: 50px;">
    <!--3,商品詳細ページ
    http://localhost:3000/product
    -->  
    <h1>お問い合わせ </h1>
    <el-card :body-style="{ padding: '0px' }" class="question-card">
    <div class="m-7">
    
        <div>
            <p>お名前
            <span class="text-red">(必須)</span>
            </p>
          <el-input placeholder="琉大太郎" v-model="name" clearable></el-input>
          <p class="text-red">{{ Validation.result_name }}</p>
        </div>
        
        <div>
          <p>
            メールアドレス
            <span class="text-red">(必須)</span>
          </p>
          
          <el-input placeholder="yourmail@example.com" v-model="mail" clearable ></el-input>
          <p class="text-red">{{ Validation.result_mail }}</p>
        </div>
        
        <div>
          <p>
            電話番号
          </p>
          <el-input placeholder="01234567890" v-model="phone" clearable></el-input>
        </div
        >
        <div>
          <p>
            内容
            <span class="text-red">(必須)</span>
          </p>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="お問い合わせ内容です"
            v-model="textarea">
          </el-input>
          <p class="text-red">{{ Validation.result_textarea }}</p>
        </div>

        <div style="margin-top:10px">
           <el-button type="info" class="send-button" plain @click="checkForm">送信する</el-button>
        </div>

    </div>
    </el-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      name:'',
      mail:'',
      phone:'',
      textarea:'',
      Validation:{
        result_name:"",
        result_mail: "",
        result_textarea:""
     },
    }
  },
  head(){
    return {
      title: 'お問い合わせ',
      }
  },
  methods: {
    checkForm() {
    //-------名前---------
    var nameBool = false
    if (!this.name) {//空ならば
       this.Validation.result_name="名前を入力してください"
     }else {//正しく入力されたなら，
       nameBool = true
     }
    if(nameBool === true){
       this.Validation.result_name= "";
     }
    
    //-------メール---------
    var mailBool = false
    if (!this.mail) {//空ならば
       this.Validation.result_mail="メールアドレスを入力してください"
     }
    else if (!this.checkString(this.mail)){
       //空ではないが，　checkString関数でthis.mailをバリデーションしてfalseなら
       this.Validation.result_mail="正しいメールアドレスの形式で入力してください"
     } else {//正しく入力されたなら，
       mailBool = true
     }

    if(mailBool === true){
       this.Validation.result_mail= "";
       console.log(this.mail);
       
     }
     
     //-------テキストエリア---------
    var textBool = false
    if (!this.textarea) {//空ならば
       this.Validation.result_textarea="内容を入力してください"
    }else {//正しく入力されたなら，
       textBool = true
     }
    if(textBool === true){
       this.Validation.result_textarea= "";
     }
    
    if(nameBool === true & mailBool === true & textBool === true ){
      console.log(this.name);
      this.name = "";
      console.log(this.mail);
      this.mail = "";
      console.log(this.textarea)
      this.textarea = "";
      this.Validation.result_textarea="送信が完了しました！"
    }
   },
   checkString (mail){
     var regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
     return regex.test(mail);
   }
 },
  created() {
    
  },
}
</script>

<style scoped>
  .question-card {
    max-width: 500px;
    margin: 0 auto;
    padding: 10px 10px;
  }

  .text-red{
    color: red;
    font-size: 12px;
  }

  .send-button{
  display: block;
  margin: 0 0 0 auto;
  }
</style>