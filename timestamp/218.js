(self["webpackChunk_lenna_project_timestamp"] = self["webpackChunk_lenna_project_timestamp"] || []).push([[218],{

/***/ 218:
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
;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./src/Widget.vue?vue&type=template&id=48e0f824&scoped=true

const _withId = /*#__PURE__*/(0,runtime_dom_esm_bundler_js_.withScopeId)("data-v-48e0f824")

;(0,runtime_dom_esm_bundler_js_.pushScopeId)("data-v-48e0f824")
const _hoisted_1 = { class: "plugin-config" }
;(0,runtime_dom_esm_bundler_js_.popScopeId)()

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return ((0,runtime_dom_esm_bundler_js_.openBlock)(), (0,runtime_dom_esm_bundler_js_.createBlock)("div", _hoisted_1, [
    (0,runtime_dom_esm_bundler_js_.withDirectives)((0,runtime_dom_esm_bundler_js_.createVNode)("input", {
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.timestamp = $event)),
      placeholder: "2021:07:24 14:25:10"
    }, null, 512), [
      [runtime_dom_esm_bundler_js_.vModelText, _ctx.timestamp]
    ])
  ]))
})
;// CONCATENATED MODULE: ./src/Widget.vue?vue&type=template&id=48e0f824&scoped=true

;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./src/Widget.vue?vue&type=script&lang=js


/* harmony default export */ const Widgetvue_type_script_lang_js = ((0,runtime_dom_esm_bundler_js_.defineComponent)({
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
}));

;// CONCATENATED MODULE: ./src/Widget.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/Widget.vue




;
Widgetvue_type_script_lang_js.render = render
Widgetvue_type_script_lang_js.__scopeId = "data-v-48e0f824"

/* harmony default export */ const Widget = (Widgetvue_type_script_lang_js);

/***/ })

}]);
//# sourceMappingURL=218.js.map