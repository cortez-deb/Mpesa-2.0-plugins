import Express from "express";
import data_schema from "../../schemas/Mpesa_dynamic_qr/index.js";
import validate from "../../middlewares/Resourse/index.js";
import Mpesa_dynamic_qr_code_Ctrl from "../../controllers/Dynamic Qr/index.js";

const api = "/api/v1";
class Mpesa_dynamic_qr_code {
  /**
   * @description
   * Initializes the router
   */
  constructor() {
    this.router = Express.Router();
    this.initializeRoutes();
  }

  /**
   * @description
   * Initializes the routes for dynamic QR code generation
   */
  initializeRoutes() {
    this.router.post(
      `${api}/generate-qr-code`,
      validate(data_schema),
      this.generateQRCode.bind(this)
    );
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @description
   **/
  async generateQRCode(req, res) {
    await Mpesa_dynamic_qr_code_Ctrl.generateQrCode(req, res);
  }
}

const newRouter = new Mpesa_dynamic_qr_code();
const route_qr = newRouter.router;
export default route_qr;
