import axios from "axios";
import moment from "moment";

class stkPush {
  constructor(authToken) {
    this.authToken = authToken;
    this.Timestamp = moment().format("YYYYMMDDHHmmss");
  }

  async intitiateStkPush(data) {
    try {
      const Password = Buffer.from(
        `${data?.BusinessShortCode}${data?.ConsumerSecret}${this.Timestamp}`
        ).toString("base64");
      
      data = { ...data, Password: "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwOTE4MTcwOTQ4" };
      const responce = await axios.post(
        `https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return responce.data;
    } catch (error) {
      return error;
    }
  }
}

export default  stkPush
