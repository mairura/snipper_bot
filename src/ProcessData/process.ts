import { ethers } from "ethers";
import { txContents} from "../Interface/interface";
import ABI from "../utils/contract-abi.json";
import { config } from "dotenv";
config();

//Uniswap Router v2 Address
const uniswapAddressRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

//Token to monitor
const tokens = process.env.TOKENS_TO_MONITOR;

//INterface abstracts the encoding and decoding required to interact with contracts on eth network
const inter = new ethers.utils.Interface(ABI);
// console.log(inter);

//Process the Data
export const processData = async (txContents: txContents) => {
    try{
        const router = txContents.to;
        // console.log("Router:", router);
        
        if(router == uniswapAddressRouter){

            //Decode the data    
            const decode_data = inter.parseTransaction({ data: txContents.data});
            console.log(decode_data);

            //Get Method Name
            let method_name = decode_data['name'];
            // console.log(method_name);
            //  if(method_name == "addLiquidity"){

            //  }
            
        }
    }catch(error: any){
        console.log(error.message);
    }
}
