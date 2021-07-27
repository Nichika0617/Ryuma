<template>
  <div>
    <header>
      <span class="header-font">Ryuma!</span>
      <el-cascader
        placeholder="カテゴリで検索"
        v-model="categoryIds"
        :options="options"
        @change="handleChange"
        :props="optionProps"
      ></el-cascader>
      <div
        class="header-btn"
        v-if="!isLogin"
      >
        <el-button type="primary">
          <nuxt-link
            to="/login"
            class="login"
          >　ログイン　</nuxt-link>
        </el-button>
        <el-button type="primary">
          <nuxt-link
            to="/register"
            class="login"
          >サインアップ</nuxt-link>
        </el-button>
      </div>
      <div
        class="user"
        v-if="isLogin"
      >
        <el-avatar
          icon="el-icon-user-solid"
          :src="loginInfo.avatar"
          style="margin-top:10px;"
        ></el-avatar>
        <span @click="handleClick" style="margin-right:10px;">{{ loginInfo.nickname }}</span>
        <el-button type="danger" @click="handleLogout">ログアウト</el-button>
      </div>
    </header>

    <nuxt keep-alive />
    <footer>
      <ul class="footer-menu">
        <li> <a
            href="/about_us"
            class="footer_link"
          > <span class="ryuma"> Ryuma! </span>について </a> ｜</li>
        <li> <a
            href="/privacy"
            class="footer_link"
          >プライバシーと利用規約 </a> ｜</li>
        <li> <a
            href="/question"
            class="footer_link"
          >お問い合わせ </a> ｜</li>
      </ul>
      <nuxt-link
        to="/"
        class="return-top ryuma"
      > Ryuma! </nuxt-link>
    </footer>
  </div>
</template>
<script>
import { getCategories } from "@/api/category";
import { getIndexData } from "@/api/product";
import cookie from "js-cookie";
export default {
  data() {
    return {
      isLogin: false,
      categoryIds: [],
      loginInfo: "",
      options: [],
      optionProps: {
        value: "id",
        label: "name",
        expandTrigger: "hover",
      },
    };
  },
  created() {
    this.fetchCategories();
    this.fetchData();
  },
  methods: {
    fetchData() {
      let userStr = cookie.get("ryus_user");
      if (userStr) {
        this.isLogin = true;
        this.loginInfo = JSON.parse(userStr);
      }
    },
    fetchCategories() {
      getCategories().then((res) => {
        this.options = res.data.categories;
      });
    },
    handleChange() {
      if (this.categoryIds.length > 0) {
        window.location.href="/category/"+this.categoryIds[this.categoryIds.length - 1];
      }
    },
    handleClick() {
      window.location.href = "/user/private";
    },
    handleLogout() {
      cookie.remove("ryus_token");
      cookie.remove("ryus_user");
      window.location.href = "/";
    },
  },
};
</script>

<style scoped>
footer {
  background-color: #174a5c;
  color: white;
  text-align: center;
  /*height: 100px;*/
  /*position: absolute;*/
  width: 100%;
  bottom: 0;
  height: 100px;
}

ul.footer-menu li {
  display: inline;
}

header {
  background-color: rgb(199, 243, 243);  
  text-align: left;

}

.header-font{
  color: green;
  font-size: 50px;
  font-family: "Caveat", cursive;
}
.about_ryuma {
  color: aqua;
  font-size: 10px;
  text-align: left;
}

.terms {
  color: aqua;
  font-size: 10px;
  text-align: left;
  margin-right: 400px;
}

.footer_link {
  color: turquoise;
}

.ryuma {
  font-family: "Caveat", cursive;
}

.login {
  color: white;
  text-decoration: none; /*アンダーラインなし */
}

.header-btn {
  float: right;
}
.user {
  float: right;
}

.return-top {
  color: chartreuse;
  text-decoration: none;
  font-size: 25px;
}
</style>

<!--marginは要素の周りにスペースを入れる．他の要素がどっかに飛んでいく．．危険，，6/25-->
<!--paddingは要素の中にスペースを入れる．-->
