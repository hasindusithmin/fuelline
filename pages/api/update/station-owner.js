

import mongoose from "mongoose";
import StationOwnerModel from "../../../models/station-owner"
export default async function handler(req,res) {
    try {
        mongoose.set('strictQuery',true)
        await mongoose.connect(process.env.MONGODB_URL)
        const {ID,EMAIL, CONTACT, ARRIVALTIME, FINISHTIME, DIESEL, PETROL} = req.body;
        console.log({ID,EMAIL, CONTACT, ARRIVALTIME, FINISHTIME, DIESEL, PETROL});
        const user = await StationOwnerModel.findByIdAndUpdate(ID,{$set:{EMAIL, CONTACT, ARRIVALTIME, FINISHTIME, DIESEL, PETROL}})
        console.log(user);
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({ERROR:error.message})
    }
}