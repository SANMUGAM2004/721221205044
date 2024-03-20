import express from "express";
import verifyToken from "../MiddleWare/Auth.js";
import axios from "axios";


const router = express.Router();



// Get token
const gettoken = async () => {
    try {
        const response = await axios.post(`http://20.244.56.144/products/auth`, {
            companyName: "goMart",
            clientID: "c3497119-35c6-4d43-8af6-37e2f246a703",
            clientSecret: "gMploFrIRHiRkxPv",
            ownerName: "Sanmugam",
            ownerEmail: "hmsanmugam@gmail.com",
            rollNo: "721221205044"
        });
        const token = response.data.access_token; 
        return token;
    } catch (error) {
        console.error("error:", error);
        throw error; 
    }
};



router.get('/categories', verifyToken, async (request, response) => {
    try {
        const { companyName, categories, numberOfProducts, minPrice, maxPrice } = request.body;
        const token = await gettoken();
        console.log(token);
        if (!token) {
            throw new Error("Token not found");
        }
        //response = requests.get(f"http://20.244.56.144/products/companies/{company}/categories/{category}/products?top={no_of_products}&minPrice={minPrice}&maxPrice={maxPrice}", headers=headers)
        const products = await axios.get(`http://20.244.56.144/products/companies/${companyName}/categories/${categories}/products?top=${numberOfProducts}&minPrice=${minPrice}&maxPrice=${maxPrice}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(products);
        return response.json(products.data);
    } catch (error) {
        console.error("Error:", error);
        return response.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;