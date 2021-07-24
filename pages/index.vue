<template>
  <div class="container">
    <div v-for="item in indexData" :key="'category' + item.categoryId">
      <div v-if="item.products.length !== 0">
        <el-row>
          <hr />
          <div class="categoryName" style="margin-top: 20px">
            <el-col :span="6">
              {{ item.categoryName }}
            </el-col>
            <el-col :span="6">
              <div style="float: right">
                <a :href="'/category/' + item.categoryId">もっと見る</a>
              </div>
            </el-col>
          </div>
        </el-row>

        <el-row class="row-hide">
          <el-col :span="6" v-for="product in item.products" :key="product.id">
            <el-card
              :body-style="{ padding: '10px' }"
              shadow="hover"
              class="card-style"
            >
              <img
                :src="product.coverUrl"
                class="product-image"
                @click="handleClickProduct(product.id)"
              />
              <div
                style="padding: 14px"
                @click="handleClickProduct(product.id)"
              >
                <span>{{ product.name }}</span>
                <span>¥{{ product.price }}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getIndexData, listProductsByCategoryId } from "@/api/product";
export default {
  data() {
    return {
      loginInfo: "",
      indexData: null,
    };
  },
  created() {
    this.fetchData();
  },
  head() {
    return {
      title: "homeページ",
    };
  },
  methods: {
    fetchData() {
      getIndexData({ num: 4 }).then((res) => {
        this.indexData = res.data.data;
        console.log(this.indexData);
      });
    },
    handleClick() {
      listProductsByCategoryId(this.query).then((res) => {
        res.data.page;
      });
    },
    handleClickProduct(productId) {
      console.log(productId);
      window.location.href = "/product/" + productId;
    },
  },
};
</script>

<style>
.card-style {
  margin: 5px 5px 5px 5px;
  height: 200px;
  width: 200px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.product-image {
  display: block;
  object-fit: cover;
  height: 150px;
  cursor: pointer;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.categoryName {
  font-size: 20px;
  font-weight: bold;
  background-color: rgb(185, 238, 203);
}

.row-hide {
  overflow: hidden;
  white-space: nowrap;
}
</style>
