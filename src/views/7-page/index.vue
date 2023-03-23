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
        //获取数据
        data: require("./records.json"),
        nodes: [], //点
        links: [], //边-线
        names: ["企业", "贸易类型", "地区", "国家"],
        labels: ["Enterprise", "Type", "Region", "Country"],
        linkTypes: ["", "type", "locate", "export"],
  
        svgDom: null, // svg的DOM元素 => d3.select('#svg1')
        /* eslint-disable */
        // 自定义图例及颜色（数组保证一一对应）
        // colors		图例颜色（9个颜色）
        // states   图例状态（on：显示 / off：不显示）
        colors: [
          "#55cccc",
          "#aaaaff",
          "#4e88af",
          "#ca635f",
          "#FFC0CB",
          "#BA55D3",
          "#1E90FF",
          "#7FFFD4",
          "#FFFF00",
        ],
      };
    },
    mounted() {
      this.update(this.data);
    },
    beforeDestroy() {
      // 移除svg和元素注册事件，防止内存泄漏
      this.svgDom.on(".", null);
      this.svgDom.selectAll("*").on(".", null);
    },
    methods: {
      //处理数据
      update(json) {
        console.log(json, "数据加载更新静态数据");
        // 视图更新
        this.d3jsonParser(json);
      },
      d3jsonParser(json) {
        const nodes = [];
        const links = []; // 存放节点和关系
        const nodeSet = []; // 存放去重后nodes的id
        for (let item of json) {
          for (let segment of item.p.segments) {
            // 重新更改data格式
            if (nodeSet.indexOf(segment.start.identity) == -1) {
              nodeSet.push(segment.start.identity);
              nodes.push({
                id: segment.start.identity,
                label: segment.start.labels[0],
                properties: segment.start.properties,
              });
            }
            if (nodeSet.indexOf(segment.end.identity) == -1) {
              nodeSet.push(segment.end.identity);
              nodes.push({
                id: segment.end.identity,
                label: segment.end.labels[0],
                properties: segment.end.properties,
              });
            }
            links.push({
              source: segment.relationship.start,
              target: segment.relationship.end,
              type: segment.relationship.type,
              properties: segment.relationship.properties,
            });
          }
        }
        this.links = links;
        this.nodes = nodes;
        console.log(this.nodes, "nodes");
        console.log(this.links, "links");
        //d3开始绘制
        this.d3init();
      },
      // d3初始化，包括数据解析、数据渲染
      d3init() {
        this.svgDom = d3.select("#svg"); // 获取svg的DOM元素
        // this.d3jsonParser(this.graph)
        this.d3render();
      },
      d3render() {
        var _this = this; // 临时获取Vue实例，避免与d3的this指针冲突
  
        // 渲染前清空svg内的元素
        _this.svgDom.selectAll("*").remove();
        // svg.selectAll('g').remove()
  
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
        // 定义碰撞检测模型
        var forceCollide = d3
          .forceCollide()
          .radius((d) => {
            return 16 * 3;
          })
          .iterations(0.15)
          .strength(0.75);
  
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
          )
          .force("collision", forceCollide);
  
        // D3映射数据至HTML中
        // g用于绘制所有边,selectALL选中所有的line,并绑定数据data(graph.links),enter().append("line")添加元素
        // 数据驱动文档,设置边的粗细
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
          .text((d) => d.properties.name);
  
        // 添加所有的点
        // selectAll("circle")选中所有的圆并绑定数据,圆的直径为d.size
        // 再定义圆的填充色,同样数据驱动样式,圆没有描边,圆的名字为d.id
        // call()函数：拖动函数,当拖动开始绑定dragstarted函数，拖动进行和拖动结束也绑定函数
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
            switch (d.label) {
              case _this.labels[0]:
                break;
              case _this.labels[1]:
                size = 14;
                break;
              case _this.labels[2]:
                size = 13;
                break;
              default:
                size = 13;
                break;
            }
            return size * 2;
          })
          .attr("fill", (d) => {
            for (let i = 0; i < this.labels.length; i++) {
              if (d.label === this.labels[i]) return this.colors[i];
            }
          })
          .attr("stroke", "none")
          .attr("name", (d) => d.properties.name)
          .attr("id", (d) => d.id)
          .call(this.drag(simulation))
          .on("click", nodeClick);
        // 显示所有的文本
        // 设置大小、填充颜色、名字、text()设置文本
        // 使用 attr("text-anchor", "middle")设置文本居中
        var text = svg
          .append("g")
          .attr("class", "texts")
          .selectAll("text")
          .data(this.nodes)
          .enter()
          .append("text")
          .attr("font-size", () => 13)
          .attr("fill", () => "#fff") //点内文字颜色
          .attr("name", (d) => d.properties.name)
          .attr("text-anchor", "middle")
          .attr("x", function (d) {
            return textBreaking(d3.select(this), d.properties.name);
          })
          .call(this.drag(simulation))
          .on("click", nodeClick);
        // 圆增加title
        node.append("title").text((d) => d.properties.name);
  
        // simulation中ticked数据初始化并生成图形
        simulation.on("tick", ticked);
  
        simulation
          .force("link")
          .links(this.links)
          .distance((d) => {
            // 每一边的长度
            let distance = 20;
            switch (d.source.label) {
              case _this.labels[0]:
                distance += 30;
                break;
              case _this.labels[1]:
                distance += 25;
                break;
              case _this.labels[2]:
                distance += 22;
                break;
              default:
                distance += 20;
                break;
            }
            switch (d.target.label) {
              case _this.labels[0]:
                distance += 30;
                break;
              case _this.labels[1]:
                distance += 25;
                break;
              case _this.labels[2]:
                distance += 22;
                break;
              default:
                distance += 20;
                break;
            }
            return distance * 2;
          });
  
        /******************************************
         * 内部功能函数
         * 包括：ticked、文本分隔、节点和文本的点击事件
         */
        // ticked()函数确定link线的起始点x、y坐标 node确定中心点 文本通过translate平移变化
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
              1;
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
            switch (d.label) {
              case _this.labels[0]:
                break;
              case _this.labels[1]:
                size = 14;
                break;
              case _this.labels[2]:
                size = 13;
                break;
              default:
                size = 12;
                break;
            }
            size -= 5;
            return (
              "translate(" + (d.x - size / 2 + 3) + "," + (d.y + size / 2) + ")"
            );
          });
        }
  
        /**
         * 文本分隔（根据字数在当前选择器中分隔三行，超过10字省略）
         * @method textBreaking
         * @param {d3text} 文本对应的DOM对象
         * @param {text} 节点名称的文本值
         * @return {void}
         */
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
        // 分别定义节点和文本的点击事件
        // 优化：由于点击前必定触发mouseenter事件，所以不用再去查找节点id
        //      直接根据this.selectNodeData拿到节点信息
        // 优化后：只需定义一个点击事件即可
        function nodeClick(event, d) {
          // 直接通过this.selectNodeData拿到节点信息
          event.cancelBubble = true;
          event.stopPropagation(); // 阻止事件冒泡
          console.log("点击了");
  
          return false;
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
  <style lang="scss">
  $opacity: 0.15; /* 显示的不透明度 */
  $activeColor: #1e90ff; /* 激活的颜色 */
  svg {
    margin: 20px 0px;
  }
  /*设置节点及边的样式*/
  .links line {
    stroke: #000; //线颜色
    stroke-opacity: 1;
    &.inactive {
      opacity: $opacity;
    }
    &.active {
      stroke: $activeColor;
      stroke-width: 3px;
    }
    &.hide {
      display: none !important;
    }
  }
  .nodes circle {
    &.fixed {
      stroke: #ffc0cb;
      stroke-width: 14px;
      stroke-opacity: $opacity + 0.3;
      border: 10px #000 solid;
    }
    &.inactive {
      opacity: $opacity;
    }
    &.active {
      stroke: $activeColor;
      stroke-width: 4px;
    }
    &:hover {
      cursor: pointer;
    }
    &.hide {
      display: none !important;
    }
  }
  .texts text {
    cursor: pointer;
    text-decoration: none;
    user-select: none;
    &:hover {
      cursor: pointer;
    }
    &.inactive {
      opacity: $opacity;
    }
  }
  .linkTexts text {
    stroke: #000; //线上文字颜色
    stroke-opacity: 1;
    &.active {
      stroke: $activeColor;
    }
    &.inactive {
      opacity: $opacity;
    }
  }
  </style>