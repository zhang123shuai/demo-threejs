<template>
  <div class="warp">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="热力图" name="1">
        <reLiTu v-if="activeName == '1'" />
      </el-tab-pane>
      <el-tab-pane label="轨迹" name="2">
        <guiJi v-if="activeName == '2'" />
      </el-tab-pane>
      <!-- <el-tab-pane label="角色管理" name="3">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="4">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>
   
  <script>
import reLiTu from "./reLiTu/index.vue";
import guiJi from "./guiJi/index.vue";
export default {
  components: { reLiTu, guiJi },
  data() {
    return {
      activeName: "2",
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
   