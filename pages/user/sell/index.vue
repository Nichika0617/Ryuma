<template>
  <div class="container">
    6,出品入力
    <el-card class="sell-card">
      <el-form 
        :model="SellForm"
        :rules="rules"
        ref="SellForm"
      >
        <el-form-item label="商品画像" prop="productimage">
          <multi-upload v-model="SellForm.images"></multi-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item label="商品名" prop="name">
          <el-input 
            placeholder="40文字まで"
            v-model="SellForm.name">
          </el-input>
        </el-form-item>
        
        <el-form-item label="商品説明" prop="introduction">
          <el-input 
            placeholder="1000文字まで"
            v-model="SellForm.introduction">
          </el-input>
        </el-form-item>

        <el-form-item label="取引方法" prop="deliveryMethod">
          <el-input 
            placeholder="取引方法を入力"
            v-model="SellForm.deliveryMethod">
          </el-input>
        </el-form-item>

        <el-form-item label="カテゴリー" prop="categoryId">
          <el-cascader
            placeholder="選択してください"
            v-model="SellForm.categoryId"
            :options="category_options"
            :props="optionProps">
          </el-cascader>
        </el-form-item>

        <el-form-item label="ブランド" prop="manufacturer">
          <el-input
            placeholder="ブランドを入力"
            v-model="SellForm.manufacturer">
          </el-input>
        </el-form-item>
        
        <el-form-item label="商品の状態" prop="status">
          <el-cascader
            placeholder="選択してください"
            v-model="SellForm.status"
            :options="status_option"
            :props="status_optionProps">
          </el-cascader>
        </el-form-item>

        <el-form-item label="商品価格" prop="price">
          <el-input
            placeholder="0"
            v-model="SellForm.price">
          </el-input>
        </el-form-item>


        <el-button @click="submitForm('SellForm')" type="success" round>出品する</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getCategories } from "@/api/category";
import multiUpload from '~/components/upload/multiUpload.vue';
import { putup } from "@/api/sell";
export default {
  components: { multiUpload },
  data () {
      
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,

      SellForm: {
        categoryId: '',
        deliveryMethod: '',
        id: '',
        images:[],
        introduction: '',
        manufacturer: '',
        name: '',
        price: '',
        status: '',
      },
      rules: {
        name: [
          { required: true, message: '商品名を入力してください', trigger: 'blur' },
          { min: 1, max: 40, message: '商品名は1~40文字にしてください', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '商品の説明を入力してください', trigger: 'blur'},
          { min: 1, max: 1000,message: '説明は1~1000文字にしてください', trigger: 'blur' },
          // フォーカス(選択)を失ったとき blur
        ],
        price: [
          { required: true, message: '値段を入力してください', trigger: 'blur'},
        ],
        // categoryIds: [
        //   { required: true, message: 'カテゴリーを選択してください', trigger: 'click'},
        // ],
      },

      loginInfo: "",
      category_options: [],
      optionProps: {
        value: "id",
        label: "name",
        expandTrigger: "hover",
      },

      status_option: [
      {
        "id": 1,
        "name_code":"new",
        "name": "新品未使用",
        "children": null,
      },
      {
        "id": 2,
        "name_code":"almost_new",
        "name": "未使用に近い",
        "children": null,
      },
      {
        "id": 3,
        "name_code":"almost_no_scratch",
        "name": "目立った傷や汚れなし",
        "children": null,
      },
      {
        "id": 4,
        "name_code":"scratch",
        "name": "やや傷や汚れあり",
        "children": null,
      },
      {
        "id": 5,
        "name_code":"bad_state",
        "name": "全体的に状態が悪い",
        "children": null,
      }
      ],

      status_optionProps: {
        value: "name_code",
        label: "name",
        expandTrigger: "hover",
      },
    };
  },

  head(){
    return {
      title: '出品ページ'
      }
  },
  methods: {

    fetchCategories() {
      getCategories().then((res) => {
        this.category_options = res.data.categories;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //alert('登録が完了しました．');
          this.SellForm.categoryId = this.SellForm.categoryId["1"];
          this.SellForm.status = this.SellForm.status["0"];
          this.postProduct(this.SellForm);
          console.log(this.SellForm);
          console.log(this.SellForm.categoryId["1"]);

      //     .then(res => {
      //       window.location.href="/"
      //     }).catch(err => {
      //       this.$message.error("もう一度送信してください")
      //     })
      //   } else {
      //     console.log('登録に失敗しました．入力を確認してください．');
      //     return false;
      //   }
      // });
        }
      })
    },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },

        postProduct(formData){
          console.log("以下を送信します\n" + JSON.stringify(formData));
          putup(formData).then(res =>{ //このputupはimportしたAPI dataではない．
            //成功した場合，
              this.$message({
              message: '商品登録しました',
              type: 'success'
              });
              console.log("登録完了")
              this.$router.push('/login');
          }).catch((error) =>{
            this.$message({
              message: '登録に失敗しました．' + error,
              type: 'error'
            });
            //vueを通り抜けたがエラーの場合，メール重複エラー？」　今(7/27)は非表示にしてます．44行目 
              console.log("登録失敗")
              this.resetForm('SellForm')
              console.log(error)
            })
        },
  },
  created() {
    this.fetchCategories();
  },
}
</script>

<style>
  .sell-card {
    max-width: 500px;
    margin: 0 auto;
  }

  .input-name {
    margin-bottom: 20px;
  }

</style>