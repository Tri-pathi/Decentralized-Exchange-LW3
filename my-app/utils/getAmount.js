/**
 * getEtherBalance retrieves the balance of user  in contract=> basically invested amount of user in DEX
 * 
 */

import { ethers } from "ethers";
import { EXCHANGE_CONTRACT_ABI, EXCHANGE_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS } from "../constant";


export const getEtherBalance=async(provider, address, contract = false)=>{
    try {
        // If the caller has set the `contract` boolean to true, retrieve the balance of
    // ether in the `exchange contract`, if it is set to false, retrieve the balance
    // of the user's address
    if (contract) {
        const balance = await provider.getBalance(EXCHANGE_CONTRACT_ADDRESS);
        return balance;
      } else {
        const balance = await provider.getBalance(address);
        return balance;
      }
    } catch (error) {
        console.log(error);
    }
}
/**
 * getCDTokensBalance for the Crypto DEv tokens in the account of provided address
 */

export const getCDTokensBalance=async(provider, address)=>{
    try {
        const tokenContract= new ethers.Contract(TOKEN_CONTRACT_ADDRESS,TOKEN_CONTRACT_ABI,provider);
        const balanceOfCryptoDevTokens=await tokenContract.balanceOf(address);
        return balanceOfCryptoDevTokens;
    } catch (error) {
        console.log(error);
    }
}
/**
 * 
 * @returns LP tokens in the account of provided address
 */
export const getLPTokensBalance =async(provider, address)=>{
    try {
        const exchangeContract=new ethers.Contract(EXCHANGE_CONTRACT_ADDRESS,EXCHANGE_CONTRACT_ABI,provider);

        const balanceOfLPTokens=await exchangeContract.balanceOf(address);
        return balanceOfLPTokens;
        
    } catch (error) {
        console.log(error);
    }
}
export const getReserveOfCDTokens=async(provider)=>{
    try {
        const exchangeContract=new ethers.Contract(EXCHANGE_CONTRACT_ADDRESS,EXCHANGE_CONTRACT_ABI,provider);
        const reserve=await exchangeContract.getReserve();
        return reserve
    } catch (error) {
        console.log(error);
    }
}