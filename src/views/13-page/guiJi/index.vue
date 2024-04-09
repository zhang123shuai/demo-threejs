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
      // weizhiIcon: require("@/assets/marker-icon-2x.png"),
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
      bzListDt: [], //插入标注点地图信息
      //圆List集合
      circleList: [
        {
          radius: 1800,
          color: "#3388ff",
          center: [30.15, 104],
          name: "添加的圆1",
        },
        {
          radius: 2000,
          color: "#3388ff",
          center: [30.05, 104],
          name: "添加的圆2",
        },
      ],
      circleDrawList: [], //绘制圆List集合
    };
  },
  mounted() {
    this.craetMap(); //初始化地图
    this.guijiFun(); //轨迹线
    this.crBz(); //插入坐标
    this.drawCir(); //进入页面添加已有圆
    this.drawCircle(); //画圆
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
      biaoZhuList.push(
        BM.marker(
          zuiBiao
          // , {
          //   icon: BM.icon({
          //     iconUrl: "http://www.bigemap.com/Public/offline/car.png",
          //     iconAnchor: [25, 15],
          //   }),
          // }
        ).addTo(this.mapDt)
      );
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
    //进入页面添加已有圆
    drawCir() {
      this.circleList.forEach((element, i) => {
        this.creatCircleFun(
          element.center,
          element.radius,
          element.color,
          element.name,
          i,
          false
        );
      });
    },
    // 添加圆
    creatCircleFun(center, radius, color, name, idx, isBool) {
      //添加圆
      let circleOne = BM.circle(center, {
        radius: radius,
        color: color,
      }).addTo(this.mapDt);
      //文字描述
      circleOne.bindTooltip(name, {
        direction: "top",
        permanent: true,
      });
      //添加鼠标左键事件
      circleOne.on("click", (e) => {
        // circleOne.options.color = "blue";
        if (e.target.options.color == "red") {
          return;
        }
        console.log(circleOne, "点击的圆", idx + 1);
        console.log(e, "被点击了");
        // 查找其他红色圆清除并重新插入
        this.circleList.forEach((element, i) => {
          if (element.color == "red") {
            element.color = "#3388ff";
            this.circleDrawList[i].remove();
            this.circleDrawList.splice(i, 1);
            this.creatCircleFun(
              this.circleList[i].center,
              this.circleList[i].radius,
              this.circleList[i].color,
              this.circleList[i].name,
              i,
              true
            );
          }
        });
        // 被点击之后删除重新创建，更改选中颜色
        this.circleDrawList[idx].remove();
        this.circleDrawList.splice(idx, 1);
        this.circleList[idx].color = "red";
        this.creatCircleFun(
          this.circleList[idx].center,
          this.circleList[idx].radius,
          this.circleList[idx].color,
          this.circleList[idx].name,
          idx,
          true
        );
        // 将地图移动到圆的中心点位置
        this.mapDt.flyTo(
          BM.latLng(
            this.circleList[idx].center[0],
            this.circleList[idx].center[1]
          ),
          13,
          { animate: true, duration: 0.5 }
        );
      });
      //添加鼠标右键事件
      circleOne.on("contextmenu", (e) => {
        // 二次确认删除
        this.$confirm("此操作将永久删除该位置, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            console.log(circleOne, "右击的圆", idx + 1);
            console.log(e, "被右击了");
            // 删除并移除
            this.circleDrawList[idx].remove();
            this.circleDrawList.splice(idx, 1, {});
            this.circleList.splice(idx, 1, {});
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      });
      if (isBool) {
        this.circleDrawList.splice(idx, 0, circleOne);
      } else {
        this.circleDrawList.push(circleOne);
      }
    },
    //画圆
    drawCircle() {
      // 画圆
      //创建一个图形覆盖物的集合来保存点线面
      //   var drawnItems = new BM.FeatureGroup();
      //添加在地图上
      //   this.mapDt.addLayer(drawnItems);
      // 为多边形设置一个标题
      //   BM.drawLocal.draw.toolbar.buttons.polygon = "添加一个多边形";
      //实例化鼠标绘制的控件
      var drawControl = new BM.Control.Draw({
        position: "topright", //位置
        //控制绘制的图形
        draw: {
          polyline: {
            //单独设置线的颜色为红色，其它为默认颜色
            shapeOptions: {
              color: "red",
            },
          },
          polygon: true,
          circle: true,
          marker: true,
        },
        // edit: { featureGroup: drawnItems },
      });

      this.mapDt.addControl(drawControl);
      //监听绘画完成事件
      this.mapDt.on(BM.Draw.Event.CREATED, (e) => {
        // var type = e.layerType,
        //   layer = e.layer;
        // if (type === "marker") {
        //   //如果是标注，实现一个点击出现的提示
        //   layer.bindPopup("A popup!");
        // }
        // drawnItems.addLayer(e.layer);
        console.log(e.layer.options.radius, "半径:米");
        console.log(e.layer._latlng.lat, e.layer._latlng.lng, "中心点坐标");
        this.circleList.push({
          radius: e.layer.options.radius.toFixed(2),
          color: "#3388ff",
          center: [e.layer._latlng.lat, e.layer._latlng.lng],
          name: "创建的圆",
        });
        this.creatCircleFun(
          [e.layer._latlng.lat, e.layer._latlng.lng],
          e.layer.options.radius.toFixed(2),
          "#3388ff",
          "创建的圆",
          this.circleList.length - 1,
          false
        );
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