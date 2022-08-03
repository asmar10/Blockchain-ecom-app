const diaspora = artifacts.require("diaspora.sol");
const paymentProcess = artifacts.require("paymentProcess.sol");

module.exports = async function (deployer, network, addresses) {
  const [admin, payer, _] = addresses;

  if (network == "develop") {
    await deployer.deploy(diaspora);
    const disp = await diaspora.deployed();
    await disp.faucet(payer, web3.utils.toWei("10000"));

    await deployer.deploy(paymentProcess, admin, disp.address);
  } else {
    const ADMIN_ADDRESS = "";
    const DISP_ADDRESS = "";
    await deployer.deploy(paymentProcess, ADMIN_ADDRESS, DISP_ADDRESS);
  }
};
