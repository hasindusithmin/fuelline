
import jwt from "jsonwebtoken";

export default async function handler(req,res) {
    try {
        const {token} = req.headers;
        jwt.verify(token,process.env.JWT_SECRET)
        res.status(200).json({})
    } catch (error) {
        res.status(401).json({ERROR:error.message})
    }
}