import Payments_in from '../../../models/payments_in.js';
import { Op } from 'sequelize';
import Payments_out from '../../../models/payments_out.js';

class PaymentService {
    static async createPaymentIn(data) {
        try{
            const paymentIn = await Payments_in.create(data);
            return paymentIn;
        }
        catch(error){
            throw new Error('Error creating payment in: ' + error.message);
        }
    }
    static async createPaymentOut(data) {
        try{
            const paymentOut = await Payments_out.create(data);
            return paymentOut;
        }
        catch(error){
            throw new Error('Error creating payment out: ' + error.message);
        }
    }
    static async getPaymentsInByChamaaId(chamaaId, page = 1, limit = 10,startDate=null,endDate=null) {
        try{
            const offset = (page - 1) * limit;
            const whereClause = { chamaa_id: chamaaId ,actualized:true };
            if (startDate && endDate) {
                whereClause.date = { [Op.between]: [startDate, endDate] };
            }
            const paymentsIn = await Payments_in.findAndCountAll({
                where: whereClause,
                limit,
                offset,
                order: [['date', 'DESC']]
            });
            return {
                totalItems: paymentsIn.count,
                totalPages: Math.ceil(paymentsIn.count / limit),
                currentPage: page,
                data: paymentsIn.rows
            };
        }
        catch(error){
            throw new Error('Error fetching payments in: ' + error.message);
        }
    }
    static async getPaymentsOutByChamaaId(chamaaId, page = 1, limit = 10, startDate=null,endDate=null) {
        try{
            const offset = (page - 1) * limit;
            const whereClause = { chamaa_id: chamaaId ,actualized:true };
            if (startDate && endDate) {
                whereClause.date = { [Op.between]: [startDate, endDate] };
            }
            const paymentsOut = await Payments_out.findAndCountAll({
                where: whereClause,
                limit,
                offset,
                order: [['date', 'DESC']]
            });
            return {
                totalItems: paymentsOut.count,
                totalPages: Math.ceil(paymentsOut.count / limit),
                currentPage: page,
                data: paymentsOut.rows
            };
        }
        catch(error){
            throw new Error('Error fetching payments out: ' + error.message);
        }
    }
    static async getPaymentsOutByChamaaId(chamaaId, page = 1, limit = 10) {
        try{
            const offset = (page - 1) * limit;
            const paymentsOut = await Payments_out.findAndCountAll({
                where: { chamaa_id: chamaaId ,actualized:true },
                limit,
                offset,
                order: [['date', 'DESC']]
            });
            return {
                totalItems: paymentsOut.count,
                totalPages: Math.ceil(paymentsOut.count / limit),
                currentPage: page,
                data: paymentsOut.rows
            };
        }
        catch(error){
            throw new Error('Error fetching payments out: ' + error.message);
        }
    }

   static async getPaymentByTransactionId(transactionId) {
        try {
            const paymentIn = await Payments_in.findOne({ where: { transaction_id: transactionId } });
            if (paymentIn) {
                return paymentIn;
            }
            const paymentOut = await Payments_out.findOne({ where: { transaction_id: transactionId } });
            return paymentOut;
        } catch (error) {
            throw new Error('Error fetching payment by transaction ID: ' + error.message);
        }
    }

    static async markPaymentAsActualized(transactionId, type) {
        try {
            if (type === 'in') {
                const paymentIn = await Payments_in.findOne({ where: { transaction_id: transactionId } });
                if (paymentIn) {
                    paymentIn.actualized = true;
                    await paymentIn.save();
                    return paymentIn;
                }
            } else if (type === 'out') {
                const paymentOut = await Payments_out.findOne({ where: { transaction_id: transactionId } });
                if (paymentOut) {
                    paymentOut.actualized = true;
                    await paymentOut.save();
                    return paymentOut;
                }
            }
           return {
            message: 'Payment not found or invalid type'
           }
        } catch (error) {
            throw new Error('Error marking payment as actualized: ' + error.message);
        }
    
    }

    static async getChamaaWalletSummary(chamaaId) {
        try {
            const totalPaymentsIn = await Payments_in.sum('amount', { where: { chamaa_id: chamaaId, actualized: true } });
            const totalPaymentsOut = await Payments_out.sum('amount', { where: { chamaa_id: chamaaId, actualized: true } });
            return {
                totalPaymentsIn: totalPaymentsIn || 0,
                totalPaymentsOut: totalPaymentsOut || 0,
                netBalance: (totalPaymentsIn || 0) - (totalPaymentsOut || 0)
            };
        } catch (error) {
            throw new Error('Error fetching chamaa wallet summary: ' + error.message);
        }
    }

   static async getSumOfCreditPaymentsIn(chamaaId) {
        try {
            const totalCredits = await Payments_in.sum('amount', { where: { chamaa_id: chamaaId, type: 'credit', actualized: true } });
            return totalCredits || 0;
        } catch (error) {
            throw new Error('Error summing credit payments in: ' + error.message);
        }
    }

    static async getSumOfDebitPaymentsOut(chamaaId) {
        try {
            const totalDebits = await Payments_out.sum('amount', { where: { chamaa_id: chamaaId, type: 'debit', actualized: true } });
            return totalDebits || 0;
        } catch (error) {
            throw new Error('Error summing debit payments out: ' + error.message);
        }
    }
   
   static async  getdatefilteredPaymentsIn(chamaaId, startDate, endDate) {
        try {
            const paymentsIn = Payments_in.findAll({
                where: {
                    chamaa_id: chamaaId,
                    date: {
                        [Op.between]: [startDate, endDate]
                    },
                    actualized:true
                },
                order: [['date', 'DESC']]
            });
            return paymentsIn;
        } catch (error) {
            throw new Error('Error fetching date filtered payments in: ' + error.message);
        }
    }
   static async getdatefilteredPaymentsOut(chamaaId, startDate, endDate) {
        try {
            const paymentsOut = Payments_out.findAll({
                where: {
                    chamaa_id: chamaaId,
                    date: {
                        [Op.between]: [startDate, endDate]
                    },
                    actualized:true
                },
                order: [['date', 'DESC']]
            });
            return paymentsOut;
        } catch (error) {
            throw new Error('Error fetching date filtered payments out: ' + error.message);
        }
    }
}
export default PaymentService;