<template>
  <div class="container">
    6,出品入力
    <el-card class="sell-card">
      <el-form :model="SellForm" :rules="rules" ref="SellForm">
        <p>出品画像</p>
        <multi-upload v-model="SellForm.images"></multi-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <div style="margin-bottom: 20px;">
          <p class="input-name">商品名</p>
          <el-input
            placeholder="40文字まで"
            v-model="SellForm.name"
            clearable>
          </el-input>
        </div>
        
        <div style="margin-bottom: 40px;">
          <p class="input-name">商品の説明</p>
          <el-input
            placeholder="1000文字以内"
            v-model="SellForm.introduction"
            clearable>
          </el-input>
        </div>

        <div class="block">
          <p class="input-name">カテゴリー</p>
          <el-cascader
            placeholder="選択してください"
            v-model="categoryIds"
            :options="options"
            :props="optionProps">
          </el-cascader>
        </div>

        <div class="block">
          <p class="input-name">商品の状態</p>
          <el-cascader
            placeholder="選択してください"
            v-model="SellForm.status">
          </el-cascader>
        </div>

        <div style="margin-bottom: 40px;">
          <p class="input-name">販売価格</p>
          <span>¥</span>
          <el-input
            placeholder="0"
            v-model="SellForm.price"
            clearable>
          </el-input>
        </div>

        <el-button @click="submitForm(SellForm)" type="success" round>出品する</el-button>




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
        categoryId: this.categoryIds,
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
      },

      categoryIds: [],
      loginInfo: "",
      options: [],
      optionProps: {
        value: "id",
        label: "name",
        expandTrigger: "hover",
      },

      }
    },

  head(){
    return {
      title: '出品ページ'
      }
  },
  methods: {
    
    fetchCategories() {
      getCategories().then((res) => {
        this.options = res.data.categories;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('登録が完了しました．');
          putup(this.SellForm).then(res => {
            if(this.SellForm.code == 200) {
              window.location.href = "/"
            }
          }).catch(err => {
            this.$message.error("もう一度送信してください")
          })
        } else {
          console.log('登録に失敗しました．入力を確認してください．');
          return false;
        }
      });
    },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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