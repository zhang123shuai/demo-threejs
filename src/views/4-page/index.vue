<template>
  <div class="warp">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="中国地图1" name="1">
        <one v-if="activeName == '1'" />
      </el-tab-pane>
      <el-tab-pane label="中国地图2" name="2">
        <two v-if="activeName == '2'" />
      </el-tab-pane>
      <el-tab-pane label="其他" name="3">
        <three v-if="activeName == '3'" />
      </el-tab-pane>
      <!-- <el-tab-pane label="定时任务补偿" name="4">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>
     
    <script>
import one from "./one/index.vue";
import two from "./two/index.vue";
import three from "./three/index.vue";
export default {
  components: { one, two, three },
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
     