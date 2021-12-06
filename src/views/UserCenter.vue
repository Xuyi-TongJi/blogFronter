<template>
  <div>
    <el-container>
        <el-aside width="300px">
          <Aside></Aside>
        </el-aside>
        <el-main>
          <Main></Main>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside";
import Main from "@/components/Main";

export default {
  name: "UserCenter",
  components: {Aside, Main}
}
</script>

<style scoped>
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.m-container{
  margin: 0 auto;
}
</style>