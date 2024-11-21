<template>
  <!-- <div class="pdf-box">
    <div class="pdf-tab">
      <div class="pdf-tab-button">
        <div class="btn-def btn-pre" @click.stop="prePage">上一页</div>
        <div class="btn-def btn-next" @click.stop="nextPage">下一页</div>
        <div class="btn-def" @click.stop="clock">顺时针</div>
        <div class="btn-def" @click.stop="counterClock">逆时针</div>
      </div>
      <div class="page-size">{{ pageNum }}/{{ pageTotalNum }}</div>
      <pdf
        ref="pdf"
        class="pdf-preview"
        :src="fileUrl"
        :page="pageNum"
        :rotate="pageRotate"
        :style="{ height: customHeight + 'px' }"
        @num-pages="pageTotalNum = $event"
        @link-clicked="page = $event"
      ></pdf>
    </div>
  </div> -->
  <div style="height: 100%; background-color: antiquewhite">
    <iframe :src="fileUrl" width="100%" height="100%"> </iframe>
  </div>
</template>
<script>
import pdf from "vue-pdf";
export default {
  components: {
    pdf,
  },
  data() {
    return {
      fileUrl: "/static/12.pdf#toolbar=0", //文件路径
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      customHeight: 400, // 自定义的PDF预览框高度};
    };
  },
  computed: {
    //解决预览pdf文字丢失Warning: Error during font loading: The CMap “baseUrl“ parameter must be specifie的问题
    pdfSrc() {
      //处理pdfUrl返回
      let src = pdf.createLoadingTask({
        url: this.fileUrl,
        //引入pdf.js字体，templ
        cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/cmaps/", //3.5方法已把外部cdn改为本地服务器，解决了用户网络不好有可能会导致字体包加载失败
        cMapPacked: true,
      });
      return src;
    },
  },
  mounted() {},
  methods: {
    //上一页
    prePage() {
      var p = this.pageNum;
      p = p > 1 ? p - 1 : this.pageTotalNum;
      this.pageNum = p;
    },
    // 下一页
    nextPage() {
      var p = this.pageNum;
      p = p < this.pageTotalNum ? p + 1 : 1;
      this.pageNum = p;
    },
    //顺时针
    clock() {
      this.pageRotate += 90;
    },
    //逆时针
    counterClock() {
      this.pageRotate -= 90;
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.pdf-box {
  width: 100%;
  // height: 800px;
  background-color: #409eff;
  .pdf-tab {
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .pdf-tab-button {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .btn-def {
        width: 98px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        border-radius: 5px;
        font-size: 18px;
      }
    }

    .page-size {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
  }
}
</style>