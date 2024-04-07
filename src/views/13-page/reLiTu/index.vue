<template>
  <div class="warp">
    <div id="map"></div>
  </div>
</template>
   
  <script>
export default {
  components: {},
  data() {
    return {
      mapDt:null,
    };
  },
  mounted() {
    // 软件配置信息地址，软件安装完成之后使用本地地址，如：http://localhost:9000
    BM.Config.HTTP_URL = "http://www.bigemap.com:9000";

    // 在ID为map的元素中实例化一个地图，并设置地图的ID号为 bigemap.zhongkexingtu，ID号程序自动生成，无需手动配置，中心点，默认的级别和显示级别控件
    this.mapDt = BM.map("map", "bigemap.zhongkexingtu", {
      center: [0, 0],
      zoom: 2,
      zoomControl: true,
      attributionControl: false,
    });
    // var points=addressPoints.map(function (p) { return [p[0], p[1]]; });
    var points = [];
    for (var i = 0; i < 1000; i++) {
      //随机生成1000个点
      points.push(getRandomLatLng());
    }

    var heat = BM.heatLayer(points, {
      radius: 20,
      minOpacity: 0.5,
      gradient: { 0.4: "blue", 0.65: "lime", 1: "red" },
    }).addTo(this.mapDt);
    function getRandomLatLng() {
      var min = { lat: 20.0, lng: 103.194 },
        max = { lat: 30.66, lng: 104.399 },
        lngSpan = max.lng - min.lng,
        latSpan = max.lat - min.lat;
      //纬度，经度，比重
      return [
        min.lat + latSpan * Math.random(),
        min.lng + lngSpan * Math.random(),
        Math.floor(Math.random() * 20),
      ];
    }
    // console.log(points, "点");
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.warp {
  width: 100%;
  height: 100%;
  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
   