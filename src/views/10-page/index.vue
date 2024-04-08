<template>
  <div class="warp">
    <div id="aaa"></div>
    <div class="big">
      <div class="line line-left line1"></div>
    </div>
    <!-- 图谱 -->
    <div id="zstupu" class="tupuWarp"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nodesList: [
        {
          name: "操作系统集团",
          category: 0,
        },
        {
          name: "浏览器有限公司",
          category: 0,
        },
        {
          name: "HTML科技",
          category: 0,
        },
        {
          name: "JavaScript科技",
          category: 0,
        },
        {
          name: "CSS科技",
          category: 0,
        },
        {
          name: "Chrome",
          category: 1,
          gaojing: 0,
        },
        {
          name: "IE",
          category: 1,
          gaojing: 0,
        },
        {
          name: "Firefox",
          category: 1,
          gaojing: 1,
        },
        {
          name: "Safari",
          category: 1,
          gaojing: 0,
        },
      ],
      linksList: [
        {
          source: "浏览器有限公司",
          target: "操作系统集团",
          name: "参股",
        },
        {
          source: "HTML科技",
          target: "浏览器有限公司",
          name: "参股",
        },
        {
          source: "CSS科技",
          target: "浏览器有限公司",
          name: "参股",
        },
        {
          source: "JavaScript科技",
          target: "浏览器有限公司",
          name: "参股",
        },
        {
          source: "Chrome",
          target: "浏览器有限公司",
          name: "董事",
        },
        {
          source: "IE",
          target: "浏览器有限公司",
          name: "董事",
        },
        {
          source: "Firefox",
          target: "浏览器有限公司",
          name: "董事",
        },
        {
          source: "Safari",
          target: "浏览器有限公司",
          name: "董事",
        },
        {
          source: "Chrome",
          target: "JavaScript科技",
          name: "法人",
        },
      ],
    };
  },
  created() {},
  mounted() {
    this.oneEcharts();
  },
  methods: {
    oneEcharts() {
      var myChart = this.$echarts.init(document.getElementById("zstupu"));
      let data = {
        nodes: this.nodesList,
        links: this.linksList,
      };

      const color1 = "#006acc";
      const color2 = "#ff7d18";
      const color3 = "#10a050";

      data.nodes.forEach((node) => {
        if (node.category === 0) {
          node.symbolSize = 100;
          node.itemStyle = {
            color: color1,
          };
        } else if (node.category === 1) {
          node.itemStyle = {
            color: color2,
          };
          if (node.gaojing === 1) {
            node.itemStyle = {
              color: "red",
            };
          }
        }
      });

      data.links.forEach((link) => {
        link.label = {
          align: "center",
          fontSize: 12,
        };

        if (link.name === "参股") {
          link.lineStyle = {
            color: color2,
          };
        } else if (link.name === "董事") {
          link.lineStyle = {
            color: color1,
          };
        } else if (link.name === "法人") {
          link.lineStyle = {
            color: color3,
          };
        }
      });
      //顶部列表展示
      let categories = [
        {
          name: "公司",
          itemStyle: {
            color: color1,
          },
        },
        {
          name: "董事",
          itemStyle: {
            color: color2,
          },
        },
      ];

      let option = {
        title: {
          text: "知识图谱",
        },
        legend: [
          {
            // selectedMode: 'single',
            data: categories.map((x) => x.name),
            // icon: 'circle'
          },
        ],
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 58,
            draggable: true,
            roam: true,
            focusNodeAdjacency: true,
            categories: categories,
            edgeSymbol: ["", "arrow"],
            // edgeSymbolSize: [80, 10],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 20,
                },
                formatter(x) {
                  console.log(x.data.name, "909090");
                  return x.data.name;
                },
              },
            },
            label: {
              show: true,
            },
            force: {
              repulsion: 2000,
              edgeLength: 120,
            },
            data: data.nodes,
            links: data.links,
          },
        ],
      };
      console.log(option, "option");
      myChart.setOption(option);
      // 为树图添加节点点击事件
      myChart.on("click", this.treeNodeclick);
    },
    treeNodeclick(param) {
      console.log(param, "0000");
      if (param.name == "HTML科技") {
        this.nodesList = [
          {
            name: "操作系统集团",
            category: 0,
          },
          {
            name: "浏览器有限公司",
            category: 0,
          },
          {
            name: "HTML科技",
            category: 0,
          },
          {
            name: "JavaScript科技",
            category: 0,
          },
          {
            name: "CSS科技",
            category: 0,
          },
          {
            name: "Chrome",
            category: 1,
            gaojing: 0,
          },
          {
            name: "IE",
            category: 1,
            gaojing: 0,
          },
          {
            name: "Firefox",
            category: 1,
            gaojing: 1,
          },
          {
            name: "Safari",
            category: 1,
            gaojing: 0,
          },
          {
            name: "小Html-1",
            category: 1,
            gaojing: 0,
          },
          {
            name: "小Html-2",
            category: 1,
            gaojing: 0,
          },
        ];
        this.linksList = [
          {
            source: "浏览器有限公司",
            target: "操作系统集团",
            name: "参股",
          },
          {
            source: "HTML科技",
            target: "浏览器有限公司",
            name: "参股",
          },
          {
            source: "CSS科技",
            target: "浏览器有限公司",
            name: "参股",
          },
          {
            source: "JavaScript科技",
            target: "浏览器有限公司",
            name: "参股",
          },
          {
            source: "Chrome",
            target: "浏览器有限公司",
            name: "董事",
          },
          {
            source: "IE",
            target: "浏览器有限公司",
            name: "董事",
          },
          {
            source: "Firefox",
            target: "浏览器有限公司",
            name: "董事",
          },
          {
            source: "Safari",
            target: "浏览器有限公司",
            name: "董事",
          },
          {
            source: "Chrome",
            target: "JavaScript科技",
            name: "法人",
          },
          {
            source: "小Html-1",
            target: "HTML科技",
            name: "小弟",
          },
          {
            source: "小Html-2",
            target: "HTML科技",
            name: "小弟",
          },
        ];
        this.oneEcharts();
      }
      /* true 代表点击的是圆点
       fasle 表示点击的是当前节点的文本
    */
      // if (param.event.target.culling === true) {
      //   return;
      // } else if (param.event.target.culling === false) {
      //   let args = param.data; //当前节点及其子节点的值
      //   let level = param.data.level; //当前节点的层级 eg:"1-1-0",可以通过level判断当前的层级，从而进行不同的操作
      //   console.log(args, level);
      // }
    },
  },
};
</script>

