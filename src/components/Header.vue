<template>
  <div class="m-content">
    <h3>Welcome to Group Sun!</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div>{{user.username}}</div>
    </div>

    <div class="m-action">
      <span>
        <el-link href="/blogs">
          主页
        </el-link>
        <el-divider direction="vertical"></el-divider>
      </span>
      <span>
        <el-link type="success" href="/blog/add">
          发表博客
        </el-link>
        <el-divider direction="vertical"></el-divider>
      </span>
      <span v-show="!hasLogin">
        <el-link type="primary" href="/login">
          登录
        </el-link>
        <el-divider direction="vertical"></el-divider>
      </span>
      <span v-show="!hasLogin">
        <el-link type="primary" href="/register">
          注册
        </el-link>
        <el-divider direction="vertical"></el-divider>
      </span>
      <span v-show="hasLogin">
        <el-link type="primary" href="/userCenter">
          个人中心
        </el-link>
        <el-divider direction="vertical"></el-divider>
      </span>
      <span v-show="hasLogin">
        <el-link type="danger" @click="logout">
          退出
        </el-link>
        <el-divider direction="vertical"></el-divider>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user:{
        username: '请先登录',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'  // 默认数据
      },
      hasLogin: false
    }
  },
  methods: {
    logout(){
      const _this = this;
      this.$axios.get("/logout", {
        // logout必须持有token才能访问
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(() => {
        _this.hasLogin = false;
        _this.$store.commit("REMOVE_INFO");
        _this.$router.push("/login");
      })
    },
    init(){
      // 已登录
      if (this.$store.getters.getUser.username) {
        this.user.username = this.$store.getters.getUser.username;
        this.user.avatar = this.$store.getters.getUser.avatar;
        this.hasLogin = true;
      }
    }
  },
  created: function () {
    this.init();
  },

  mounted(){
    this.init();
  }
}
</script>

<style scoped>
  .m-content{
    max-width: 960px;
    margin: 0 auto;
  }
  .m-action{
    margin: 10px 0;
  }
</style>