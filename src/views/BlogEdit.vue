<template>
  <div>
    <Header></Header>
    <div class="m-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="ruleForm.content">
          </mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">发表</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "BlogEdit",
  components: {Header},
  data() {
    return {
      ruleForm: {
        id: '',
        userId: '',
        title: '',
        description: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 30, message: '长度3～30个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入摘要', trigger: 'change' },
          { min: 0, max: 50, message: '长度不超过50个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'change' },
          { min: 0, max: 1000, message: '长度不超过1000个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          _this.$axios.post("/blog/edit", this.ruleForm,{
            headers: {
              "Authorization": localStorage.getItem("token")
            } // 后端/blog/edit需要权限才能访问
          })
            .then(()=> {
              _this.$alert('操作成功', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                  _this.$router.push("/blogs")
                }
              });
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
    const _this = this;
    _this.ruleForm.id = _this.$route.params.blogId;
    // if (_this.ruleForm.id !== null && _this.ruleForm.id === localStorage.getItem())
    if (_this.ruleForm.id !== null){
      _this.$axios.get("/blog/" + _this.ruleForm.id)
        .then(res => {
          _this.ruleForm.title = res.data.data.title;
          _this.ruleForm.description = res.data.data.description;
          _this.ruleForm.content = res.data.data.content;
        })
    }
  }
}
</script>

<style scoped>
  .m-content{
    margin: 0 auto;
  }
</style>