import { ethers } from "ethers"
import { EXCHANGE_CONTRACT_ABI, EXCHANGE_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS } from "../constant"

export const getAmountOfTokensReceivedFromSwap =async( _swapAmountWei,
    provider,
    ethSelected,
    ethBalance,
    reservedCD)=>{
    const exchangeContract=new ethers.Contract(
        EXCHANGE_CONTRACT_ADDRESS,
        EXCHANGE_CONTRACT_ABI,
        provider
    );
    let amountOfTokens;
    if(ethSelected){
        amountOfTokens=await exchangeContract.getAmountOfTokens(
            _swapAmountWei,
            ethBalance,
            reservedCD
        )
    }else{
        //if eth is not selected this means input value of CD tokens
        amountOfTokens=await exchangeContract.getAmountOfTokens(
            _swapAmountWei,
            reservedCD,
            ethBalance
        )
        return amountOfTokens;
    }
}
/*
  swapTokens: Swaps `swapAmountWei` of Eth/Crypto Dev tokens with `tokenToBeReceivedAfterSwap` amount of Eth/Crypto Dev tokens.
*/

export const swapTokens=async(signer,
    swapAmountWei,
    tokenToBeReceivedAfterSwap,
    ethSelected)=>{
        const exchangeContract = new ethers.Contract(
            EXCHANGE_CONTRACT_ADDRESS,
            EXCHANGE_CONTRACT_ABI,
            signer
          );
          const tokenContract= new ethers.Contract(
            TOKEN_CONTRACT_ADDRESS,
            TOKEN_CONTRACT_ABI,
            signer
          );
          let transactionResponse;
          if (ethSelected) {
            tx = await exchangeContract.ethToCryptoDevToken(
              tokenToBeReceivedAfterSwap,
              {
                value: swapAmountWei,
              }
            );
          } else {
            // User has to approve `swapAmountWei` for the contract because `Crypto Dev` token
            // is an ERC20
            transactionResponse = await tokenContract.approve(
              EXCHANGE_CONTRACT_ADDRESS,
              swapAmountWei.toString()
            );
            await transactionResponse.wait();
            // call cryptoDevTokenToEth function which would take in `swapAmountWei` of `Crypto Dev` tokens and would
            // send back `tokenToBeReceivedAfterSwap` amount of `Eth` to the user
            transactionResponse = await exchangeContract.cryptoDevTokenToEth(
              swapAmountWei,
              tokenToBeReceivedAfterSwap
            );
          }
          await transactionResponse.wait();
        };

