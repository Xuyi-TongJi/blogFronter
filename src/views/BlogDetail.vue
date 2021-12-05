<template>
  <div>
    <Header></Header>
    <div class="m-blog">
      <h2>
        {{blog.title}}
        <el-link icon="el-icon-edit" v-show="ownBlog">
          <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}">
            编辑
          </router-link>
        </el-link>
      </h2>
      <el-divider></el-divider>
      <div class='markdown-body' v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import "github-markdown-css/github-markdown.css";

export default {
  name: "BlogDetail",
  components: {Header},
  data(){
    return {
      blog: {
        id: "",
        title: "标题",
        content: "内容"
      },
      ownBlog: false
    }
  },
  created(){
    const _this = this;
    _this.$axios.get("/blog/" + _this.$route.params.blogId)
      .then(res => {
        if (_this.$store.getters.getUser !== null
          && res.data.data.userId === _this.$store.getters.getUser.id){
          _this.ownBlog = true;
        }
        _this.blog.id = res.data.data.id;
        _this.blog.title = res.data.data.title;
        var MarkdownIt = require("markdown-it");
        var md = new MarkdownIt();
        _this.blog.content = md.render(res.data.data.content);
      })
  }
}
</script>

<style scoped>
  .m-blog{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    width: 100%;
    min-height: 700px;
    padding: 20px 15px;
  }
</style>