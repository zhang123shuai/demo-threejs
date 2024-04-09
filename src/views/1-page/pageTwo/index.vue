<template>
  <div class="onepageWarp">
    <div class="three_twopage" ref="three_twopage"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; //鼠标拖拽控制器
export default {
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.windowResize();
      this.initOrbitControls();
    });
    this.dom = null;
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
      this.dom = this.$refs.three_twopage;
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
      this.camera.position.set(100, 400, 300);
      this.camera.lookAt(0, 0, 0);
      //定义一个场景
      this.scene = new THREE.Scene();

      //定义物体
      var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
      //类型数组创建顶点数据
      var vertices = new Float32Array([
        0, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 50, 0, 10,
      ]);
      // 创建属性缓冲区对象
      var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
      // 设置几何体attributes属性的位置position属性
      geometry.attributes.position = attribue;
      //类型数组创建顶点颜色color数据
      var colors = new Float32Array([
        1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1,
      ]);
      // 设置几何体attributes属性的颜色color属性
      geometry.attributes.color = new THREE.BufferAttribute(colors, 3); //3个为一组,表示一个顶点的颜色数据RGB
      var normals = new Float32Array([
        0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0,
      ]);
      // 设置几何体attributes属性的位置normal属性
      geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的法向量数据

      //材质对象
      // 三角面(网格)渲染模式
      var material = new THREE.MeshBasicMaterial({
        // color: 0x0000ff, //三角面颜色
        vertexColors: THREE.VertexColors, //以顶点颜色为准
        side: THREE.DoubleSide, //两面可见
      }); //材质对象
      //网格模型对象Mesh
      var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      mesh.position.set(70, 0, 0);
      //网格模型添加到场景中
      this.scene.add(mesh);

      // 点渲染模式
      var material1 = new THREE.PointsMaterial({
        // color: 0xff0000, // 使用顶点颜色数据渲染模型，不需要再定义color属性
        vertexColors: THREE.VertexColors, //以顶点颜色为准
        size: 10.0, //点对象像素尺寸
      }); //材质对象
      var points = new THREE.Points(geometry, material1); //点模型对象
      points.position.set(0, 0, 0);
      this.scene.add(points); //点对象添加到场景中

      // 线条渲染模式
      var material2 = new THREE.LineBasicMaterial({
        // color: 0xff0000, //线条颜色
        vertexColors: THREE.VertexColors, //以顶点颜色为
      }); //材质对象
      var line = new THREE.Line(geometry, material2); //线条模型对象
      line.position.set(-70, 0, 0);
      this.scene.add(line); //线条对象添加到场景中

      var geometry3 = new THREE.BoxGeometry(50, 50, 50); //创建一个立方体几何对象Geometry
      var material3 = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
      }); //材质对象Material
      var mesh3 = new THREE.Mesh(geometry3, material3); //网格模型对象Mesh
      mesh3.position.set(0, 200, 0);
      this.scene.add(mesh3);

      // 不使用顶点索引绘制矩形
      var geometry1 = new THREE.BufferGeometry(); //声明一个空几何体对象
      //类型数组创建顶点位置position数据
      var vertices1 = new Float32Array([
        0, 0, 0, 80, 0, 0, 80, 80, 0, 0, 0, 0, 80, 80, 0, 0, 80, 0,
      ]);
      // 创建属性缓冲区对象
      var attribue1 = new THREE.BufferAttribute(vertices1, 3); //3个为一组
      // 设置几何体attributes属性的位置position属性
      geometry1.attributes.position = attribue1;
      var normals1 = new Float32Array([
        0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      ]);
      // 设置几何体attributes属性的位置normal属性
      geometry1.attributes.normal = new THREE.BufferAttribute(normals1, 3); //3个为一组,表示一个顶点的xyz坐标
      var material1 = new THREE.MeshBasicMaterial({
        color: 0x0000ff, //三角面颜色
        side: THREE.DoubleSide, //两面可见
      }); //材质对象
      //网格模型对象Mesh
      var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
      mesh1.position.set(130, 0, 0);
      //网格模型添加到场景中
      this.scene.add(mesh1);

      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
      var axesHelper = new THREE.AxesHelper(400);
      this.scene.add(axesHelper);

      this.dingdian();
      this.accessGeometry();

      this.render();
    },
    render() {
      this.renderer.render(this.scene, this.camera); //执行渲染操作
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
    //2.5设置Geometry顶点位置、顶点颜色数据(原来已弃用，现用一下方法)
    dingdian() {
      var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
      var p1 = new THREE.Vector3(50, 0, 0); //顶点1坐标
      var p2 = new THREE.Vector3(0, 70, 0); //顶点2坐标
      var p3 = new THREE.Vector3(80, 70, 0); //顶点3坐标
      var pointsArray = new Array();
      pointsArray.push(p1, p2, p3);
      //顶点坐标添加到geometry对象
      geometry.setFromPoints(pointsArray);
      var colors = new Float32Array([
        1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1,
      ]);
      // 设置几何体attributes属性的颜色color属性
      geometry.attributes.color = new THREE.BufferAttribute(colors, 3); //3个为一组,表示一个顶点的颜色数据RGB

      var material = new THREE.MeshBasicMaterial({
        // color: 0x0000ff, //三角面颜色
        vertexColors: THREE.VertexColors, //以顶点颜色为准
        side: THREE.DoubleSide, //两面可见
      }); //材质对象
      //网格模型对象Mesh
      var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      mesh.position.set(130, 100, 0);
      //网格模型添加到场景中
      this.scene.add(mesh);
    },
    //2.7访问几何体对象的数据
    accessGeometry() {
      //测试BoxGeometry
      var geometry = new THREE.BoxGeometry(200, 100, 100); //创建一个立方体几何对象Geometry
      console.log(geometry);
      //   console.log("几何体顶点位置数据", geometry.vertices);
      //   console.log("三角行面数据", geometry.faces);
      // 遍历几何体的face属性
      //   geometry.faces.forEach((face) => {
      //     // 设置三角面face三个顶点的颜色
      //     face.vertexColors = [
      //       new THREE.Color(0xffff00),
      //       new THREE.Color(0xff00ff),
      //       new THREE.Color(0x00ffff),
      //     ];
      //   });

      // 几何体xyz三个方向都放大2倍
      // geometry.scale(2, 2, 2);
      // 几何体沿着x轴平移50
      // geometry.translate(50, 0, 0);
      // 几何体绕着x轴旋转45度
      // geometry.rotateX(Math.PI / 4);
      // 居中：偏移的几何体居中
      // geometry.center();
      var material = new THREE.MeshBasicMaterial({
        // color: 0x0000ff,
        vertexColors: THREE.FaceColors,
      });
      //网格模型对象Mesh
      var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      mesh.position.set(-200, 50, 50);
      //网格模型添加到场景中
      this.scene.add(mesh);

      //   测试PlaneBufferGeometry
      //创建一个矩形平面几何体
      var geometry1 = new THREE.PlaneBufferGeometry(30, 30);
      //   console.log(geometry1);
      //   console.log("几何体顶点位置数据", geometry1.attributes.position);
      //   console.log("几何体索引数据", geometry1.index);
      var material1 = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide, //两面可见
      });
      var mesh = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
      mesh.position.set(230, 50, 50);
      //网格模型添加到场景中
      this.scene.add(mesh);
    },
  }, //后续还要在beforeDestory中进行销毁
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
  .three_twopage {
    height: 100%;
  }
}
</style>