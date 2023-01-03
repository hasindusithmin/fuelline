import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import StationOwnerModel from "../../../models/station-owner";
import {setCookie} from "cookies-next"
export default async function handler(req,res){

    try {
        mongoose.set('strictQuery',true)
        await mongoose.connect(process.env.MONGODB_URL)
        const {
            DEALER,
            EMAIL,
            CONTACT,
            PROVINCE,
            DISTRICT,
            LOCATION,
            ARRIVALTIME,
            FINISHTIME,
            DIESEL,
            PETROL,
            PASSWORD,
            QUEUE
        } = req.body;
        const user = await StationOwnerModel.create({DEALER,EMAIL,CONTACT,PROVINCE,DISTRICT,LOCATION,ARRIVALTIME,FINISHTIME,DIESEL,PETROL,PASSWORD,QUEUE})
        const tkn = jwt.sign({user,role:'station'},process.env.JWT_SECRET,{expiresIn:'1h'})
        setCookie('JWT',tkn,{req,res,maxAge:3600})
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({ERROR:error.message})
    }
}