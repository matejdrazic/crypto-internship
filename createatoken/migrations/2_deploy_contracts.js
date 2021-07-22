const CoinFactory = artifacts.require("CoinFactory");

module.exports = async function (deployer) {

    await deployer.deploy(CoinFactory);
    const coinFactory = await CoinFactory.deployed();

};