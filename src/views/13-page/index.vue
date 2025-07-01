<template>
  <div class="warp">
    <div id="container"></div>
  </div>
</template>
     
    <script>
// import one from "./one/index.vue";
import { Graph } from "@antv/x6"; // 画布
import { Snapline } from "@antv/x6-plugin-snapline"; // 对齐线
export default {
  // components: { one },
  data() {
    return {
      graph: null,
      data: {
        nodes: [
          {
            id: "node1",
            shape: "rect",
            x: 0,
            y: 0,
            width: 100,
            height: 40,
            label: "第1个节点",
            attrs: {
              // body 是选择器名称，选中的是 rect 元素
              body: {
                stroke: "#8f8f8f",
                strokeWidth: 1,
                fill: "#fff",
                rx: 6,
                ry: 6,
              },
            },
          },
          {
            id: "node2",
            shape: "rect",
            x: -160,
            y: 180,
            width: 100,
            height: 40,
            label: "第2个节点",
            attrs: {
              body: {
                stroke: "#8f8f8f",
                strokeWidth: 1,
                fill: "#fff",
                rx: 6,
                ry: 6,
              },
            },
          },
          {
            id: "node3",
            shape: "rect",
            x: 160,
            y: 360,
            width: 100,
            height: 40,
            label: "第3个节点",
            attrs: {
              body: {
                stroke: "#8f8f8f",
                strokeWidth: 1,
                fill: "#fff",
                rx: 6,
                ry: 6,
              },
            },
          },
          {
            id: "node4",
            shape: "rect",
            x: 0,
            y: 360,
            width: 100,
            height: 40,
            label: "第4个节点",
            attrs: {
              body: {
                stroke: "#8f8f8f",
                strokeWidth: 1,
                fill: "#fff",
                rx: 6,
                ry: 6,
              },
            },
          },
        ],
        edges: [
          {
            shape: "edge",
            source: "node1",
            target: "node2",
            label: "管理",
            attrs: {
              // line 是选择器名称，选中的边的 path 元素
              line: {
                stroke: "#8f8f8f",
                strokeWidth: 1,
              },
            },
          },
          {
            shape: "edge",
            source: "node1",
            target: "node3",
            label: "管理",
            attrs: {
              // line 是选择器名称，选中的边的 path 元素
              line: {
                stroke: "#8f8f8f",
                strokeWidth: 1,
              },
            },
          },
          {
            shape: "edge",
            source: "node1",
            target: "node4",
            label: "管理",
            attrs: {
              // line 是选择器名称，选中的边的 path 元素
              line: {
                stroke: "#8f8f8f",
                strokeWidth: 1,
              },
            },
          },
          {
            shape: "edge",
            source: "node2",
            target: "node4",
            label: "管理",
            attrs: {
              // line 是选择器名称，选中的边的 path 元素
              line: {
                stroke: "#8f8f8f",
                strokeWidth: 1,
              },
            },
          },
          {
            shape: "edge",
            source: "node2",
            target: "node3",
            label: "管理",
            attrs: {
              // line 是选择器名称，选中的边的 path 元素
              line: {
                stroke: "#8f8f8f",
                strokeWidth: 1,
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.createGraphFun();
  },
  methods: {
    createGraphFun() {
      this.graph = new Graph({
        container: document.getElementById("container"),
        // width: 800,
        // height: 600,
        background: {
          color: "#F2F7FA",
        },
        // 鼠标拖动画布
        panning: true,
        // 鼠标缩放画布
        mousewheel: true,
      });
      this.graph.fromJSON(this.data); // 画布渲染元素
      this.graph.centerContent(); // 居中显示
      // 画布对齐线
      this.graph.use(
        new Snapline({
          enabled: true,
        })
      );
    },
  },
};
</script>
  <style scoped lang="scss">
.warp {
  width: 100%;
  height: 100%;
  #container {
    width: 100%;
    height: 100%;
  }
}
</style>
     