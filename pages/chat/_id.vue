<template>
  <div class="container">
    <el-card class="chat-box">
      <template slot="header">
        <div class="chat-header">
          <span v-if="opponent">Chatting with {{opponent.nickname}}</span>
        </div>
      </template>
      <div
        v-for="(message,index) in messages"
        :key="index"
      >
        <div
          class="self"
          v-if="message.fromMemberId == user.id"
        >{{message.content}}  <span v-if="message.isChecked">既読</span></div>
        <div
          class="opponent"
          v-else-if="message.toMemberId == user.id"
        >{{message.content}}</div>
      </div>
      <el-input
        type="textarea"
        v-model="messageObj.content"
        @keydown.enter="sendMessage"
      ></el-input>
      <el-button @click="sendMessage">send</el-button>
    </el-card>
    {{messageObj}}
    {{user}}

  </div>

</template>
<script>
import cookie from "js-cookie";
import { getOpponentInfo } from "@/api/userApi";
import ReconnectingWebSocket from "reconnecting-websocket";
export default {
  data() {
    return {
      user: "",
      opponent: "",
      websocket: null,
      messages: [],
      messageObj: {
        chatId: this.$route.params.id,
        content: "",
        toMemberId: "",
      },
    };
  },
  methods: {
    getOpponent() {
      getOpponentInfo(this.messageObj.chatId)
        .then((res) => {
          this.opponent = res.data.opponent;
          this.messageObj.toMemberId = res.data.opponent.id;
        })
        .catch((error) => {
          console.log(1111111);
          console.log(error);
        });
    },
    initWebSocket() {
      //判断当前浏览器是否支持WebSocket
      var token = "Bearer " + cookie.get("ryus_token");
      if (!cookie.get("ryus_token")) {
        this.$message({
          type: "info",
          message: "ログインしてください。",
        });
        return;
      }
      //如果支持WebSocket，发起WebSocket连接
      const loading = this.$loading({
        lock: true,
        text: "Loading",
      });
      let userStr = cookie.get("ryus_user");
      if (userStr) {
        this.user = JSON.parse(userStr);
      }
      this.websocket = new ReconnectingWebSocket(
        "ws://localhost:9002/chat/connect/" +
          this.$route.params.id +
          "/" +
          token
      );

      //连接发生错误的回调方法
      this.websocket.onerror = (error) => {
        console.log("error");
        console.log(error);
        this.message = "error";
      };

      //连接成功建立的回调方法
      this.websocket.onopen = (event) => {
        console.log("open");
        console.log(event);
        this.message = "open";
      };

      //接收到消息的回调方法
      this.websocket.onmessage = (event) => {
        console.log("message");
        console.log(event);
        let data = JSON.parse(event.data);
        if (data) {
          if (data.code === 10000) {
            this.messages = data.data.data;
            loading.close();
          } else if (data.code === 10001) {
            let toMemberId = data.data.toMemberId;
            console.log(2222222222222222,toMemberId);
            if (toMemberId) {
              for (let i = 0; i < this.messages.length; i++) {
                if (this.messages[i].toMemberId == toMemberId) {
                  console.log(this.messages[i])
                  this.messages[i].isChecked = true;
                }
              }
            }
          } else if (data.code === 10002) {
            let message = data.data.data;
            if (message) {
              this.messages.push(message);
            }
          } else if (
            data.code === 10100 ||
            data.code === 10101 ||
            data.code === 400 ||
            data.code === 403
          ) {
            this.$message.error({
              message: data.message,
            });
          } else {
            this.$message.error({
              message: "Unknown Exception,pls try again.",
            });
          }
        }
      };

      //连接关闭的回调方法
      this.websocket.onclose = (event) => {
        loading.close();
        console.log("close");
        console.log(event);
      };
    },
    closeWebSocket() {
      this.websocket.close();
    },
    sendMessage() {
      console.log(this.messageObj);
      if (this.messageObj.content && this.messageObj.content.trim() != "") {
        this.websocket.send(JSON.stringify(this.messageObj));
        this.messageObj.content = "";
      } else {
        this.$message.info("内容を入力してください。");
      }
    },
  },
  mounted() {
    this.getOpponent();
    this.initWebSocket();
  },
  destroyed() {
    this.closeWebSocket();
  },
};
</script>

<style scoped>
.self {
  background-color: cadetblue;
}
.opponent {
  background-color: rgb(157, 182, 17);
}
.chat-box{
  height: 1000px;
}
</style>

