// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose"

export default async function handler(req, res) {
  try {
    mongoose.set('strictQuery',true);
    await mongoose.connect(process.env.MONGODB_URL)
    res.status(200).json({ STATUS: 'conneted' })
  } catch (error) {
    res.status(500).json({ ERROR: error.messsage })
  }
  
}
