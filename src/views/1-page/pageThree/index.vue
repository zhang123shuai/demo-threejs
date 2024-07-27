<template>
  <div class="onepageWarp">
    <div class="three_onepage" ref="three_onepage"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; //鼠标拖拽控制器
export default {
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      // this.windowResize();
      // this.initOrbitControls();
    });
    this.dom = null;
    this.mesh = null;
    // this.T0 = null;
    //相机,场景,渲染器,控制器,都不能放在data中,否则会导致项目运行使用出来后很卡,
    //放在mounted中创建,前面加上this.也是全局变量
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;
  },
  methods: {
    init() {
      this.dom = this.$refs.three_onepage;
      //定义一个渲染器
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(this.dom.clientWidth, this.dom.clientHeight);
      this.renderer.setClearColor("#fff", 1.0); //渲染器背景颜色，透明度
      this.dom.appendChild(this.renderer.domElement);
      //定义一个相机
      this.camera = new THREE.PerspectiveCamera(
        75,
        this.dom.clientWidth / this.dom.clientHeight,
        10,
        10000
      );
      this.camera.position.set(50, 400, 600);
      this.camera.lookAt(0, 0, 0);
      //定义一个场景
      this.scene = new THREE.Scene();
      //点光源
      var point = new THREE.PointLight(0xffffff);
      point.position.set(100, 300, 400); //点光源位置
      this.scene.add(point); //点光源添加到场景中
      //环境光
      var ambient = new THREE.AmbientLight(0xffffff, 1);
      this.scene.add(ambient);
      // 加载模型
      const loader = new FBXLoader();
      loader.load(`three/08.fbx`, (object) => {
        // loader.load(`three/103liu.fbx`, (object) => {
        // loader.load(`three/ZTQ-15-迷彩.fbx`, (object) => {
        // loader.load(`three/11突击车2.fbx`, (object) => {
        // loader.load(`three/92.fbx`, (object) => {
        //加载路径fbx文件
        console.log(object, "object----->>>");
        object.traverse((child) => {
          if (child.isMesh) {
            child.material.side = THREE.DoubleSide; // 模型双面渲染
            child.castShadow = true; // 光照是否有阴影
            child.receiveShadow = true; // 是否接收阴影
            child.frustumCulled = false;
            // child.material.emissive = child.material.color;
            // child.material.emissiveMap = child.material.map;
          }
          // console.log(child, "child");
        });
        // 设置模型大小
        object.scale.set(1, 1, 1); // 调整模型大小，可以根据需要设置
        // 设置相机位置
        // this.camera.position.z = 1;
        this.scene.add(object); //模型
        console.log("1");
        this.initOrbitControls();
        this.render();
        let that = this;
        // 设置一个每2000毫秒执行一次的定时器
        setTimeout(function () {
          that.initOrbitControls();
          that.render();
        }, 10);
      });
    },
    render() {
      //   let T1 = new Date(); //本次时间
      //   let t = T1 - this.T0; //时间差
      //   this.T0 = T1; //把本次时间赋值给上次时间
      // requestAnimationFrame(this.render); //请求再次执行渲染函数render
      this.renderer.render(this.scene, this.camera); //执行渲染操作
      //   this.mesh.rotateY(0.001 * t); //旋转角速度0.001弧度每毫秒
      console.log("2");
    },
    // 控制器
    initOrbitControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement); //创建控件对象
      this.controls.addEventListener("change", this.render); //监听鼠标、键盘事件
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.controls.enableDamping = true;
      //是否可以缩放
      this.controls.enableZoom = true;
      //是否自动旋转
      this.controls.autoRotate = true;
      //设置相机距离原点的最近距离
      // this.controls.minDistance = 200;
      //设置相机距离原点的最远距离
      // this.controls.maxDistance = 600;
      //是否开启右键拖拽
      this.controls.enablePan = false;
      console.log("3");
    },
  },
  //后续还要在beforeDestory中进行销毁
  beforeDestroy() {
    this.dom = null;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;
    console.log("4");
  },
};
</script>

<style lang="scss" scoped>
.onepageWarp {
  width: 100%;
  height: 100%;
  .three_onepage {
    height: 100%;
  }
}
</style>