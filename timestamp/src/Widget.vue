<template>
  <div class="plugin-config">
    <input v-model="timestamp" placeholder="2021:07:24 14:25:10" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TimestampWidget",
  props: {
    defaultConfig: Object,
  },
  data() {
    return {
      clear: false,
      author: null,
      description: null,
    };
  },
  methods: {
    async updateConfig() {
      let config = {
        timestamp: this.timestamp,
      };
      this.$emit("changeConfig", config);
    },
  },
  created() {
    this.updateConfig();
  },
});
</script>

<style scoped lang="css">
.plugin-config {
  margin: 5px;
}
</style>
