<template>
    <div class="ecwarp">
      <!-- 标题 -->
      <div class="ectitle">
        <div class="ectt">工厂排名</div>
      </div>
      <!-- 图形 -->
      <div class="ectuxing">
        <div id="chartallFactory"></div>
      </div>
    </div>
  </template>
  
  <script>
//   import { chartResizeListen } from "@/utils";
  import BD from "./bd.json";
  let echarts = require("echarts/lib/echarts");
  export default {
    data() {
      return {};
    },
    mounted() {
      this.initOption();
    },
    methods: {
      initOption() {
        var myChart = this.$echarts.init(
          document.getElementById("chartallFactory")
        );
        var mapDate = [
          {
            name: "北京",
            value: [116.46, 39.92],
            datas: 1354,
            img: "image://" + require("@/assets/zbicon.png"),
          },
          {
            name: "上海",
            value: [121.48, 31.22],
            datas: 1402,
            img: "image://" + require("@/assets/zbicon.png"),
          },
          {
            name: "重庆",
            value: [106.54, 29.59],
            datas: 2468,
            img: "image://" + require("@/assets/zbicon.png"),
          },
          {
            name: "河北",
            value: [114.48, 38.03],
            datas: 768,
            img: "image://" + require("@/assets/zbicon.png"),
          },
          {
            name: "辽宁",
            value: [123.38, 41.8],
            datas: 589,
            img: "image://" + require("@/assets/zbicon.png"),
          },
          {
            name: "拉萨",
            value: [91, 29],
            datas: 1500,
            img: "image://" + require("@/assets/zbicon.png"),
          },
        ];
  
        // var domImg = document.createElement("img");
        // domImg.style.height = domImg.height = domImg.width = domImg.style.width =
        //   "8px";
        // domImg.src =
        //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAIAAAAmKNuZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE4MTE0OTgyQTdDQzExRUI4Q0RBRkMwQkFGMTY2NDhEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE4MTE0OTgzQTdDQzExRUI4Q0RBRkMwQkFGMTY2NDhEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTgxMTQ5ODBBN0NDMTFFQjhDREFGQzBCQUYxNjY0OEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTgxMTQ5ODFBN0NDMTFFQjhDREFGQzBCQUYxNjY0OEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4v4trwAAAAVklEQVR42mL0D225cu0hAzWAjpY8C9CsL19/wIV4uDnI5gKNYmKgKhjcxrFAggBZiBIuyDhqRQWQOxoVo1ExGhWjUTEaFYMiKoB1LVq1TXZUAI0CCDAAcAlaxCt7dtQAAAAASUVORK5CYII=";
  
        // var domImgHover = document.createElement("img");
        // domImgHover.style.height = domImgHover.height = domImgHover.width = domImgHover.style.width =
        //   "8px";
        // domImgHover.src =
        //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAIAAAAmKNuZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFDQ0Q2RjYyQTdDRDExRUI4ODUxRDIxRjkzMEExNzg2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFDQ0Q2RjYzQTdDRDExRUI4ODUxRDIxRjkzMEExNzg2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUNDRDZGNjBBN0NEMTFFQjg4NTFEMjFGOTMwQTE3ODYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUNDRDZGNjFBN0NEMTFFQjg4NTFEMjFGOTMwQTE3ODYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6FboimAAAASklEQVR42mIUnL9XtHsDAzXA69IARjWtXJYX7+FCfyQEKeEyMVAVDG7jWCB+RhaihAsybjQqRqNiNCpGo2I0KoZZVDBSt9oGCDAAhYNrvRu3DWEAAAAASUVORK5CYII=";
  
        var img2 = "image://" + require("@/assets/mapTipBG.png");
        // let index = -1;
        myChart.showLoading("default", {
          text: "统计中，请稍候...",
          // maskColor: "#2957A2",
          textColor: "#000",
        });
        var chinaGeoCoordMap = {
          北京: [116.46, 39.92],
          上海: [121.48, 31.22],
          重庆: [106.54, 29.59],
          河北: [114.48, 38.03],
          辽宁: [123.38, 41.8],
          拉萨: [91, 29],
        };
        var chinaDatas = [
          [
            {
              name: "北京",
              value: 0,
            },
          ],
          [
            {
              name: "上海",
              value: 0,
            },
          ],
          [
            {
              name: "重庆",
              value: 0,
            },
          ],
          [
            {
              name: "河北",
              value: 0,
            },
          ],
          [
            {
              name: "辽宁",
              value: 0,
            },
          ],
          [
            {
              name: "拉萨",
              value: 0,
            },
          ],
        ];
        var convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = chinaGeoCoordMap[dataItem[0].name];
            var toCoord = [116.46, 39.92];
            if (fromCoord && toCoord) {
              res.push([
                {
                  coord: fromCoord,
                  value: dataItem[0].value,
                },
                {
                  coord: toCoord,
                },
              ]);
            }
          }
          return res;
        };
        var series = [];
        [["北京", chinaDatas]].forEach(function (item, i) {
          console.log(item);
          series.push(
            {
              type: "lines",
              zlevel: 2,
              effect: {
                show: true,
                period: 4, //箭头指向速度，值越小速度越快
                trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: "arrow", //箭头图标
                symbolSize: 5, //图标大小
              },
              lineStyle: {
                normal: {
                  color: "#3ba3eb", //飞线颜色
                  width: 1, //尾迹线条宽度
                  opacity: 1, //尾迹线条透明度
                  curveness: -0.3, //尾迹线条曲直度
                },
              },
              data: convertData(item[1]),
            },
            {
              type: "effectScatter",
              coordinateSystem: "geo",
              zlevel: 2,
              rippleEffect: {
                //涟漪特效
                period: 4, //动画时间，值越小速度越快
                brushType: "stroke", //波纹绘制方式 stroke, fill
                scale: 4, //波纹圆环最大限制，值越大波纹越大
              },
            }
          );
        });
        series.push(
          {
            type: "map",
            roam: true,
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
              emphasis: {
                textStyle: {
                  color: "#fff",
                },
              },
            },
            itemStyle: {
              normal: {
                borderColor: "#2ab8ff",
                borderWidth: 1,
                areaColor: {
                  // image: domImg,
                  repeat: "repeat",
                },
                shadowColor: "rgba(0, 0, 0, 0.5)",
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 1,
              },
              emphasis: {
                areaColor: {
                  // image: domImgHover,
                  repeat: "repeat",
                },
                borderColor: "#2ab8ff",
                borderWidth: 1,
                shadowColor: "rgba(0, 255, 255, 0.7)",
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 1,
                label: {
                  show: false,
                },
              },
            },
            zoom: 1.1,
            roam: false,
            map: "bd",
          },
          {
            tooltip: {
              show: false,
            },
            type: "effectScatter",
            coordinateSystem: "geo",
            rippleEffect: {
              scale: 10,
              brushType: "stroke",
            },
            showEffectOn: "render",
            itemStyle: {
              normal: {
                shadowColor: "#0ff",
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                color: function (params) {
                  var colorList = [
                    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: "#64fbc5",
                      },
                      {
                        offset: 1,
                        color: "#018ace",
                      },
                    ]),
                    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: "#64fbc5",
                      },
                      {
                        offset: 1,
                        color: "#018ace",
                      },
                    ]),
                    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: "#168e6d",
                      },
                      {
                        offset: 1,
                        color: "#c78d7b",
                      },
                    ]),
                    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: "#61c0f1",
                      },
                      {
                        offset: 1,
                        color: "#6f2eb6",
                      },
                    ]),
                    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: "#168e6d",
                      },
                      {
                        offset: 1,
                        color: "#c78d7b",
                      },
                    ]),
                    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: "#61c0f1",
                      },
                      {
                        offset: 1,
                        color: "#6f2eb6",
                      },
                    ]),
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              normal: {
                color: "#fff",
              },
            },
            symbol: "circle",
            symbolSize: [10, 5],
            data: mapDate,
            zlevel: 1,
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            itemStyle: {
              color: "#f00",
            },
            symbol: function (value, params) {
              return params.data.img;
            },
            symbolSize: [32, 41],
            symbolOffset: [0, -20],
            z: 9999,
            data: mapDate,
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  var name = params.name;
                  var value = params.data.datas;
                  var text = `{fline|${value}}\n{tline|${name}}`;
                  return text;
                },
                color: "#fff",
                rich: {
                  fline: {
                    padding: [0, 25],
                    color: "#fff",
                    textShadowColor: "#030615",
                    textShadowBlur: "0",
                    textShadowOffsetX: 1,
                    textShadowOffsetY: 1,
                    fontSize: 14,
                    fontWeight: 400,
                  },
                  tline: {
                    padding: [0, 27],
                    color: "#ABF8FF",
                    fontSize: 12,
                  },
                },
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              color: "green",
            },
            symbol: img2,
            symbolSize: [70, 50],
            symbolOffset: [0, -60],
            z: 999,
            data: mapDate,
          }
        );
        setTimeout(function () {
          mapInit();
        }, 1000);
        var mapInit = () => {
          echarts.registerMap("bd", BD);
          myChart.hideLoading();
          let option = {
            // backgroundColor: "#2957A2",
            title: {
              top: 20,
              text: "中国",
              subtext: "",
              x: "center",
              textStyle: {
                color: "#000",
                fontWeight: 600,
                fontSize: 16,
              },
            },
            geo: {
              map: "bd",
              aspectScale: 0.75,
              layoutCenter: ["50%", "50%"],
              layoutSize: "88%",
              silent: true,
              roam: false,
              z: 0,
              itemStyle: {
                normal: {
                  areaColor: "rgba(0, 15, 40, 0.5)",
                  shadowColor: "rgba(0, 0, 0, 1)",
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowOffsetY: 5,
                  borderColor: "rgba(0, 0, 0, 0.7)",
                  borderWidth: 0.5,
                },
                emphasis: {
                  areaColor: "#2AB8FF",
                  borderWidth: 1,
                  color: "green",
                  label: {
                    show: false,
                  },
                },
              },
            },
            series: series,
          };
          myChart.setOption(option);
        //   chartResizeListen(this, myChart, "chartallFactory");
        };
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .ecwarp {
    height: 100%;
    .ectitle {
      height: 40px;
      border-bottom: 1px solid #c1c1c1;
      padding: 5px 0 0 15px;
      display: flex;
      justify-content: space-between;
      .ectt {
        font-size: 20px;
        line-height: 30px;
        font-weight: bold;
        border-left: 3px solid #1d6fa9;
        padding-left: 15px;
      }
    }
    .ectuxing {
      height: calc(100% - 40px);
      #chartallFactory {
        height: 100%;
      }
    }
  }
  </style>
  