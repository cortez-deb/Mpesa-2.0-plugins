import data_schema from "../../schemas/M-b2c/index.js";
import validate from "../../middlewares/Resourse/index.js";
import Express from 'express'
import b2c_controller from '../../controllers/M-b2c/index.js'
const api = "/api/v1";
class MpesaB2CRoutes {
    constructor() {
        this.router = Express.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(
            `${api}/b2c/`,
            validate(data_schema),
            this.b2c_route.bind(this)
        );
    }
    async b2c_route(req, res) {
        await b2c_controller.b2c(req, res);
    }
}

const newRouter = new MpesaB2CRoutes();
const b2croute = newRouter.router;
export default b2croute;