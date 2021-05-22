(self["webpackChunk_lenna_project_watermark"] = self["webpackChunk_lenna_project_watermark"] || []).push([[456],{

/***/ 948:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 456:
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
;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[4].use[0]!./src/Widget.vue?vue&type=template&id=1d801536&scoped=true

const _withId = /*#__PURE__*/(0,runtime_dom_esm_bundler_js_.withScopeId)("data-v-1d801536")

;(0,runtime_dom_esm_bundler_js_.pushScopeId)("data-v-1d801536")
const _hoisted_1 = /*#__PURE__*/(0,runtime_dom_esm_bundler_js_.createVNode)("label", null, "x: ", -1)
const _hoisted_2 = /*#__PURE__*/(0,runtime_dom_esm_bundler_js_.createVNode)("label", null, "y: ", -1)
;(0,runtime_dom_esm_bundler_js_.popScopeId)()

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
    }, null, 544),
    (0,runtime_dom_esm_bundler_js_.createVNode)("div", null, [
      _hoisted_1,
      (0,runtime_dom_esm_bundler_js_.withDirectives)((0,runtime_dom_esm_bundler_js_.createVNode)("input", {
        type: "number",
        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => (_ctx.x = $event)),
        onChange: _cache[4] || (_cache[4] = $event => (_ctx.updateConfig()))
      }, null, 544), [
        [
          runtime_dom_esm_bundler_js_.vModelText,
          _ctx.x,
          void 0,
          { number: true }
        ]
      ]),
      _hoisted_2,
      (0,runtime_dom_esm_bundler_js_.withDirectives)((0,runtime_dom_esm_bundler_js_.createVNode)("input", {
        type: "number",
        "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => (_ctx.y = $event)),
        onChange: _cache[6] || (_cache[6] = $event => (_ctx.updateConfig()))
      }, null, 544), [
        [
          runtime_dom_esm_bundler_js_.vModelText,
          _ctx.y,
          void 0,
          { number: true }
        ]
      ])
    ])
  ]))
})
;// CONCATENATED MODULE: ./src/Widget.vue?vue&type=template&id=1d801536&scoped=true

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
      y: 0,
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
      if (!this.previewImage) return;
      let watermark = this.previewImage
        .replace("data:image/jpeg;base64,", "")
        .replace("data:image/png;base64,", "");
      let config = {
        watermark: watermark,
        x: this.x,
        y: this.y,
      };
      this.$emit("changeConfig", config);
    },
  },
  created() {
    this.previewImage = "data:image/png;base64," + this.defaultConfig.watermark;
    (this.x = this.defaultConfig.x), (this.y = this.defaultConfig.y);
    this.updateConfig();
  },
}));

;// CONCATENATED MODULE: ./src/Widget.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-2.use[0]!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[4].use[0]!./src/Widget.vue?vue&type=style&index=0&id=1d801536&scoped=true&lang=css
var Widgetvue_type_style_index_0_id_1d801536_scoped_true_lang_css = __webpack_require__(948);
;// CONCATENATED MODULE: ./src/Widget.vue?vue&type=style&index=0&id=1d801536&scoped=true&lang=css

;// CONCATENATED MODULE: ./src/Widget.vue




;
Widgetvue_type_script_lang_js.render = render
Widgetvue_type_script_lang_js.__scopeId = "data-v-1d801536"

/* harmony default export */ const Widget = (Widgetvue_type_script_lang_js);

/***/ })

}]);
//# sourceMappingURL=456.js.map