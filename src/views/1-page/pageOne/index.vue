<template>
  <div class="onepageWarp">
    <div class="three_onepage" ref="three_onepage"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; //鼠标拖拽控制器
export default {
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.windowResize();
      this.initOrbitControls();
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
    //窗口尺寸变化，重新渲染
    windowResize() {
      window.addEventListener("resize", () => {
        this.renderer.setSize(this.dom.clientWidth, this.dom.clientHeight);
        this.camera.aspect = this.dom.clientWidth / this.dom.clientHeight;
        // update project matrix
        this.camera.updateProjectionMatrix();
      });
    },
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
      //定义物体
      var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
      var geometry1 = new THREE.SphereGeometry(60, 40, 40);
      var geometry2 = new THREE.CylinderGeometry(50, 50, 100, 25);
      //添加材质
      var material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        wireframe: true, //将几何图形渲染为线框。 默认值为false
      });
      var material1 = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        opacity: 0.7, //透明度设置
        transparent: true, //是否开启透明，默认false
      });
      var material2 = new THREE.MeshPhongMaterial({
        color: 0xffff00,
        specular: 0x0000ff,
        shininess: 120,
      });
      //网格模型对象Mesh
      this.mesh = new THREE.Mesh(geometry, material);
      var mesh1 = new THREE.Mesh(geometry1, material1);
      mesh1.position.set(130, 0, 0);
      var mesh2 = new THREE.Mesh(geometry2, material2);
      mesh2.position.set(-125, 0, 0);
      //网格模型添加到场景中
      this.scene.add(this.mesh);
      this.scene.add(mesh1);
      this.scene.add(mesh2);
      //点光源
      var point = new THREE.PointLight(0xffffff);
      point.position.set(100, 400, 300); //点光源位置
      this.scene.add(point); //点光源添加到场景中
      //环境光
      var ambient = new THREE.AmbientLight(0x444444);
      this.scene.add(ambient);
      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
      var axesHelper = new THREE.AxesHelper(400);
      this.scene.add(axesHelper);
      // this.T0 = new Date(); //上次时间
      this.render();
    },
    render() {
      //   let T1 = new Date(); //本次时间
      //   let t = T1 - this.T0; //时间差
      //   this.T0 = T1; //把本次时间赋值给上次时间
      // requestAnimationFrame(this.render); //请求再次执行渲染函数render
      this.renderer.render(this.scene, this.camera); //执行渲染操作
      //   this.mesh.rotateY(0.001 * t); //旋转角速度0.001弧度每毫秒
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
    },
  },
  //后续还要在beforeDestory中进行销毁
  beforeDestroy() {
    this.dom = null;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;
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