import { ethers } from "ethers"
import { EXCHANGE_CONTRACT_ABI, EXCHANGE_CONTRACT_ADDRESS } from "../constant"

export const removeLiquidity =async(signer, removeLPTokensWei)=>{
    try {
        
    
    const exchangeContract=new ethers.Contract(
        EXCHANGE_CONTRACT_ADDRESS,
        EXCHANGE_CONTRACT_ABI,
        signer
    );
    const transactionResponse=await exchangeContract.removeLiquidity(removeLPTokensWei)
   await transactionResponse.wait();}

   catch (error) {
        console.log(error);
   }

}
export const getTokensAfterRemove=async(
    provider,
  removeLPTokenWei,
  _ethBalance,
  cryptoDevTokenReserve
)=>{
    try {
        const exchangeContract=new ethers.Contract(
            EXCHANGE_CONTRACT_ADDRESS,
            EXCHANGE_CONTRACT_ABI,
            provider
        );
        const _totalSupply=await exchangeContract.totalSupply();
        const _removeEther=_ethBalance.mul(removeLPTokenWei).div(_totalSupply);
        const _removeCD=cryptoDevTokenReserve.mul(removeLPTokenWei).div(_totalSupply);

        return{
            _removeEther,
            _removeCD
        };
        
        
    } catch (error) {
        console.log(error);
    }
}