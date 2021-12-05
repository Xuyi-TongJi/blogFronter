<template>
  <div class="m-container">
    <Header></Header>
    <div class="block">
      <el-timeline>
        <el-timeline-item :timestamp="blog.created" :key="blog.id" placement="top" v-for="blog in blogs">
          <el-card>
            <h4>
              <router-link :to="{name:'BlogDetail', params: {blogId: blog.id}}">
                {{blog.title}}
              </router-link>
            </h4>
            <p>
              {{blog.description}}
            </p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="this.total"
        :current-page="this.currentPage"
        :page-size="this.pageSize"
        @current-change=page
        >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  name: "Blogs",
  components: {Header},
  data(){
    return {
      blogs: {},
      total: 0,
      currentPage: 1,
      pages: 1,
      pageSize: 5
    }
  },
  methods: {
    page(currentPage) {
      const _this = this;  // _this -- Blogs.vue
      _this.$axios.get("/blogs?currentPage=" + currentPage).then((res) => {
        console.log(res.data.data.pages);
        _this.blogs = res.data.data.records;
        _this.total = res.data.data.total;
        _this.pages = res.data.data.pages;
        _this.pageSize = res.data.data.size;
      })
    }
  },
  created(){
    this.page(1);
  }
}
</script>

<style scoped>
  .m-container{
    margin: 0 auto;
  }
</style>