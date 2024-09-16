import ResponseService  from "../../functions/ResposeService.js";
import Mpesa_Service_B2c from "../../services/M-b2c/index.js"


class b2c_controller{
    async b2c(req, res){
       try{
        const authToken = req.body.authToken;
        delete req.body.authToken;
        const _Mpesa_Service_B2c = new Mpesa_Service_B2c(authToken);
        const response = await _Mpesa_Service_B2c.b2c_service(req.body);
        ResponseService.success(res, response, "Payment request successful");
       }
       catch(error){
        ResponseService.error(res, error);
       }
    }
}

export default new b2c_controller();