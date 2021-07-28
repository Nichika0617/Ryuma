<template>
  <!-- <div class="container">
    2　マイページ -->
  <el-container style="width: 1000px;">
    <el-aside width="400px" style="background-color: rgb(238, 241, 246)">
      <el-menu>
        <el-menu-item-group >
          <el-menu-item index="1-0" class="item-btn">
            <nuxt-link to="/user/private" class="item-btn">マイページ <i class="el-icon-edit"></i></nuxt-link>
          </el-menu-item>

          <el-menu-item index="1-1" class="item-btn">
            <!-- <nuxt-link to="/login" class="item-btn">お知らせ <i class="el-icon-bell"></i></nuxt-link> -->
            お知らせ <i class="el-icon-bell"></i>
          </el-menu-item>

           <el-menu-item index="1-2">
            <nuxt-link to="/user/private/product/favorites" class="item-btn">いいね！ブックマーク <i class="el-icon-star-off"></i></nuxt-link>
          </el-menu-item>

           <el-menu-item index="1-3">
            <nuxt-link to="/user/sell" class="item-btn">出品する<i class="el-icon-sell"></i></nuxt-link>
          </el-menu-item>

           <el-menu-item index="1-4">
            <nuxt-link to="/user/private/product/selling" class="item-btn">出品中一覧<i class="el-icon-goods"></i></nuxt-link>
          </el-menu-item>

           <el-menu-item index="1-5">
            <nuxt-link to="/user/private/product/trading" class="item-btn">取引中一覧<i class="el-icon-shopping-cart-full"></i></nuxt-link>
          </el-menu-item>

           <el-menu-item index="1-5">
            <nuxt-link to="/user/private/product/history" class="item-btn">過去の取引一覧<i class="el-icon-box"></i></nuxt-link>
          </el-menu-item>

        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <el-container>

       <el-container>
    <el-header style="text-align: center; ">
      <h3>マイページ</h3>
    </el-header>


      <el-main>
        <el-card class="mypage-card">
          <div slot="header" class="clearfix">
            <div class="name-sell">
              <el-avatar
                icon="el-icon-user-solid"
                :src="loginInfo.avatar"
                style="margin-top: 10px"
              ></el-avatar>
              <!-- <img class="trim-image-to-circle" src="https://2.bp.blogspot.com/-A8F_Yx7DQzc/W5H_uJBs5HI/AAAAAAABOvI/eSIYM1saVRw4op64Mee3t1GTO0MrLM9oACLcBGAs/s800/cat_boss_gang.png"> -->
              <br />
              {{ loginInfo.nickname }}
              <br />出品数 {{ +num_sell }}
            </div>
          </div>
          お名前
          <el-input
            placeholder="例) 山田"
            v-model="profile.familyname"
            class="input-form"
          ></el-input>
          <el-input
            placeholder="例) 太郎"
            v-model="profile.firstname"
            class="input-form"
          ></el-input>
          お名前(カナ)
          <el-input
            placeholder="例) ヤマダ"
            v-model="profile.familyname_kana"
            class="input-form"
          ></el-input>
          <el-input
            placeholder="例) タロウ"
            v-model="profile.firstname_kana"
            class="input-form"
          ></el-input>
          メールアドレス
          <el-input
            placeholder="例) example.com"
            v-model="profile.mail"
            class="input-form"
          ></el-input>
          電話番号
          <el-input
            placeholder="例) 09012345678"
            v-model="profile.phone_number"
            class="input-form"
          ></el-input>
          <table class="table">
            <tr>
              <td>都道府県</td>
              <td>
                <select name="input_pref" class="input-form">
                  <option value="">都道府県選択</option>
                  <option
                    v-for="(item, index) in pref"
                    v-bind:value="item.no"
                    :key="index"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </td>
            </tr>
          </table>

          市区町村
          <el-input
            placeholder="例) 宜野湾市"
            v-model="profile.municipality"
            class="input-form"
          ></el-input>
          番地
          <el-input
            placeholder="例) 中頭郡西原町千原1"
            v-model="profile.block"
            class="input-form"
          ></el-input>
          建物名
          <el-input
            placeholder="例) 流猫ビル101"
            v-model="profile.block"
            class="input-form"
          ></el-input>
          <el-button class="custom-icon input-form" type="success"
            >変更する</el-button
          >
        </el-card>
      </el-main>
    </el-container>
    </el-container>
  </el-container>
  <!-- </div> -->
