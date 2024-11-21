<template>
  <div class="docxWarp">
    <span @click="contractShowed()">预览合同</span>
    <div class="wordWarp" ref="word"></div>
  </div>
</template>
<script>
// import Axios from "axios";
// let docx = require("docx-preview"); //引入插件
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    contractShowed() {
      this.getPdfCode("./ceshi.docx");
    },
    getPdfCode(url) {
      Axios({
        method: "get",
        responseType: "blob",
        url: url,
      }).then(({ data }) => {
        docx.renderAsync(data, this.$refs.word); // 渲染到页面
      });
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.docxWarp {
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
  .wordWarp {
    width: 100%;
    height: 100%;
  }
}
</style>