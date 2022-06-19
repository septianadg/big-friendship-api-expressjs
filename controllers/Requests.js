import Requests from "../models/RequestModel.js";
import Users from "../models/UserModel.js";
import Validator from "fastest-validator";
const v = new Validator();
import Sequelize from "sequelize";

export const Create = async(req, res) => {
    const schema = {
        idUserReqFromId: 'number|empty:false',
        idUserReqToId: 'number|empty:false',
        status: { type: "enum", values: ["request", "cancel_request"] }
      }
    
      const validate = v.validate(req.body, schema);
    
      if (validate.length) {
        return res.status(400).json({
          status: 'error',
          message: validate
        });
      }

      const users = await Users.findOne({
        where: {id: req.body.idUserReqFromId}
      });
    
      if (!users) {
        return res.status(409).json({
          status: 'error',
          message: 'idUserReqFromId not found'
        });
      }

      const users2 = await Users.findOne({
        where: {id: req.body.idUserReqToId}
      });
    
      if (!users2) {
        return res.status(409).json({
          status: 'error',
          message: 'idUserReqToId not found'
        });
      }

      const requests = await Requests.findOne({
        where: Sequelize.or(
            Sequelize.and(
            {idUserReqFromId: req.body.idUserReqFromId},
            {idUserReqToId: req.body.idUserReqToId},
            {status: 'request'}
            ),
            Sequelize.and(
                {idUserReqFromId: req.body.idUserReqToId},
                {idUserReqToId: req.body.idUserReqFromId},
                {status: 'request'}
                )
        )
      });
    
      if (requests) {
        return res.status(409).json({
          status: 'error',
          message: 'Request already exist both users'
        });
      }

    const { idUserReqFromId, idUserReqToId, status } = req.body;

    try {
        await Requests.create({
            idUserReqFromId: idUserReqFromId,
            idUserReqToId: idUserReqToId,
            status: status
        });
        res.json({msg: "Send friendship request success"});
    } catch (error) {
        console.log(error);
    }
}

export const getRequests = async(req, res) => {
    try {
        const requests = await Requests.findAll({
            attributes: ['id','status'],
            include: [{
                model: Users, attributes:
                    ['fullname', 'username', 'id', 'gender'],
                as: 'id_user_req_to__'
            },{
                model: Users, attributes:
                    ['fullname', 'username', 'id', 'gender'],
                as: 'id_user_req_from__'
            }]
          });


        res.json(requests);
    } catch (error) {
        console.log(error);
    }
}

export const getRequest = async(req, res) => {
    const id = req.params.id;

  const requests = await Requests.findByPk(id, {
    attributes: ['id','status'],
    include: [{
        model: Users, attributes:
            ['fullname', 'username', 'id', 'gender'],
        as: 'id_user_req_to__'
    },{
        model: Users, attributes:
            ['fullname', 'username', 'id', 'gender'],
        as: 'id_user_req_from__'
    }]
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'request not found'
    });
  }

  return res.json({
    status: 'success',
    data: requests
  });
}

export const UpdateRequest = async(req, res) => {

    const schema ={
        status: { type: "enum", values: ["request", "cancel_request"] }
      };
    
      const validate = v.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json({
          status: 'error',
          message: validate
        });
      }
    
      const id = req.params.id;
      const request = await Requests.findByPk(id);
      if (!request) {
        return res.status(404).json({
          status: 'error',
          message: 'request not found'
        });
      }

      const {
        status
      } = req.body;
    
      await request.update({
        status
      });
    
      return res.json({
        status: 'success',
        data: {
          id: request.id,
          status
        }
      });

}

export const DeleteRequest = async(req, res) => {
    const id = req.body.id;
    const request = await Requests.findByPk(id);
  
    if (!request) {
      return res.status(404).json({
        status: 'error',
        message: 'request not found'
      });
    }
  
    await Requests.destroy({
      where: { id: id }
    });
  
    return res.json({
      status: 'success',
      message: 'request deleted'
    });
}