import WalletService from "../../services/wallet/index.js";
import ResponseService from "../../functions/ResposeService.js";
class WalletController {
    static async createWalletEntry(req, res) {
        try {
            
            const walletEntry = await WalletService.createWalletEntry(req.body);
            return ResponseService.success(res, walletEntry, "Wallet entry created successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to create wallet entry: ' + error.message);
        }
    }
    static async getWalletEntriesByUserId(req, res) {
        try {
            
            const entries = await WalletService.getWalletEntriesByUserId(req.params.userId);
            return ResponseService.success(res, entries, "Wallet entries fetched successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to fetch wallet entries: ' + error.message);
        }
    }
    static async updateWalletEntry(req, res) {
        try {
            
            const result = await WalletService.updateWalletEntry(req.params.id, req.body);
            return ResponseService.update(res, result, "Wallet entry updated successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to update wallet entry: ' + error.message);
        }
    }
    static async deleteWalletEntry(req, res) {
        try {   
            const result = await WalletService.deleteWalletEntry(req.params.id);
            return ResponseService.deleted(res, result, "Wallet entry deleted successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to delete wallet entry: ' + error.message);
        }
    }
    static async getTotalBalnceByChamaaId(req, res) {
        try {
            
            const balance = await WalletService.getTotalBalnceByChamaaId(req.params.chamaaId);
            return ResponseService.success(res, { balance }, "Total balance fetched successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to fetch total balance: ' + error.message);
        }
    }
    static async sumCreditsByChamaaId(req, res) {
        try {
            
            const totalCredits = await WalletService.sumCreditsByChamaaId(req.params.chamaaId);
            return ResponseService.success(res, { totalCredits }, "Total credits fetched successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to fetch total credits: ' + error.message);
        }
    }
    static async sumDebitsByChamaaId(req, res) {
        try {
            
            const totalDebits = await WalletService.sumDebitsByChamaaId(req.params.chamaaId);
            return ResponseService.success(res, { totalDebits }, "Total debits fetched successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to fetch total debits: ' + error.message);
        }
    }
    static async getWalletEntryById(req, res) {
        try {
            
            const entry = await WalletService.getWalletEntryById(req.params.id);
            return ResponseService.success(res, entry, "Wallet entry fetched successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to fetch wallet entry: ' + error.message);
        }
    }
    static async getWalletEntriesByDateRange(req, res) {
        try {
            const { userId } = req.params;
            const { startDate, endDate } = req.query;

            const entries = await WalletService.getWalletEntriesByDateRange(userId, startDate, endDate);
            return ResponseService.success(res, entries, "Wallet entries fetched successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to fetch wallet entries: ' + error.message);
        }   
    }
    static async getWalletEntriesByChamaaId(req, res) {
        try {
            const entries = await WalletService.dateFilteredEntries(req.params.chamaaId,req.body.startDate, req.body.endDate);
            return ResponseService.success(res, entries, "Wallet entries fetched successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to fetch wallet entries: ' + error.message);
        }
    }
    static async dateFilteredEntriesByUserId(req, res) {
        try {
            const entries = await WalletService.dateFilteredEntriesByUser(req.params.userId,req.body.startDate, req.body.endDate);
            return ResponseService.success(res, entries, "Wallet entries fetched successfully");
        } catch (error) {
            console.error(error);
            return ResponseService.error(res, 'Failed to fetch wallet entries: ' + error.message);
        }   
    }

}

export default WalletController;