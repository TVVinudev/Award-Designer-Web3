import { assert, ethers } from "ethers";
import { Router } from "express";
import ABI from "./CertiApp.json" with {type: "json"};
import address from "./deployed_addresses.json" with {type: "json"};
import dotenv from "dotenv"
import { Wallet } from "ethers";

dotenv.config();
const CertiRoute = Router();


const provide = new ethers.JsonRpcProvider("http://127.0.0.1:8545/"); // create an instance of provider. 
const signer = await provide.getSigner(); // get the current open source Accound . it sent the instance of account
console.log("Account:", signer.address);
const CertInstance = new ethers.Contract(address["CertModule#CertiApp"], ABI.abi, signer)



// const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`);
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY,provider)
// console.log("Account:", wallet.address);
// const CertInstance = new ethers.Contract(address["CertModule#CertiApp"], ABI.abi, wallet)


CertiRoute.get('/', (req, res) => {
    res.send('Hello World!')
})


CertiRoute.post('/issue', async (req, res) => {

    const { id, name, course, grade, date } = req.body;

    console.log(typeof(id));
    

    const transactionReceipt = await CertInstance.issue(id, name, course, grade, date);
    console.log(transactionReceipt);
    if (transactionReceipt) {
        res.send(transactionReceipt.hash)
    } else {
        res.status(400).json({ message: "server Error" })
    }
})

CertiRoute.get('/getData/:id', async (req, res) => {

    const id = parseInt(req.params.id);
    console.log(typeof(id));

    try {
        const tx = await CertInstance.Certificates(id);
        console.log(tx);
        if (tx) {
            res.send(tx);
        } else {
            res.status(400).json({ message: "Data not fround" })
        }
    } catch (error) {
        console.log(error);
        
    }


})


export { CertiRoute }