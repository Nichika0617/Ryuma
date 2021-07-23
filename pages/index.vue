<template>
  <div class="container">
    <div
      v-for="item in indexData"
      :key="'category'+item.categoryId"
      v-if="item.products.length !== 0"
    >
      <el-row>
        <el-col :span="6">
          {{item.categoryName}}
        </el-col>
        <el-col :span="6">
          <a :href="'/category/'+item.categoryId">もっと見る</a>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="4"
          v-for="product in item.products"
          :key="product.id"
        >
          <el-card
            :body-style="{ padding: '10px' }"
            shadow="hover"
            class="card-style"
          >
            <img
              :src="product.coverUrl"
              class="product-image"
              @click="handleClickProduct(product.id)"
            >
            <div style="padding: 14px;" @click="handleClickProduct(product.id)">
              <span>{{ product.name }}</span>
              <span>¥{{product.price}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getIndexData, listProductsByCategoryId} from "@/api/product";
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
      });
    },
    handleClick() {
      listProductsByCategoryId(this.query).then((res) => {
        res.data.page;
      });
    },
    handleClickProduct(productId) {
      console.log(productId);
      window.location.href="/product/"+productId;
    }
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
</style>
