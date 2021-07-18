<template>
  <div class="container">
    6,出品入力
    <el-card class="sell-card">
      <el-form :model="SellForm">
        <p>出品画像</p>
        <el-upload
          style="text-align: center;"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :auto-upload="false"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <div style="margin-bottom: 20px;">
          <p class="input-name">商品名</p>
          <el-input
            placeholder="40文字まで"
            v-model="SellForm.product_name"
            clearable>
          </el-input>
        </div>
        
        <div style="margin-bottom: 40px;">
          <p class="input-name">商品の説明</p>
          <el-input
            placeholder="1000文字以内"
            v-model="SellForm.description"
            clearable>
          </el-input>
        </div>

        <div class="block">
          <p class="input-name">カテゴリー</p>
          <el-cascader
            placeholder="選択してください"
            v-model="SellForm.category"
            :options="pro_category"
            @change="handleChange"></el-cascader>
        </div>

        <div class="block">
          <p class="input-name">商品の状態</p>
          <el-cascader
            placeholder="選択してください"
            v-model="SellForm.status"
            :options="pro_status"
            @change="handleChange"></el-cascader>
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

        <el-button type="success" round>確認する</el-button>




      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {

      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,

      SellForm: {
        product_name: '',
        description: '',
        category: '',
        status: '',
        price: '',
      },

      pro_category: [{
        value: 'interior',
        label: 'インテリア・住まい・小物',
      },{
        value: 'book',
        label: '本・音楽・ゲーム',
      },{
        value: 'home_electronics',
        label: '家電',
      },{
        value: 'ticket',
        label: 'チケット',
      }],

      pro_status: [{
        value: 'new',
        label: '新品・未使用',
      },{
        value: 'almost_new',
        label: '未使用に近い',
      },{
        value: 'almost_no_scratch',
        label: '目立った傷や汚れなし',
      },{
        value: 'bit_scratch',
        label: 'やや傷や汚れあり',
      },{
        value: 'scratch',
        label: '傷や汚れあり',
      },{
        value: 'bad_state',
        label: '全体的に状態が悪い',
      }],

      }
    },

  head(){
    return {
      title: '出品ページ'
      }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  created() {
    
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