<template>
  <div>
    <div
      ref="jsMindContainer"
      style="
        width: 100%;
        height: 800px;
        overflow: hidden;
        background-color: red;
      "
    ></div>
  </div>
</template>

<script>
// main.js 或 App.vue
import "jsmind/style/jsmind.css"; // 导入 jsMind 样式
import jsMind from "jsmind"; // 导入 jsMind 库

export default {
  // mounted() {
  //   // 在 mounted 生命周期中初始化 jsMind 实例
  //   const options = {
  //     container: this.$refs.jsMindContainer,
  //     editable: false, // 是否可编辑
  //     theme: "default", // 主题
  //     // theme: "custom-theme", // 主题
  //     default_event_handle: true, // 是否启用默认事件处理器
  //   };

  //   const mind = {
  //     meta: {
  //       name: "Example Mindmap",
  //     },
  //     format: "node_array",
  //     data: [
  //       {
  //         id: "root",
  //         isroot: true,
  //         topic: "Rooasdasdasda1t",
  //         background: "#000000",
  //         color: "#ffffff",
  //       },
  //       {
  //         id: "sub1",
  //         parentid: "root",
  //         topic: "Subtopic 1",
  //         background: "#ffcccc",
  //         color: "#990000",
  //       },
  //       {
  //         id: "sub2",
  //         parentid: "root",
  //         topic: "Subtopic 1",
  //         background: "#ffcccc",
  //         color: "#990000",
  //       },
  //       {
  //         id: "sub3",
  //         parentid: "root",
  //         topic: "Subtopic 2",
  //         background: "#ccffcc",
  //         color: "#009900",
  //       },
  //       {
  //         id: "disan",
  //         parentid: "sub2",
  //         topic: "Subtopic 2",
  //         background: "#ccffcc",
  //         color: "#009900",
  //       },
  //     ],
  //   };

  //   const jm = new jsMind(options);
  //   jm.show(mind); // 显示思维导图
  // },
  mounted() {
    // 在 mounted 生命周期中初始化 jsMind 实例
    const options = {
      container: this.$refs.jsMindContainer,
      editable: false, // 是否可编辑
      theme: "default", // 主题
      default_event_handle: true, // 是否启用默认事件处理器
      // default_event_handle:{
      //   enable_
      // }
    };

    const mind = {
      meta: {
        name: "Example Mindmap",
      },
      format: "node_array",
      data: [
        { id: "root", isroot: true, topic: "Root" },
        { id: "sub1", parentid: "root", topic: "Subtopic 1" },
        { id: "sub2", parentid: "root", topic: "Subtopic 2" },
      ],
    };

    const jm = new jsMind(options);

    jm.enableDtag(true);
    jm.enableResize(true);

    jm.show(mind); // 显示思维导图

    // 添加缩放功能
    //   const container = this.$refs.jsMindContainer;
    //   container.addEventListener("wheel", (event) => {
    //     event.preventDefault();
    //     const scaleStep = 0.1;
    //     const minScale = 0.5;
    //     const maxScale = 2;
    //     let currentScale = container.style.transform
    //       ? parseFloat(container.style.transform.match(/scale\(([^)]+)\)/)[1])
    //       : 1;

    //     if (event.deltaY < 0) {
    //       // 缩小
    //       currentScale = Math.min(currentScale + scaleStep, maxScale);
    //     } else {
    //       // 放大
    //       currentScale = Math.max(currentScale - scaleStep, minScale);
    //     }

    //     container.style.transform = `scale(${currentScale})`;
    //   });

    //   // 启用拖动功能
    //   let isDragging = false;
    //   let startX, startY;

    //   container.addEventListener("mousedown", (event) => {
    //     isDragging = true;
    //     startX = event.clientX - container.offsetLeft;
    //     startY = event.clientY - container.offsetTop;
    //     container.style.cursor = "grabbing";
    //   });

    //   container.addEventListener("mousemove", (event) => {
    //     if (isDragging) {
    //       const x = event.clientX - startX;
    //       const y = event.clientY - startY;
    //       container.style.left = `${x}px`;
    //       container.style.top = `${y}px`;
    //     }
    //   });

    //   container.addEventListener("mouseup", () => {
    //     isDragging = false;
    //     container.style.cursor = "grab";
    //   });

    //   container.addEventListener("mouseleave", () => {
    //     isDragging = false;
    //     container.style.cursor = "grab";
    //   });
  },
};
</script>

<style scoped>
/* 可以在此处添加组件的样式 */
/* 自定义主题 */
.custom-theme {
  background-color: #f0f0f0; /* 设置节点背景色 */
}

.custom-theme .jsnode .topic {
  color: #333; /* 设置节点文字颜色 */
}
</style>
