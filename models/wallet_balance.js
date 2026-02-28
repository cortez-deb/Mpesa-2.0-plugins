import { Model,DataTypes } from "sequelize";
import sequelize from '../config/connecton.js'
class Wallet_Balance extends Model{}
Wallet_Balance.init(
  {
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    user_id:{
      type:DataTypes.STRING
    },
    amount:{
      type:DataTypes.FLOAT
    },
    chamaa_id:{
      type: DataTypes.STRING
    },
    createdAt:{
      allowNull: false,
      type:DataTypes.DATE,
      defaultValue:DataTypes.NOW
    },
    updatedAt:{
      allowNull: false,
      type:DataTypes.DATE,
      defaultValue:DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName:'Wallet_Balance',
    underscored:true,
    freezeTableName:true, 
    tableName:'wallet_balances'
  }
)

export default Wallet_Balance;