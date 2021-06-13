(self["webpackChunk_lenna_project_text"] = self["webpackChunk_lenna_project_text"] || []).push([[593],{

/***/ 593:
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
;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[4].use[0]!./src/Widget.vue?vue&type=template&id=9c3cadae&scoped=true

const _withId = /*#__PURE__*/(0,runtime_dom_esm_bundler_js_.withScopeId)("data-v-9c3cadae")

;(0,runtime_dom_esm_bundler_js_.pushScopeId)("data-v-9c3cadae")
const _hoisted_1 = { class: "plugin-config" }
const _hoisted_2 = /*#__PURE__*/(0,runtime_dom_esm_bundler_js_.createVNode)("br", null, null, -1)
const _hoisted_3 = /*#__PURE__*/(0,runtime_dom_esm_bundler_js_.createVNode)("label", null, "x: ", -1)
const _hoisted_4 = /*#__PURE__*/(0,runtime_dom_esm_bundler_js_.createVNode)("label", null, "y: ", -1)
;(0,runtime_dom_esm_bundler_js_.popScopeId)()

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return ((0,runtime_dom_esm_bundler_js_.openBlock)(), (0,runtime_dom_esm_bundler_js_.createBlock)("div", _hoisted_1, [
    (0,runtime_dom_esm_bundler_js_.withDirectives)((0,runtime_dom_esm_bundler_js_.createVNode)("input", {
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.text = $event)),
      placeholder: "text",
      onChange: _cache[2] || (_cache[2] = $event => (_ctx.updateConfig()))
    }, null, 544), [
      [runtime_dom_esm_bundler_js_.vModelText, _ctx.text]
    ]),
    _hoisted_2,
    (0,runtime_dom_esm_bundler_js_.createVNode)("div", null, [
      _hoisted_3,
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
      _hoisted_4,
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
;// CONCATENATED MODULE: ./src/Widget.vue?vue&type=template&id=9c3cadae&scoped=true

;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[4].use[0]!./src/Widget.vue?vue&type=script&lang=js


/* harmony default export */ const Widgetvue_type_script_lang_js = ((0,runtime_dom_esm_bundler_js_.defineComponent)({
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
}));

;// CONCATENATED MODULE: ./src/Widget.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/Widget.vue




;
Widgetvue_type_script_lang_js.render = render
Widgetvue_type_script_lang_js.__scopeId = "data-v-9c3cadae"

/* harmony default export */ const Widget = (Widgetvue_type_script_lang_js);

/***/ })

}]);
//# sourceMappingURL=593.js.map