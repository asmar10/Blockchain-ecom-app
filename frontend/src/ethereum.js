import { ethers, Contract } from "ethers";
import paymentProcess from "./contracts/paymentProcess";
import diaspora from "./contracts/diaspora.json";

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const PaymentProcess = new Contract(
          paymentProcess.networks[window.ethereum.networkVersion].address,
          paymentProcess.abi,
          signer
        );
        const Diaspora = new Contract(
          diaspora.networks[window.ethereum.networkVersion].address,
          diaspora.abi,
          signer
        );
        resolve({ provider, paymentProcess, Diaspora });
      }
      resolve({
        provider: undefined,
        PaymentProcess: undefined,
        Diaspora: undefined,
      });
    });
  });
export default getBlockchain;
