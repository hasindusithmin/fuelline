

export default async function handler(req,res){
    try {
        const {
            DEALER,
            EMAIL,
            CONTACT,
            PROVINCE,
            DISTRICT,
            LOCATION,
            ARRIVALTIME,
            FINISHTIME,
            DIESEL,
            PETROL,
            PASSWORD,
            QUEUE
        } = req.body;
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({ERROR:error.message})
    }
}