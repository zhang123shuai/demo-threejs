<template>
  <div class="warp">
    <div id="one"></div>
    <div id="two"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.getOne();
    this.getTwo();
  },
  methods: {
    getOne() {
      let myChart = this.$echarts.init(document.getElementById("one"));
      let num = 1; //判断是红色还是绿色
      let option = {
        // backgroundColor: "#111",
        title: [
          {
            text: "60.00%",
            x: "center",
            top: "40%",
            textStyle: {
              fontSize: "50",
              color: "#fff",
              fontFamily: "Lato",
              foontWeight: "600",
            },
          },
        ],
        polar: {
          radius: ["77%", "90%"], //修改圆弧宽度
          center: ["50%", "50%"],
        },
        angleAxis: {
          max: 100,
          show: false,
        },
        radiusAxis: {
          type: "category",
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            // roundCap: true,//开头结尾变为圆弧状态
            barWidth: 60,
            showBackground: true,
            backgroundStyle: {
              color: "rgba(66, 66, 66, .3)",
            },
            data: [60.0],
            coordinateSystem: "polar",
            itemStyle: {
              normal: {
                color: num ? "#01f2ab" : "red",
              },
            },
            // itemStyle: {
            //     normal: {
            //         color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
            //             offset: 0,
            //             color: '#fdf914'
            //         }, {
            //             offset: 1,
            //             color: '#38a700'
            //         }]),
            //     }
            // }
          },
        ],
      };
      // function numb(){
      //     num = num+5
      myChart.setOption(option, true);
      // }
      // setInterval(function() {
      //     numb()
      // }, 100);
    },
    getTwo() {
      let myChart = this.$echarts.init(document.getElementById("two"));
      let option = {
        backgroundColor: "#13304d",
        title: {
          text: "某某使用率",
          textStyle: {
            color: "#fff", // 设置标题颜色为红色
          },
        },
        tooltip: {
          trigger: "axis",
          // formatter: function (params) {
          //     let result = '';
          //     console.log(params)
          //     return params[0].name+':'+params[0].value;
          // }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLine: {
            lineStyle: {
              color: "#fff", // 设置轴线颜色为红色
            },
          },
          axisLabel: {
            textStyle: {
              color: "#fff", // 设置标签颜色为绿色
            },
          },
        },
        yAxis: {
          type: "value",
          max: 100,
          min: 0,
          interval: 20,
          axisLine: {
            lineStyle: {
              color: "#fff", // 设置轴线颜色为红色
            },
          },
          axisLabel: {
            formatter: "{value} %",
            textStyle: {
              color: "#fff", // 设置标签颜色为绿色
            },
          },
        },
        series: [
          {
            name: "使用占比",
            type: "line",
            data: [11, 11, 15, 13, 12, 13, 10],
            symbol: "none",
            itemStyle: {
              normal: {
                color: "#10a797",
              },
            },
          },
          {
            name: "使用占比2",
            type: "line",
            data: [19, 11, 15, 13, 12, 3, 10],
            symbol: "none",
            itemStyle: {
              normal: {
                color: "#10a797",
              },
            },
          },
        ],
      };
      myChart.setOption(option, true);
    },
  },
};
</script>

<style scoped lang="scss">
.warp {
  width: 100%;
  height: 100%;
  display: flex;
  #one {
    width: 300px;
    height: 300px;
    background-color: #000;
  }
  #two {
    width: 800px;
    height: 300px;
  }
}
</style>