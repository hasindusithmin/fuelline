
import mongoose from "mongoose";
import vehicleOwnerModel from "../../../models/vehicle-owner";
import jwt from "jsonwebtoken";
import {setCookie} from "cookies-next";

export default async function handler(req,res) {
    try {
        mongoose.set('strictQuery',true)
        await mongoose.connect(process.env.MONGODB_URL)
        const {EMAIL,PASSWORD} = req.body;
        const user  = await vehicleOwnerModel.login(EMAIL,PASSWORD)
        const tkn = jwt.sign({user},process.env.JWT_SECRET,{expiresIn:'1h'})
        setCookie("JWT",tkn,{req,res,maxAge:3600})
        res.status(200).json({EMAIL,PASSWORD})
    } catch (error) {
        res.status(500).json({ERROR:error.message})
    }
}