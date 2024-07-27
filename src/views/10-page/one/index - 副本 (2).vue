<template>
  <div>
    <div
      id="jsmind_container"
      ref="jsmind_container"
      class="mind-container"
    ></div>
  </div>
</template>

<script>
import "jsmind/style/jsmind.css"; // 导入 jsMind 样式
import jsMind from "jsmind"; // 导入 jsMind 库
export default {
  name: "MindMap",
  data() {
    return {
      jm: null,
      isDragging: false,
      startX: 0,
      startY: 0,
      scrollLeft: 0,
      scrollTop: 0,
      mindData: {
        meta: {
          name: "example",
          author: "hizzgdev@163.com",
          version: "0.2",
        },
        format: "node_array",
        data: [
          {
            id: "root",
            isroot: true,
            topic: "jsMind",
            "background-color": "#ffeb3b",
            "foreground-color": "#000000",
          },
          {
            id: "sub1",
            parentid: "root",
            topic: "sub node 1",
            "background-color": "#8bc34a",
            "foreground-color": "#ffffff",
          },
          {
            id: "sub2",
            parentid: "root",
            topic: "sub node 2",
            "background-color": "#03a9f4",
            "foreground-color": "#ffffff",
          },
          {
            id: "sub3",
            parentid: "root",
            topic: "sub node 3",
            "background-color": "#e91e60",
            "foreground-color": "#ffffff",
          },
        ],
      },
    };
  },
  mounted() {
    const options = {
      container: this.$refs.jsmind_container,
      editable: false, // 禁用编辑功能
      theme: "primary",
      mode: "full",
    };
    this.jm = new jsMind(options);
    this.jm.show(this.mindData);

    // 添加事件监听器
    this.$refs.jsmind_container.addEventListener("wheel", this.handleWheel);
    this.$refs.jsmind_container.addEventListener(
      "mousedown",
      this.handleMouseDown
    );
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  },
  beforeDestroy() {
    // 移除事件监听器
    this.$refs.jsmind_container.removeEventListener("wheel", this.handleWheel);
    this.$refs.jsmind_container.removeEventListener(
      "mousedown",
      this.handleMouseDown
    );
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  },
  methods: {
    handleWheel(event) {
      event.preventDefault();
      if (event.deltaY < 0) {
        this.jm.view.zoomIn();
      } else {
        this.jm.view.zoomOut();
      }
    },
    handleMouseDown(event) {
      if (event.button === 0) {
        // 左键点击
        this.isDragging = true;
        this.startX = event.clientX - this.$refs.jsmind_container.offsetLeft;
        this.startY = event.clientY - this.$refs.jsmind_container.offsetTop;
        this.scrollLeft = this.$refs.jsmind_container.scrollLeft;
        this.scrollTop = this.$refs.jsmind_container.scrollTop;
      }
    },
    handleMouseMove(event) {
      if (this.isDragging) {
        event.preventDefault();
        const x = event.clientX - this.startX;
        const y = event.clientY - this.startY;
        this.$refs.jsmind_container.scrollLeft = this.scrollLeft - x;
        this.$refs.jsmind_container.scrollTop = this.scrollTop - y;
      }
    },
    handleMouseUp() {
      this.isDragging = false;
    },
  },
};
</script>

<style scoped>
.mind-container {
  width: 100%;
  height: 500px;
  border: solid 1px #ccc;
  overflow: auto; /* 使容器可滚动 */
  position: relative;
  cursor: grab; /* 提供视觉提示，表示可以拖动 */
}

.mind-container:active {
  cursor: grabbing; /* 拖动过程中改变光标样式 */
}
</style>
