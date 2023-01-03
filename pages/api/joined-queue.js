

import mongoose from "mongoose";
import StationOwnerModel from "../../models/station-owner"
export default async function handler(req,res) {
    try {
        mongoose.set('strictQuery',true)
        await mongoose.connect(process.env.MONGODB_URL)
        const {id} = req.query;
        if (id === undefined) throw Error("id (query) is required.")
        const {USERNAME,VEHICLE,FUEL,QTY} = req.body;
        const user = await StationOwnerModel.findOne({_id:id})
        user['QUEUE'].push({USERNAME,VEHICLE,FUEL,QTY})
        await StationOwnerModel.updateOne({_id:id},{$set:{QUEUE:user['QUEUE']}})
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({ERROR:error.message})
    }
}