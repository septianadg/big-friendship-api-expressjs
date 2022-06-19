import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Statuss = db.define('statuss',{
    idRequestId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM,
        values: ['accept', 'reject'],
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

const Requests2 = db.define(
    "requests",
    { idUserReqFromId: Sequelize.INTEGER },
    { idUserReqToId: Sequelize.INTEGER },
    { status: Sequelize.STRING }
  );

  const Users2 = db.define(
    "users",
    { fullname: Sequelize.STRING },
    { gender: Sequelize.STRING }
  );

  Statuss.belongsTo(Requests2, {
    as: 'id_request__',
    foreignkey: 'id_request'
});

Requests2.belongsTo(Users2, {
    as: 'id_user_req_from__',
    foreignkey: 'id_user_req_from'
});

Requests2.belongsTo(Users2, {
    as: 'id_user_req_to__',
    foreignkey: 'id_user_req_to'
});

(async () => {
    await db.sync();
})();
 
export default Statuss;