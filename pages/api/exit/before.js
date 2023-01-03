

import mongoose from "mongoose";
import StationOwnerModel from "../../models/station-owner"
export default async function handler(req,res) {
    try {
        mongoose.set('strictQuery',true)
        await mongoose.connect(process.env.MONGODB_URL)
        const {id,username} = req.body;
        if (id === undefined) throw Error("id (query) is required.")
        const station = await StationOwnerModel.findOne({_id:id})
        const queue = station['QUEUE'].filter(({USERNAME})=>USERNAME !== username)
        await StationOwnerModel.updateOne({_id:id},{$set:{QUEUE,queue}})
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({ERROR:error.message})
    }
}