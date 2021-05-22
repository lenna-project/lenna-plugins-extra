(self["webpackChunk_lenna_project_denoise"] = self["webpackChunk_lenna_project_denoise"] || []).push([[319,179],{

/***/ 3:
/***/ ((module) => {

"use strict";

/**
 * Returns a Promise that resolves to the value of window.ethereum if it is
 * set within the given timeout, or null.
 * The Promise will not reject, but an error will be thrown if invalid options
 * are provided.
 *
 * @param options - Options bag.
 * @param options.mustBeMetaMask - Whether to only look for MetaMask providers.
 * Default: false
 * @param options.silent - Whether to silence console errors. Does not affect
 * thrown errors. Default: false
 * @param options.timeout - Milliseconds to wait for 'ethereum#initialized' to
 * be dispatched. Default: 3000
 * @returns A Promise that resolves with the Provider if it is detected within
 * given timeout, otherwise null.
 */
function detectEthereumProvider({ mustBeMetaMask = false, silent = false, timeout = 3000, } = {}) {
    _validateInputs();
    let handled = false;
    return new Promise((resolve) => {
        if (window.ethereum) {
            handleEthereum();
        }
        else {
            window.addEventListener('ethereum#initialized', handleEthereum, { once: true });
            setTimeout(() => {
                handleEthereum();
            }, timeout);
        }
        function handleEthereum() {
            if (handled) {
                return;
            }
            handled = true;
            window.removeEventListener('ethereum#initialized', handleEthereum);
            const { ethereum } = window;
            if (ethereum && (!mustBeMetaMask || ethereum.isMetaMask)) {
                resolve(ethereum);
            }
            else {
                const message = mustBeMetaMask && ethereum
                    ? 'Non-MetaMask window.ethereum detected.'
                    : 'Unable to detect window.ethereum.';
                !silent && console.error('@metamask/detect-provider:', message);
                resolve(null);
            }
        }
    });
    function _validateInputs() {
        if (typeof mustBeMetaMask !== 'boolean') {
            throw new Error(`@metamask/detect-provider: Expected option 'mustBeMetaMask' to be a boolean.`);
        }
        if (typeof silent !== 'boolean') {
            throw new Error(`@metamask/detect-provider: Expected option 'silent' to be a boolean.`);
        }
        if (typeof timeout !== 'number') {
            throw new Error(`@metamask/detect-provider: Expected option 'timeout' to be a number.`);
        }
    }
}
module.exports = detectEthereumProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVlBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILFNBQVMsc0JBQXNCLENBQUMsRUFDOUIsY0FBYyxHQUFHLEtBQUssRUFDdEIsTUFBTSxHQUFHLEtBQUssRUFDZCxPQUFPLEdBQUcsSUFBSSxHQUNmLEdBQUcsRUFBRTtJQUVKLGVBQWUsRUFBRSxDQUFDO0lBRWxCLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUVwQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDN0IsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1lBRW5CLGNBQWMsRUFBRSxDQUFDO1NBRWxCO2FBQU07WUFFTCxNQUFNLENBQUMsZ0JBQWdCLENBQ3JCLHNCQUFzQixFQUN0QixjQUFjLEVBQ2QsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQ2YsQ0FBQztZQUVGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsY0FBYyxFQUFFLENBQUM7WUFDbkIsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2I7UUFFRCxTQUFTLGNBQWM7WUFFckIsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsT0FBTzthQUNSO1lBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQztZQUVmLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxzQkFBc0IsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUVuRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDO1lBRTVCLElBQUksUUFBUSxJQUFJLENBQUMsQ0FBQyxjQUFjLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUN4RCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbkI7aUJBQU07Z0JBRUwsTUFBTSxPQUFPLEdBQUcsY0FBYyxJQUFJLFFBQVE7b0JBQ3hDLENBQUMsQ0FBQyx3Q0FBd0M7b0JBQzFDLENBQUMsQ0FBQyxtQ0FBbUMsQ0FBQztnQkFFeEMsQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDaEUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2Y7UUFDSCxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxTQUFTLGVBQWU7UUFDdEIsSUFBSSxPQUFPLGNBQWMsS0FBSyxTQUFTLEVBQUU7WUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyw4RUFBOEUsQ0FBQyxDQUFDO1NBQ2pHO1FBQ0QsSUFBSSxPQUFPLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO1NBQ3pGO1FBQ0QsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO1NBQ3pGO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFsRkQsaUJBQVMsc0JBQXNCLENBQUMifQ==

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
  "processor": () => (/* binding */ processor)
});

// EXTERNAL MODULE: ./node_modules/@metamask/detect-provider/dist/index.js
var dist = __webpack_require__(3);
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
          BigNumber.from(tx.value) >= utils.parseEther(ethPrice.toString())
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
  const provider = await detectEthereumProvider();
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
  const provider = await detectEthereumProvider();
  if (provider) {
    const ethereum = window.ethereum;
    const transactionParameters = {
      to: payAddress,
      from: ethereum.selectedAddress,
      value: utils.parseEther(ethPrice.toString()).toHexString(),
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



;// CONCATENATED MODULE: ./src/index.js
const pkg = __webpack_require__.e(/* import() */ 381).then(__webpack_require__.bind(__webpack_require__, 381));


const payAddress = "0xb81C8Fb3e8811C239406F39bdDDF056Ea4B8fF37";
const ethPrice = 0.002;

const processor = pkg;
const src_name = () => "denoise";
const description = () => "Plugin to denoise images.";
const process = async (config, image) => {
  /*if (!(await isPayed(payAddress, ethPrice))) {
    if (!(await pay(payAddress, ethPrice))) {
      return image;
    }
  }
  */
  return __webpack_require__.e(/* import() */ 381).then(__webpack_require__.bind(__webpack_require__, 381)).then((processor) => processor.process(config, image));
};
const defaultConfig = async () => {
  return { threshold: 20, samples: 64 };
};


/***/ })

}]);
//# sourceMappingURL=319.js.map