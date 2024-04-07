// recorder-processor.js

class RecorderProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
      this.sampleRate = 16000;
      this.channelCount = 1;
      this.bytesPerSample = 2; // 16-bit, i.e., 2 bytes
      this.recordedSamples = 0;
      this.recordedData = new Float32Array(this.sampleRate * this.channelCount * 5); // 5 seconds buffer size, adjust as needed
    }
  
    process(inputs, outputs, parameters) {
      const input = inputs[0];
      const output = outputs[0];
  
      for (let channel = 0; channel < input.length; ++channel) {
        const inputData = input[channel];
        for (let i = 0; i < inputData.length; ++i) {
          this.recordedData[this.recordedSamples++] = inputData[i];
        }
      }
  
      if (this.recordedSamples >= this.recordedData.length) {
        const encodedData = new Int16Array(this.recordedData.length);
        for (let i = 0; i < this.recordedData.length; ++i) {
          encodedData[i] = Math.max(-1, Math.min(1, this.recordedData[i])) * 0x7FFF;
        }
        this.port.postMessage(encodedData.buffer);
        this.recordedSamples = 0;
      }
  
      return true;
    }
  }
  
  registerProcessor('recorder-processor', RecorderProcessor);
  