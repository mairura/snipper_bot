import { ethers } from "ethers";
import { config } from "dotenv";
import { processData } from "../ProcessData/process";
import { txContents } from "../Interface/interface";

config()

//Set up our Alchemy provider
const provider = new ethers.providers.WebSocketProvider(process.env.WSS_URL!);

// //Get our nonce
// const nonce = async () => {
//     try{
//         return await provider.getTransactionCount(process.env.walletAddress!);
//     } catch(error: any){
//         console.log(error.message);
//     }
// }
// nonce();

//Stream the data from mempool
const streamData = async () => {
    const txData = await provider.on("pending", async (txHash) => {
        try{
            const transaction: any = await provider.getTransaction(txHash);

            if(transaction){
                const txDataContents: txContents = {
                    hash: transaction.hash,
                    from: transaction.from,
                    to: transaction.to,
                    value: transaction.value,
                    data: transaction.data,
                    gasLimit: transaction.gasLImit,
                    nonce: transaction.nonce,
                    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
                    maxFeePerGas: transaction.maxFeePerGas

                }
                await processData(txDataContents);
            }
        }catch(error: any){
            console.log(error.message);
        }
    })
}
streamData();