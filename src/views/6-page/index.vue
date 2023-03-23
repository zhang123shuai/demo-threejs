<template>
  <div class="box_warp">
    <svg id="svg" width="100%" height="100%"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      nodes: [
        {
          id: 0,
          name: "小王",
        },
        {
          id: 1,
          name: "小黑",
        },
        {
          id: "phone",
          name: "18344982739",
        },
        {
          id: "idcord",
          name: "18908772667188493821",
        },
        {
          id: "zw",
          name: "牛马",
        },
      ], //点
      links: [
        { source: 0, target: "phone", name: "手机号" },
        { source: 0, target: "idcord", name: "身份证" },
        { source: 0, target: "zw", name: "职位" },
        { source: 1, target: "zw", name: "职位" },
      ], //边-线
      svgDom: null,
    };
  },
  beforeDestroy() {
    // 移除svg和元素注册事件，防止内存泄漏
    this.svgDom.on(".", null);
    this.svgDom.selectAll("*").on(".", null);
  },
  mounted() {
    this.d3init();
  },
  methods: {
    d3init() {
      this.svgDom = d3.select("#svg"); // 获取svg的DOM元素
      this.d3render();
    },
    d3render() {
      var _this = this;
      _this.svgDom.selectAll("*").remove();
      var svg = _this.svgDom
        // 给画布绑定zoom事件（缩放、平移）
        .call(
          d3.zoom().on("zoom", (event) => {
            // console.log(event)
            var scale = event.transform.k,
              translate = [event.transform.x, event.transform.y];
            svg.attr(
              "transform",
              "translate(" +
                translate[0] +
                ", " +
                translate[1] +
                ") scale(" +
                scale +
                ")"
            );
          })
        )
        .append("g")
        .attr("width", "100%")
        .attr("height", "100%");
      // 绘制关系箭头
      this.addMarkers();
      // 利用d3.forceSimulation()定义关系图 包括设置边link、排斥电荷charge、关系图中心点
      var simulation = d3
        .forceSimulation(this.nodes)
        .force(
          "link",
          d3.forceLink().id((d) => d.id)
        )
        .force("charge", d3.forceManyBody().strength(-100))
        // .force("center", d3.forceCenter(width / 2, height / 2)
        .force(
          "center",
          d3.forceCenter(
            svg.node().parentElement.clientWidth / 2,
            svg.node().parentElement.clientHeight / 2
          )
        );
      // .force("collision", forceCollide);

      var link = svg
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(this.links)
        .enter()
        .append("line")
        .attr("stroke-width", function (d) {
          // 每次访问links的一项数据
          return 2; //所有线宽度均为2
        })
        .join("path")
        .attr("marker-end", "url(#posMarker)");

      var linksName = svg
        .append("g")
        .attr("class", "linkTexts")
        .selectAll("text")
        .data(this.links)
        .join("text")
        .style("text-anchor", "middle")
        .style("fill", "#000")
        .style("font-size", "12px")
        // .style('font-weight', 'bold')
        .text((d) => d.name);
      // 添加所有的点
      var node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(this.nodes)
        .enter()
        .append("circle")
        .attr("r", function (d) {
          // 每次访问nodes的一项数据
          // console.log(d)
          let size = 16;
          //   switch (d.label) {
          //     case _this.labels[0]:
          //       break;
          //     case _this.labels[1]:
          //       size = 14;
          //       break;
          //     case _this.labels[2]:
          //       size = 13;
          //       break;
          //     default:
          //       size = 13;
          //       break;
          //   }
          return size * 2;
        })
        .attr("fill", (d) => {
          //   for (let i = 0; i < this.labels.length; i++) {
          //     if (d.label === this.labels[i]) return this.colors[i];
          //   }
          return "#55cccc";
        })
        .attr("stroke", "none")
        .attr("name", (d) => d.name)
        .attr("id", (d) => d.id)
        .call(this.drag(simulation));
      // .on("click", nodeClick);

      var text = svg
        .append("g")
        .attr("class", "texts")
        .selectAll("text")
        .data(this.nodes)
        .enter()
        .append("text")
        .attr("font-size", () => 13)
        .attr("fill", () => "#000") //点内文字颜色
        .attr("name", (d) => d.name)
        .attr("text-anchor", "middle")
        .attr("x", function (d) {
          return textBreaking(d3.select(this), d.name);
        })
        .call(this.drag(simulation));
      // .on("click", nodeClick);
      // 圆增加title
      node.append("title").text((d) => d.name);
      // simulation中ticked数据初始化并生成图形
      simulation.on("tick", ticked);

      simulation
        .force("link")
        .links(this.links)
        .distance((d) => {
          // 每一边的长度
          let distance = 20;
          //   switch (d.source.label) {
          //     case _this.labels[0]:
          //       distance += 30;
          //       break;
          //     case _this.labels[1]:
          //       distance += 25;
          //       break;
          //     case _this.labels[2]:
          //       distance += 22;
          //       break;
          //     default:
          //       distance += 20;
          //       break;
          //   }
          //   switch (d.target.label) {
          //     case _this.labels[0]:
          //       distance += 30;
          //       break;
          //     case _this.labels[1]:
          //       distance += 25;
          //       break;
          //     case _this.labels[2]:
          //       distance += 22;
          //       break;
          //     default:
          //       distance += 20;
          //       break;
          //   }
          return distance * 2;
        });

      function ticked() {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        linksName.attr("transform", (d) => {
          let x =
            Math.min(d.source.x, d.target.x) +
            Math.abs(d.source.x - d.target.x) / 2;
          let y =
            Math.min(d.source.y, d.target.y) +
            Math.abs(d.source.y - d.target.y) / 2 -
            1 -
            15;
          // tanA = a / b
          // A = arctan(tanA)
          let tanA =
            Math.abs(d.source.y - d.target.y) /
            Math.abs(d.source.x - d.target.x);
          let angle = (Math.atan(tanA) / Math.PI) * 180;
          // let angle = Math.atan2(1,1)/Math.PI*180
          // console.log(angle)
          // 第一、二象限额外处理
          if (d.source.x > d.target.x) {
            // 第二象限
            if (d.source.y <= d.target.y) {
              angle = -angle;
            }
            // else {  // 第三象限
            //   angle = angle
            // }
          } else if (d.source.y > d.target.y) {
            // 第一象限
            angle = -angle;
          }
          return "translate(" + x + "," + y + ")" + "rotate(" + angle + ")";
        });

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

        text.attr("transform", function (d) {
          let size = 15;
          //   switch (d.label) {
          //     case _this.labels[0]:
          //       break;
          //     case _this.labels[1]:
          //       size = 14;
          //       break;
          //     case _this.labels[2]:
          //       size = 13;
          //       break;
          //     default:
          //       size = 12;
          //       break;
          //   }
          size -= 5;
          return (
            "translate(" + (d.x - size / 2 + 3) + "," + (d.y + size / 2) + ")"
          );
        });
      }
      function textBreaking(d3text, text) {
        const len = text.length;
        if (len <= 3) {
          d3text.append("tspan").attr("x", 0).attr("y", 2).text(text);
        } else {
          const topText = text.substring(0, 3);
          const midText = text.substring(3, 7);
          let botText = text.substring(7, len);
          let topY = -16;
          let midY = 0;
          let botY = 16;
          if (len <= 7) {
            topY += 10;
            midY += 10;
          } else if (len > 10) {
            botText = text.substring(7, 9) + "...";
          }

          d3text.text("");
          d3text
            .append("tspan")
            .attr("x", 0)
            .attr("y", topY)
            .text(function () {
              return topText;
            });
          d3text
            .append("tspan")
            .attr("x", 0)
            .attr("y", midY)
            .text(function () {
              return midText;
            });
          d3text
            .append("tspan")
            .attr("x", 0)
            .attr("y", botY)
            .text(function () {
              return botText;
            });
        }
      }
    },
    drag(simulation) {
      function dragsubject(event) {
        return simulation.find(event.x, event.y);
      }

      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        // 注释以下代码，使拖动结束后固定节点
        // event.subject.fx = null;
        // event.subject.fy = null;
      }

      return d3
        .drag()
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    },
    // 绘制关系箭头
    addMarkers() {
      // 定义箭头的标识
      var defs = this.svgDom.append("defs");
      const posMarker = defs
        .append("marker")
        .attr("id", "posMarker")
        .attr("orient", "auto")
        .attr("stroke-width", 2)
        .attr("markerUnits", "strokeWidth")
        .attr("markerUnits", "userSpaceOnUse")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 31)
        .attr("refY", 0)
        .attr("markerWidth", 12)
        .attr("markerHeight", 12)
        .append("path")
        .attr("d", "M 0 -5 L 10 0 L 0 5")
        .attr("fill", "#000") //箭头颜色
        .attr("stroke-opacity", 0.6);
      const posActMarker = defs
        .append("marker")
        .attr("id", "posActMarker")
        .attr("orient", "auto")
        .attr("stroke-width", 2)
        .attr("markerUnits", "strokeWidth")
        .attr("markerUnits", "userSpaceOnUse")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 31)
        .attr("refY", 0)
        .attr("markerWidth", 12)
        .attr("markerHeight", 12)
        .append("path")
        .attr("d", "M 0 -5 L 10 0 L 0 5")
        .attr("fill", "#000")
        .attr("stroke-opacity", 0.6);
    },
  },
};
</script>

<style scoped lang="scss">
.box_warp {
  width: 100%;
  height: 100%;
}
</style>
