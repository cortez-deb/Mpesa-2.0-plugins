import Express from "express";
import MpesaAuthorizationController from "../../controllers/M-Auth/index.js";
import validate from "../../middlewares/Resourse/index.js";
import data_schema from "../../schemas/M-auth/index.js";
const api = "";
class MpesaAuthorizationRoutes {
  constructor() {
    this.router = Express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `${api}/get-token/`,
      validate(data_schema),
      this.getAuthorization.bind(this)
    );
 
  }

  async getAuthorization(req, res) {
    await MpesaAuthorizationController.getAccessToken(req, res);
  }
}

const newRouter = new MpesaAuthorizationRoutes();
const route = newRouter.router;
export default route;
