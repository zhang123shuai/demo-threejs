<template>
  <div class="warp">
    <iframe
      src="http://localhost:8081/#/"
      frameborder="0"
      width="100%"
      height="100%"
      id="myIframe"
      ref="myIframe"
    ></iframe>
  </div>
</template>
   
  <script>
export default {
  components: {},
  data() {
    return {
      iframeWin: null,
      data: { name: "张三" },
    };
  },
  mounted() {
    this.iframeWin = this.$refs.myIframe.contentWindow; //最开始做的是点击事件是没有问题的  后面需要自动传值就不行  也试了模拟点击还是不行 //原因是iframe还没加载完  所以使用onload
    document.getElementById("myIframe").onload = function () {
      // this.fatherpost();
      this.sentToIframe();
    };
  },
  methods: {
    // 第一种
    fatherpost(e) {
      //iframe传值
      this.iframeWin.postMessage(
        {
          params: {
            data: data, //传的数据
          },
        },
        "http://localhost:8081/#/"
      );
    },
    // 第二种
    sentToIframe() {
      let childFrameObj = document.getElementById("myIframe");
      console.log("childFrameObj", childFrameObj);
      // childFrameObj.contentWindow.getMessageFromParent(this.tData); //第一种向子iFrame传参方式，调用iframe的methods达到传参的目的
      this.$refs.unity.contentWindow.getMessageFromParent(this.data); // 这样也是可以调用子iframe的方法

      // childFrameObj.contentWindow.frameData = "这是vue组件给你的参数！" // 传参成功
      this.$refs.unity.contentWindow.frameData =
        "这是vue组件给你的第二个参数！"; //传参成功
      console.log("发送完成");

      //此外，还可以通过DOM操作，操作子iframe的DOM
      // var t = document
      //   .getElementById("unityiframe")
      //   .contentWindow.document.getElementById("dd");
      // console.log(t);
      //
      // console.log("frameData？", unityiframe.window.frameData); //利用id可以调用到iframe里的变量
      // console.log("frameData？",this.$refs.unity.window.frameData) //利用ref调用不到iframe里的变量
    },
  },
};
</script>
<style scoped lang="scss">
.warp {
  width: 100%;
  height: 100%;
}
</style>
   