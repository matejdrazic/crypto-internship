const CoinFactory = artifacts.require("CoinFactory");

module.exports = function(deployer) {
  deployer.deploy(CoinFactory);
};
