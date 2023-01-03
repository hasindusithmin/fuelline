import mongoose from "mongoose";
import StationOwnerModel from "../../../models/station-owner"
import jwt from "jsonwebtoken";
import {setCookie} from 'cookies-next';
export default async function handler(req,res) {
    try {
        mongoose.set('strictQuery',true)
        await mongoose.connect(process.env.MONGODB_URL)
        const {EMAIL,PASSWORD} = req.body;
        const user = await StationOwnerModel.login(EMAIL,PASSWORD)
        const tkn = jwt.sign({user,role:'station'},process.env.JWT_SECRET,{expiresIn:'1h'})
        setCookie('JWT',tkn,{req,res,maxAge:3600})
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({ERROR:error.message})
    }
}