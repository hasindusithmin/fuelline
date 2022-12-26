
export default async function handler(req,res){
    try {
        const {
            PROVINCE,
            DISTRICT,
            LOCATION,
            FIRSTNAME,
            LASTNAME,
            EMAIL,
            CONTACT,
            VEHICLE,
            FUEL,
            PASSWORD
        } = req.body;
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({ERROR:error.message})
    }
}