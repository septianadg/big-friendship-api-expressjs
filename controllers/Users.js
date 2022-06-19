import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Validator from "fastest-validator";
const v = new Validator();
import Sequelize from "sequelize";
import sequelize from "../config/Database.js"; //sequelize instance

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','fullname','username','gender','email','phone']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async(req, res) => {
    const id = req.params.id;

  const user = await Users.findByPk(id, {
    attributes: ['id', 'fullname', 'username', 'gender', 'email', 'phone']
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found'
    });
  }

  return res.json({
    status: 'success',
    data: user
  });
}
 
export const Register = async(req, res) => {

    const schema = {
        fullname: 'string|empty:false',
        username: 'string|empty:false',
        gender: { type: "enum", values: ["male", "female"] },
        email: 'email|empty:false',
        phone: 'string|empty:false',
        password: 'string|min:8',
        confPassword: 'string|min:8'
      }
    
      const validate = v.validate(req.body, schema);
    
      if (validate.length) {
        return res.status(400).json({
          status: 'error',
          message: validate
        });
      }

      const user = await Users.findOne({
        where: Sequelize.or(
            {email: req.body.email},
            {username: req.body.username},
            {phone: req.body.phone}
        )
        
      });
    
      if (user) {
        return res.status(409).json({
          status: 'error',
          message: 'email/username/phone already exist'
        });
      }

    const { fullname, username, gender, email, phone, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            fullname: fullname,
            username: username,
            gender: gender,
            email: email,
            phone: phone,
            password: hashPassword
        });
        res.json({msg: "Register Berhasil"});
    } catch (error) {
        console.log(error);
    }
}
 
export const Login = async(req, res) => {
    try {

        const schemaUsername = {
            username: 'string|empty:false'
          }
        
          const validateUsername = v.validate(req.body, schemaUsername);
        
          if (validateUsername.length) {
            return res.status(400).json({
              status: 'error',
              message: 'username is empty'
            });
          }

        const user = await Users.findAll({
            where:{username: req.body.username}
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const fullname = user[0].fullname;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, fullname, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '3000s'
        });
        const refreshToken = jwt.sign({userId, fullname, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"User tidak ditemukan"});
    }
}

export const Update = async(req, res) => {

    const schema ={
        fullname: 'string|empty:false',
        username: 'string|empty:false',
        gender: { type: "enum", values: ["male", "female"] },
        email: 'email|empty:false',
        phone: 'string|empty:false'
      };
    
      const validate = v.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json({
          status: 'error',
          message: validate
        });
      }
    
      const id = req.params.id;
      const user = await Users.findByPk(id);
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'user not found'
        });
      }

      const username = req.body.username;
      if (username) {
        const checkUsername = await Users.findOne({
          where: { username }
        });
    
        if (checkUsername && username !== user.username) {
          return res.status(409).json({
            status: 'error',
            message: 'Username is used by another person'
          })
        }
      }
    
      const email = req.body.email;
      if (email) {
        const checkEmail = await Users.findOne({
          where: { email }
        });
    
        if (checkEmail && email !== user.email) {
          return res.status(409).json({
            status: 'error',
            message: 'Email is used by another person'
          })
        }
      }

      const phone = req.body.phone;
      if (phone) {
        const checkPhone = await Users.findOne({
          where: { phone }
        });
    
        if (checkPhone && phone !== user.phone) {
          return res.status(409).json({
            status: 'error',
            message: 'Phone is used by another person'
          })
        }
      }

      const {
        fullname, gender
      } = req.body;
    
      await user.update({
        email,
        fullname,
        gender,
        username,
        phone
      });
    
      return res.json({
        status: 'success',
        data: {
          id: user.id,
          fullname,
          username,
          gender,
          email,
          phone
        }
      });

}

export const Delete = async(req, res) => {
    const id = req.body.id;
    const user = await Users.findByPk(id);
  
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'user not found'
      });
    }
  
    await Users.destroy({
      where: { id: id }
    });
  
    return res.json({
      status: 'success',
      message: 'user deleted'
    });
}
 
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}