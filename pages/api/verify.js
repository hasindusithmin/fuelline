
import jwt from "jsonwebtoken";

export default async function handler(req,res) {
    try {
        const {token} = req.headers;
        console.log(token);
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        res.status(200).json(decoded)
    } catch (error) {
        res.status(401).json({ERROR:error.message})
    }
}