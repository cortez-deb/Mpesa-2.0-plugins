import axios from "axios";
import moment from "moment";

class stkPush {
  constructor(authToken) {
    this.authToken = authToken;
    this.Timestamp = moment().format("YYYYMMDDHHmmss");
  }
  async intitiateStkPush(data) {
    console.log("Initiating STK Push with data:", data);
    try {
      const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
      const Password = Buffer.from(
        `${data?.BusinessShortCode}${passkey}${this.Timestamp}`
        ).toString("base64");
      console.log( this.authToken)
      data = { ...data,Timestamp:this.Timestamp,PartyA:data.PartyA,PhoneNumber:data.PhoneNumber, Password: Password };
      console.log(data)
      const responce = await axios.post(
        `https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest`,
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return responce.data;
    } catch (error) {
      console.log(error);
      return error
    }
  }
}

export default  stkPush
