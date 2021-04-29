import detectEthereumProvider from "@metamask/detect-provider";
import { utils, BigNumber } from "ethers";

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

export { pay, isPayed };
