<template>
  <div>
    <el-container>
      <el-header>Group Sun 规范化管理系统</el-header>
        <el-main>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="请输入用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="请输入密码" prop="password">
              <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="请输入邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :plain="true" @click="checkUsernameValidated">检查用户名是否可用</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
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
  name: "Register",
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        email: '',
        message: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: '^[a-zA-Z]\\w{5,17}$' , message: '以字母开头，长度在6~18之间，只能包含字母、数字和下划线', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$',
            message: '请输入正确的邮箱格式', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        const _this = this;
        if (valid) {
          _this.$axios.post("/register", _this.ruleForm)
            .then(() => {
              Element.Message.success("注册成功，请登录！", {duration: 3 * 1000})
              _this.$router.push("/login");
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    checkUsernameValidated() {
      if (this.ruleForm.username === ''){
        this.$message({
          showClose: true,
          message: '请输入一个用户名，长度在3到10个字符',
          type: 'warning',
          duration: 2 * 1000
        });
      } else{
       // 发送请求查询用户名是否可用
        this.$axios.get("/username?username=" + this.ruleForm.username)
        .then(res => {
          if (res.data.data === true){
            Element.Message.success("该用户名可用！", {duration: 2 * 1000});
          } else {
            Element.Message.warning("该用户名已被使用！", {duration: 2 * 1000});
          }
        })
      }
    }
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