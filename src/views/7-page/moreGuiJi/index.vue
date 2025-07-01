<template>
  <div class="guijiWarp">
    <div class="buttonWarp">
      <el-row>
        <el-button type="primary" @click="kaishi">开始</el-button>
        <el-button type="primary" @click="zanting">暂停</el-button>
        <el-button type="primary" @click="jixu">继续</el-button>
        <el-button type="primary" @click="jiasu">加速</el-button>
        <el-button type="primary" @click="jiansu">减速</el-button>
      </el-row>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapDt: null, //地图
      modelIcon: null, //轨迹模型
      polyline: null, //轨迹线
      passedLine: null, //走过的轨迹线
      guiJiPoint: [], //插入轨迹点的标记信息
      //轨迹点
      pointList: [
        [30.11, 104.3],
        [30.1, 104.3],
        [30.1, 104.2],
        [30, 104],
      ],
    };
  },
  mounted() {
    this.craetMap(); //初始化地图
    this.guijiFun(); //轨迹线
  },
  methods: {
    // 初始化地图
    craetMap() {
      BM.Config.HTTP_URL = "http://www.bigemap.com:9000";
      // 在ID为map的元素中实例化一个地图，不要设置地图ID，ID号程序自动生成，无需手动配置，设置中心点，默认的级别和显示级别控件
      this.mapDt = BM.map("map", "bigemap.amap-map", {
        center: [30, 104],
        zoom: 5,
        zoomControl: true, //级别控制
        // preferCanvas: false, //优先使用canvas绘制覆盖物
        // keyboard: true, //键盘操作
        // scrollWheelZoom: true, //鼠标滚轮放大
        // doubleClickZoom: false, //双击放大
        // dragging: false, //启动拖动
        attributionControl: false, //不添加对应的版本信息
      });
    },
    // 轨迹展示
    guijiFun() {
      // 轨迹点连成线
      this.polyline = BM.polyline(this.pointList).addTo(this.mapDt);
      this.mapDt.fitBounds(this.polyline.getBounds());
      // 物模型
      this.modelIcon = BM.marker(this.pointList[0], {
        icon: BM.icon({
          iconUrl: "http://www.bigemap.com/Public/offline/car.png",
          iconAnchor: [25, 15],
        }),
      }).addTo(this.mapDt);
      //添加一条线段也记录已经路过的点
      this.passedLine = BM.polyline([[]], {
        color: "red",
      }).addTo(this.mapDt);
      this.modelIcon.on("update_position", (e) => {
        //每次坐标更新。然后也更新路径
        this.passedLine.setLatLngs(e.path);
        if (!this.modelIcon.getPopup()) {
          // 一开始的样子
          this.modelIcon.bindPopup(`<div>名字<div>`, {
            className: "popTable",
            closeButton: false,
            offset: [-5, -5],
          });
          this.modelIcon.openPopup();
        } else {
          // 更新后的样子
          this.modelIcon.setPopupContent(`<div>名字<div>`);
          this.modelIcon.openPopup();
        }
      });
    },
    // 开始
    kaishi() {
      //默认是循环回放 replay:true
      this.modelIcon.moveAlong(this.polyline, 5000, {
        replay: false,
      });
    },
    // 暂停
    zanting() {
      this.modelIcon.pauseMove();
    },
    // 继续
    jixu() {
      try {
        this.modelIcon.resumeMove();
      } catch (error) {
        this.$message.warning("先点击开始才能点击继续哦");
      }
    },
    // 加速
    jiasu() {
      this.modelIcon.setSpeed(this.modelIcon.getSpeed() + 300);
    },
    // 减速
    jiansu() {
      this.modelIcon.setSpeed(this.modelIcon.getSpeed() - 100);
    },
  },
};
</script>

<style scoped lang="scss">
.guijiWarp {
  width: 100%;
  height: 100%;
  position: relative;
  .buttonWarp {
    z-index: 9;
    position: absolute;
    top: 0;
    left: 50px;
  }
  #map {
    width: 100%;
    height: 100%;
    position: absolute;
    /deep/ .bigemap-draw-draw-polyline,
    /deep/ .bigemap-draw-draw-polygon,
    /deep/ .bigemap-draw-draw-rectangle,
    /deep/ .bigemap-draw-draw-marker,
    /deep/ .bigemap-draw-draw-circlemarker {
      display: none;
    }
  }
}
</style>