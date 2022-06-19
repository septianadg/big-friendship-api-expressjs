import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Users = db.define('users',{
    username:{
        type: DataTypes.STRING
    },
    fullname:{
        type: DataTypes.STRING
    },
    gender:{
        type: DataTypes.ENUM,
        values: ['male', 'female'],
        allowNull: false
    },
    email:{
        type: DataTypes.STRING
    },
    phone:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
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


(async () => {
    await db.sync();
})();
 
export default Users;