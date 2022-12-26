

export default async function handler(req,res) {
    try {
        const {EMAIL,PASSWORD} = req.body;
        res.status(200).json({EMAIL,PASSWORD})
    } catch (error) {
        res.status(500).json({ERROR:error.message})
    }
}