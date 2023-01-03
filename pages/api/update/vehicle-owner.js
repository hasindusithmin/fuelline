import mongoose from "mongoose";
import vehicleOwnerModel from "../../../models/vehicle-owner";
export default async function handler(req, res) {
    try {
        mongoose.set('strictQuery',true)
        await mongoose.connect(process.env.MONGODB_URL)
        const {ID,EMAIL, CONTACT,FIRSTNAME, LASTNAME, VEHICLE,FUEL}= req.body;
        let QTY = (VEHICLE === 'BIKE') ? 4 : (VEHICLE === '3WHEEL') ? 5 : 20
        const user = await vehicleOwnerModel.findByIdAndUpdate(ID,{$set:{EMAIL,CONTACT,FIRSTNAME, LASTNAME,VEHICLE,FUEL,QTY}})
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({ ERROR: error.message })
    }
}