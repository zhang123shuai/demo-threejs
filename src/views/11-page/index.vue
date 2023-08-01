<template>
    <div class="customCropper-container">
      <div class="cropper-title">自定义裁剪</div>
      <div class="cropper-container">
        <div class="operate-picture">
          <PictureCropper
            ref="picture"
            :initialImg="initialImg"
            :cropperHeight="cropperHeight"
            :cropperWidth="cropperWidth"
            :autoCropWidth="autoCropWidth"
            :autoCropHeight="autoCropHeight"
            @picturePreview="picturePreview"
          />
          <div class="operate-button">
            <el-upload
              class="upload-button"
              action="/"
              :before-upload="beforeUploadAction"
              accept="image/*"
            >
              <!-- <el-button class="common-button blue-border">上传图片</el-button> -->
            </el-upload>
            <el-button 
              class="common-button blue-border" 
              @click="rotateLeft"
            >向左旋转</el-button>
            <el-button 
              class="common-button blue-border" 
              @click="rotateRight"
            >向右旋转</el-button>
            <el-button 
              class="common-button blue-border" 
              @click="zoom(1)"
            >放大</el-button>
            <el-button 
              class="common-button blue-border"
              @click="zoom(-1)"
            >缩小</el-button>
            <el-button 
              class="common-button blue-border" 
              @click="download"
            >下载图片</el-button>
          </div>
        </div>
        <!-- <div class="preview-picture">
          <div class="picture">
            <div class="preview-container" :style="previews.div">
              <img class="preview-img" :src="previews.url" :style="previews.img">
            </div>
            <div class="preview-container preview-radius" :style="previews.div">
              <img class="preview-img" :src="previews.url" :style="previews.img">
            </div>
          </div>
          <el-button 
              class="common-button blue-border upload-avatar" 
              @click="uploadAvatar('blob')"
          >上传头像</el-button>
        </div> -->
      </div>
    </div>
  </template>
   
  <script>
  import PictureCropper from './pictureCropper.vue'
  export default {
    name: 'customCropper',
    components:{
      PictureCropper,
    },
    data(){
      return{
        initialImg: require('@/assets/shushu.jpg'),  // 本地图片用require,链接地址不用
        previews: {},
        cropperHeight: '500px',  // 裁剪图片容器高度
        cropperWidth: '800px',   // 裁剪图片容器宽度
        autoCropWidth: 200,
        autoCropHeight: 200,
      }
    },
    methods:{
      picturePreview(data){
        this.previews = data
      },
      // 向左旋转
      rotateLeft(){
        this.$refs.picture.rotateLeft()
      },
      // 向左旋转
      rotateRight(){
        this.$refs.picture.rotateLeft()
      },
      // 放大、缩小
      zoom(num){
        num = num || 1
        this.$refs.picture.changeScale(num)
      },
      // 下载图片
      async download(){
        let aLink = document.createElement('a')
        aLink.download = '下载裁剪图片'
        let data = await this.$refs.picture.getBase64()
        aLink.href = data
        aLink.click()
      },
      // 上传图片之前
      beforeUploadAction(file){
        return new Promise((resolve, reject) => {
          // 转换为blob
          var reader = new FileReader()
          let reg = /\.jpg$|\.jpeg$|\.gif$|\.png$/i
          // 转化为base64
          reader.readAsDataURL(file)
          let name = file.name
          if (reg.test(name)) {
            reader.onload = (e) => {
              let data
              if (typeof e.target.result === 'object') {
                data = window.URL.createObjectURL(new Blob([e.target.result]))
              } else {
                data = e.target.result
              }
              this.initialImg = data
              resolve(data)
            }
          } else {
            this.$message.error('请上传图片')
            reject()
          }
        })
      },
      // 上传头像到服务器
      async uploadAvatar(type){
        if(type === 'blob'){
          // 获取截图的blob数据
          let data = await this.$refs.picture.getBlob()
          this.uploadPhoto(data)
        }
      },
      async uploadPhoto(blob){
        try{
          const formData = new FormData()
          formData.append('file',blob,'.jpg')
          // 上传头像的业务代码...省略
          this.$message.success('修改头像成功')
        } catch (error){
          this.$message.error('修改头像失败')
        }
      }
    }
  }
  </script>
   