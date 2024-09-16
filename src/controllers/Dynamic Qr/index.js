import ResponseService from "../../functions/ResposeService.js";
import Mpesa_Qr_Code_Service from "../../services/M-Dynamic-Qr/index.js"



class Mpesa_dynamic_qr_code_Ctrl {
    /**
     * @description
     * The code controls data 
     * /**
     * Generates a dynamic QR code for M-Pesa transactions
     *
     * @param {Object} res - The response object.//+
     * @param {Object} req - The request object.//+
     * @param {string} req.body.access_token - The access token for M-Pesa API authentication.//+
     * @param {Object} req.body.data - Additional data required for QR code generation.//+
     * @returns {Promise<void>}//+
     * @memberof Mpesa_dynamic_qr_code_Ctrl
     */
    async  generateQrCode(req, res) {
        try {
            const {access_token,...data} = req.body;
            delete data.access_token;
            const qrCode =await Mpesa_Qr_Code_Service.getQrCode(data,access_token)
            ResponseService.success(res, qrCode, "QR code generated successfully!");

        } catch (error) {
            ResponseService.error(res, error)
        }
    }
}

export default new Mpesa_dynamic_qr_code_Ctrl();