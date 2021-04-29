(self["webpackChunk_lenna_project_watermark"] = self["webpackChunk_lenna_project_watermark"] || []).push([[867],{

/***/ 258:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 867:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Widget)
});

// EXTERNAL MODULE: consume shared module (default) vue@^3.0.11 (strict) (fallback: ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js)
var runtime_dom_esm_bundler_js_ = __webpack_require__(748);
;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[4].use[0]!./src/Widget.vue?vue&type=template&id=5392cf34&scoped=true

const _withId = /*#__PURE__*/(0,runtime_dom_esm_bundler_js_.withScopeId)("data-v-5392cf34")

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return ((0,runtime_dom_esm_bundler_js_.openBlock)(), (0,runtime_dom_esm_bundler_js_.createBlock)("div", null, [
    (0,runtime_dom_esm_bundler_js_.createVNode)("div", {
      class: "imagePreviewWrapper",
      style: { 'background-image': `url(${_ctx.previewImage})` },
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.selectImage && _ctx.selectImage(...args)))
    }, null, 4),
    (0,runtime_dom_esm_bundler_js_.createVNode)("input", {
      ref: "fileInput",
      type: "file",
      onInput: _cache[2] || (_cache[2] = (...args) => (_ctx.pickFile && _ctx.pickFile(...args)))
    }, null, 544)
  ]))
})
;// CONCATENATED MODULE: ./src/Widget.vue?vue&type=template&id=5392cf34&scoped=true

;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[4].use[0]!./src/Widget.vue?vue&type=script&lang=js


/* harmony default export */ const Widgetvue_type_script_lang_js = ((0,runtime_dom_esm_bundler_js_.defineComponent)({
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
}));

;// CONCATENATED MODULE: ./src/Widget.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-2.use[0]!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[4].use[0]!./src/Widget.vue?vue&type=style&index=0&id=5392cf34&scoped=true&lang=css
var Widgetvue_type_style_index_0_id_5392cf34_scoped_true_lang_css = __webpack_require__(258);
;// CONCATENATED MODULE: ./src/Widget.vue?vue&type=style&index=0&id=5392cf34&scoped=true&lang=css

;// CONCATENATED MODULE: ./src/Widget.vue




;
Widgetvue_type_script_lang_js.render = render
Widgetvue_type_script_lang_js.__scopeId = "data-v-5392cf34"

/* harmony default export */ const Widget = (Widgetvue_type_script_lang_js);

/***/ })

}]);
//# sourceMappingURL=867.js.map