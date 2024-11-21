<template>
  <div class="dituWarp">
    <div id="map"></div>
    <div class="btnWarp">
      <el-button type="primary" @click="playRoute">开始</el-button>
      <el-button type="success" @click="pauseRoute">暂停</el-button>
      <el-button type="info" @click="resetRoute">清除</el-button>
      <div class="huakuai">
        <el-select v-model="playbackSpeed" placeholder="请选择">
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
  </div>
</template>

<script>
import CAR from "./car.png";
export default {
  data() {
    return {
      supMap: null,
      superMapUrl:
        "https://iclient.supermap.io/iserver/services/map-china400/rest/maps/China",
      routeCoordinates: [
        {
          lat: 34.25615548523744,
          lng: 108.91164044842363,
        },
        {
          lat: 34.256155386830855,
          lng: 108.91179023713374,
        },
        {
          lat: 34.256155386830855,
          lng: 108.91179023713374,
        },
        {
          lat: 34.25607942383744,
          lng: 108.91177925878043,
        },
        {
          lat: 34.255720609670156,
          lng: 108.91171038494707,
        },
        {
          lat: 34.255607664345405,
          lng: 108.91169441655762,
        },
        {
          lat: 34.25553269366626,
          lng: 108.91169442258713,
        },
        {
          lat: 34.25544769867856,
          lng: 108.91173736885014,
        },
        {
          lat: 34.25544769867856,
          lng: 108.91173736885014,
        },
        {
          lat: 34.25541482067108,
          lng: 108.91157060617357,
        },
        {
          lat: 34.255437230925885,
          lng: 108.91091151687152,
        },
        {
          lat: 34.2554647726071,
          lng: 108.90999074936826,
        },
        {
          lat: 34.255474922592086,
          lng: 108.90972209999609,
        },
        {
          lat: 34.255470035735925,
          lng: 108.90952435653506,
        },
        {
          lat: 34.25546585239153,
          lng: 108.90796530095042,
        },
        {
          lat: 34.255466079902156,
          lng: 108.90748786950532,
        },
        {
          lat: 34.255466139078585,
          lng: 108.90736001962813,
        },
        {
          lat: 34.25546047844199,
          lng: 108.90659889522819,
        },
        {
          lat: 34.25545553696015,
          lng: 108.90646504623344,
        },
        {
          lat: 34.255455684520776,
          lng: 108.90610644487133,
        },
        {
          lat: 34.25543990484673,
          lng: 108.90555904106137,
        },
        {
          lat: 34.255434929044085,
          lng: 108.90550010453336,
        },
        {
          lat: 34.25671044153241,
          lng: 108.90546803620235,
        },
        {
          lat: 34.256994331993134,
          lng: 108.9054630187248,
        },
        {
          lat: 34.2573861821876,
          lng: 108.90545199896282,
        },
        {
          lat: 34.2583997892619,
          lng: 108.90543593456538,
        },
        {
          lat: 34.25896857276571,
          lng: 108.90541491120209,
        },
        {
          lat: 34.2600241555513,
          lng: 108.90541482639716,
        },
        {
          lat: 34.26038901329847,
          lng: 108.9054088034598,
        },
        {
          lat: 34.260957801498556,
          lng: 108.9053717970368,
        },
        {
          lat: 34.261048767618306,
          lng: 108.90536579609017,
        },
        {
          lat: 34.26174549083055,
          lng: 108.90536574011179,
        },
        {
          lat: 34.262888033588865,
          lng: 108.9053716419483,
        },
        {
          lat: 34.263321862668384,
          lng: 108.90536561345179,
        },
        {
          lat: 34.26381066919356,
          lng: 108.90536057947523,
        },
        {
          lat: 34.264314469827035,
          lng: 108.90535454535133,
        },
        {
          lat: 34.264416428997436,
          lng: 108.90535453715839,
        },
        {
          lat: 34.264545377344014,
          lng: 108.90535452679667,
        },
        {
          lat: 34.26485025108296,
          lng: 108.90536549063917,
        },
        {
          lat: 34.26494221420379,
          lng: 108.90536548324928,
        },
        {
          lat: 34.265745895588346,
          lng: 108.9053544303257,
        },
        {
          lat: 34.26596581086138,
          lng: 108.90534442324677,
        },
        {
          lat: 34.2664006399377,
          lng: 108.90533339995,
        },
        {
          lat: 34.26711335674291,
          lng: 108.90532235431407,
        },
        {
          lat: 34.267682127119045,
          lng: 108.90532230860484,
        },
        {
          lat: 34.267977007932025,
          lng: 108.90532228490632,
        },
        {
          lat: 34.26842182796332,
          lng: 108.90532224915717,
        },
        {
          lat: 34.26893662309246,
          lng: 108.90531221835984,
        },
        {
          lat: 34.26961734908727,
          lng: 108.90530616999233,
        },
        {
          lat: 34.27079687296456,
          lng: 108.90529608575685,
        },
        {
          lat: 34.27079687296456,
          lng: 108.90529608575685,
        },
        {
          lat: 34.270796835711245,
          lng: 108.90539697877264,
        },
        {
          lat: 34.27080243135706,
          lng: 108.90641586657812,
        },
        {
          lat: 34.270802076591195,
          lng: 108.9072299373526,
        },
        {
          lat: 34.270812817234265,
          lng: 108.90777629238795,
        },
        {
          lat: 34.270822675023936,
          lng: 108.90806094950152,
        },
        {
          lat: 34.27082259586891,
          lng: 108.90822075550248,
        },
        {
          lat: 34.27082849640933,
          lng: 108.9084135191401,
        },
        {
          lat: 34.27083332877497,
          lng: 108.90873512064815,
        },
        {
          lat: 34.27083823372032,
          lng: 108.90891189899708,
        },
        {
          lat: 34.270843970260856,
          lng: 108.9093942860198,
        },
        {
          lat: 34.270843671165785,
          lng: 108.90992459787954,
        },
        {
          lat: 34.27084322644142,
          lng: 108.91067459821011,
        },
        {
          lat: 34.270842940218785,
          lng: 108.91113596785353,
        },
        {
          lat: 34.270842859216124,
          lng: 108.91126379113685,
        },
        {
          lat: 34.270847625398574,
          lng: 108.91162328889843,
        },
        {
          lat: 34.27084755144006,
          lng: 108.91173612991112,
        },
        {
          lat: 34.27085335722669,
          lng: 108.91202471962777,
        },
        {
          lat: 34.270852784122816,
          lng: 108.9128555142759,
        },
        {
          lat: 34.27085267748,
          lng: 108.91300529292631,
        },
        {
          lat: 34.27085254672574,
          lng: 108.91318702269936,
        },
        {
          lat: 34.27085205628723,
          lng: 108.91385101989933,
        },
        {
          lat: 34.27087119213721,
          lng: 108.91615435172467,
        },
        {
          lat: 34.27087566746897,
          lng: 108.91675434843464,
        },
        {
          lat: 34.2708814553737,
          lng: 108.91698994875553,
        },
        {
          lat: 34.27085429757733,
          lng: 108.9171776307563,
        },
        {
          lat: 34.27080602434836,
          lng: 108.91749908177066,
        },
        {
          lat: 34.27080602434836,
          lng: 108.91749908177066,
        },
        {
          lat: 34.270751948023054,
          lng: 108.91760590116054,
        },
        {
          lat: 34.27073590010758,
          lng: 108.9176648001958,
        },
        {
          lat: 34.270708807347326,
          lng: 108.91777660774166,
        },
        {
          lat: 34.27070375357,
          lng: 108.91783650359831,
        },
        {
          lat: 34.270708656282736,
          lng: 108.91793832501797,
        },
        {
          lat: 34.27073056759363,
          lng: 108.91802317433239,
        },
        {
          lat: 34.270778426427114,
          lng: 108.91815194371763,
        },
        {
          lat: 34.27082633013241,
          lng: 108.91823279701194,
        },
        {
          lat: 34.27090620143976,
          lng: 108.91833361195992,
        },
        {
          lat: 34.27096613594049,
          lng: 108.91837653091702,
        },
        {
          lat: 34.27103006872475,
          lng: 108.91841944945133,
        },
        {
          lat: 34.271094016769126,
          lng: 108.91844639632818,
        },
        {
          lat: 34.27115297737252,
          lng: 108.91846236313094,
        },
        {
          lat: 34.27124992726748,
          lng: 108.91847333575198,
        },
        {
          lat: 34.271362907088765,
          lng: 108.91844637465212,
        },
        {
          lat: 34.27141590080522,
          lng: 108.9184303988106,
        },
        {
          lat: 34.27146990941202,
          lng: 108.91839845127609,
        },
        {
          lat: 34.271506924906745,
          lng: 108.91836650505593,
        },
        {
          lat: 34.27161499324317,
          lng: 108.91824870518059,
        },
        {
          lat: 34.27165204453143,
          lng: 108.91817882572266,
        },
        {
          lat: 34.27169010556983,
          lng: 108.91809796526304,
        },
        {
          lat: 34.27170014671252,
          lng: 108.91805004879423,
        },
        {
          lat: 34.27170014671252,
          lng: 108.91805004879423,
        },
        {
          lat: 34.271813130666544,
          lng: 108.91801809584462,
        },
        {
          lat: 34.271926114560934,
          lng: 108.91798614283951,
        },
        {
          lat: 34.27202208565869,
          lng: 108.91797515437597,
        },
        {
          lat: 34.27211304847173,
          lng: 108.91797514704386,
        },
        {
          lat: 34.27364144760009,
          lng: 108.91794807112001,
        },
        {
          lat: 34.27430117651852,
          lng: 108.91794801793834,
        },
        {
          lat: 34.27430117651852,
          lng: 108.91794801793834,
        },
        {
          lat: 34.27452116643137,
          lng: 108.91786215053015,
        },
        {
          lat: 34.27504196130342,
          lng: 108.91785212600149,
        },
        {
          lat: 34.275856640147865,
          lng: 108.91783608824171,
        },
        {
          lat: 34.27635543402423,
          lng: 108.91783604803085,
        },
        {
          lat: 34.27635543402423,
          lng: 108.91783604803085,
        },
        {
          lat: 34.277267066837524,
          lng: 108.91782499372012,
        },
        {
          lat: 34.27870948266951,
          lng: 108.91780890532164,
        },
        {
          lat: 34.27895038797587,
          lng: 108.91780289635481,
        },
        {
          lat: 34.2793632206358,
          lng: 108.91779787178181,
        },
        {
          lat: 34.28040878884263,
          lng: 108.91779279619023,
        },
        {
          lat: 34.28146034867298,
          lng: 108.91779271140113,
        },
        {
          lat: 34.28146034867298,
          lng: 108.91779271140113,
        },
        {
          lat: 34.28263387644584,
          lng: 108.91777065508535,
        },
        {
          lat: 34.28417326218677,
          lng: 108.91773359532593,
        },
        {
          lat: 34.28442516136318,
          lng: 108.91772758544468,
        },
        {
          lat: 34.28569565334534,
          lng: 108.91769553859388,
        },
        {
          lat: 34.28609849266868,
          lng: 108.9176845252085,
        },
        {
          lat: 34.28774477772293,
          lng: 108.91770036464814,
        },
        {
          lat: 34.289932847077175,
          lng: 108.91769519685113,
        },
        {
          lat: 34.29036166314886,
          lng: 108.91769516226238,
        },
        {
          lat: 34.29064054341951,
          lng: 108.91769513976726,
        },
        {
          lat: 34.291648114741015,
          lng: 108.91769006717632,
        },
        {
          lat: 34.29183603934873,
          lng: 108.91768406243645,
        },
        {
          lat: 34.29314945213906,
          lng: 108.91770591827063,
        },
        {
          lat: 34.293712204034165,
          lng: 108.9177108641832,
        },
        {
          lat: 34.294226985630914,
          lng: 108.91770583134237,
        },
        {
          lat: 34.29428596006031,
          lng: 108.9177058265846,
        },
        {
          lat: 34.29436110539907,
          lng: 108.9175131548741,
        },
        {
          lat: 34.29435643485554,
          lng: 108.91715377349566,
        },
        {
          lat: 34.29435732039652,
          lng: 108.916147466944,
        },
        {
          lat: 34.29435732039652,
          lng: 108.916147466944,
        },
        {
          lat: 34.294572232299814,
          lng: 108.91614145952745,
        },
        {
          lat: 34.29463620453703,
          lng: 108.91614145436851,
        },
        {
          lat: 34.29495306695566,
          lng: 108.91614142881548,
        },
        {
          lat: 34.29495306695566,
          lng: 108.91614142881548,
        },
        {
          lat: 34.29496736180883,
          lng: 108.91578701078069,
        },
      ],
      track: null,
      // path:[
      //   {
      //     lat:'39.956043',
      //     lon:'116.83448',
      //   },
      //   {
      //     lat:'39.953972',
      //     lon:'116.833969',
      //   },
      //   {
      //     lat:'39.952309',
      //     lon:'116.837547',
      //   },
      // ],
      sliderProgress: 0,
      options: [
        {
          value: 1.0,
          label: "1X",
        },
        {
          value: 2.0,
          label: "2X",
        },
        {
          value: 3.0,
          label: "3X",
        },
        {
          value: 4.0,
          label: "4X",
        },
        {
          value: 5.0,
          label: "5X",
        },
      ],
      playbackSpeed: 1.0,
      // geohash
      geohashList: [], // 后端返回的GeoHash列表
      rotation: 0, // 初始化旋转角度
      currentPointIndex: 0,
      polyline: null, // 线条对象
      currentIndex: 0, // 当前轨迹点索引
      playing: false, // 播放状态
      interval: null, // 播放的定时器
      marker: null, // 图标Marker
    };
  },
  watch: {
    // 当playbackSpeed变化时，重新启动播放，以应用新的速度
    playbackSpeed(newSpeed) {
      if (this.playing) {
        this.pauseRoute();
        this.playRoute(); // 重新启动播放以应用新的速度
      }
    },
  },
  mounted() {
    this.getSuperMapFun();
  },
  methods: {
    // 加载地图
    getSuperMapFun() {
      this.supMap = L.map("map", {
        // center: [39.956074, 116.310316],
        center: [34.25615548523744, 108.91164044842363],
        zoom: 12,
      });
      new L.supermap.TiledMapLayer(this.superMapUrl).addTo(this.supMap);
      // 初始化Polyline
      this.polyline = L.polyline([], { color: "blue" }).addTo(this.supMap);
      // 初始化图标Marker，使用自定义图标
      const icon = L.icon({
        iconUrl: CAR, // 你的图标URL
        iconSize: [27, 54], // 图标大小
        iconAnchor: [13.5, 27], // 图标的“脚”在图标的哪个位置
      });

      // 创建Marker并放在起点
      this.marker = L.marker(this.routeCoordinates[0], { icon: icon }).addTo(
        this.supMap
      );
    },
    // 动态播放轨迹
    playRoute() {
      if (!this.playing) {
        this.playing = true;

        // 根据回放速度设置定时器的间隔
        const intervalTime = 1000 / this.playbackSpeed; // 根据速度设置时间间隔

        this.interval = setInterval(() => {
          if (this.currentIndex < this.routeCoordinates.length - 1) {
            const currentPoint = this.routeCoordinates[this.currentIndex];
            const nextPoint = this.routeCoordinates[this.currentIndex + 1];

            // 添加轨迹点到Polyline
            this.polyline.addLatLng(currentPoint);

            // 计算方向角
            const angle = this.calculateAngle(currentPoint, nextPoint);

            // 更新Marker的位置
            this.marker.setLatLng(currentPoint);

            // 设置图标旋转角度
            const iconElement = this.marker.getElement();
            console.log(iconElement,"iconElement")
            if (iconElement) {
              iconElement.style.transform = `rotate(${angle}deg)`;
              console.log(angle, "angleangle");
            }

            // 移动到下一个点
            this.currentIndex++;
          } else {
            clearInterval(this.interval); // 播放完成后清除定时器
          }
        }, intervalTime); // 根据速度调整时间间隔
      }
    },

    // 计算两个经纬度点之间的角度
    calculateAngle(point1, point2) {
      // console.log(point1, point2, "point");
      const lat1 = Number(point1.lat);
      const lon1 = Number(point1.lng);
      const lat2 = Number(point2.lat);
      const lon2 = Number(point2.lng);

      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const y = Math.sin(dLon) * Math.cos(lat2);
      const x =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
      const brng = (Math.atan2(y, x) * 180) / Math.PI;
      return (brng + 360) % 360; // 保证角度为0-360度之间
    },

    // 暂停播放
    pauseRoute() {
      this.playing = false;
      clearInterval(this.interval);
    },

    // 重置播放
    resetRoute() {
      this.polyline.setLatLngs([]); // 清空线条
      this.currentIndex = 0;
      this.playing = false;
      clearInterval(this.interval);
      // 重置图标位置到起点
      this.marker.setLatLng(this.routeCoordinates[0]);

      // 重置图标方向
      const iconElement = this.marker.getElement();
      if (iconElement) {
        iconElement.style.transform = `rotate(0deg)`;
      }
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
/* 添加旋转样式 */
.custom-icon .rotating-icon {
  transition: transform 0.2s linear; /* 平滑旋转 */
}
</style>