
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

const VehicleSchema = new Schema({
    USERNAME: { type: String },
    VEHICLE: { type: String, enum: ['BIKE', '3WHEEL', 'CAR', 'VAN', 'LORRY', 'QUADRICYCLE', 'LAND VEHICLE'] },
    FUEL: { type: String },
    QTY: { type: Number }
})

const StationOwnerSchema = new Schema({
    DEALER: { type: String, required: true },
    EMAIL: { type: String, required: true },
    CONTACT: { type: String, required: true },
    PROVINCE: { type: String, required: true },
    DISTRICT: { type: String, required: true },
    LOCATION: { type: String, required: true },
    ARRIVALTIME: { type: String, required: true },
    FINISHTIME: { type: String, required: true },
    DIESEL: { type: Number, required: true },
    PETROL: { type: Number, required: true },
    PASSWORD: { type: String, required: true },
    QUEUE: [VehicleSchema],
})

StationOwnerSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.PASSWORD = await bcrypt.hash(this.PASSWORD, salt)
    next()
})

const StationOwnerModel = model('station-owner',StationOwnerSchema)

export default StationOwnerModel;