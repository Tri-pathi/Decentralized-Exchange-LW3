import { ethers, Signer, utils } from "ethers";
import { EXCHANGE_CONTRACT_ABI, EXCHANGE_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS } from "../constant";

export const addLiquidity =async(signer,addCDAmountWei,addEtherAmountWei)=>{
    try {
        const tokenContract=new ethers.Contract(
            TOKEN_CONTRACT_ADDRESS,
            TOKEN_CONTRACT_ABI,
            signer
        );
        const exchangeContract=new ethers.Contract(
            EXCHANGE_CONTRACT_ADDRESS,
            EXCHANGE_CONTRACT_ABI,
            signer
        );

        //coz CD tokens are in ERC20, user would need to give the contract allowance
        //to take the required number of CD tokens out og his contract
        let transactionResponse=await tokenContract.approve(
            EXCHANGE_CONTRACT_ADDRESS,
            addCDAmountWei.toString()
        )
        await transactionResponse.wait();
        transactionResponse=await exchangeContract.addLiquidity(addCDAmountWei,{
            value:addEtherAmountWei,
        });
        await transactionResponse.wait();

    } catch (error) {
        console.log(error);
    }

}
//for calculation of CD Tokens that need to add in liquidity
export const calculateCD=async(_addEther = "0",
etherBalanceContract,
cdTokenReserve)=>{
    const _addEtherAmountWei=utils.parseEther(_addEther);
    const cryptoDevTokenAmount=_addEtherAmountWei.mul(cdTokenReserve).div(etherBalanceContract);
    return cryptoDevTokenAmount;

}