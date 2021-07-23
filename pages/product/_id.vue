<template>
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
          v-for="(item,index) in product.images"
          :key="item.id"
        >
          <img :src="item.imageUrl" class="img"></img>
        </el-carousel-item>
      </el-carousel>
      <div
        style="padding: 14px;"
        class="price-text"
      >
        <p>¥{{product.price}}</p>
        <el-button type="danger">購入画面へ</el-button>
      </div>

    </el-card>

    <div class="details">
      <table>
        <tr>
          <th>出品者</th>
          <td>アカウント名
            <!--画像があるのならばそのリンクを
             <el-avatar src="https://アイコンのリンク.png"></el-avatar>
             -->

            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <!--ないならばこっちを表示-->
          </td>
        </tr>
        <tr>
          <th>カテゴリー</th>
          <td>シャツ</td>
        </tr>
        <tr>
          <th>ブランド</th>
          <td>{{product.manufacturer}}</td>
        </tr>
        <tr>
          <th>商品の状態</th>
          <td>{{product.status}}</td>
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
        <p>このコメントは公に公開されます．</p>
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
</style>
