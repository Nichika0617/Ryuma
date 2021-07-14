<template>
  <div class="container">
  <br>
    <el-button type="primary" icon="el-icon-search">Search</el-button>
      <br>
    <el-dropdown>
      <span class="el-dropdown-link">
        カテゴリーから探す<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>インテリア・住まい・小物</el-dropdown-item>
        <el-dropdown-item>本・音楽・ゲーム</el-dropdown-item>
        <el-dropdown-item></el-dropdown-item>
        <el-dropdown-item>家電</el-dropdown-item>
        <el-dropdown-item>チケット</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  <el-row>
    <el-col :span="4" v-for="(image, index) in images" :key="index">
      <el-card :body-style="{ padding: '10px' }" shadow="hover" class="card-style">
        <img :src="image" class="product-image">
        <div style="padding: 14px;">
          <span>{{ product }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>

     <el-button :plain="true" @click="open">商品詳細</el-button>

    {{loginInfo}}
  </div>
</template>

<script>
import cookie from "js-cookie";
export default {
  data(){
    return{
      loginInfo: '',
      images: [
        'https://3.bp.blogspot.com/-a966DI8nKC0/VZt5be2saPI/AAAAAAAAu58/cun5FSCla6k/s800/money_saifu_naga.png',
        'https://4.bp.blogspot.com/-1XLKOBiyV70/VdL1S_5UDAI/AAAAAAAAw9U/OrE1WozGBV8/s800/oven_renji.png',
        'https://2.bp.blogspot.com/-S3cfGZGsBAk/WKFjIqvaF_I/AAAAAAABBvc/L95XLp5T8Vct6UYaTqHiiimyg1GKg9RzwCLcB/s800/ticket_green.png',
        'https://2.bp.blogspot.com/-lc7stKN5L44/U2sr05Vmz3I/AAAAAAAAf5M/o5yZtrvPzwE/s800/waist_bag.png',
        'https://3.bp.blogspot.com/-lB1eKUlnBuM/V4SA-61oFxI/AAAAAAAA8PY/kyUpS5AaDhUOBMn0oHvq_maon58uPpQGQCLcB/s800/kaden_reizouko.png',
      ],
      product: '商品',
      currentDate: new Date(),
    }
  },
  created(){
    this.fetchData();
  },
  head(){
    return {
      title: 'homeページ',
      }
  },
  methods: {
    fetchData() {
      let userStr = cookie.get("ryus_user");
      if (userStr) {
        this.loginInfo = JSON.parse(userStr);
      }
    },
    open(){
      this.$message({
        showClose: true,
        message:'商品詳細を見るためにはログインしてください．'
      });
    }
  },
}

</script>

<style>
    .card-style {
      margin: 5px 5px 5px 5px;

    }
    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .product-image {
      display: block;
      width: 90%;
      height: 90%;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    
</style>
