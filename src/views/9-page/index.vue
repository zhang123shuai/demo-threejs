<template>
  <div class="warp">
    <p style="color: red;">注：根据安全策略，只有在localhost或者https下才可以实现语音录入</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="语音录入" name="1">
        <one v-if="activeName == '1'" />
      </el-tab-pane>
      <el-tab-pane label="语音录入转文字" name="2">
        <two v-if="activeName == '2'" />
      </el-tab-pane>
      <!-- <el-tab-pane label="角色管理" name="3">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="4">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>
     
    <script>
import one from "./one/index.vue";
import two from "./two/index.vue";
export default {
  components: { one, two },
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
    height: calc(100% - 25px);
    /deep/ .el-tabs__content {
      height: calc(100% - 55px);
    }
    /deep/ .el-tab-pane {
      height: 100% !important;
    }
  }
}
</style>
     