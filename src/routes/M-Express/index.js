import Express from "express";
import validate from "../../middlewares/Resourse/index.js";
import data_schema from "../../schemas/M-Stk/index.js";
import Mpesa_stk_push_controller from '../../controllers/Stk_ctrl/index.js'
const api = "";
class stkPushRouter {
     /**
   * @description
   * initialize the router
   */
  constructor() {
    this.router = Express.Router();
    this.initializeRoutes();
  }

  /**
   * @description
   * initialize the routes for stk push
   */
  initializeRoutes() {
    this.router.post(
      `/stkpush`,
       validate(data_schema),
      this.stkPush_Controller.bind(this)
    );
    this.router.post(
      `/stkpush/response`,
      this.stkPushResponse_Controller.bind(this)
    );
      this.router.post(
      `/stkpush/response/timeout`,
      this.timeout.bind(this)
    );

    this.router.get(
      `/stkpush/response/retrieve/:MerchantRequestID`,
      this.stkPushResponse_retrieve.bind(this)
    );

  }
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @description
   * initialize stk controllers
   */
  async stkPush_Controller(req, res) {
    console.log(req.body)
    await Mpesa_stk_push_controller.intitiateStkPush(req, res);
  }
  async stkPushResponse_Controller(req, res) {
  await Mpesa_stk_push_controller.handleResponse(req, res);
  }
  async timeout(req,res){
    console.log(req.body)
    res.send("success")
  }

  async stkPushResponse_retrieve(req, res) {
    await Mpesa_stk_push_controller.getStkPushResponse(req, res);
  }
 
}

const newRouter = new stkPushRouter();
const route_stk = newRouter.router;
export default route_stk;