<style scoped lang="scss">
.big {
  width: 900px;
  height: 10px;
  background-color: #fff;
  padding: 20px;
  overflow: hidden;
  position: absolute;
}
.line {
  background: #01dde8; // 线的颜色
  height: 4px; // 线的宽度
  // position: absolute;
  transform-origin: left top;
  z-index: 10;
  width: 900px; // 线的长度
  top: 50px; // 位置上偏移
  left: 50px; // 位置左偏移
  // transform: rotateZ(35deg); // 线的旋转角度
}

// 用来做流动效果的
.line-left::before {
  content: "";
  position: absolute;
  height: 4px; // 流体的宽度，可以适当宽一些，但是注意位置偏移
  width: 40px; // 流体路线长度，最好与线保持一致
  background: linear-gradient(
    to left,
    transparent,
    #fff
  ); // 流体样式，这里是渐变
  animation: fade-left 3s linear infinite; //使用fade-left动画
  box-shadow: 0px 0px 17px 5px #72dffa; // 外发光
}

// 向左流动，right改left为向右流动
@keyframes fade-left {
  0% {
    right: 0px;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    right: calc(100% - 40px); // 到达终点时位置要减去自身的长度
    opacity: 0;
  }
}

.warp {
  width: 100%;
  height: 100%;
  background-color: aquamarine;
}
#aaa {
  width: 500px;
  height: 500px;
}
.tupuWarp {
  width: 900px;
  height: 900px;
  border: 1px solid #000;
}
</style>