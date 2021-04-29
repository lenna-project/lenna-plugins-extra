<template>
  <div>
    <div
      class="imagePreviewWrapper"
      :style="{ 'background-image': `url(${previewImage})` }"
      @click="selectImage"
    ></div>

    <input ref="fileInput" type="file" @input="pickFile" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "WatermarkWidget",
  props: {
    defaultConfig: Object,
  },
  data() {
    return {
      previewImage: null,
      x: 0,
      y: 0
    };
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
          this.updateConfig();
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    async updateConfig() {
      if(!this.previewImage) return;
      let watermark = this.previewImage.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", "");
      let config = {
        watermark: watermark,
        x: this.x,
        y: this.y
      };
      this.$emit("changeConfig", config);
    },
  },
  created() {
    this.previewImage = this.defaultConfig.watermark;
    this.x = this.defaultConfig.x,
    this.y = this.defaultConfig.y
    this.updateConfig();
  },
});
</script>

<style scoped lang="css">
.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
</style>