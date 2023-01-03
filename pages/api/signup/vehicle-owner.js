import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import vehicleOwnerModel from "../../../models/vehicle-owner";
import { setCookie } from "cookies-next"
export default async function handler(req, res) {
    try {
        mongoose.set('strictQuery',true)
        await mongoose.connect(process.env.MONGODB_URL)
        const {
            PROVINCE,
            DISTRICT,
            LOCATION,
            FIRSTNAME,
            LASTNAME,
            EMAIL,
            CONTACT,
            VEHICLE,
            FUEL,
            PASSWORD
        } = req.body;
        let QTY = (VEHICLE === 'BIKE') ? 4 : (VEHICLE === '3WHEEL') ? 5 : 20
        const QUEUE = ""
        const user = await vehicleOwnerModel.create({PROVINCE,DISTRICT,LOCATION,FIRSTNAME,LASTNAME,EMAIL,CONTACT,VEHICLE,FUEL,QTY,QUEUE,PASSWORD})
        const tkn = jwt.sign({user,role:'vehicle'},process.env.JWT_SECRET,{expiresIn:'1h'})
        setCookie('JWT',tkn,{req, res,maxAge:3600})
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({ ERROR: error.message })
    }
}