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
      points: [], //随机生成的经纬度点位
      canvasLayer: null,
    };
  },
  mounted() {
    this.craetMap(); //初始化地图
    // this.craetDbx(); //画多边形
    // this.generatePoints();
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
        // keyboard: true, //键盘操作
        // scrollWheelZoom: true, //鼠标滚轮放大
        // doubleClickZoom: false, //双击放大
        // dragging: false, //启动拖动
        // layers: "layername",
        // format: "image/png",
        // transparent: true,
        // showCoverageOnHover: true, // 仅在鼠标悬停时显示细节，提高性能
        preferCanvas: true, //优先使用canvas绘制覆盖物
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
      // console.log(latlngs, "999999");
      //创建多边形，并设置填充颜色为红色 ，具体详细API请参见：http://www.bigemap.com/offlinemaps/api/#polygon
      var polygon = BM.polygon(latlngs, { color: "red" }).addTo(this.mapDt);
      // 让地图适配当前的线段
      this.mapDt.fitBounds(polygon.getBounds());
      polygon.on("click", function (e) {
        alert("我被点击了!");
      });
    },
    // 随机生成经纬度点
    generateRandomPointInRange(minLng, maxLng, minLat, maxLat) {
      const lng = Math.random() * (maxLng - minLng) + minLng;
      const lat = Math.random() * (maxLat - minLat) + minLat;
      return { lng, lat };
    },
    generatePoints() {
      const minLng = 73; // 中国最小的经度
      const maxLng = 135; // 中国最大的经度
      const minLat = 18; // 中国最小的纬度
      const maxLat = 54; // 中国最大的纬度

      for (let i = 0; i < 200; i++) {
        this.points.push(
          this.generateRandomPointInRange(minLng, maxLng, minLat, maxLat)
        );
      }
      // console.log(this.points, "points");
      this.$message.success(`生成${this.points.length}个点成功`);
      // this.drawPoint();//普通dmo点位渲染
      this.canvasPoint();
    },
    // 模拟标记点位
    drawPoint() {
      // const markers = [];
      this.points.forEach((item, i) => {
        let myIcon = BM.icon({
          iconUrl: require("../../../assets/zbicon.png"),
          iconSize: [26, 34],
        });
        let maker = BM.marker([Number(item.lat), Number(item.lng)], {
          icon: myIcon,
        });
        // let maker = BM.marker([Number(item.lat), Number(item.lng)]);
        maker.on("click", () => {
          this.$message.info(`我是第${i}个点，我被点击了。`);
        });
        maker.addTo(this.mapDt);
        // markers.push(maker);
      });
    },
    canvasPoint() {
      // 使用 Canvas 渲染
      this.canvasLayer = BM.layerGroup([], { renderer: BM.canvas() }).addTo(
        this.mapDt
      );
      this.points.forEach((item) => {
        // BM.circleMarker([Number(item.lat), Number(item.lng)], {
        BM.circleMarker(
          [30 + (Math.random() - 0.5) * 2, 120 + (Math.random() - 0.5) * 2],
          {
            radius: 3, // 标记点大小
            color: "red", // 颜色
            fillColor: "red",
            fillOpacity: 0.8,
            renderer: BM.canvas(), // 关键点：使用 Canvas 渲染
          }
        ).addTo(this.canvasLayer);
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