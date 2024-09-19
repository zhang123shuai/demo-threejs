<template>
  <div class="warp">
    <el-button @click="startGuijiFun">开始播放</el-button>
    <el-button @click="zanTingGuijiFun">暂停播放</el-button>
    <div id="cesiumContainer" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewer: null,
      path: [
        [111.51410636094, 36.10013702162214, 0],
        [111.51435543060107, 36.1001271290815, 0],
        [111.51460364312089, 36.100125262904, 0],
        [111.51490347270231, 36.1000720242845, 0],
        [111.51531727865796, 36.100055969725545, 0],
        [111.51592899080998, 36.10002315266753, 0],
        [111.51624774901323, 36.09999874841982, 0],
        [111.51656718362959, 36.100005140162736, 0],
        [111.51684636302151, 36.09995851264969, 0],
        [111.51706075555333, 36.09995586024776, 0],
        [111.51723991188527, 36.099902452446194, 0],
        [111.51758726520708, 36.099799140758144, 0],
        [111.51815036751158, 36.09958807678223, 0],
        [111.518581663695, 36.09941140462744, 0],
        [111.51885197336928, 36.09931721770163, 0],
        [111.51927816021275, 36.09916931119326, 0],
        [111.5197500964415, 36.09896801084476, 0],
        [111.52021349828564, 36.09882758020317, 0],
        [111.52078560640292, 36.098625251983506, 0],
        [111.52124920962186, 36.09842661126232, 0],
        [111.52171931152586, 36.09826077409688, 0],
        [111.52214966650816, 36.098092142452714, 0],
        [111.52247956672582, 36.098002144461866, 0],
        [111.5228237783227, 36.097833928163844, 0],
        [111.5231072311855, 36.097766533143925, 0],
        [111.52350930036965, 36.097637947989234, 0],
        [111.52367924880824, 36.097583596559474, 0],
      ],
    };
  },
  mounted() {
    // new Cesium.Viewer("cesiumContainer");
    this.onload();
    // 添加人物轨迹
    this.addxian();
  },
  methods: {
    onload() {
      this.viewer = new Cesium.Viewer("cesiumContainer", {
        geocoder: true, //需开启地理编码,
        // terrainProvider: Cesium.createWorldTerrain(),
        timeline: false, // 关闭Cesium自带时间轴
        animation: false, // 关闭Cesium自带动画控件
        // shouldAnimate: true,
        imageryProvider: new Cesium.createTileMapServiceImageryProvider({
          url: Cesium.buildModuleUrl(
            "/static/Cesium/Assets/Textures/NaturalEarthII"
          ),
        }),
      });
    },
    addxian() {
      // var datasource = new Cesium.CustomDataSource('')
      this.viewer.entities.add({
        name: "line",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights(
            this.path.flat()
          ),
          width: 5,
          material: Cesium.Color.RED,
          // material: new Cesium.Color.fromCssColorString("#FF0000"),
          // clampToGround: true,
        },
      });

      var property = new Cesium.SampledPositionProperty();
      var startTime = new Date();
      var stopTime;
      var timestamp = startTime.getTime();

      this.path.forEach((pos, index) => {
        var time = new Date(timestamp + index * 5000);
        stopTime = time;
        var position = Cesium.Cartesian3.fromDegrees(pos[0], pos[1], pos[2]);
        property.addSample(Cesium.JulianDate.fromDate(time), position);
      });

      property.setInterpolationOptions({
        interpolationDegree: 0.0001,
        interpolationAlgorithm: Cesium.LagrangePolynomialApproximation,
      });
      // 加载gltf模型
      // let en = this.viewer.entities.add({
      //   position: Cesium.Cartesian3.fromDegrees(
      //     100.1953125,
      //     43.97989806962013,
      //     500000
      //   ),
      //   datas: {
      //     type: "jd",
      //     data: { base_lon: 100.1953125, base_lat: 43.97989806962013 },
      //   },
      //   model: {
      //     uri: "./three/weixing.gltf",
      //     scale: 200,
      //   },
      // });

      var entitydd = this.viewer.entities.add({
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: Cesium.JulianDate.fromDate(startTime),
            stop: Cesium.JulianDate.fromDate(new Date(stopTime)),
          }),
        ]),
        position: property, // 点集
        // 朝向
        orientation: new Cesium.VelocityOrientationProperty(property),
        label: {
          //文字标签
          text: "",
          scale: 0.5,
          style: Cesium.LabelStyle.FILL,
          fillColor: Cesium.Color.WHITE,
          pixelOffset: new Cesium.Cartesian2(-8, -35), //偏移量
          showBackground: true,
          backgroundColor: new Cesium.Color(38 / 255, 38 / 255, 38 / 255, 0.75),
        },
        // billboard: {
        //   image: CAR,
        //   scale: 0.5,
        //   pixelOffset: new Cesium.Cartesian2(0, -20),
        //   heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        //   clampToGround: true, //是否贴地
        // },
        model: {
          uri: "./three/weixing.gltf",
          scale: 1,
          minimumPixelSize: 10,
          maximumScale: 10,
        },
        // model: this.viewer.entities.add({
        //   model: {
        //     uri: "./08.fbx",
        //     scale: 1,
        //     minimumPixelSize: 128,
        //     maximumScale: 20000,
        //   },
        //   // position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883), // 模型初始位置
        //   position: property, // 模型初始位置
        // }),
        path: {
          leadTime: 0,
          resolution: 1,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.1,
            color: Cesium.Color.GREEN,
          }),
          width: 10,
        },
      });

      this.viewer.clock.onTick.addEventListener((tick) => {
        // console.log(entitydd.position,"entitydd")
        entitydd.position.getValue(tick.currentTime);
        // console.log(entitydd.position.getvalue(tick.currentTime));
        //转为经纬度
        var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(
          entitydd.position.getValue(tick.currentTime)
        );
        // console.log(cartographic);
        cartographic.longitude = Cesium.Math.toDegrees(cartographic.longitude);
        cartographic.latitude = Cesium.Math.toDegrees(cartographic.latitude);
        entitydd.label.text =
          Number(cartographic.longitude).toFixed(4) +
          "," +
          Number(cartographic.latitude).toFixed(4);
      });

      this.viewer.trackedEntity = entitydd;

      this.viewer.clock.startTime = Cesium.JulianDate.fromDate(startTime);
      this.viewer.clock.currentTime = Cesium.JulianDate.fromDate(startTime); //修改时间轴的当前时间
      this.viewer.clock.stopTime = Cesium.JulianDate.fromDate(
        new Date(stopTime)
      ); //将多个点的第一个点设为轨迹播放的开始时间
      this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
      this.viewer.clock.multiplier = 10; // 时间速率，数字越大时间过的越快
      // this.viewer.clock.shouldAnimate = true; //开始播放

      // this.viewer.zoomTo()
    },
    startGuijiFun() {
      this.viewer.clock.shouldAnimate = true; //开始播放
    },
    zanTingGuijiFun() {
      this.viewer.clock.shouldAnimate = false; //暂停播放
    },
    // addPersonTrack() {
    //   //加轨迹线
    //   let lineData = [106, 39, 132, 48, 120, 32];
    //   let entities = this.viewer.entities.add({
    //     polyline: {
    //       positions: Cesium.Cartesian3.fromDegreesArray(lineData),
    //       width: 5,
    //       material: new Cesium.Color.fromCssColorString("#FF0000"),
    //       clampToGround: true,
    //     },
    //   });

    //   //模型沿着轨迹移动（图标移动过的路径变色）
    //   let moveData = [
    //     {
    //       time: 1656047671018,
    //       x: 106,
    //       y: 39,
    //       z: 1000,
    //     },
    //     {
    //       time: 1656047771018,
    //       x: 132,
    //       y: 48,
    //       z: 1000,
    //     },
    //     {
    //       time: 1656047871018,
    //       x: 120,
    //       y: 32,
    //       z: 1000,
    //     },
    //   ];
    //   var date = new Date(moveData[0].time);
    //   var start = Cesium.JulianDate.fromDate(date); //获取第一个点的时间
    //   this.viewer.clock.startTime = start; //将多个点的第一个点设为轨迹播放的开始时间
    //   this.viewer.clock.currentTime = start; //修改时间轴的当前时间
    //   this.viewer.clock.shouldAnimate = true; //开始播放
    //   var property = new Cesium.SampledPositionProperty();
    //   for (var z = 0; z < moveData.length; z++) {
    //     var item = moveData[z];
    //     var thisTime = Cesium.JulianDate.fromDate(new Date(item.time));
    //     var position = Cesium.Cartesian3.fromDegrees(item.x, item.y, item.z);

    //     // 添加每一个链接点的信息，到达的时间以及坐标位置
    //     property.addSample(thisTime, position);
    //   }
    //   //设置贴地
    //   property.setInterpolationOptions({
    //     interpolationDegree: 2,
    //     interpolationAlgorithm: Cesium.LagrangePolynomialApproximation,
    //   });
    //   var times = property._property._times;
    //   var startTime = times[0].clone();
    //   var stopTime = times[times.length - 1].clone();
    //   var entitydd = this.viewer.entities.add({
    //     availability: new Cesium.TimeIntervalCollection([
    //       new Cesium.TimeInterval({
    //         start: startTime,
    //         stop: stopTime,
    //       }),
    //     ]),
    //     position: property, // 点集
    //     // model: {
    //     //   uri: require("./weixin.gltf"),
    //     //   scale: 1,
    //     //   minimumPixelSize: 90,
    //     // }, //model方式 和billboard二选一
    //     billboard: {
    //       image: CAR,
    //       scale: 0.5,
    //       pixelOffset: new Cesium.Cartesian3(20, -10),
    //       heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    //       clampToGround: false, //是否贴地
    //     }, //billboard方式 和model二选一
    //     path: {
    //       leadTime: 0,
    //       resolution: 1,
    //       material: new Cesium.PolylineGlowMaterialProperty({
    //         glowPower: 0.1,
    //         color: Cesium.Color.GREEN,
    //       }),
    //       width: 10,
    //     },
    //   });
    // },
    //调用方法
    carMoveFun() {
      var tempLineList = [];
      //最短那个
      var line2 = [
        [111.5203687977757, 36.097127118816125],
        [111.52047737873862, 36.09728325930151],
        [111.52052010896203, 36.09743563643246],
        [111.52058361872002, 36.09758688254787],
        [111.52069077711863, 36.09779312535372],
        [111.5207788133968, 36.09792260005298],
        [111.52088010227294, 36.09806827444043],
        [111.52104009048006, 36.0982866401076],
      ];
      this.addRoute(line2); //添加轨迹路线
      var tempLine2s = this.getRouteTimeData(line2, 30, line2[3]); //轨迹终端的起始点line2[3]
      tempLineList.push({
        timeLine: tempLine2s,
        speed: 30,
      });

      //拐弯那个
      var line1 = [
        [111.51412650892415, 36.100095052017245],
        [111.51483676831587, 36.10003220657785],
        [111.51548449399205, 36.09999317694337],
        [111.51612500512361, 36.09994492029591],
        [111.51667870787678, 36.09995489144349],
        [111.51717214970127, 36.099882556847476],
        [111.51759516113012, 36.09971712743759],
        [111.51824037887503, 36.099499697683804],
        [111.51856786970123, 36.099362781274316],
        [111.51865735859423, 36.09923607421321],
        [111.51850574587014, 36.0989972875293],
        [111.51817889032279, 36.09841697029737],
        [111.51806446114564, 36.09815881884296],
        [111.51786244633958, 36.09777823518002],
      ];
      this.addRoute(line1); //添加轨迹路线
      var tempLine1s = this.getRouteTimeData(line1, 50, line1[4]); //轨迹终端的起始点line1[4]
      tempLineList.push({
        timeLine: tempLine1s,
        speed: 50,
      });

      //最长那个
      var line3 = [
        [111.51410636094, 36.10013702162214],
        [111.51435543060107, 36.1001271290815],
        [111.51460364312089, 36.100125262904],
        [111.51490347270231, 36.1000720242845],
        [111.51531727865796, 36.100055969725545],
        [111.51592899080998, 36.10002315266753],
        [111.51624774901323, 36.09999874841982],
        [111.51656718362959, 36.100005140162736],
        [111.51684636302151, 36.09995851264969],
        [111.51706075555333, 36.09995586024776],
        [111.51723991188527, 36.099902452446194],
        [111.51758726520708, 36.099799140758144],
        [111.51815036751158, 36.09958807678223],
        [111.518581663695, 36.09941140462744],
        [111.51885197336928, 36.09931721770163],
        [111.51927816021275, 36.09916931119326],
        [111.5197500964415, 36.09896801084476],
        [111.52021349828564, 36.09882758020317],
        [111.52078560640292, 36.098625251983506],
        [111.52124920962186, 36.09842661126232],
        [111.52171931152586, 36.09826077409688],
        [111.52214966650816, 36.098092142452714],
        [111.52247956672582, 36.098002144461866],
        [111.5228237783227, 36.097833928163844],
        [111.5231072311855, 36.097766533143925],
        [111.52350930036965, 36.097637947989234],
        [111.52367924880824, 36.097583596559474],
      ];
      this.addRoute(line3); //添加轨迹路线
      var tempLine3s = this.getRouteTimeData(line3, 60, line3[5]); //轨迹终端的起始点line3[5]
      tempLineList.push({
        timeLine: tempLine3s,
        speed: 60,
      });

      var tempLine4s = this.getRouteTimeData(line3, 80, line3[8]); //轨迹终端的起始点line3[8]
      tempLineList.push({
        timeLine: tempLine4s,
        speed: 80,
      });

      //获取到最大时间
      var maxTimeLine =
        tempLineList[0].timeLine[1].length > 0
          ? tempLineList[0].timeLine[1]
          : tempLineList[0].timeLine[0];
      tempLineList.forEach((element) => {
        if (element.timeLine[1].length > 0) {
          if (
            Cesium.JulianDate.secondsDifference(
              maxTimeLine[maxTimeLine.length - 1].time,
              element.timeLine[1][element.timeLine[1].length - 1].time
            ) < 0
          ) {
            maxTimeLine = element.timeLine[1];
          }
        } else {
          if (
            Cesium.JulianDate.secondsDifference(
              maxTimeLine[maxTimeLine.length - 1].time,
              element.timeLine[0][element.timeLine[0].length - 1].time
            ) < 0
          ) {
            maxTimeLine = element.timeLine[0];
          }
        }
      });
      var start = Cesium.JulianDate.fromDate(new Date(2000, 1, 1, 1)); // 开始时间
      var stop = maxTimeLine[maxTimeLine.length - 1].time; //停止时间
      var extraLineList = [];
      //整理最大TimeLine 循环添加多个短实体
      tempLineList
        .filter((item) => item.timeLine[1] != maxTimeLine)
        .forEach((tempTmeLines) => {
          //小于maxTimeLine的timeLine集合循环
          var line01 = tempTmeLines.timeLine[0];
          var line02 = tempTmeLines.timeLine[1];
          //临时运行结束时间（用于和最大时间判断）
          var tempTime =
            line02.length > 0
              ? line02[line02.length - 1].time
              : line01[line01.length - 1].time;
          var tempList = [];
          while (Cesium.JulianDate.secondsDifference(tempTime, stop) < 0) {
            var extraLine = this.getExtraRouteTimeData(
              line01,
              tempTmeLines.speed,
              tempTime
            );
            if (extraLine.length > 0) {
              tempList.push(extraLine);
            }
            var tempEnd =
              extraLine.length > 0
                ? extraLine[extraLine.length - 1].time
                : tempTime;
            if (Cesium.JulianDate.secondsDifference(tempEnd, stop) < 0) {
              var extraLine1 = this.getExtraRouteTimeData(
                line02,
                tempTmeLines.speed,
                tempEnd
              );
              if (extraLine1.length > 0) {
                tempList.push(extraLine1);
              }
              tempTime =
                extraLine1.length > 0
                  ? extraLine1[extraLine1.length - 1].time
                  : tempEnd;
            } else {
              break;
            }
          }
          extraLineList.push({
            timeLine: tempList,
            speed: tempTmeLines.speed,
          });
        });

      this.viewer.clock.startTime = start.clone(); // 设置始时钟始时间
      this.viewer.clock.currentTime = start.clone(); // 设置时钟当前时间
      this.viewer.clock.multiplier = 10; // 时间速率，数字越大时间过的越快
      this.viewer.clock.stopTime = stop.clone();
      this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // 循环执行

      tempLineList.concat(extraLineList).forEach((element) => {
        element.timeLine.forEach((item) => {
          if (item.length > 0) {
            this.terminalRun(item);
          }
        });
      });
    },

    getExtraRouteTimeData(tempLine, speed, startTime) {
      var finalData = [];
      //整理数据根据速度求出时间
      for (var i = 0; i < tempLine.length; i++) {
        if (i == 0) {
          var temp = {
            lon: tempLine[i].lon,
            lat: tempLine[i].lat,
            height: 0,
            time: startTime,
          };
          finalData.push(temp);
        } else {
          var distanceValue = this.getDistance(
            [tempLine[i - 1].lon, tempLine[i - 1].lat],
            [tempLine[i].lon, tempLine[i].lat]
          ); //应该是米
          var interval = (distanceValue / (speed / 3.6)) * 10; //缓冲速度
          const stop = Cesium.JulianDate.addSeconds(
            finalData[i - 1].time,
            interval,
            new Cesium.JulianDate()
          );
          var temp = {
            lon: tempLine[i].lon,
            lat: tempLine[i].lat,
            height: 0,
            time: stop,
          };
          finalData.push(temp);
        }
      }
      return finalData;
    },

    terminalRun(finalData) {
      var myOwnStopTime = finalData[finalData.length - 1].time; //获取最后一个点的时间 // 停止时间

      //位置信息
      var property = new Cesium.SampledPositionProperty();
      // 取样位置 相当于一个集合
      for (var z = 0; z < finalData.length; z++) {
        var item = finalData[z];
        var thisTime = item.time; //Cesium.JulianDate.fromDate(new Date(item.time));
        var position = Cesium.Cartesian3.fromDegrees(
          finalData[z].lon,
          finalData[z].lat,
          finalData[z].height
        );
        // 添加每一个链接点的信息，到达的时间以及坐标位置
        property.addSample(thisTime, position);
      }
      const pinBuilder = new Cesium.PinBuilder();
      var tempId = "terminalEntity_" + this.guid();
      var terminalEntity = {
        id: tempId,
        // // // 和时间轴关联
        // // availability: new Cesium.TimeIntervalCollection([
        // //     new Cesium.TimeInterval({
        // //         start: start,
        // //         stop: stop,//短于时间轴会突然消失，直到时间轴循环
        // //     }),
        // // ]),
        position: property,
        // 根据所提供的速度计算模型的朝向
        orientation: new Cesium.VelocityOrientationProperty(property),
        label: {
          //文字标签
          text: "文字标签" + "\n" + "test",
          font: "500 30px Helvetica", // 15pt monospace
          scale: 0.5,
          style: Cesium.LabelStyle.FILL,
          fillColor: Cesium.Color.WHITE,
          pixelOffset: new Cesium.Cartesian2(-8, -35), //偏移量
          showBackground: true,
          backgroundColor: new Cesium.Color(38 / 255, 38 / 255, 38 / 255, 0.75),
        },
        // 模型数据
        model: {
          // uri: "./data/car/scene.gltf",
          uri: "../three/car.png",
          scale: 2,
        },
      };

      this.viewer.entities.add(terminalEntity);
      let terminalMcLineRunEntityIds = [];
      terminalMcLineRunEntityIds.push(tempId);
    },

    //获取随机数
    guid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },

    // 添加轨迹
    addRoute(list) {
      var cartesian3List = [];
      list.forEach((item) => {
        var ellipsoid = this.viewer.scene.globe.ellipsoid;
        var cartographic = Cesium.Cartographic.fromDegrees(item[0], item[1], 0);
        var cartesian3 = ellipsoid.cartographicToCartesian(cartographic);
        cartesian3List.push(cartesian3);
      });
      var tempId = "line_" + this.guid();
      var lineEntity = {
        id: tempId,
        polyline: {
          //位置
          positions: cartesian3List, //Cesium.Cartesian3.fromDegrees(item[0], item[1], 0),
          //线宽
          width: 2,
          //路线颜色
          material: Cesium.Color.BLUE,
          //是否贴地
          clampToGround: true,
        },
      };
      this.viewer.entities.add(lineEntity);
      let terminalMcLineRunEntityIds = [];
      terminalMcLineRunEntityIds.push(tempId);
    },

    //整理数据根据速度求出时间(这个估计是后台实现)
    getRouteTimeData(tempLine, speed, startPosition) {
      //根据终端起始点，将tempLine分成两段
      var middleIndex = this.getRouteTerminalStartPoint(
        tempLine,
        startPosition
      );
      var firstLine = []; //第一段轨迹
      var secondLine = []; //第二段轨迹
      //--->起始点就在轨迹折点上
      var ifExit = tempLine.filter((item) => item == startPosition);
      if (ifExit.length > 0) {
        if (middleIndex == 0) {
          //是第一个点
          secondLine = tempLine;
        } else if (middleIndex + 1 == tempLine.length) {
          //是最后一个点
          firstLine = tempLine;
        } else {
          firstLine = tempLine.slice(0, middleIndex + 1);
          secondLine = tempLine.slice(middleIndex, tempLine.length);
        }
      }
      //--->起始点不在折点上，需要算距离形成两个轨迹
      else {
        //起始点与轨迹第一个点点最近
        if (middleIndex == 0) {
          firstLine = [tempLine[0], startPosition];
          secondLine = tempLine;
          secondLine[0] = startPosition;
        }
        //起始点与轨迹最末尾点最近
        else if (middleIndex + 1 == tempLine.length) {
          firstLine = tempLine.slice(0, middleIndex + 1);
          firstLine.push(startPosition);
          secondLine = tempLine.slice(middleIndex, tempLine.length);
          secondLine.unshift(startPosition);
        }
        //起始点与轨迹中间某折点距离最近
        else {
          firstLine = tempLine.slice(0, middleIndex + 1);
          secondLine = tempLine.slice(middleIndex, tempLine.length);

          //最近点与前折点线段
          var tempLine1 = [
            firstLine[firstLine.length - 2],
            firstLine[firstLine.length - 1],
          ];
          //最近点与后折点线段
          var tempLine2 = [secondLine[0], secondLine[1]];

          //起始点与【最近点与前折点线段】垂直距离
          var line1Distance = this.getDistanceByLineAndPoint(
            tempLine1,
            startPosition
          );
          //起始点与【最近点与后折点线段】垂直距离
          var line2Distance = this.getDistanceByLineAndPoint(
            tempLine2,
            startPosition
          );

          //都为0 则此点正好是轨迹点的折点
          if (line1Distance == line2Distance) {
            //应用原截取的就可以
          }
          //起始点在后半段【最近点与后折点线段】
          if (line1Distance > line2Distance) {
            firstLine.push(startPosition);
            secondLine[0] = startPosition;
          }
          //起始点在前半段【最近点与前折点线段】
          if (line1Distance < line2Distance) {
            firstLine[firstLine.length - 1] = startPosition;
            secondLine.unshift(startPosition);
          }
        }
      }

      //先运行后半段，再运行前半段
      var timeLine01 = [];
      //整理数据根据速度求出时间
      for (var i = 0; i < secondLine.length; i++) {
        if (i == 0) {
          var temp = {
            lon: secondLine[i][0],
            lat: secondLine[i][1],
            height: 0,
            time: Cesium.JulianDate.fromDate(new Date(2000, 1, 1, 1)),
          };
          timeLine01.push(temp);
        } else {
          var distanceValue = this.getDistance(
            secondLine[i - 1],
            secondLine[i]
          ); //应该是米
          var interval = (distanceValue / (speed / 3.6)) * 10; //缓冲速度
          const stop = Cesium.JulianDate.addSeconds(
            timeLine01[i - 1].time,
            interval,
            new Cesium.JulianDate()
          );
          var temp = {
            lon: secondLine[i][0],
            lat: secondLine[i][1],
            height: 0,
            time: stop,
          };
          timeLine01.push(temp);
        }
      }

      var timeLine02 = [];
      //整理数据根据速度求出时间
      for (var i = 0; i < firstLine.length; i++) {
        if (i == 0) {
          var temp = {
            lon: firstLine[i][0],
            lat: firstLine[i][1],
            height: 0,
            time:
              timeLine01.length > 0
                ? timeLine01[timeLine01.length - 1].time
                : Cesium.JulianDate.fromDate(new Date(2000, 1, 1, 1)),
          };
          timeLine02.push(temp);
        } else {
          var distanceValue = this.getDistance(firstLine[i - 1], firstLine[i]); //应该是米
          var interval = (distanceValue / (speed / 3.6)) * 10; //缓冲速度
          const stop = Cesium.JulianDate.addSeconds(
            timeLine02[i - 1].time,
            interval,
            new Cesium.JulianDate()
          );
          var temp = {
            lon: firstLine[i][0],
            lat: firstLine[i][1],
            height: 0,
            time: stop,
          };
          timeLine02.push(temp);
        }
      }
      return [timeLine01, timeLine02];
    },

    //获取轨迹终端在轨迹上最近的点位置(返回Index)
    getRouteTerminalStartPoint(coors, terminalPosition) {
      var num = 10;
      var index = -1;
      while (true) {
        for (var j = 0; j < coors.length; j++) {
          let temp = this.getDistance(terminalPosition, coors[j]);
          if (temp < num) {
            index = j;
            break;
          }
        }
        if (index == -1) {
          num = num + num;
        } else {
          return index;
        }
      }
    },

    //获取两点之间距离（经纬度）
    getDistance(first, last) {
      var start = Cesium.Cartographic.fromDegrees(first[0], first[1]);
      var end = Cesium.Cartographic.fromDegrees(last[0], last[1]);
      var geodesic = new Cesium.EllipsoidGeodesic();
      geodesic.setEndPoints(start, end);
      var distance = geodesic.surfaceDistance;
      return distance;
    },

    //获取点到线（两点成线）的垂直距离
    getDistanceByLineAndPoint(lineList, point) {
      var linePoint01 = Cesium.Cartesian3.fromDegrees(
        lineList[0][0],
        lineList[0][1],
        0
      );
      let x1 = linePoint01.x;
      let y1 = linePoint01.y;
      var linePoint02 = Cesium.Cartesian3.fromDegrees(
        lineList[1][0],
        lineList[1][1],
        0
      );
      let x2 = linePoint02.x;
      let y2 = linePoint02.y;
      var pointTemp = Cesium.Cartesian3.fromDegrees(point[0], point[1], 0);
      let x = pointTemp.x;
      let y = pointTemp.y;
      // let [[x1, y1], [x2, y2]] = list;
      // let [x, y] = point;

      let b = Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
      let c = Math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2));
      let a = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

      if (a === 0) return b; //	如果选取两点为同一个点，则返回已知点和比较点的距离即可

      //  原理：通过半周长和各边长度来计算三角形面积，即海伦公式
      let p = (a + b + c) / 2; //  半周长，halfPerimeter
      //  根据海伦公式求三角形面积
      let areaSize = Math.abs(Math.sqrt(p * (p - a) * (p - b) * (p - c)));
      //  根据三角形面积公式求证点到直线距离
      return (2 * areaSize) / a;
    },
  },
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">
.warp {
  width: 100%;
  height: 100%;
  background-color: aqua;
  #cesiumContainer {
    width: 100%;
    height: 100%;
  }
  .cesium-viewer-navigationContainer {
    display: none;
  }
}
</style>

