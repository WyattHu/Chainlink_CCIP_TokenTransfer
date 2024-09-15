const { network } = require("hardhat");
const {
    networkconfig,
    developmentChains,
} = require("../hardhat-config-helper");
require("dotenv").config();
const { verify } = require("../utility/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    let TestContract;
    log('chainId:' + chainId)
    log(deployer)
    log("Deploying TokenTransfer Contract...");
    const router = "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59";
    const link = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
    TestContract = await deploy("TokenTransfer", {
        contract: "TokenTransfer",
        from: deployer,
        log: true,
        args: [router,link],
        waitConfirmations: network.config.blockConfirmations || 1,
    });


    log("------------------------------------------------");
    log(`TokenTransfer deployed at ${TestContract.address}`);

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(TestContract.address, [router,link]);
    }
};
module.exports.tags = ["all", "TokenTransfer"];
