<template>
  <div class="dituWarp">
    <div id="map" :style="{ transform: `rotate(${rotation}deg)` }"></div>
    <div class="btnWarp">
      <el-button type="primary" @click="startFun">开始</el-button>
      <el-button type="success" @click="pauseFun">暂停</el-button>
      <el-button type="info" @click="removeFun">清除</el-button>
      <el-button type="primary" @click="mapXuanzhuanFun">角度旋转</el-button>
      <el-button type="warning" v-if="!track" @click="getGuijiFun"
        >添加轨迹</el-button
      >
      <!-- <el-button type="danger">危险按钮</el-button> -->
      <div class="huakuai">
        <el-slider
          v-model="sliderProgress"
          :format-tooltip="formatTooltip"
          @input="changeProgress"
        />
      </div>
      <el-select
        v-model="selectSpeed"
        @change="qhSpeedFun"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import CAR from "./car.png";
import ngeohash from "ngeohash";
import * as turf from "./turf.min.js";
export default {
  data() {
    return {
      supMap: null,
      superMapUrl:
        "https://iclient.supermap.io/iserver/services/map-china400/rest/maps/China",
      // path: [
      //   {
      //     lat: 34.25615548523744,
      //     lng: 108.91164044842363,
      //   },
      //   {
      //     lat: 34.256155386830855,
      //     lng: 108.91179023713374,
      //   },
      //   {
      //     lat: 34.256155386830855,
      //     lng: 108.91179023713374,
      //   },
      //   {
      //     lat: 34.25607942383744,
      //     lng: 108.91177925878043,
      //   },
      //   {
      //     lat: 34.255720609670156,
      //     lng: 108.91171038494707,
      //   },
      //   {
      //     lat: 34.255607664345405,
      //     lng: 108.91169441655762,
      //   },
      //   {
      //     lat: 34.25553269366626,
      //     lng: 108.91169442258713,
      //   },
      //   {
      //     lat: 34.25544769867856,
      //     lng: 108.91173736885014,
      //   },
      //   {
      //     lat: 34.25544769867856,
      //     lng: 108.91173736885014,
      //   },
      //   {
      //     lat: 34.25541482067108,
      //     lng: 108.91157060617357,
      //   },
      //   {
      //     lat: 34.255437230925885,
      //     lng: 108.91091151687152,
      //   },
      //   {
      //     lat: 34.2554647726071,
      //     lng: 108.90999074936826,
      //   },
      //   {
      //     lat: 34.255474922592086,
      //     lng: 108.90972209999609,
      //   },
      //   {
      //     lat: 34.255470035735925,
      //     lng: 108.90952435653506,
      //   },
      //   {
      //     lat: 34.25546585239153,
      //     lng: 108.90796530095042,
      //   },
      //   {
      //     lat: 34.255466079902156,
      //     lng: 108.90748786950532,
      //   },
      //   {
      //     lat: 34.255466139078585,
      //     lng: 108.90736001962813,
      //   },
      //   {
      //     lat: 34.25546047844199,
      //     lng: 108.90659889522819,
      //   },
      //   {
      //     lat: 34.25545553696015,
      //     lng: 108.90646504623344,
      //   },
      //   {
      //     lat: 34.255455684520776,
      //     lng: 108.90610644487133,
      //   },
      //   {
      //     lat: 34.25543990484673,
      //     lng: 108.90555904106137,
      //   },
      //   {
      //     lat: 34.255434929044085,
      //     lng: 108.90550010453336,
      //   },
      //   {
      //     lat: 34.25671044153241,
      //     lng: 108.90546803620235,
      //   },
      //   {
      //     lat: 34.256994331993134,
      //     lng: 108.9054630187248,
      //   },
      //   {
      //     lat: 34.2573861821876,
      //     lng: 108.90545199896282,
      //   },
      //   {
      //     lat: 34.2583997892619,
      //     lng: 108.90543593456538,
      //   },
      //   {
      //     lat: 34.25896857276571,
      //     lng: 108.90541491120209,
      //   },
      //   {
      //     lat: 34.2600241555513,
      //     lng: 108.90541482639716,
      //   },
      //   {
      //     lat: 34.26038901329847,
      //     lng: 108.9054088034598,
      //   },
      //   {
      //     lat: 34.260957801498556,
      //     lng: 108.9053717970368,
      //   },
      //   {
      //     lat: 34.261048767618306,
      //     lng: 108.90536579609017,
      //   },
      //   {
      //     lat: 34.26174549083055,
      //     lng: 108.90536574011179,
      //   },
      //   {
      //     lat: 34.262888033588865,
      //     lng: 108.9053716419483,
      //   },
      //   {
      //     lat: 34.263321862668384,
      //     lng: 108.90536561345179,
      //   },
      //   {
      //     lat: 34.26381066919356,
      //     lng: 108.90536057947523,
      //   },
      //   {
      //     lat: 34.264314469827035,
      //     lng: 108.90535454535133,
      //   },
      //   {
      //     lat: 34.264416428997436,
      //     lng: 108.90535453715839,
      //   },
      //   {
      //     lat: 34.264545377344014,
      //     lng: 108.90535452679667,
      //   },
      //   {
      //     lat: 34.26485025108296,
      //     lng: 108.90536549063917,
      //   },
      //   {
      //     lat: 34.26494221420379,
      //     lng: 108.90536548324928,
      //   },
      //   {
      //     lat: 34.265745895588346,
      //     lng: 108.9053544303257,
      //   },
      //   {
      //     lat: 34.26596581086138,
      //     lng: 108.90534442324677,
      //   },
      //   {
      //     lat: 34.2664006399377,
      //     lng: 108.90533339995,
      //   },
      //   {
      //     lat: 34.26711335674291,
      //     lng: 108.90532235431407,
      //   },
      //   {
      //     lat: 34.267682127119045,
      //     lng: 108.90532230860484,
      //   },
      //   {
      //     lat: 34.267977007932025,
      //     lng: 108.90532228490632,
      //   },
      //   {
      //     lat: 34.26842182796332,
      //     lng: 108.90532224915717,
      //   },
      //   {
      //     lat: 34.26893662309246,
      //     lng: 108.90531221835984,
      //   },
      //   {
      //     lat: 34.26961734908727,
      //     lng: 108.90530616999233,
      //   },
      //   {
      //     lat: 34.27079687296456,
      //     lng: 108.90529608575685,
      //   },
      //   {
      //     lat: 34.27079687296456,
      //     lng: 108.90529608575685,
      //   },
      //   {
      //     lat: 34.270796835711245,
      //     lng: 108.90539697877264,
      //   },
      //   {
      //     lat: 34.27080243135706,
      //     lng: 108.90641586657812,
      //   },
      //   {
      //     lat: 34.270802076591195,
      //     lng: 108.9072299373526,
      //   },
      //   {
      //     lat: 34.270812817234265,
      //     lng: 108.90777629238795,
      //   },
      //   {
      //     lat: 34.270822675023936,
      //     lng: 108.90806094950152,
      //   },
      //   {
      //     lat: 34.27082259586891,
      //     lng: 108.90822075550248,
      //   },
      //   {
      //     lat: 34.27082849640933,
      //     lng: 108.9084135191401,
      //   },
      //   {
      //     lat: 34.27083332877497,
      //     lng: 108.90873512064815,
      //   },
      //   {
      //     lat: 34.27083823372032,
      //     lng: 108.90891189899708,
      //   },
      //   {
      //     lat: 34.270843970260856,
      //     lng: 108.9093942860198,
      //   },
      //   {
      //     lat: 34.270843671165785,
      //     lng: 108.90992459787954,
      //   },
      //   {
      //     lat: 34.27084322644142,
      //     lng: 108.91067459821011,
      //   },
      //   {
      //     lat: 34.270842940218785,
      //     lng: 108.91113596785353,
      //   },
      //   {
      //     lat: 34.270842859216124,
      //     lng: 108.91126379113685,
      //   },
      //   {
      //     lat: 34.270847625398574,
      //     lng: 108.91162328889843,
      //   },
      //   {
      //     lat: 34.27084755144006,
      //     lng: 108.91173612991112,
      //   },
      //   {
      //     lat: 34.27085335722669,
      //     lng: 108.91202471962777,
      //   },
      //   {
      //     lat: 34.270852784122816,
      //     lng: 108.9128555142759,
      //   },
      //   {
      //     lat: 34.27085267748,
      //     lng: 108.91300529292631,
      //   },
      //   {
      //     lat: 34.27085254672574,
      //     lng: 108.91318702269936,
      //   },
      //   {
      //     lat: 34.27085205628723,
      //     lng: 108.91385101989933,
      //   },
      //   {
      //     lat: 34.27087119213721,
      //     lng: 108.91615435172467,
      //   },
      //   {
      //     lat: 34.27087566746897,
      //     lng: 108.91675434843464,
      //   },
      //   {
      //     lat: 34.2708814553737,
      //     lng: 108.91698994875553,
      //   },
      //   {
      //     lat: 34.27085429757733,
      //     lng: 108.9171776307563,
      //   },
      //   {
      //     lat: 34.27080602434836,
      //     lng: 108.91749908177066,
      //   },
      //   {
      //     lat: 34.27080602434836,
      //     lng: 108.91749908177066,
      //   },
      //   {
      //     lat: 34.270751948023054,
      //     lng: 108.91760590116054,
      //   },
      //   {
      //     lat: 34.27073590010758,
      //     lng: 108.9176648001958,
      //   },
      //   {
      //     lat: 34.270708807347326,
      //     lng: 108.91777660774166,
      //   },
      //   {
      //     lat: 34.27070375357,
      //     lng: 108.91783650359831,
      //   },
      //   {
      //     lat: 34.270708656282736,
      //     lng: 108.91793832501797,
      //   },
      //   {
      //     lat: 34.27073056759363,
      //     lng: 108.91802317433239,
      //   },
      //   {
      //     lat: 34.270778426427114,
      //     lng: 108.91815194371763,
      //   },
      //   {
      //     lat: 34.27082633013241,
      //     lng: 108.91823279701194,
      //   },
      //   {
      //     lat: 34.27090620143976,
      //     lng: 108.91833361195992,
      //   },
      //   {
      //     lat: 34.27096613594049,
      //     lng: 108.91837653091702,
      //   },
      //   {
      //     lat: 34.27103006872475,
      //     lng: 108.91841944945133,
      //   },
      //   {
      //     lat: 34.271094016769126,
      //     lng: 108.91844639632818,
      //   },
      //   {
      //     lat: 34.27115297737252,
      //     lng: 108.91846236313094,
      //   },
      //   {
      //     lat: 34.27124992726748,
      //     lng: 108.91847333575198,
      //   },
      //   {
      //     lat: 34.271362907088765,
      //     lng: 108.91844637465212,
      //   },
      //   {
      //     lat: 34.27141590080522,
      //     lng: 108.9184303988106,
      //   },
      //   {
      //     lat: 34.27146990941202,
      //     lng: 108.91839845127609,
      //   },
      //   {
      //     lat: 34.271506924906745,
      //     lng: 108.91836650505593,
      //   },
      //   {
      //     lat: 34.27161499324317,
      //     lng: 108.91824870518059,
      //   },
      //   {
      //     lat: 34.27165204453143,
      //     lng: 108.91817882572266,
      //   },
      //   {
      //     lat: 34.27169010556983,
      //     lng: 108.91809796526304,
      //   },
      //   {
      //     lat: 34.27170014671252,
      //     lng: 108.91805004879423,
      //   },
      //   {
      //     lat: 34.27170014671252,
      //     lng: 108.91805004879423,
      //   },
      //   {
      //     lat: 34.271813130666544,
      //     lng: 108.91801809584462,
      //   },
      //   {
      //     lat: 34.271926114560934,
      //     lng: 108.91798614283951,
      //   },
      //   {
      //     lat: 34.27202208565869,
      //     lng: 108.91797515437597,
      //   },
      //   {
      //     lat: 34.27211304847173,
      //     lng: 108.91797514704386,
      //   },
      //   {
      //     lat: 34.27364144760009,
      //     lng: 108.91794807112001,
      //   },
      //   {
      //     lat: 34.27430117651852,
      //     lng: 108.91794801793834,
      //   },
      //   {
      //     lat: 34.27430117651852,
      //     lng: 108.91794801793834,
      //   },
      //   {
      //     lat: 34.27452116643137,
      //     lng: 108.91786215053015,
      //   },
      //   {
      //     lat: 34.27504196130342,
      //     lng: 108.91785212600149,
      //   },
      //   {
      //     lat: 34.275856640147865,
      //     lng: 108.91783608824171,
      //   },
      //   {
      //     lat: 34.27635543402423,
      //     lng: 108.91783604803085,
      //   },
      //   {
      //     lat: 34.27635543402423,
      //     lng: 108.91783604803085,
      //   },
      //   {
      //     lat: 34.277267066837524,
      //     lng: 108.91782499372012,
      //   },
      //   {
      //     lat: 34.27870948266951,
      //     lng: 108.91780890532164,
      //   },
      //   {
      //     lat: 34.27895038797587,
      //     lng: 108.91780289635481,
      //   },
      //   {
      //     lat: 34.2793632206358,
      //     lng: 108.91779787178181,
      //   },
      //   {
      //     lat: 34.28040878884263,
      //     lng: 108.91779279619023,
      //   },
      //   {
      //     lat: 34.28146034867298,
      //     lng: 108.91779271140113,
      //   },
      //   {
      //     lat: 34.28146034867298,
      //     lng: 108.91779271140113,
      //   },
      //   {
      //     lat: 34.28263387644584,
      //     lng: 108.91777065508535,
      //   },
      //   {
      //     lat: 34.28417326218677,
      //     lng: 108.91773359532593,
      //   },
      //   {
      //     lat: 34.28442516136318,
      //     lng: 108.91772758544468,
      //   },
      //   {
      //     lat: 34.28569565334534,
      //     lng: 108.91769553859388,
      //   },
      //   {
      //     lat: 34.28609849266868,
      //     lng: 108.9176845252085,
      //   },
      //   {
      //     lat: 34.28774477772293,
      //     lng: 108.91770036464814,
      //   },
      //   {
      //     lat: 34.289932847077175,
      //     lng: 108.91769519685113,
      //   },
      //   {
      //     lat: 34.29036166314886,
      //     lng: 108.91769516226238,
      //   },
      //   {
      //     lat: 34.29064054341951,
      //     lng: 108.91769513976726,
      //   },
      //   {
      //     lat: 34.291648114741015,
      //     lng: 108.91769006717632,
      //   },
      //   {
      //     lat: 34.29183603934873,
      //     lng: 108.91768406243645,
      //   },
      //   {
      //     lat: 34.29314945213906,
      //     lng: 108.91770591827063,
      //   },
      //   {
      //     lat: 34.293712204034165,
      //     lng: 108.9177108641832,
      //   },
      //   {
      //     lat: 34.294226985630914,
      //     lng: 108.91770583134237,
      //   },
      //   {
      //     lat: 34.29428596006031,
      //     lng: 108.9177058265846,
      //   },
      //   {
      //     lat: 34.29436110539907,
      //     lng: 108.9175131548741,
      //   },
      //   {
      //     lat: 34.29435643485554,
      //     lng: 108.91715377349566,
      //   },
      //   {
      //     lat: 34.29435732039652,
      //     lng: 108.916147466944,
      //   },
      //   {
      //     lat: 34.29435732039652,
      //     lng: 108.916147466944,
      //   },
      //   {
      //     lat: 34.294572232299814,
      //     lng: 108.91614145952745,
      //   },
      //   {
      //     lat: 34.29463620453703,
      //     lng: 108.91614145436851,
      //   },
      //   {
      //     lat: 34.29495306695566,
      //     lng: 108.91614142881548,
      //   },
      //   {
      //     lat: 34.29495306695566,
      //     lng: 108.91614142881548,
      //   },
      //   {
      //     lat: 34.29496736180883,
      //     lng: 108.91578701078069,
      //   },
      // ],
      track: null,
      path: [
        {
          lat: "39.956043",
          lon: "116.83448",
        },
        {
          lat: "39.953972",
          lon: "116.833969",
        },
        {
          lat: "39.952309",
          lon: "116.837547",
        },
      ],
      sliderProgress: 0,
      options: [
        {
          value: 1,
          label: "1X",
        },
        {
          value: 2,
          label: "2X",
        },
        {
          value: 3,
          label: "3X",
        },
        {
          value: 4,
          label: "4X",
        },
        {
          value: 5,
          label: "5X",
        },
      ],
      selectSpeed: 1,
      // geohash
      geohashList: [], // 后端返回的GeoHash列表
      rotation: 0, // 初始化旋转角度
      currentPointIndex: 0,
    };
  },
  mounted() {
    this.getSuperMapFun();
    this.getGuijiFun();
    // genhash
    this.fetchGeoHashData();
    this.getBianJieFun();
  },
  methods: {
    fetchGeoHashData() {
      // 模拟后端请求获取GeoHash数据
      this.geohashList = [
        "wx4g0b",
        "wx4g0c",
        "wx4g0d", // 示例GeoHash值
      ];
      this.displayGeoHashAreas();
    },
    displayGeoHashAreas() {
      this.geohashList.forEach((geohash) => {
        const bounds = ngeohash.decode_bbox(geohash); // 解码GeoHash为边界框
        console.log(bounds, "bounds");

        // 生成SuperMap边界框
        const lowerLeft = new L.supermap.Geometry.Point(bounds[1], bounds[0]);
        const upperRight = new L.supermap.Geometry.Point(bounds[3], bounds[2]);
        console.log(lowerLeft, "lowerLeft");
        console.log(upperRight, "upperRight");

        const rectangle = new L.supermap.Geometry.Rectangle(
          upperRight.lon,
          lowerLeft.lat,
          upperRight.lon - lowerLeft.lon,
          upperRight.lat - lowerLeft.lat
        );
        console.log(rectangle, "rectangle");
        // const feature = new L.supermap.Feature.Vector(rectangle, null, {
        //   fillColor: "#00FF00",
        //   fillOpacity: 0.5,
        //   strokeColor: "#FF0000",
        //   strokeWidth: 1,
        // });

        // const vectorLayer = new L.supermap.Layer.Vector("GeoHash Layer");
        // vectorLayer.addFeatures([feature]);
        // this.supMap.addLayer(vectorLayer);
      });
    },
    // 加载地图
    getSuperMapFun() {
      this.supMap = L.map("map", {
        center: [39.956074, 116.310316],
        // center: [34.269701076858354, 108.94729614257814],
        zoom: 12,
      });
      new L.supermap.TiledMapLayer(this.superMapUrl).addTo(this.supMap);
    },
    // 画多边形
    getBianJieFun() {
      const testJson = require("./beijing_haidian.json");
      L.geoJSON(testJson.features[0].geometry).addTo(this.supMap);
      // 计算中心点
      // 创建多边形对象
      const polygon = turf.polygon(
        testJson.features[0].geometry.coordinates[0]
      );
      // 计算多边形的质心点
      const center = turf.centerOfMass(polygon);
      // 获取中线点的经纬度
      let centerPoint = center.geometry.coordinates;
      console.log(centerPoint, "this.centerPoint");
      // 点
      L.marker([centerPoint[1], centerPoint[0]], {
        icon: L.icon({
          iconUrl: CAR,
          iconSize: [27, 54],
        }),
        rotationOrigin: "center",
        rotationAngle: 121 / 2,
      }).addTo(this.supMap);
    },
    getGuijiFun() {
      // const initPath = () => {
      // 定义沿着轨迹移动的Icon
      let markerIcon = L.icon({
        iconSize: [27, 54],
        iconUrl: CAR, // 前面导入的img资源
        iconAnchor: [13.5, 27],
      });
      console.log("1");
      // 创建播放器对象并添加至地图
      this.track = new L.TrackPlayer(
        this.path,
        // 轨迹配置，都可以不要，保留markerIcon一个就可以了
        {
          markerIcon,
          speed: 500, // 播放速度
          weight: 5, // 轨迹线宽度
          passedLineColor: "#0000ff", // 已行驶轨迹部分的颜色
          notPassedLineColor: "#ff0000", // 未行驶轨迹部分的颜色
          // panTo: true, // 地图跟随移动
          // 轨迹箭头样式
          // polylineDecoratorOptions: {
          //   patterns: [
          //     /**
          //      * offset 第一个图案符号的偏移量，从线的起点开始。默认值：0
          //      * endOffset 最后一个图案符号的最小偏移量，从线的端点开始。默认值：0
          //      * repeat 重复间隔。定义每个连续符号的锚点之间的距离
          //      * symbol 图标样式
          //      * */
          //     {
          //       offset: 0,
          //       repeat: 20,
          //       symbol: L.Symbol.arrowHead({
          //         pixelSize: 10,
          //         pathOptions: { color: "red", weight: 2, stroke: true },
          //       }),
          //     },
          //   ],
          // },
          // markerRotation: true, // 是否开启marker的旋转
          // markerRotation: (start, end) => this.calculateBearing(start, end), // 是否开启marker的旋转
        }
      ).addTo(this.supMap);
      // this.track.start();
      // 停止播放
      // this.track.pause();
      // 清除轨迹
      // this.track.remove();
      // };
      // 添加监听事件
      this.track.on("progress", (progress, { lng, lat }, index) => {
        this.sliderProgress = progress * 100;
        // console.log(
        //   `progress:${progress.toFixed(2)} - position:${lng.toFixed(
        //     2
        //   )},${lat.toFixed(2)} - trackIndex:${index}`
        // );
        if (index < this.path.length - 1) {
          this.calculateAngle(this.path[index], this.path[index + 1]);
        }
      });
    },
    // 计算两个经纬度点之间的角度
    calculateAngle(point1, point2) {
      let lat1 = point1.lat;
      let lon1 = point1.lon;
      let lat2 = point2.lat;
      let lon2 = point2.lon;
      const toRadians = (deg) => (deg * Math.PI) / 180;
      const toDegrees = (rad) => (rad * 180) / Math.PI;

      const φ1 = toRadians(lat1);
      const φ2 = toRadians(lat2);
      const Δλ = toRadians(lon2 - lon1);

      const y = Math.sin(Δλ) * Math.cos(φ2);
      const x =
        Math.cos(φ1) * Math.sin(φ2) -
        Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

      const bearing = toDegrees(Math.atan2(y, x));
      // return (bearing + 360) % 360; // 保证角度为0-360度之间
      console.log((bearing + 360) % 360, "计算的角度");
    },
    calculateBearing(start, end) {
      console.log(start, end);
      // return
      // const [lat1, lon1] = start;
      // const [lat2, lon2] = end;
      const lat1 = start.lat;
      const lon1 = start.lng;
      const lat2 = end.lat;
      const lon2 = end.lng;

      const toRadians = (deg) => (deg * Math.PI) / 180;
      const toDegrees = (rad) => (rad * 180) / Math.PI;

      const lat1Rad = toRadians(lat1);
      const lat2Rad = toRadians(lat2);
      const dLonRad = toRadians(lon2 - lon1);

      const y = Math.sin(dLonRad) * Math.cos(lat2Rad);
      const x =
        Math.cos(lat1Rad) * Math.sin(lat2Rad) -
        Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLonRad);

      const bearingRad = Math.atan2(y, x);
      let bearingDeg = toDegrees(bearingRad);

      // 转换为0-360范围
      bearingDeg = (bearingDeg + 360) % 360;

      console.log(bearingDeg, "bearingDeg");

      return bearingDeg;
    },
    // 进度条
    formatTooltip() {
      return this.sliderProgress.toFixed(2);
    },
    changeProgress() {
      // console.log(this.sliderProgress, "9090");
      if (this.track) {
        this.track.setProgress(this.sliderProgress / 100);
        // this.track.setSpeed(500);
      }
    },
    // 切换速率
    qhSpeedFun() {
      if (this.track) {
        this.track.setSpeed(5000 * Number(this.selectSpeed));
        console.log(5000 * this.selectSpeed, "selectSpeed");
      }
    },
    // 开始
    startFun() {
      if (this.track) {
        this.track.start();
        console.log("开始");
        // setInterval(() => {
        //   if (this.currentPointIndex < this.path.length - 1) {
        //     const nextIndex = this.currentPointIndex + 1;
        //     const currentPoint = this.path[this.currentPointIndex];
        //     const nextPoint = this.path[nextIndex];

        //     // 计算方位角
        //     const bearing = this.calculateBearing(currentPoint, nextPoint);

        //     // 更新标记的位置和旋转角度
        //     // this.marker.setLatLng(nextPoint);
        //     // this.marker.setRotationAngle(bearing);

        //     this.currentPointIndex = nextIndex;
        //     console.log(bearing, "bearing");
        //     this.rotateMap(bearing);
        //   }
        // }, 1000);
      }
    },
    // 暂停
    pauseFun() {
      if (this.track) {
        this.track.pause();
        console.log("暂停");
      }
    },
    // 清除
    removeFun() {
      if (this.track) {
        this.track.remove();
        this.track = null;
        console.log("清除");
      }
    },
    mapXuanzhuanFun() {
      let num = this.rotation + 30;
      this.rotateMap(num);
    },
    rotateMap(angle) {
      this.rotation = angle; // 修改旋转角度
    },
  },
};
</script>
<style scopeds lang="scss">
.dituWarp {
  width: 100%;
  height: 100%;
  position: relative;
  .btnWarp {
    position: absolute;
    z-index: 99999;
    top: 0;
    left: 100px;
    .huakuai {
      padding-top: 50px;
    }
  }
}
#map {
  width: 100%;
  height: 100%;
  transition: transform 0.5s; /* 添加动画效果 */
}
</style>