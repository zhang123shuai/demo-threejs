<template>
    <div class="pictureCropper-container">
      <div class="cropper-content-box" :style="{height: cropperHeight, width: cropperWidth}">
        <VueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.outputSize"
          :outputType="option.outputType"
          :info="option.info"
          :canScale="option.canScale"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :full="option.full"
          :fixedBox="option.fixedBox"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :centerBox="option.centerBox"
          :height="option.height"
          :infoTrue="option.infoTrue"
          :maxImgSize="option.maxImgSize"
          :enlarge="option.enlarge"
          :mode="option.mode"
          @realTime="realTime"
        >
        </VueCropper>
      </div>
    </div>
  </template>
   
  <script>
  import { VueCropper } from 'vue-cropper'
  export default {
    name: 'index',
    components:{
      VueCropper,
    },
    props:{
      initialImg:{
        type: String,
        default: ""
      },
      cropperWidth:{
        type: String,
        default: '200px'
      },
      cropperHeight:{
        type: String,
        default: '200px'
      },
      autoCropWidth:{
        type:Number,
        default: 200,
      },
      autoCropHeight:{
        type:Number,
        default: 200,
      },
    },
    watch:{
      initialImg:{
        deep: true,
        immediate: true,
        handler(val){
          this.option.img = val
        }
      }
    },
    data(){
      return {
        previews: {},
        option: {
          img: this.initialImg, // 裁剪图片的地址
          outputSize: 1, // 裁剪生成图片的质量(可选0.1 - 1)
          outputType: 'png', // 裁剪生成图片的格式（jpeg || png || webp）
          info: true, // 图片大小信息
          canScale: true, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: this.autoCropWidth, // 默认生成截图框宽度
          autoCropHeight: this.autoCropHeight, // 默认生成截图框高度
          fixed: true, // 是否开启截图框宽高固定比例
          fixedNumber: [1, 1], // 截图框的宽高比例
          full: false, // false按原比例裁切图片，不失真
          fixedBox: true, // 固定截图框大小，不允许改变
          canMove: false, // 上传图片是否可以移动
          canMoveBox: true, // 截图框能否拖动
          original: false, // 上传图片按照原始比例渲染
          centerBox: false, // 截图框是否被限制在图片里面
          height: true, // 是否按照设备的dpr 输出等比例图片
          infoTrue: false, // true为展示真实输出图片宽高，false展示看到的截图框宽高
          maxImgSize: 3000, // 限制图片最大宽度和高度
          enlarge: 1 // 图片根据截图框输出比例倍数
        },
      }
    },
    methods: {
      // 实时预览函数
      realTime (data) {
        this.previews = data
        this.$emit('picturePreview',data)
      },
      // 图片缩放
      changeScale (num) {
        num = num || 1
        this.$refs.cropper.changeScale(num)
      },
      // 向左旋转
      rotateLeft () {
        this.$refs.cropper.rotateLeft()
      },
      // 向右旋转
      rotateRight () {
        this.$refs.cropper.rotateRight()
      },
      // 获取截图base64格式
      getBase64(){
        return new Promise(resolve => {
          this.$refs.cropper.getCropData((data) => {
            resolve(data)
          })
        })
      },
      // 获取截图blob格式
      getBlob(){
        return new Promise(resolve => {
          this.$refs.cropper.getCropBlob((data) => {
            resolve(data)
          })
        })
      }
    }
  }
  </script>