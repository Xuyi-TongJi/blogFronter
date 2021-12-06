<template>
  <div>
    <el-container>
      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="请输入密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Element from "element-ui";

export default {
  name: "Main", data() {
    return {
      ruleForm: {
        id: '',
        password: ''
      },
      rules: {
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {pattern: '^[a-zA-Z]\\w{5,17}$', message: '以字母开头，长度在6~18之间，只能包含字母、数字和下划线', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        const _this = this;
        if (valid) {
          _this.$axios.post("/password", _this.ruleForm, {
            headers: {
              'Authorization': localStorage.getItem("token")
            }
          }).then(() => {
            console.log(this.ruleForm.id);
            Element.Message.success("修改成功，请重新登录！", {duration: 3 * 1000});
            _this.$store.commit("REMOVE_INFO");
            _this.$router.push("/login");
            })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created(){
    this.ruleForm.id = JSON.parse(sessionStorage.getItem("userInfo")).id;
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.demo-ruleForm{
  max-width: 500px;
  margin: 0 auto;
}
.m-action{
  margin: 10px 0;
}
</style>