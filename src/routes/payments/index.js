import PaymentController from '../../controllers/payments/index.js';
import express from "express";
const api = "";
class PaymentRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(
            `${api}/payments/in`,
            PaymentController.createPaymentIn,
        );
        this.router.post(
            `${api}/payments/out`,
            PaymentController.createPaymentOut,
        );
        this.router.post(
            `${api}/payments/out/chamaa`,
            PaymentController.getPaymentsOutByChamaaId)
        this.router.post(
            `${api}/payments/transaction`,
            PaymentController.getPaymentByTransactionId);
        this.router.put(
            `${api}/payments/actualize`,
            PaymentController.makePaymentsActualized);
        this.router.post(
            `${api}/payments/chamaa/wallet/summary`,
            PaymentController.getChamaaWalletSummary);
        this.router.post(
            `${api}/payments/chamaa/debits`,
            PaymentController.getSumOfDebitPaymentsOut);
        this.router.post(
            `${api}/payments/chamaa/credits`,
            PaymentController.getSumOfCreditPaymentsIn);
        this.router.post(
            `${api}/payments/out/chamaa/paginated`,
            PaymentController.getdatefilteredPaymentsOut);
    }
}
const newRouter = new PaymentRoutes();
const paymentRoute = newRouter.router;
export default paymentRoute;