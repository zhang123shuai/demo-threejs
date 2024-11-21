<template>
  <div class="warp">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="思维导图jsMind" name="1">
        <one v-if="activeName == '1'" />
      </el-tab-pane>
      <el-tab-pane label="markdown" name="2">
        <two v-if="activeName == '2'" />
      </el-tab-pane>
      <el-tab-pane label="pdf" name="3">
        <three v-if="activeName == '3'" />
      </el-tab-pane>
      <el-tab-pane label="预览docx离线" name="4">
        <four v-if="activeName == '4'" />
      </el-tab-pane>
      <el-tab-pane label="文件路径选择" name="5">
        <five v-if="activeName == '5'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
       
      <script>
import one from "./one/index.vue";
import two from "./two/index.vue";
import three from "./three/index.vue";
import four from "./four/index.vue";
import five from "./five/index.vue";
export default {
  components: { one, two, three, four, five },
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
       