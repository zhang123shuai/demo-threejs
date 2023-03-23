<template>
  <div class="hello">
    <h1>力图测试</h1>
    <div class="container"></div>
  </div>
</template>
  
  <script>
import * as d3 from "d3";
import testGraphJson from "./miserables.json";
export default {
  props: {},

  data() {
    return {
      testGraph: testGraphJson,
    };
  },
  mounted() {
    this.initGraph(this.testGraph, {
      nodeId: (d) => d.id,
      nodeGroup: (d) => d.group,
      nodeTitle: (d) => `${d.id}\n${d.group}`,
      linkStrokeWidth: (l) => Math.sqrt(l.value),
      width: 1500,
      height: 800,
      // invalidation // a promise to stop the simulation when the cell is re-run
    });
  },
  methods: {
    initGraph(
      {
        nodes, // an iterable of node objects (typically [{id}, …])
        links, // an iterable of link objects (typically [{source, target}, …])
      },
      {
        nodeId = (d) => d.id, // given d in nodes, returns a unique identifier (string)
        nodeGroup, // given d in nodes, returns an (ordinal) value for color
        nodeGroups, // an array of ordinal values representing the node groups
        nodeTitle, // given d in nodes, a title string
        nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
        nodeStroke = "#fff", // node stroke color
        nodeStrokeWidth = 1.5, // node stroke width, in pixels
        nodeStrokeOpacity = 1, // node stroke opacity
        nodeRadius = 30, // node radius, in pixels
        nodeStrength,
        linkSource = ({ source }) => source, // given d in links, returns a node identifier string
        linkTarget = ({ target }) => target, // given d in links, returns a node identifier string
        linkStroke = "#999", // link stroke color
        linkStrokeOpacity = 0.6, // link stroke opacity
        linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
        linkStrokeLinecap = "round", // link stroke linecap
        linkStrength,
        colors = d3.schemeTableau10, // an array of color strings, for the node groups
        width = 640, // outer width, in pixels
        height = 400, // outer height, in pixels
        // invalidation // when this promise resolves, stop the simulation
      } = {}
    ) {
      // Compute values.
      const N = d3.map(nodes, nodeId).map(intern);
      const LS = d3.map(links, linkSource).map(intern);
      const LT = d3.map(links, linkTarget).map(intern);
      if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
      const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
      const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
      const W =
        typeof linkStrokeWidth !== "function"
          ? null
          : d3.map(links, linkStrokeWidth);
      const L =
        typeof linkStroke !== "function" ? null : d3.map(links, linkStroke);

      // Replace the input nodes and links with mutable objects for the simulation.
      // nodes = d3.map(nodes, (_, i) => ({id: N[i]}));
      // links = d3.map(links, (_, i) => ({source: LS[i], target: LT[i]}));

      // Compute default domains.
      if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

      // Construct the scales.
      const color =
        nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

      // Construct the forces.
      const forceNode = d3.forceManyBody();
      const forceLink = d3
        .forceLink(links)
        .id(({ index: i }) => N[i])
        .distance(200);
      if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
      if (linkStrength !== undefined) forceLink.strength(linkStrength);

      console.log(nodes,"nodes")
      console.log(links,"links")
      const simulation = d3
        .forceSimulation(nodes)
        .force("link", forceLink)
        .force("charge", forceNode)
        .force("center", d3.forceCenter())
        .on("tick", ticked);

      // const svg = d3.create("svg")
      //     .attr("width", width)
      //     .attr("height", height)
      //     .attr("viewBox", [-width / 2, -height / 2, width, height])
      //     .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
      //重写，node和link的容器
      const svg = d3
        .select(".container")
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
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

      const marker = svg
        .append("marker")
        .attr("id", "positiveMarker") //指明方向
        .attr("orient", "auto") //自动调整方向
        .attr("stroke-width", 2) //箭头粗细
        .attr("markerUnits", "strokeWidth") //匹配调整粗细的问题
        .attr("markerUnits", "userSpaceOnUse") //匹配调整粗细的问题
        .attr("viewBox", "0 -5 10 10") //箭头所在的可视范围
        .attr("refX", 35) //偏移
        .attr("refY", 0) //
        .attr("markerWidth", 12)
        .attr("markerHeight", 12)
        .append("path")
        .attr("d", "M 0 -5 L 10 0 L 0 5") //path的形状
        .attr("fill", "#999")
        .attr("stroke-opacity", 0.6);
      // const negativeMarker = this.svgArea.append("marker")
      //     .attr("id","negativeMarker")
      //     .attr("orient","auto")
      //     .attr("stroke-width",2)
      //     .attr("markerUnits", "strokeWidth")
      //     .attr("markerUnits", "userSpaceOnUse")
      //     .attr("viewBox", "0 -5 10 10")
      //     .attr("refX", -25)
      //     .attr("refY", 0)
      //     .attr("markerWidth", 12)
      //     .attr("markerHeight", 12)
      //     .append("path")
      //     .attr("d", "M 10 -5 L 0 0 L 10 5")
      //     .attr('fill', '#999')
      //     .attr("stroke-opacity", 0.6);

      const link = svg
        .append("g")
        .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
        .attr("stroke-opacity", linkStrokeOpacity)
        .attr(
          "stroke-width",
          typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null
        )
        .attr("stroke-linecap", linkStrokeLinecap)
        .attr("marker-end", "url(#positiveMarker)") //在末尾处进行标记，url指明标记的内容
        .selectAll("path") //path 比line更加灵活
        // .data(links)
        .data(links)
        .join("path")
        //给path增加一个属性id，使得文字能够依附在线上
        .attr(
          "id",
          (d) => d.source.id + "_" + d.relationship + "_" + d.target.id
        );

      const linksName = svg
        .append("g")
        .selectAll("text")
        .data(links)
        .join("text")
        .attr("x", 100)
        .attr("y", 80)
        .style("text-anchor", "middle")
        .style("fill", "red")
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .append("textPath") //将textpath的g标签放在text下
        //path的id
        .attr(
          "xlink:href",
          (d) => "#" + d.source.id + "_" + d.relationship + "_" + d.target.id
        )
        .text((d) => d.relationship);

      const node = svg
        .append("g")
        .attr("fill", nodeFill)
        .attr("stroke", nodeStroke)
        .attr("stroke-opacity", nodeStrokeOpacity)
        .attr("stroke-width", nodeStrokeWidth)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", nodeRadius)
        .call(drag(simulation));

      const nodeText = svg
        .append("g")
        .selectAll("text")
        .data(nodes)
        .join("text")
        .text((d) => d.id)
        .attr("dx", function () {
          return (this.getBoundingClientRect().width / 2) * -1;
        })
        .attr("dy", 50)
        .attr("class", "nodeText");

      if (W) link.attr("stroke-width", ({ index: i }) => W[i]);
      if (L) link.attr("stroke", ({ index: i }) => L[i]);
      if (G) node.attr("fill", ({ index: i }) => color(G[i]));
      if (T) node.append("title").text(({ index: i }) => T[i]);
      // if (invalidation != null) invalidation.then(() => simulation.stop());

      function intern(value) {
        return value !== null && typeof value === "object"
          ? value.valueOf()
          : value;
      }

      function ticked() {
        link
          //意为起点的(x1,y1)到终点的(x2,y2)之间的连线
          // .attr("x1", d => d.source.x)
          // .attr("y1", d => d.source.y)
          // .attr("x2", d => d.target.x)
          // .attr("y2", d => d.target.y);
          //path和line指明路径的方式不一样
          //意为起点移动到（Move）(d.source.x,d.source.y)画一条线（Line）到点(d.target.x,d.target.y)
          .attr(
            "d",
            (d) =>
              "M" +
              d.source.x +
              " " +
              d.source.y +
              "L" +
              d.target.x +
              " " +
              d.target.y
          );

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

        nodeText.attr("x", (d) => d.x).attr("y", (d) => d.y);
      }

      function drag(simulation) {
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
          event.subject.fx = null;
          event.subject.fy = null;
        }

        return d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      }

      return Object.assign(svg.node(), { scales: { color } });
    },
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
</style>
  
  