</template>
<script>
import cookie from "js-cookie";
export default {
  data() {
    return {
      loginInfo: "",
      num_sell: 10,
      profile: {
        familyname: "",
        firstname: "",
        familyname_kana: "",
        firstname_kana: "",
        mail: "",
        phone_number: "",
        municipality: "",
      },
      pref: [
        { no: "1", name: "\u5317\u6d77\u9053" },
        { no: "2", name: "\u9752\u68ee\u770c" },
        { no: "3", name: "\u5ca9\u624b\u770c" },
        { no: "4", name: "\u5bae\u57ce\u770c" },
        { no: "5", name: "\u79cb\u7530\u770c" },
        { no: "6", name: "\u5c71\u5f62\u770c" },
        { no: "7", name: "\u798f\u5cf6\u770c" },
        { no: "8", name: "\u8328\u57ce\u770c" },
        { no: "9", name: "\u6803\u6728\u770c" },
        { no: "10", name: "\u7fa4\u99ac\u770c" },
        { no: "11", name: "\u57fc\u7389\u770c" },
        { no: "12", name: "\u5343\u8449\u770c" },
        { no: "13", name: "\u6771\u4eac\u90fd" },
        { no: "14", name: "\u795e\u5948\u5ddd\u770c" },
        { no: "15", name: "\u65b0\u6f5f\u770c" },
        { no: "16", name: "\u5bcc\u5c71\u770c" },
        { no: "17", name: "\u77f3\u5ddd\u770c" },
        { no: "18", name: "\u798f\u4e95\u770c" },
        { no: "19", name: "\u5c71\u68a8\u770c" },
        { no: "20", name: "\u9577\u91ce\u770c" },
        { no: "21", name: "\u5c90\u961c\u770c" },
        { no: "22", name: "\u9759\u5ca1\u770c" },
        { no: "23", name: "\u611b\u77e5\u770c" },
        { no: "24", name: "\u4e09\u91cd\u770c" },
        { no: "25", name: "\u6ecb\u8cc0\u770c" },
        { no: "26", name: "\u4eac\u90fd\u5e9c" },
        { no: "27", name: "\u5927\u962a\u5e9c" },
        { no: "28", name: "\u5175\u5eab\u770c" },
        { no: "29", name: "\u5948\u826f\u770c" },
        { no: "30", name: "\u548c\u6b4c\u5c71\u770c" },
        { no: "31", name: "\u9ce5\u53d6\u770c" },
        { no: "32", name: "\u5cf6\u6839\u770c" },
        { no: "33", name: "\u5ca1\u5c71\u770c" },
        { no: "34", name: "\u5e83\u5cf6\u770c" },
        { no: "35", name: "\u5c71\u53e3\u770c" },
        { no: "36", name: "\u5fb3\u5cf6\u770c" },
        { no: "37", name: "\u9999\u5ddd\u770c" },
        { no: "38", name: "\u611b\u5a9b\u770c" },
        { no: "39", name: "\u9ad8\u77e5\u770c" },
        { no: "40", name: "\u798f\u5ca1\u770c" },
        { no: "41", name: "\u4f50\u8cc0\u770c" },
        { no: "42", name: "\u9577\u5d0e\u770c" },
        { no: "43", name: "\u718a\u672c\u770c" },
        { no: "44", name: "\u5927\u5206\u770c" },
        { no: "45", name: "\u5bae\u5d0e\u770c" },
        { no: "46", name: "\u9e7f\u5150\u5cf6\u770c" },
        { no: "47", name: "\u6c96\u7e04\u770c" },
      ],
    };
  },
  head() {
    return {
      title: "マイページ",
    };
  },
  methods: {
    fetchData() {
      let userStr = cookie.get("ryus_user");
      if (userStr) {
        this.isLogin = true;
        this.loginInfo = JSON.parse(userStr);
      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.mypage-card {
  margin-left: 80px;
  width: 400px;
  /* position: relative; */
  /* left: 100%; */
  /* transform: translateX(-140%); */
  
}
.trim-image-to-circle {
  width: 100px; /* ※縦横を同値に */
  height: 100px; /* ※縦横を同値に */
  border-radius: 50%; /* 角丸半径を50%にする(=円形にする) */
  border: 5px solid #00cc00;
}
.name-sell {
  text-align: center;
}
.input-form {
  margin-bottom: 10px;
  margin-top: 10px;
}
.custom-icon {
  width: 100%;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
.el-aside {
  color: #333;
}
.item-btn {
  color: black;
  font-size: 20px;
  text-decoration: none; /*アンダーラインなし */
}
i{
  color: rgb(77, 145, 247);
}
</style>