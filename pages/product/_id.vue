<template>
<!-- 商品詳細 -->
  <div
    class="container"
    style="margin-top: 50px;"
  >
    <el-card
      :body-style="{ padding: '0px' }"
      class="product-card"
    >

      <div class="product-name">{{product.name}}</div>

      <el-carousel
        :interval="5000"
        arrow=""
        class="carousel"
      >
        <!--arrow="always"　で常に左右矢印表示できる．-->
        <el-carousel-item
          v-for="item in product.images"
          :key="item.id"
        >
          <img :src="item.imageUrl" class="img">
        </el-carousel-item>
      </el-carousel>
      <div
        style="padding: 14px;"
        class="price-text"
      >
        <p>¥{{product.price}}</p>
        <el-button type="success" @click="dialogVisible = true">購入希望する</el-button>
      </div>

    </el-card>

    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>購入希望を確定してもいいですか？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">キャンセル</el-button>
        <el-button type="success" @click="dialogVisible = false"><nuxt-link to="/product/success" class="dia">確定</nuxt-link></el-button>
      </span>
    </el-dialog>

    <div class="details">
      <table>
        <tr>
          <th>出品者</th>
          <td>
            <a :href="'/user/'+product.memberId" style="text-decoration: none; color:black;">{{product.memberNickname}}
            <el-avatar 
            icon="el-icon-user-solid"
            :src="product.memberAvatar"
        ></el-avatar>
            </a>
          </td>
        </tr>
        <tr>
          <th>カテゴリー</th>
          <td>{{product.categoryName}}</td>
        </tr>
        <tr>
          <th>ブランド</th>
          <td>{{product.manufacturer}}</td>
        </tr>
        <tr>
          <th>商品の状態</th>
          <td>{{product.status}}</td>
        </tr>
        <tr>
          <th>商品の紹介</th>
          <td>{{product.introduction}}</td>
        </tr>
      </table>
    </div>

    <el-card
      :body-style="{ padding: '0px' }"
      class="product-card"
    >

      <el-scrollbar max-height="40px">
        <p
          class="comment"
          v-for="comment in comments"
          v-bind:key="comment"
        >
          <el-avatar icon="el-icon-user-solid"></el-avatar>{{ comment }}
        </p>
      </el-scrollbar>

    </el-card>

    <el-card
      :body-style="{ padding: '0px' }"
      class="product-card"
    >

      <div class="chat-explain">
        <p>相手のことを考え，丁寧なコメントを心がけましょう．</p>
        <p>このコメントは公開されます．</p>
      </div>

      <div class="send-message">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="Please input"
          v-model="comment"
        >
        </el-input>
      </div>
      コメント {{count}}
      <el-button
        type="info"
        class="send-button"
        @click="send(comment)"
      >送信する</el-button>
    </el-card>
  </div>
</template>

<script>
import { getProduct } from "@/api/product";

export default {
  data() {
    return {
      item: "",
      count: 0,
      comment: "",
      comments: [],
      product: {},
      dialogVisible: false,
    };
  },
  head() {
    return {
      title: "商品詳細",
    };
  },
  methods: {
    errorHandler() {
      return true;
    },
    send(comment) {
      this.count++;
      this.comments.push(comment);
      this.comment = "";
    },
    fetchData() {
      getProduct(this.$route.params.id)
        .then((res) => {
          this.product = res.data.product;
          console.log(this.product);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClickProduct(memberId) {
      console.log(memberId);
      window.location.href="/user/"+memberId;
    },
 
    

  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.product-card {
  max-width: 500px;
  margin: 0 auto;
}
.product-name {
  text-align: center;
  font-weight: bold;
}

.carousel {
  background-color: rgba(114, 114, 114, 0.205);
}

.price-text {
  text-align: center;
}

.details {
  text-align: center;
  max-width: 500px;
  margin: 50px auto;
}

table {
  width: 100%;
  border-collapse: collapse; /* <table> の中のセルは境界線を共有する*/
}

table tr {
  border-bottom: solid 2px white;
}

table tr:last-child {
  border-bottom: none;
}

table th {
  position: relative;
  text-align: left;
  width: 30%;
  background-color: #52c2d0;
  color: white;
  text-align: center;
  padding: 10px 0;
}

table th:after {
  /*thの擬似要素のafter*/
  display: block;
  width: 0px;
  height: 0px;
  position: absolute;
  top: calc(
    50% - 10px
  ); /*calc()，相対単位（%やvw, vhなど）と絶対単位（pxなど）を組み合わせる*/
  right: -10px;
  border-left: 10px solid #52c2d0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}

table td {
  text-align: left;
  width: 70%;
  text-align: center;
  background-color: #eee;
  padding: 10px 0;
}

.chat-explain {
  background-color: rgb(181, 241, 181);
  text-align: center;
}

.send-button {
  display: block;
  margin: 0 0 0 auto;
}
.img{
  width:100%;
}

.dia {
    color: white;
    text-decoration: none;
}
</style>
