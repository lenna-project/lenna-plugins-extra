(self["webpackChunk_lenna_project_watermark"] = self["webpackChunk_lenna_project_watermark"] || []).push([[821,867],{

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

/***/ }),

/***/ 319:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "defaultConfig": () => (/* binding */ defaultConfig),
  "description": () => (/* binding */ description),
  "name": () => (/* binding */ src_name),
  "process": () => (/* binding */ process),
  "processor": () => (/* binding */ processor),
  "ui": () => (/* binding */ ui)
});

// EXTERNAL MODULE: ./node_modules/@metamask/detect-provider/dist/index.js
var dist = __webpack_require__(3);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);
// EXTERNAL MODULE: ./node_modules/@ethersproject/bignumber/lib.esm/bignumber.js
var bignumber = __webpack_require__(593);
// EXTERNAL MODULE: ./node_modules/@ethersproject/units/lib.esm/index.js + 2 modules
var lib_esm = __webpack_require__(616);
;// CONCATENATED MODULE: ./src/payment.js



const apiKey = "YourApiKeyToken";

const accountSent = async (address, payAddress, ethPrice) => {
  return await fetch(
    `https://api-kovan.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      let res = data.result.map(
        (tx) =>
          tx.to === payAddress.toLowerCase() &&
          bignumber/* BigNumber.from */.O$.from(tx.value) >= lib_esm/* parseEther */.fi(ethPrice.toString())
      );
      return res;
    })
    .then((txs) => txs.includes(true))
    .catch((e) => {
      console.log(e);
      return false;
    });
};

const isPayed = async (payAddress, ethPrice) => {
  const provider = await dist_default()();
  if (provider) {
    const ethereum = window.ethereum;

    let payed = await ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        return Promise.all(
          accounts.map((address) => accountSent(address, payAddress, ethPrice))
        );
      })
      .catch((err) => {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    return payed.includes(true);
  } else {
    console.log("Please install MetaMask!");
    return false;
  }
};

const pay = async (payAddress, ethPrice) => {
  const provider = await dist_default()();
  if (provider) {
    const ethereum = window.ethereum;
    const transactionParameters = {
      to: payAddress,
      from: ethereum.selectedAddress,
      value: lib_esm/* parseEther */.fi(ethPrice.toString()).toHexString(),
    };

    return await ethereum
      .request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })
      .then(() => true)
      .catch((_error) => false);
  } else {
    console.log("Please install MetaMask!");
    return false;
  }
};



// EXTERNAL MODULE: ./src/Widget.vue + 5 modules
var Widget = __webpack_require__(867);
;// CONCATENATED MODULE: ./src/index.js
const pkg = __webpack_require__.e(/* import() */ 844).then(__webpack_require__.bind(__webpack_require__, 844));


const payAddress = "0xb81C8Fb3e8811C239406F39bdDDF056Ea4B8fF37";
const ethPrice = 0.002;


const ui = Widget.default;
const processor = pkg;
const src_name = () => "watermark";
const description = () => "Plugin to add watermark to image.";
const process = async (config, image) => {
  if (!(await isPayed(payAddress, ethPrice))) {
    if (!(await pay(payAddress, ethPrice))) {
      return image;
    }
  }
  return __webpack_require__.e(/* import() */ 844).then(__webpack_require__.bind(__webpack_require__, 844)).then((processor) => processor.process(config, image));
};
const defaultConfig = async () => {
  return { watermark: "", x:0, y:0 };
};


/***/ }),

/***/ 601:
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=821.js.map