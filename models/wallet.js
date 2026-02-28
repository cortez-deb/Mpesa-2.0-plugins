import { Model,DataTypes } from "sequelize";
import sequelize from '../config/connecton.js'

class Wallets extends Model{

}
Wallets.init(
  {
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    is_debit:{
      type:DataTypes.BOOLEAN
    },
    transaction_id:{
      type:DataTypes.STRING
    },
    chamaa_id:{
      type:DataTypes.STRING
    },
    user_id:{
      type:DataTypes.STRING
    },
    date:{
      type:DataTypes.DATE
    },
    is_credit:{
      type:DataTypes.BOOLEAN
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
    modelName:'Wallets',
    underscored:true,
    freezeTableName:true, 
    tableName:'wallets'
  }
)

export default Wallets;