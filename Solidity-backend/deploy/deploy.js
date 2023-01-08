const { network } = require("hardhat");
const { CRYPTO_DEV_TOKEN_CONTRACT_ADDRESS } = require("../helper-hardhat-config");

module.exports=async({deployments,getNamedAccounts})=>{
  const{deploy,log}=deployments;
  const {deployer}=await getNamedAccounts();
   const chainId=network.config.chainId;
 const args=[CRYPTO_DEV_TOKEN_CONTRACT_ADDRESS];
   const exChange=await deploy("Exchange",{
    from:deployer,
    log:true,
    args:args,
    waitConfirmations:network.config.waitConfirmations||1
   });

   log(`Exchange Contract deployed at ${exChange.address}`);
}


//contract address of deployed contract on Goerli network