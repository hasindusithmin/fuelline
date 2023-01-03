import mongoose from "mongoose";
import vehicleOwnerModel from "../../../models/vehicle-owner";
export default async function handler(req, res) {
    try {
        mongoose.set('strictQuery',true)
        await mongoose.connect(process.env.MONGODB_URL)
        const user = await vehicleOwnerModel.find({})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ ERROR: error.message })
    }
}