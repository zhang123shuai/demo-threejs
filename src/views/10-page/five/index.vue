<template>
  <div id="appss">
    <h1>Select a Directory</h1>
    <input type="file" webkitdirectory @change="handleDirectorySelect" />
    <ul v-if="files.length">
      <li v-for="(file, index) in files" :key="index">{{ file }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: []
    };
  },
  methods: {
    handleDirectorySelect(event) {
      const selectedFiles = event.target.files;
      this.files = [];

      // 遍历文件列表并获取每个文件的路径
      for (let i = 0; i < selectedFiles.length; i++) {
        this.files.push(selectedFiles[i].webkitRelativePath);
      }
    }
  }
};
</script>

<style>
#appss {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
