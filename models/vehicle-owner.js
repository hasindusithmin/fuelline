
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const VehicleOwnerSchema = new Schema({
    PROVINCE: { type: String, required: true },
    DISTRICT: { type: String, required: true },
    LOCATION: { type: String, required: true },
    FIRSTNAME: { type: String, required: true },
    LASTNAME: { type: String, required: true },
    EMAIL: { type: String, required: true, unique: true },
    CONTACT: { type: String, required: true, unique: true },
    VEHICLE: { type: String, enum: ['BIKE', '3WHEEL', 'CAR', 'VAN', 'LORRY', 'QUADRICYCLE', 'LAND VEHICLE'], required: true },
    FUEL: { type: String, enum: ['DIESEL', 'PETROL'], required: true },
    PASSWORD: { type: String, required: true }
})

VehicleOwnerSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt()
    this.PASSWORD = await bcrypt.hash(this.PASSWORD,salt)
    next()
})

export default mongoose.models.vehicleowner || mongoose.model('vehicleowner', VehicleOwnerSchema);