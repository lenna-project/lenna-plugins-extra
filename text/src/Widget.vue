<template>
  <div class="plugin-config">
    <input v-model="text" placeholder="text" @change="updateConfig()" /><br />
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
    };
  },
  methods: {
    async updateConfig() {
      let config = {
        text: this.text,
      };
      this.$emit("changeConfig", config);
    },
  },
  created() {
    this.text = this.defaultConfig.text;
    this.updateConfig();
  },
});
</script>

<style scoped lang="css">
.plugin-config {
  margin: 5px;
}
</style>
