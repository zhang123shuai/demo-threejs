<template>
  <div>
    <button @click="startRecording">开始录音</button>
    <button @click="stopRecording">停止录音</button>
    <div>{{ transcribedText }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recognition: null,
      transcribedText: "",
    };
  },
  methods: {
    startRecording() {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();

      // 开始识别
      this.recognition.onstart = () => {
        console.log("开始录音");
      };

      // 接收到语音数据
      this.recognition.onresult = (event) => {
        console.log(event, "接收的语音数据");
        const resultIndex = event.resultIndex;
        const transcript = event.results[resultIndex][0].transcript;
        this.transcribedText = transcript;
      };

      // 结束识别
      this.recognition.onend = () => {
        console.log("录音结束");
      };

      // 错误处理
      this.recognition.onerror = (event) => {
        console.error("语音识别错误:", event.error);
      };

      // 开始识别
      this.recognition.start();
    },
    stopRecording() {
      if (this.recognition) {
        this.recognition.stop();
      }
    },
  },
};
</script>

<style>
/* 在这里添加样式 */
</style>
