import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Requests = db.define('requests',{
    idUserReqFromId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idUserReqToId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM,
        values: ['request', 'cancel_request'],
        allowNull: false
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false
    }
},{
    freezeTableName:true,
    timestamps: true
});

const Users2 = db.define(
    "users",
    { fullname: Sequelize.STRING },
    { gender: Sequelize.STRING }
  );

Requests.belongsTo(Users2, {
    as: 'id_user_req_from__',
    foreignkey: 'id_user_req_from'
});

Requests.belongsTo(Users2, {
    as: 'id_user_req_to__',
    foreignkey: 'id_user_req_to'
});

(async () => {
    await db.sync();
})();
 
export default Requests;