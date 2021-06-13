<template>
  <div class="plugin-config">
    <input v-model="text" placeholder="text" @change="updateConfig()" /><br />
    <div>
      <label>x: </label>
      <input type="number" v-model.number="x" @change="updateConfig()" />
      <label>y: </label>
      <input type="number" v-model.number="y" @change="updateConfig()" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TextWidget",
  props: {
    defaultConfig: Object,
  },
  data() {
    return {
      text: "",
      x: 0,
      y: 0,
    };
  },
  methods: {
    async updateConfig() {
      let config = {
        text: this.text,
        x: this.x,
        y: this.y,
      };
      this.$emit("changeConfig", config);
    },
  },
  created() {
    this.text = this.defaultConfig.text;
    this.x = this.defaultConfig.x;
    this.y = this.defaultConfig.y;
    this.updateConfig();
  },
});
</script>

<style scoped lang="css">
.plugin-config {
  margin: 5px;
}
</style>
