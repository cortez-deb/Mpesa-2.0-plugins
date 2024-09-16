import axios from "axios";


class Mpesa_Service_B2c {
    constructor(authToken){
        this.authToken = authToken;
    }

    async b2c_service(data){
        try{
            const response = await axios.post(`https://sandbox.safaricom.co.ke/mpesa/b2c/v3/paymentrequest`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${this.authToken}`
                    }
                }
            );
            return response.data;
        }
        catch(error){
            return error;
        }
    }
}

export default Mpesa_Service_B2c