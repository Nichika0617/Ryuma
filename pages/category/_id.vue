<template>
  <div class="container">
    <div
      v-for="item in page.records"
      :key="item.id"
    >
      <el-row>
        <div class="categoryName" style="margin-top:20px;">
          <!-- <h3>{{categoryName}}</h3> -->
        </div>
      </el-row>

      <el-row>
        <el-col
          :span="6"
          v-for="product in item"
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
              <span>¥{{ product.price }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {listProductsByCategoryId} from "@/api/product";
export default {
  data () {
    return {
      categoryQuery: {
          categoryId: this.$route.params.id,
          orderBy: 3,
          page: 1,
          size: 16
      },
      page: {},
    }
  },
  methods: {
    fetchData() {
      listProductsByCategoryId(this.categoryQuery)
        .then((res) => {
          this.page = res.data.page;
          console.log(this.page);
          console.log("レコード"+this.page.records)
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClickProduct(productId) {
      console.log(productId);
      window.location.href="/user/"+productId;
    }
  },
  created() {
    this.fetchData();
  },
}
</script>

<style scoped>
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

  .categoryName{
    font-size:20px;
    font-weight: bold;
    background-color: rgb(185, 238, 203);
  }

  .row-hide{
    overflow: hidden;
    white-space: nowrap;
    
}

</style>