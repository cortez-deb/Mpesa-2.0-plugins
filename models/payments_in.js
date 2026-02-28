import { Model,DataTypes } from "sequelize";
import sequelize from '../config/connecton.js'

class Payments_in extends Model{

}
Payments_in.init(
  {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
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
      type:DataTypes.DATE,
      defaultValue:DataTypes.NOW
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
      type:DataTypes.DATE,
      defaultValue:DataTypes.NOW
    },
    updatedAt:{
      type:DataTypes.DATE,
      defaultValue:DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName:'Payments_in',
    underscored:true,
    freezeTableName:true,
    tableName:'payments_in'
  }
)

export default Payments_in
export {Payments_in}