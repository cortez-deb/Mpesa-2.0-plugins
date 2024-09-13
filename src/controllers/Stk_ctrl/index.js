import ResponseService from "../../functions/ResposeService.js";
import stkPush from "../../services/M-Express/index.js";

class Mpesa_stk_push_controller {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @description
     * Controller to push an stk message
     **/
    async intitiateStkPush(req, res) {
        try {
            const authToken = req.body.authToken;
            delete req.body.authToken;
            const _stkPush = new stkPush(authToken);
            const response = await _stkPush.intitiateStkPush(req.body);

            ResponseService.success(res, response, "success");
        } catch (error) {
            ResponseService.error(res, error);
        }
    }
}
export default new Mpesa_stk_push_controller();