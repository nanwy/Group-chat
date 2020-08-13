<template>
  <div class="login">
    <div class="content">
      <div class="welcome">欢迎加入阿里云云开发聊天室</div>请选择头像
      <div>
        <img src alt />
      </div>
      <input type="text" class="cont" placeholder="输入您要使用的昵称" v-model="name" />
      <div class="join" @click="submit">加入</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      img: "s ",
    };
  },
  methods: {
    submit() {
      if (this.name.length > 0) {
        this.$router.push(`/chat/${this.name}/${this.img}`);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    .welcome {
      padding-bottom: 100px;
      color: rgb(254, 119, 52);
      font-weight: bold;
    }
    img {
      margin-top: 15px;
      margin-bottom: 15px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #000;

      display: inline-block;
    }
    .cont {
      padding: 7px 10px;
      border: 0;
      border-radius: 5px;
      background-color: #f0f0f2;
      outline: none;
      text-align: center;
    }
    .join {
      margin-top: 10px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: rgb(254, 119, 52);
      color: #fff;
      font-weight: bold;
      text-align: center;
      line-height: 100px;
    }
  }
}
</style>