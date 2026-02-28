import Wallets from "../../../models/wallet.js";
import Wallet_Balance from "../../../models/wallet_balance.js";
import { Op } from "sequelize";
class WalletService {
    async createWalletEntry(data) {
        try {
            const transaction = await Wallets.sequelize.transaction();

            const walletEntry = await Wallets.create(data, { transaction });

            // Update Wallet_Balance
            let balanceRecord = await Wallet_Balance.findOne({
                where: { user_id: data.user_id, chamaa_id: data.chamaa_id },
                transaction
            });
            console.log("balance found proceeding to calculate", balanceRecord?.dataValues)

            // Calculate the adjustment based on debit or credit
            const adjustment = data.is_debit ? -data.amount : +data.amount;
            console.log('Adjustment: ' + adjustment);

            if (!balanceRecord) {
                // If no balance record exists, create one with the adjustment
                balanceRecord = await Wallet_Balance.create({
                    user_id: data.user_id,
                    amount: adjustment,
                    chamaa_id: data.chamaa_id
                }, { transaction });
                console.log('New balance record created with amount: ' + adjustment);
            } else {
                // If balance record exists, ADD the adjustment to the existing amount
                const newAmount = balanceRecord.amount + adjustment;
                balanceRecord.set({ amount: newAmount });
                console.log("updated balance from " + balanceRecord.dataValues.amount + " to " + newAmount);
            }

            await balanceRecord.save({ transaction });
            await walletEntry.save({ transaction })

            await transaction.commit();
            return walletEntry;

        } catch (error) {
            throw new Error('Error creating wallet entry: ' + error.message);
        }
    }
    async getWalletBalanceByUserId(userId) {
        try {
            const balanceRecord = await Wallet_Balance.sum("amount", { where: { user_id: userId } });
            return balanceRecord ? balanceRecord.amount : 0;
        } catch (error) {
            throw new Error('Error fetching wallet balance: ' + error.message);
        }
    }
    async getWalletBalanceByUserIdChamaa(userId, chamaa_id) {
        try {
            const balanceRecord = await Wallet_Balance.findOne({
                where: { user_id: userId, chamaa_id: chamaa_id },
                transaction
            });
            return balanceRecord
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
    async getWalletBalanceByUserIdChamaa_id(user_id, chamaa_id) {
        try {
            const entries = await Wallets.findAll({ where: { user_id: user_id, chamaa_id: chamaa_id } });
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
            const credits = await Wallets.sum('amount', { where: { chamaa_id: chamaaId, is_credit: true } });
            const debits = await Wallets.sum('amount', { where: { chamaa_id: chamaaId, is_debit: true } });
            return (credits || 0) - (debits || 0);
        } catch (error) {
            throw new Error('Error calculating total balance: ' + error.message);
        }
    }
    async getTotalBalnceByUserId(userId) {
        try {
            console.log("calculating sum credit and debit for user " + userId)
            const credits = await Wallets.sum('amount', { where: { user_id: userId, is_credit: true } });
            console.log('credits', credits)
            const debits = await Wallets.sum('amount', { where: { user_id: userId, is_debit: true } });
            console.log('debits', debits)
            return (credits || 0) - (debits || 0);
        } catch (error) {
            throw new Error('Error calculating total balance by user: ' + error.message);
        }
    }
    async sumCreditsByChamaaId(chamaaId) {
        try {
            const totalCredits = await Wallets.sum('amount', { where: { chamaa_id: chamaaId, is_credit: true } });
            return totalCredits || 0;
        } catch (error) {
            throw new Error('Error summing credits: ' + error.message);
        }
    }
    async sumDebitsByChamaaId(chamaaId) {
        try {
            const totalDebits = await Wallets.sum('amount', { where: { chamaa_id: chamaaId, is_debit: true } });
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