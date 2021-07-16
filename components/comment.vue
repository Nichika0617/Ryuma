<template>
  <div class="container">
    <ul>
      <!-- 親コメント start -->
      <li class="topComment">
        <div class="topUser">
          <el-avatar
            icon="el-icon-user-solid"
            :src="commentData.fromMemberAvatar"
          />
          <span class="userName">{{commentData.fromMemberName}}</span>
          <span class="time">{{commentData.createTime}}</span>
        </div>
        <div class="content">{{commentData.content}}</div>
        <el-button
          @click="replyToTopComment"
          type="text"
          icon="el-icon-chat-dot-square"
        >返信</el-button>
      </li>
      <!-- 親コメント over -->
      <!-- 子コメント start -->
      <li
        v-for="comment in commentData.children"
        :key="comment.id"
        class="childComment"
      >
        <div class="childUser">
          <el-avatar
            icon="el-icon-user-solid"
            :src="comment.fromMemberAvatar"
          />
          <span class="userName">{{comment.fromMemberName}}</span>
          <span class="time">{{comment.createTime}}</span>
        </div>
        <div class="content">
          <!-- 親コメントじゃなくて、子コメントに対してのコメントの場合、その子コメントの送信者の名前を＠マークで表示してからコメント本文を表示する -->
          <span v-if="comment.toMemberId !== commentData.fromMemberId">
            <!-- 公に公開する個人ページに飛べるようにする -->
            <a :href="'/user/'+comment.toMemberId">@{{comment.toMemberName}}</a>&nbsp;
          </span>
          <!-- コメント本文 -->
          {{comment.content}}
        </div>
        <!-- 返信ボタン -->
        <el-button
          @click="replyToChildComment(comment)"
          type="text"
          icon="el-icon-chat-dot-square"
        >返信</el-button>
      </li>
      <!-- 子コメント over -->
      <!-- コメントを書く入力エリアと送信やキャンセルボタン start -->
      <div
        v-if="replyFlag"
        class="reply"
      >
        <el-input
          type="textarea"
          placeholder="コメントを入力してください。"
          v-model="content"
          @change="handleInputChange"
        />
        <div class="buttons">
          <el-button
            type="primary"
            round
            size="small"
            @click="handleSubmit"
            :disabled="disableSubmit"
          >送信</el-button>
          <el-button
            round
            size="small"
            @click="handleCancel"
          >キャンセル</el-button>
        </div>
      </div>
      <!-- コメントを書く入力エリアと送信やキャンセルボタン over -->
    </ul>
  </div>
</template>
<script>
import { saveComment } from "@/api/comment";
export default {
  data() {
    return {
      replyFlag: false, // コメントを書くエリアが表示されるかどうかを判断するflag
      //　入力されたコメントを保存するために必要なデータ
      sendComment: {
        parentId: "",
        toMemberId: "",
      },
      // コメントエリアの内容
      content: "",
      // '@UserName 'っていう文字列を記録する変数
      userName: "",
      toChildComment: false,
      disableSubmit: true,
    };
  },
  //親componentからデータをもらう。この二つのデータは商品詳細ページでリクエストして、このcomponentに入れる。
  // わからんかったらvueのpropsについて調べて
  props: ["product", "commentData"],
  methods: {
    // 親コメントに返信する
    replyToTopComment() {
      this.replyFlag = true;
      this.toChildComment = false;
      this.content = "";
      this.userName = "";
      this.sendComment.parentId = this.commentData.id;
      this.sendComment.toMemberId = this.commentData.fromMemberId;
    },
    // 子コメントに返信する
    replyToChildComment(comment) {
      this.replyFlag = true;
      this.toChildComment = true;
      //まずコメントエリアの内容を'@UserName 'っていう感じに設定する
      this.content = "@" + comment.fromMemberName + " ";
      // '@UserName 'を記録
      this.userName = this.content;
      this.sendComment.parentId = this.comment.id;
      this.sendComment.toMemberId = this.comment.fromMemberId;
    },
    //コメントを保存する
    handleSubmit() {
      //コメントエリアに内容がない、もしくは内容が全部スペースや改行の場合保存しない。
      if (this.toChildComment) {
        if (this.content.replace(this.userName, "").trim() === "") {
          this.$message.info("コメントを入力してください。");
        } else {
          saveComment({
            ...this.sendComment,
            // コメントエリアの内容から'@UserName 'を切り捨てる
            content: this.content.replace(this.userName, ""),
            productId: this.product.id,
            ownerId: this.product.memberId,
            productName: this.product.name,
            productCoverUrl: this.product.coverUrl,
          })
            .then((res) => {
              // 親componentが定義したmethodを実行する
              // vueのemitについて調べて
              this.$emit("saveSuccess", res, "gdf");
            })
            .catch((err) => {
              // 親componentが定義したmethodを実行する
              this.$emit("saveFailed", err);
            });
        }
      } else {
        if (this.content.trim() === "") {
          this.$message.info("コメントを入力してください。");
        } else {
          saveComment({
            ...this.sendComment,
            content: this.content,
            productId: this.product.id,
            ownerId: this.product.memberId,
            productName: this.product.name,
            productCoverUrl: this.product.coverUrl,
          })
            .then((res) => {
              // 親componentが定義したmethodを実行する
              // vueのemitについて調べて
              this.$emit("saveSuccess", res, "gdf");
            })
            .catch((err) => {
              // 親componentが定義したmethodを実行する
              this.$emit("saveFailed", err);
            });
        }
      }
    },
    //キャンセルボタンを押す場合
    handleCancel() {
      this.resetSendComment();
      this.replyFlag = false;
      this.toChildComment = false;
      this.content = "";
      this.userName = "";
      this.disabledSubmit = true;
    },
    // sendCommentをresetする。
    resetSendComment() {
      this.sendComment.parentId = "";
      this.sendComment.toMemberId = "";
    },
    handleInputChange() {
        if(this.toChildComment){
            this.disableSubmit = this.content.indexOf(this.userName)===-1 || this.content.replace(this.userName, "").trim() === "";
        }else{
            this.disableSubmit = this.content.trim()==="";
        }
    },
  },
};
</script>


<!--使い方
<template>
  <div class="container">
    <!-- componentsフォルダにある componentだから、そのまま使える -->
    <!-- :productや:commentDataの部分はcomment componentのpropsで定義した名前と同じにする必要がある、"="右側の部分は適当でいい 
    <comment
      :product="product"
      :commentData="comment"
      @saveSuccess="handleSaveSuccess"
      @saveFailed="handleSaveFailed"
    ></comment>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: null,
      comment: null,
    };
  },
  methods: {
    //コメント保存成功した時に実行するmethod
    handleSaveSuccess(res){
      //変数の中身にどういうデータがあるのかわからない場合はまずコンソールに表示して確認した方がいい
      console.log(res);
    },
    //コメント保存失敗した時に実行するmethod
    handleSaveFailed(err){
      console.log(err)
    }
  },
  created() {},
};
</script>
-->
