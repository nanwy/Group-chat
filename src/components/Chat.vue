<template>
  <div id="chat">
    <div class="header">
      <div class="chat-name" @click="send">
        阿里云云开发聊天室
        <span>在线人数{{member}}</span>
      </div>
    </div>
    <div class="main">
      <div class="chat-msg" v-for=" item in chat">
        <div class="welcome" v-if="item.id == 3">{{item.name}}</div>
        <div class="self-mes" v-if="item.id == 2">
          <div class="content">
            <div class="name">{{item.name}}</div>
            <div class="self-con">{{item.msg}}</div>
          </div>
        </div>
        <div class="them-mes" v-if="item.id == 1">
          <div class="content">
            <div class="name">{{item.name}}</div>
            <div class="self-con">{{item.msg}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <input type="text" class="cont" v-model="cont" />
      <button class="btn" @click="send">发送</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cont: "",
      chat: [],
      // arr: [],
      name: "",
      img: "",
      member: 0,
    };
  },
  created() {
    this.getMsg();
    this.name = this.$route.params.name;
    // this.img = this.$route.params.img;
    this.join(this.name);
    this.welcome();
    this.quit();
    axios.get("http://localhost:3000/api/chat/list").then((res) => {
      console.log(res);
    });
  },
  methods: {
    send() {
      if (this.cont.length > 0) {
        //发送
        let msg = { msg: this.cont, id: 2, name: this.name, img: this.img };
        let data = { msg: this.cont, id: 1, name: this.name, img: this.img };
        console.log(this.chat);
        this.chat.push(msg);
        console.log(this.chat);
        // let message = this.cont;
        this.socket.emit("message", data);
        this.cont = "";
      }
    },
    getMsg() {
      this.socket.on("reply", (data) => {
        // this.arr.chat(data);

        console.log(data);
        this.chat.push(data);
      });
    },
    //join in chat
    join(name) {
      this.socket.emit("join", name);
    },
    welcome() {
      this.socket.on("welcome", (name, member) => {
        let data = {
          name: `欢迎${name}加入群聊`,
          id: 3,
        };
        this.chat.push(data);
        this.member = member;
      });
    },
    quit() {
      this.socket.on("quit", (name, member) => {
        let data = {
          name: `${name}退出群聊`,
          id: 3,
        };
        this.chat.push(data);
        this.member = member;
      });
    },
  },
};
</script>

<style lang='scss'>
#chat {
  width: 100%;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // flex-direction: column;

  overflow: hidden;
  .header {
    position: relative;
    background-color: #f0f0f2;
    width: 100%;
    text-align: center;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    span {
      position: absolute;
      font-weight: normal;
      top: 0;
      right: 5px;
      font-size: 12px;
      // float: right;
      // padding-right: 5px;
      // padding: 2px 2px 0
      line-height: 30px;
    }
  }
  .main {
    width: 100%;
    padding: 10px;
    // padding: 5px;
    box-sizing: border-box;
    // height: 100vh;
    height: calc(100vh - 85px);
    overflow-y: scroll;
    text-align: center;
    .chat-msg {
      // display: flex;
      .welcome {
        color: rgb(202, 202, 202);
        font-size: 12px;
        // align-content: center;
      }
      .self-mes {
        display: flex;
        margin-top: 10px;
        // background-color: blue;
        border-radius: 10px;
        justify-content: flex-end;
        margin-left: auto;
        max-width: 80%;
        .content {
          // margin-right: 8px;
          .name {
            font-size: 12px;
            text-align: right;
          }
          .self-con {
            background-color: #f0f0f2;
            padding: 8px;
            // margin-right: 20px;
            position: relative;
            border-radius: 10px;
            &:after {
              content: "";
              width: 0.6666em;
              height: 0.6666em;
              background-color: #f0f0f2;
              position: absolute;
              border-width: 0 0 1px 1px;
              -webkit-transform: translateX(50%) translateY(-50%) rotate(45deg);
              -ms-transform: translateX(50%) translateY(-50%) rotate(45deg);
              transform: translateX(50%) translateY(-50%) rotate(45deg);
              bottom: auto;
              right: auto;
              top: 50%;
              right: 0;
            }
          }
        }
      }
      .them-mes {
        display: flex;
        margin-top: 10px;
        // background-color: #f0f0f2;
        // display: flex;
        // margin: 10px 0 0 10px;
        display: flex;
        // background-color: blue;
        border-radius: 10px;
        justify-content: flex-start;
        // margin-: auto;
        max-width: 80%;
        .content {
          .name {
            font-size: 12px;
            text-align: left;
          }
          .self-con {
            background-color: #f0f0f2;
            padding: 8px;
            margin-right: 20px;
            position: relative;
            border-radius: 10px;
            &:after {
              content: "";
              width: 0.6666em;
              height: 0.6666em;
              background-color: #f0f0f2;
              position: absolute;
              border-width: 0 0 1px 1px;
              -webkit-transform: translateX(-50%) translateY(-50%) rotate(45deg);
              -ms-transform: translateX(-50%) translateY(-50%) rotate(45deg);
              transform: translateX(-50%) translateY(-50%) rotate(45deg);
              bottom: auto;
              right: auto;
              top: 50%;
              left: 0;
            }
          }
        }
      }
    }
  }
  .foot {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    .btn {
      display: inline-block;
      min-width: 10px;
      padding: 5px 7px;
      font-size: 12px;
      line-height: 1;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      background-color: #23b7e5;
      border-radius: 10px;
      font-weight: 700;
      border: 0;
      width: 15%;
      cursor: pointer;
      outline: none;
      &:focus {
        border: none;
      }
      &:active {
        border: none;
        outline: none;
      }
    }
    .cont {
      padding: 2px 10px;
      border: 0;
      border-radius: 5px;
      background-color: #f0f0f2;
      outline: none;
      // text-align: center;
      width: 100%;
    }
    /* right: 0; */
  }
}
</style>
