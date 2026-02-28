import Wallets from "../../../models/wallet.js";
import Wallet_Balance from "../../../models/wallet_balance.js";
import { Op } from "sequelize";
class WalletService {
    async createWalletEntry(data) {
        try {
            const transaction = await Wallets.sequelize.transaction();

            const walletEntry = await Wallets.create(data, { transaction });

            // Update Wallet_Balance
            let balanceRecord = await Wallet_Balance.findOne({ where: { user_id: data.user_id }, transaction });

            if (!balanceRecord) {
                const balance = await this.getTotalBalnceByUserId(data.user_id);
                balanceRecord = await Wallet_Balance.create({ user_id: data.user_id, amount: balance }, { transaction });
            }
            await balanceRecord.save({ transaction });

            await transaction.commit();
            return walletEntry;

        } catch (error) {
            throw new Error('Error creating wallet entry: ' + error.message);
        }
    }
    async getWalletBalanceByUserId(userId) {
        try {
            const balanceRecord = await Wallet_Balance.findOne({ where: { user_id: userId } });
            return balanceRecord ? balanceRecord.amount : 0;
        } catch (error) {
            throw new Error('Error fetching wallet balance: ' + error.message);
        }
    }

    async getWalletEntriesByUserId(userId) {
        try {
            const entries = await Wallets.findAll({ where: { user_id: userId } });
            return entries;
        } catch (error) {
            throw new Error('Error fetching wallet entries: ' + error.message);
        }
    }
    async updateWalletEntry(id, data) {
        try {
            const transaction = await Wallets.sequelize.transaction();

            const walletEntry = await Wallets.findOne({ where: { id }, transaction });
            if (!walletEntry) {
                return "Wallet entry not found";
            }

            // Store old values for balance adjustment
            const oldCredit = walletEntry.is_credit || false;
            const oldDebit = walletEntry.is_debit || false;

            // Update wallet entry
            await walletEntry.update(data, { transaction });
            const balance = await this.getWalletBalanceByUserId(walletEntry.user_id);

            // Update Wallet_Balance
            let balanceRecord = await Wallet_Balance.findOne({ where: { user_id: walletEntry.user_id }, transaction });

            if (!balanceRecord) {
                balanceRecord = await Wallet_Balance.create({ user_id: walletEntry.user_id, amount: balance }, { transaction });
            }

            await Wallet_Balance.update(
                {
                    amount: balance
                },
                {
                    where: { user_id: walletEntry.user_id },
                    transaction
                }
            );

            await balanceRecord.save({ transaction });

            await transaction.commit();
            return walletEntry;
        } catch (error) {
            throw new Error('Error updating wallet entry: ' + error.message);
        }
    }
    async deleteWalletEntry(id) {
        try {
            const transaction = await Wallets.sequelize.transaction();

            const walletEntry = await Wallets.findOne({ where: { id }, transaction });
            if (!walletEntry) {
                return "Wallet entry not found";
            }

            // Store user_id for balance adjustment
            const userId = walletEntry.user_id;

            // Delete wallet entry
            await Wallets.destroy({ where: { id }, transaction });

            // Update Wallet_Balance
            const balance = await this.getTotalBalnceByUserId(userId);
            let balanceRecord = await Wallet_Balance.findOne({ where: { user_id: userId }, transaction });

            if (balanceRecord) {
                await Wallet_Balance.update(
                    {
                        amount: balance
                    },
                    {
                        where: { user_id: userId },
                        transaction
                    }
                );
                await balanceRecord.save({ transaction });
            }

            await transaction.commit();
            return walletEntry;
        } catch (error) {
            throw new Error('Error deleting wallet entry: ' + error.message);
        }
    }
    async getTotalBalnceByChamaaId(chamaaId) {
        try {
            const credits = await Wallets.sum('is_credit', { where: { chamaa_id: chamaaId, is_credit: true } });
            const debits = await Wallets.sum('is_debit', { where: { chamaa_id: chamaaId, is_debit: true } });
            return (credits || 0) - (debits || 0);
        } catch (error) {
            throw new Error('Error calculating total balance: ' + error.message);
        }
    }
    async getTotalBalnceByUserId(userId) {
        try {
            const credits = await Wallets.sum('is_credit', { where: { user_id: userId, is_credit: true } });
            const debits = await Wallets.sum('is_debit', { where: { user_id: userId, is_debit: true } });
            return (credits || 0) - (debits || 0);
        } catch (error) {
            throw new Error('Error calculating total balance by user: ' + error.message);
        }
    }
    async sumCreditsByChamaaId(chamaaId) {
        try {
            const totalCredits = await Wallets.sum('is_credit', { where: { chamaa_id: chamaaId, is_credit: true } });
            return totalCredits || 0;
        } catch (error) {
            throw new Error('Error summing credits: ' + error.message);
        }
    }
    async sumDebitsByChamaaId(chamaaId) {
        try {
            const totalDebits = await Wallets.sum('is_debit', { where: { chamaa_id: chamaaId, is_debit: true } });
            return totalDebits || 0;
        } catch (error) {
            throw new Error('Error summing debits: ' + error.message);
        }
    }
    async getWalletEntryById(id) {
        try {
            const entry = await Wallets.findOne({ where: { id } });
            return entry;
        } catch (error) {
            throw new Error('Error fetching wallet entry: ' + error.message);
        }
    }
    async getWalletEntriesByDateRange(userId, startDate, endDate) {
        try {
            const entries = await Wallets.findAll({
                where: {
                    user_id: userId,
                    date: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });
            return entries;
        } catch (error) {
            throw new Error('Error fetching wallet entries by date range: ' + error.message);
        }
    }
    async dateFilteredEntries(chamaaId, startDate, endDate) {
        try {
            const entries = await Wallets.findAll({
                where: {
                    chamaa_id: chamaaId,
                    date: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });
            return entries;
        } catch (error) {
            throw new Error('Error fetching date filtered entries: ' + error.message);
        }
    }
    async dateFilteredEntriesByUser(userId, startDate, endDate) {
        try {
            const entries = await Wallets.findAll({
                where: {
                    user_id: userId,
                    date: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });
            return entries;
        } catch (error) {
            throw new Error('Error fetching date filtered entries by user: ' + error.message);
        }
    }

}
export default new WalletService();