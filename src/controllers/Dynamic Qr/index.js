import ResponseService from "../../functions/ResposeService.js";
import Mpesa_Qr_Code_Service from "../../services/M-Dynamic-Qr/index.js"



class Mpesa_dynamic_qr_code_Ctrl {
    /**
     * @description
     * The code controls data 
     * */
    async  generateQrCode(res, req) {
        try {
            const { access_token,...data } = req.body;
            const qrCode =await Mpesa_Qr_Code_Service.getQrCode(data,access_token)
            ResponseService.success(res, qrCode, "QR code generated successfully!");

        } catch (error) {
            ResponseService.error(res, error)
        }
    }
}

export default new Mpesa_dynamic_qr_code_Ctrl();