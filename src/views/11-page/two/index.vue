<template>
  <div class="block">
    <!-- <el-date-picker
      :clearable="false"
      value-format="yyyy-MM-dd"
      v-model="value1"
      type="date"
      @change="dateChanged"
      :picker-options="pickerOptions"
      placeholder="选择日期"
    >
    </el-date-picker> -->
    <el-slider
      :format-tooltip="formatTooltip"
      :max="maxNum"
      v-model="value"
      range
      :step="1"
      @change="gang"
      :marks="marks"
    />
    <div class="slider_zhou_warp">
      <!-- :format-tooltip="formatTooltipDay" -->
      <el-slider
        :max="maxNumDay"
        v-model="valueDay"
        range
        :step="1"
        @change="gangDay"
        :marks="marksDay"
        :show-tooltip="false"
      />
      <div class="time">
        <span v-for="(item, i) in marksDay" :key="i">{{
          maxNumDay == 7 || maxNumDay == 24 ? item : item.slice(5)
        }}</span>
      </div>
    </div>
    <div>
      <el-button type="primary" @click="qhDay">一天</el-button>
      <el-button type="primary" @click="qhZhou">一周</el-button>
      <el-button type="primary" @click="qhYue">一月</el-button>
    </div>
    <!-- 经纬度转换 -->
    <div>
      <p>原始坐标：[{{ mercatorCoords[0] }}, {{ mercatorCoords[1] }}]</p>
      <p>转换后的经纬度：[{{ lonLat[0] }}, {{ lonLat[1] }}]</p>
      <p>不用插件版本：[{{ lonLatNoChajian[0] }}, {{ lonLatNoChajian[1] }}]</p>
    </div>
  </div>
