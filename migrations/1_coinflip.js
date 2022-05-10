const Coinflip = artifacts.require("Coinflip");

module.exports = function (deployer) {
    deployer.deploy(Coinflip, '0x221199899C1AFCBAa2eB863Ffe42751Ec7405736');
};