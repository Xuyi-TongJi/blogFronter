<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <h5>
          <el-link href="/blogs">返回主页</el-link>
        </h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>个人主页管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">博客管理</template>
              <el-menu-item index="1-1">添加博客</el-menu-item>
              <el-menu-item index="1-2">删除博客</el-menu-item>
              <el-menu-item index="1-2">编辑博客</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">账户管理</template>
              <el-menu-item index="1-1">修改密码</el-menu-item>
              <el-menu-item index="1-2">更改邮箱</el-menu-item>
              <el-menu-item index="1-2">上传头像</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Aside",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>

</style>