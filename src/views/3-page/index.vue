<template>
  <div class="warp">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="d3" name="1">
        <d3 v-if="activeName == '1'" />
      </el-tab-pane>
      <el-tab-pane label="d3他人项目" name="2">
        <d3trxm v-if="activeName == '2'" />
      </el-tab-pane>
      <el-tab-pane label="d3练习-1" name="3">
        <d3lx1 v-if="activeName == '3'" />
      </el-tab-pane>
      <el-tab-pane label="d3练习-2" name="4">
        <d3lx2 v-if="activeName == '4'" />
      </el-tab-pane>
      <el-tab-pane label="echarts图谱" name="5">
        <zstpecharts v-if="activeName == '5'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
     
    <script>
import d3 from "./d3/index.vue";
import d3trxm from "./d3trxm/index.vue";
import d3lx1 from "./d3lx-1/index.vue";
import d3lx2 from "./d3lx-2/index.vue";
import zstpecharts from "./zstp-echarts/index.vue";
export default {
  components: { d3, d3trxm, d3lx1, d3lx2, zstpecharts },
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
     