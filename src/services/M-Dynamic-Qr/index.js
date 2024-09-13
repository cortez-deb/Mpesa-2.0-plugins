import axios from "axios";


class Mpesa_Qr_Code_Service{
    async getQrCode(data, access_token){
        try{
            const qrCode = await axios.post(`https://sandbox.safaricom.co.ke/mpesa/qrcode/v1/generate`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                }
            );
            return qrCode.data;
        }
        catch(error){
            return error
        }
    }
}

export default new Mpesa_Qr_Code_Service();