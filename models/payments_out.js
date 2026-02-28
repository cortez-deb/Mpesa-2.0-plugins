import { Model,DataTypes } from "sequelize";
import sequelize from '../config/connecton.js'

class Payments_Out extends Model{

}
Payments_Out.init(
  {
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    business_shortcode:{
      type:DataTypes.STRING
    },
    transaction_id:{
      type:DataTypes.STRING,
      unique:true
    },
    amount:{
      type:DataTypes.FLOAT
    },
    chamaa_id:{
      type:DataTypes.STRING
    },
    user_id:{
      type:DataTypes.STRING
    },
    cycle_id:{
      type:DataTypes.STRING
    },
    date:{
      type:DataTypes.DATE
    },
    actualized:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    type:{
      type:DataTypes.ENUM,
      values:["credit","debit",]
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
    modelName:'Payments_Out',
    underscored:false,
    freezeTableName:true,
    tableName:'payments_out'
  }
)
export default Payments_Out