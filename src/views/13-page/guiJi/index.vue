<template>
  <div class="guijiWarp">
    <div class="buttonWarp">
      <el-row>
        <el-button type="warning" @click="guiJiIsshowFun">轨迹显隐</el-button>
        <el-button type="primary" @click="kaishi" v-if="isGuijiShow"
          >开始</el-button
        >
        <el-button type="primary" @click="zanting" v-if="isGuijiShow"
          >暂停</el-button
        >
        <el-button type="primary" @click="jixu" v-if="isGuijiShow"
          >继续</el-button
        >
        <el-button type="primary" @click="jiasu" v-if="isGuijiShow"
          >加速</el-button
        >
        <el-button type="primary" @click="jiansu" v-if="isGuijiShow"
          >减速</el-button
        >
      </el-row>
      <el-row style="margin-top: 10px">
        <el-button type="primary" @click="isShowbzFun">显隐标注坐标</el-button>
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
        // [30, 104],
        // [30.1, 104.2],
        // [30.1, 104.3],
        // [30.2, 104.3],

        [30.11, 104.3],
        [30.1, 104.3],
        [30.1, 104.2],
        [30, 104],
      ],
      //   每个轨迹点的信息
      sceneList: [
        {
          name: "永安湖城市森林公园",
          address: "成都市双流区G108(生物城中路二段)",
        },
        {
          name: "天府芙蓉园",
          address: "成都市武侯区簇马路一段69号",
        },
        {
          name: "兴隆湖湿地公园",
          address: "四川省成都市天府新区兴隆街道湖畔路北段",
        },
        {
          name: "白鹭湾湿地公园",
          address: "四川省成都市锦江区锦江环城生态区",
        },
      ],
      isGuijiShow: true, //判断轨迹显示隐藏
      isShowbz: true, //判断标注点显示隐藏
      //标注点集合
      bzList: [
        {
          zb: [30.15, 104.3],
          xx: "第一个坐标",
        },
        {
          zb: [30.1, 104],
          xx: "第②个坐标",
        },
      ],
      //插入标注点地图信息
      bzListDt: [],
    };
  },
  mounted() {
    this.craetMap(); //初始化地图
    this.guijiFun(); //轨迹线
    this.crBz(); //插入坐标
  },
  methods: {
    // 初始化地图
    craetMap() {
      BM.Config.HTTP_URL = "http://www.bigemap.com:9000";
      // 在ID为map的元素中实例化一个地图，不要设置地图ID，ID号程序自动生成，无需手动配置，设置中心点，默认的级别和显示级别控件
      this.mapDt = BM.map("map", "bigemap.arcgis-map", {
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
      var scene = this.sceneList,
        index;
      //添加一条线段也记录已经路过的点
      this.passedLine = BM.polyline([[]], {
        color: "red",
      }).addTo(this.mapDt);
      this.modelIcon.on("update_position", (e) => {
        //每次坐标更新。然后也更新路径
        this.passedLine.setLatLngs(e.path);
        //this.mapDt.setView(this.modelIcon.getLatLng());
        // console.log(e, "eeeeeeeee");
        if (e.index != index) {
          //   console.log(e.index);
          index = Number(e.index);
          if (!this.modelIcon.getPopup()) {
            // 一开始的样子
            this.modelIcon.bindPopup(`<div>${scene[index].name}<div>`, {
              className: "popTable",
              closeButton: false,
              offset: [-5, -5],
            });
            this.modelIcon.openPopup();
            // this.bjPointFun(this.pointList[index], scene[index].address);
          } else {
            // 更新后的样子
            this.modelIcon.setPopupContent(`<div>${scene[index].name}<div>`);
            this.modelIcon.openPopup();
            // cn.bindPopup(`<div>${scene[index].address}<div>`, {
            //   className: "popTable",
            //   closeButton: false,
            // });
          }
          this.bjPointFun(
            this.guiJiPoint,
            this.pointList[index],
            scene[index].address,
            true
          );
        }
      });
    },
    // 标记点位  要存储轨迹点的list集合，轨迹点坐标，展示的信息,是否鼠标划入展示
    bjPointFun(biaoZhuList, zuiBiao, info, isHover) {
      biaoZhuList.push(BM.marker(zuiBiao).addTo(this.mapDt));
      //   let cn = BM.marker(zuiBiao).addTo(this.mapDt);
      let guiJiPointlength = biaoZhuList.length - 1;
      biaoZhuList[guiJiPointlength]
        .bindTooltip(`<div>${info}<div>`, {
          direction: "top",
          permanent: isHover,
          className: "my_tooltip",
        })
        .openTooltip();
    },
    // 开始
    kaishi() {
      //默认是循环回放 replay:true
      this.modelIcon.moveAlong(this.polyline, 500, {
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
    // 轨迹显隐
    guiJiIsshowFun() {
      if (this.isGuijiShow) {
        this.zanting(); //先暂停
        this.polyline.remove(); //移除轨迹线
        this.modelIcon.remove(); //移除物模型
        this.passedLine.remove(); //移除走过的轨迹线
        if (this.guiJiPoint.length > 0) {
          this.guiJiPoint.forEach((element) => {
            element.remove();
          });
        }
        this.isGuijiShow = false;
      } else {
        this.guijiFun();
        this.isGuijiShow = true;
      }
    },
    // 标注点显隐
    isShowbzFun() {
      // var marker=BM.marker(map.getCenter(),{draggable:true}).addTo(map);
      // marker.bindTooltip("my tooltip text").openTooltip();
      if (this.isShowbz) {
        if (this.bzListDt.length > 0) {
          this.bzListDt.forEach((element) => {
            element.remove();
          });
        }
        this.isShowbz = false;
      } else {
        this.crBz();
        this.isShowbz = true;
      }
    },
    // 插入标注点
    crBz() {
      this.bzList.forEach((element) => {
        this.bjPointFun(this.bzListDt, element.zb, element.xx, false);
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
  }
}
</style>