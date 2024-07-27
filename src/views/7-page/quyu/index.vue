<template>
  <div class="guijiWarp">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // weizhiIcon: require("@/assets/marker-icon-2x.png"),
      mapDt: null, //地图
    };
  },
  mounted() {
    this.craetMap(); //初始化地图
    this.craetDbx(); //画多边形
  },
  methods: {
    // 初始化地图
    craetMap() {
      BM.Config.HTTP_URL = "http://www.bigemap.com:9000";
      // 在ID为map的元素中实例化一个地图，不要设置地图ID，ID号程序自动生成，无需手动配置，设置中心点，默认的级别和显示级别控件
      this.mapDt = BM.map("map", "bigemap.amap-map", {
        center: [39.956074, 116.310316],
        zoom: 12,
        zoomControl: true, //级别控制
        // preferCanvas: false, //优先使用canvas绘制覆盖物
        // keyboard: true, //键盘操作
        // scrollWheelZoom: true, //鼠标滚轮放大
        // doubleClickZoom: false, //双击放大
        // dragging: false, //启动拖动
        attributionControl: false, //不添加对应的版本信息
      });
    },
    // 画多边形(区域地址)
    craetDbx() {
      const testJson = require("./beijing_haidian.json");
      const haidianJson = testJson.features[0].geometry.coordinates[0][0];
      let latlngs = [];
      // 位置调换
      haidianJson.forEach((element) => {
        latlngs.push([element[1], element[0]]);
      });
      console.log(latlngs, "999999");
      //创建多边形，并设置填充颜色为红色 ，具体详细API请参见：http://www.bigemap.com/offlinemaps/api/#polygon
      var polygon = BM.polygon(latlngs, { color: "red" }).addTo(this.mapDt);
      // 让地图适配当前的线段
      this.mapDt.fitBounds(polygon.getBounds());
      polygon.on("click", function (e) {
        alert("我被点击了!");
      });
    },
  },
};
</script>

<style scoped lang="scss">
.guijiWarp {
  width: 100%;
  height: 100%;
  position: relative;
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