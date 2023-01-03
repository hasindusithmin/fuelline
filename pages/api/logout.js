
import {deleteCookie} from 'cookies-next';
export default async function handler(req,res) {
    try {
        deleteCookie('JWT',{req,res,maxAge:0})
        res.redirect('/')
    } catch (error) {
        res.status(500).json({ERROR:error.message})
    }
}