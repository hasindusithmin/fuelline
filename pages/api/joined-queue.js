

import mongoose from "mongoose";
import StationOwnerModel from "../../models/station-owner"
import VehicleOwnerModel from "../../models/vehicle-owner"
import fetch from "node-fetch";
export default async function handler(req,res) {
    try {
        mongoose.set('strictQuery',true)
        await mongoose.connect(process.env.MONGODB_URL)
        const {id} = req.query;
        if (id === undefined) throw Error("id (query) is required.")
        const {USERNAME,VEHICLE,FUEL,QTY,USER_ID,QUEUE} = req.body;
        if (QUEUE !== "") {
            const DOMAIN = (process.env.NEXT_PUBLIC_ENVIROMENT === 'production') ? 'https://fuelline.vercel.app' : 'http://127.0.0.1:3000'
            await fetch(`${DOMAIN}/api/exits/before`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({id:id,username:USERNAME,})
            })
        }
        const user = await StationOwnerModel.findOne({_id:id})
        const current = user['QUEUE'].map(({USERNAME})=>USERNAME)
        if (current.includes(USERNAME)) throw Error('already exists')
        user['QUEUE'].push({USERNAME,VEHICLE,FUEL,QTY})
        await StationOwnerModel.updateOne({_id:id},{$set:{QUEUE:user['QUEUE']}})
        await VehicleOwnerModel.findOneAndUpdate(USER_ID,{$set:{QUEUE:id}})
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({ERROR:error.message})
    }
}