import PaymentService from '../../services/payments/index.js';
import ResponseService from "../../functions/ResposeService.js";

class PaymentController {
    static async createPaymentIn(req, res) {
        try {
            const paymentIn = await PaymentService.createPaymentIn(req.body);
            return ResponseService.success(res, paymentIn, "Payment in created successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to create payment in: ' + error.message);
        }
    }
    static async createPaymentOut(req, res) {
        try {
            const paymentOut = await PaymentService.createPaymentOut(req.body);
            return ResponseService.success(res, paymentOut, "Payment out created successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to create payment out: ' + error.message);
        }
    }
    static async getPaymentsOutByChamaaId(req, res) {
        try {
            const { page, limit, startDate, endDate,chamaaId } = req.body;
            const paymentsOut = await PaymentService.getPaymentsOutByChamaaId(
                chamaaId,
                page,
                limit,
                startDate,
                endDate
            );
            return ResponseService.success(res, paymentsOut, "Payments out fetched successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to fetch payments out: ' + error.message);
        }
    }
    static async getPaymentByTransactionId(req, res) {
        try {
            const { transactionId } = req.body;
            const payment = await PaymentService.getPaymentByTransactionId(transactionId);
            return ResponseService.success(res, payment, "Payment fetched successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to fetch payment: ' + error.message);
        }
    }
    static async makePaymentsActualized(req, res) {
        try{
            const {transactionId, type} = req.body;
            const result = await PaymentService.makePaymentsActualized(transactionId, type);
            return ResponseService.success(res, result, "Payment actualized successfully"); 
        }
        catch(error){
            console.error(error);
            return ResponseService.error(res, 'Failed to actualize payment: ' + error.message);
        }
    }
    static async getChamaaWalletSummary(req, res) {
        try {
            const { chamaaId } = req.body;
            const summary = await PaymentService.getChamaaWalletSummary(chamaaId);
            return ResponseService.success(res, summary, "Chamaa wallet summary fetched successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to fetch chamaa wallet summary: ' + error.message);
        }
    }
    static async getSumOfCreditPaymentsIn(req, res) {
        try {
            const { chamaaId } = req.body;
            const totalCredits = await PaymentService.getSumOfCreditPaymentsIn(chamaaId);
            return ResponseService.success(res, { totalCredits }, "Total credit payments in fetched successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to fetch total credit payments in: ' + error.message);
        }   
    }
    static async getSumOfDebitPaymentsOut(req, res) {
        try {
            const { chamaaId } = req.body;
            const totalDebits = await PaymentService.getSumOfDebitPaymentsOut(chamaaId);
            return ResponseService.success(res, { totalDebits }, "Total debit payments out fetched successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to fetch total debit payments out: ' + error.message);
        }   
    }
    static async getdatefilteredPaymentsIn(req, res) {
        try {
            const { chamaaId, startDate, endDate } = req.body;
            const paymentsIn = await PaymentService.getdatefilteredPaymentsIn(chamaaId, startDate, endDate);
            return ResponseService.success(res, paymentsIn, "Date filtered payments in fetched successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to fetch date filtered payments in: ' + error.message);
        }
    }
    static async getdatefilteredPaymentsOut(req, res) {
        try {
            const { chamaaId, startDate, endDate } = req.body;
            const paymentsOut = await PaymentService.getdatefilteredPaymentsOut(chamaaId, startDate, endDate);
            return ResponseService.success(res, paymentsOut, "Date filtered payments out fetched successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to fetch date filtered payments out: ' + error.message);
        }
    }
}

export default PaymentController;