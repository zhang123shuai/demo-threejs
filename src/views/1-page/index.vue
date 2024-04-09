<template>
  <div class="warp">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="page" name="1">
        <pageOne v-if="activeName == '1'" />
      </el-tab-pane>
      <el-tab-pane label="page顶点,几何" name="2">
        <pageTwo v-if="activeName == '2'" />
      </el-tab-pane>
      <!-- <el-tab-pane label="角色管理" name="3">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="4">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>
   
  <script>
import pageOne from "./pageOne/index.vue";
import pageTwo from "./pageTwo/index.vue";
export default {
  components: { pageOne, pageTwo },
  data() {
    return {
      activeName: "1",
    };
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
      // console.log(tab, event);
    },
  },
};
</script>
<style scoped lang="scss">
.warp {
  width: 100%;
  height: 100%;
  .el-tabs {
    height: 100%;
    /deep/ .el-tabs__content {
      height: calc(100% - 55px);
    }
    /deep/ .el-tab-pane {
      height: 100% !important;
    }
  }
}
</style>
   