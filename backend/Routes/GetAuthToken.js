import { companyName,clientID,clientSecret,ownerName,ownerEmail,rollNo } from "../config.js";
import axios from "axios";
import express from "express";


const router = express.Router();

//Create a token using registered company
router.post('/',async (request,response) =>{
    try{
        const gettoken = await axios.post(`http://20.244.56.144/products/auth`,{
                companyName: "goMart",
                clientID: "c3497119-35c6-4d43-8af6-37e2f246a703",
                clientSecret: "gMploFrIRHiRkxPv",
                ownerName: "Sanmugam",
                ownerEmail: "hmsanmugam@gmail.com",
                rollNo: "721221205044"
        })
        const token = gettoken.access_token;
        const token_type = gettoken.token_type;
        return response.json({status:"ok",token,token_type});
    }
    catch(error){
        return response.status(500).json({error,message:"Error Occured in Token Generation"});
    }
})

export default router;