</template>
<script>
import moment from "./moment.js";
import proj4 from "proj4";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      mercatorCoords: [12964704.7405482, 4859697.651823959],
      lonLat: [0, 0],
      lonLatNoChajian: [0, 0],
      dateList: [],
      value1: moment(new Date()).format("yyyy-MM-DD"),
      value: [480, 1080],
      valueDay: [1, 3],
      // pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now();
      //   },
      // },
      // initDate: [],
      marks: {
        0: "00:00",
        60: "01:00",
        120: "02:00",
        180: "03:00",
        240: "04:00",
        300: "05:00",
        360: "06:00",
        420: "07:00",
        480: "08:00",
        540: "09:00",
        600: "10:00",
        660: "11:00",
        720: "12:00",
        780: "13:00",
        840: "14:00",
        900: "15:00",
        960: "16:00",
        1020: "17:00",
        1080: "18:00",
        1140: "19:00",
        1200: "20:00",
        1260: "21:00",
        1320: "22:00",
        1380: "23:00",
        1440: "00:00",
      },
      maxNum: 1440,
      marksDay: {
        0: "2024-8-1",
        1: "2024-8-2",
        2: "2024-8-3",
        3: "2024-8-4",
        4: "2024-8-5",
        5: "2024-8-6",
        6: "2024-8-7",
      },
      maxNumDay: 7,
      // 3: {
      //   style: {
      //     color: "#000000",
      //   },
      //   label: this.$createElement("strong", "2024-8-4"),
      // },
      // 转换经纬度
      data1: require("./data.json"),
      data2: require("./data (1).json"),
      data3: require("./data (2).json"),
      data1Jg: [],
      data2Jg: [],
      data3Jg: [],
    };
  },
  created() {
    let eventList = this.getDragDate();
    // console.log(eventList, "当前区域的开始结束时间");
  },
  mounted() {
    this.initTimeDay(this.marksDay, this.maxNumDay);
    console.log(moment().format("HH"));
    this.lonLat = proj4("EPSG:3857", "EPSG:4326", this.mercatorCoords);
    this.convertToLatLon();
    // console.log(this.data1.features[0].geometry.coordinates);
    this.data1.features[0].geometry.coordinates.forEach((element) => {
      this.latLonToEPSG3857(element[1], element[0], 1);
    });
    this.data2.features[0].geometry.coordinates.forEach((element) => {
      this.latLonToEPSG3857(element[1], element[0], 2);
    });
    this.data3.features[0].geometry.coordinates.forEach((element) => {
      this.latLonToEPSG3857(element[1], element[0], 3);
    });
    console.log(this.data1Jg, "data1Jg");
    console.log(this.data2Jg, "data2Jg");
    console.log(this.data3Jg, "data3Jg");
  },
  methods: {
    // 经纬度转EPSG:3857的函数
    latLonToEPSG3857(lat, lon, num) {
      const R = 6378137.0; // 地球半径（用于EPSG:3857投影）
      const x = lon * ((R * Math.PI) / 180.0);
      const y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360.0)) * R;
      // console.log(x, y, "经纬度转EPSG:3857");
      if (num == 1) {
        this.data1Jg.push([x, y]);
      }
      if (num == 2) {
        this.data2Jg.push([x, y]);
      }
      if (num == 3) {
        this.data3Jg.push([x, y]);
      }
    },
    // 经纬度转换
    convertToLatLon() {
      const earthRadius = 6378137.0;

      // 计算经度
      this.lonLatNoChajian[0] =
        (this.mercatorCoords[0] / earthRadius) * (180.0 / Math.PI);

      // 计算纬度
      const latitudeRad =
        2 * Math.atan(Math.exp(this.mercatorCoords[1] / earthRadius)) -
        Math.PI / 2;
      this.lonLatNoChajian[1] = latitudeRad * (180.0 / Math.PI);
    },
    //一天
    initDates(flag) {
      //   if (flag) {
      //     // 时间到达24h时，需要对展示时间的日期/小时/分钟做处理
      //     let out_24 = String(
      //       Number(this.value1.split(" ")[0].split("-")[2]) + 1
      //     );
      //     return (
      //       this.value1.split(" ")[0].split("-")[0] +
      //       "-" +
      //       this.value1.split(" ")[0].split("-")[1] +
      //       "-" +
      //       (out_24 < 10 ? out_24.padStart(2, "0") : out_24) +
      //       " " +
      //       "00:00"
      //     );
      //   } else {
      return (
        this.value1.split(" ")[0].split("-")[0] +
        "-" +
        this.value1.split(" ")[0].split("-")[1] +
        "-" +
        this.value1.split(" ")[0].split("-")[2] +
        " "
      );
      //   }
    },
    // dateChanged() {
    //   this.value = [480, 1080];
    //   let eventList = this.getDragDate();
    //   console.log(eventList, "当前区域的开始结束时间");
    // },
    getDragDate() {
      let dateResult = this.initDates();
      let arr = [dateResult + "" + "08:00", dateResult + "" + "18:00"];
      return arr;
    },
    convertToTime(decimalHours) {
      const hours = Math.floor(Math.floor(decimalHours) / 60);
      const minutes = Math.round(decimalHours % 60);
      const formattedHours = hours.toString().padStart(2, "0");
      let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      const timeStr = `${formattedHours}:${formattedMinutes}`;
      return timeStr;
    },
    formatTooltip(val) {
      const timeStr = this.convertToTime(val);
      if (val !== 1440) {
        return this.initDates() + timeStr;
      } else {
        return this.initDates(true);
      }
    },
    gang(val) {
      console.log(val);
      const startTime = this.convertToTime(val[0]);
      const endtTime = this.convertToTime(val[1]);
      let left = this.initDates() + startTime;
      let right = this.initDates() + endtTime;
      if (val[1] == 1440) {
        right = this.initDates(true);
      }
      this.dateList = [left, right];
      console.log(this.dateList, "手动触发");
    },
    // 切换周月
    qhDay() {
      this.maxNumDay = 24;
      this.marksDay = {};
      this.initTimeDay(this.marksDay, this.maxNumDay);
    },
    qhZhou() {
      this.maxNumDay = 7;
      this.marksDay = {};
      this.initTimeDay(this.marksDay, this.maxNumDay);
    },
    qhYue() {
      this.maxNumDay = 30;
      this.marksDay = {};
      this.initTimeDay(this.marksDay, this.maxNumDay);
    },
    // 划入显示tooltip
    formatTooltipDay(val) {
      console.log(val, "too;tip");
      if (val == this.maxNumDay) {
        return this.marksDay[val - 1];
      } else if (val == 0) {
        return this.marksDay[val];
      } else if (val < this.maxNumDay) {
        return this.marksDay[val - 1];
      }
      // return this.marksDay[val];
    },
    // 初始化
    initTimeDay(markArr, maxMaker) {
      for (let index = 0; index < maxMaker; index++) {
        if (maxMaker != 24) {
          if (index == 0) {
            markArr[index] = moment().format("yyyy-MM-DD");
          } else {
            markArr[index] = moment()
              .subtract(index, "days")
              .format("yyyy-MM-DD");
          }
        } else {
          // markArr[index] = moment().format("HH");
          markArr[index] = (index < 10 ? "0" + index : index) + ":00";
        }
      }
      if (maxMaker != 24) {
        this.valueDay = [0, 1]; //默认展示当天
      } else {
        this.valueDay = [
          Number(moment().format("HH")),
          Number(moment().format("HH")) + 1,
        ]; //默认展示当天
      }
      console.log(this.marksDay, "marksDay");
    },
    // 变化
    gangDay(val) {
      if (val[0] < this.maxNumDay && val[1] == this.maxNumDay) {
        console.log(
          val,
          this.marksDay[val[0]],
          this.marksDay[val[1] - 1],
          "周"
        );
      } else if (val[0] == val[1]) {
        if (val[0] < this.maxNumDay) {
          this.valueDay = [val[0], val[1] + 1]; //显示正常
          console.log(val, this.marksDay[val[0]], this.marksDay[val[1]], "周");
        } else if (val[0] == this.maxNumDay) {
          this.valueDay = [val[0] - 1, val[1]]; //显示正常
          console.log(
            val,
            this.marksDay[val[0] - 1],
            this.marksDay[val[1] - 1],
            "周"
          );
        }
      } else {
        console.log(
          val,
          this.marksDay[val[0]],
          this.marksDay[val[1] - 1],
          "周"
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.slider_zhou_warp {
  position: relative;
  /deep/ .el-slider__marks {
    display: none;
  }
  .time {
    position: absolute;
    width: 100%;
    height: 0px;
    display: flex;
    padding: 0 5%;
    justify-content: space-around;
    margin-top: -50px;
  }
}
.block {
  ::v-deep(.el-slider__runway) {
    height: 36px;
    width: 90%;
    margin: 20px auto;

    .el-slider__bar {
      height: 36px;
      background-color: #8ebbc5;
    }

    .el-slider__stop {
      top: 26px;
      width: 2px;
      height: 10px;
      background-color: #d3d1d1;
    }

    .el-slider__button-wrapper {
      top: 0px;

      .el-slider__button {
        border-color: #8ebbc5;
        border-radius: 0px;
        height: 32px;
        width: 5px;
      }
    }

    .el-slider__marks {
      .el-slider__marks-text {
        margin-top: 40px;
      }
    }
  }
}
</style>
 