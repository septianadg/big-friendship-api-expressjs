import Statuss from "../models/StatusModel.js";
import Requests from "../models/RequestModel.js";
import Users from "../models/UserModel.js";
import Validator from "fastest-validator";
const v = new Validator();
import Sequelize from "sequelize";

export const CreateStatus = async(req, res) => {
    const schema = {
        idRequestId: 'number|empty:false',
        status: { type: "enum", values: ["accept", "reject"] }
      }
    
      const validate = v.validate(req.body, schema);
    
      if (validate.length) {
        return res.status(400).json({
          status: 'error',
          message: validate
        });
      }

      const requests = await Requests.findOne({
        where: Sequelize.and(
            {id: req.body.idRequestId},
            {status: 'request'}
        )
      });
    
      if (!requests) {
        return res.status(409).json({
          status: 'error',
          message: 'idRequest with status=request is not found'
        });
      }

      const statuss = await Statuss.findOne({
        where: Sequelize.and(
            {idRequestId: req.body.idRequestId},
            {status: 'accept'}
        )
      });
    
      if (statuss) {
        return res.status(409).json({
          status: 'error',
          message: 'Status friendship with status=accepted is existing'
        });
      }

    const { idRequestId, status } = req.body;

    try {
        await Statuss.create({
            idRequestId: idRequestId,
            status: status
        });
        res.json({msg: "Create status friendship success"});
    } catch (error) {
        console.log(error);
    }
}

export const getStatuss = async(req, res) => {
    try {
        const statuss = await Statuss.findAll({
            attributes: ['id','status'],
            include: [{
                model: Requests, attributes:
                    ['idUserReqFromId', 'idUserReqToId', 'id', 'status'],
                as: 'id_request__',
                include: [{
                    model: Users, attributes:
                        ['fullname', 'username', 'id', 'gender'],
                    as: 'id_user_req_to__'
                },{
                    model: Users, attributes:
                        ['fullname', 'username', 'id', 'gender'],
                    as: 'id_user_req_from__'
                }]
            }]
          });

        res.json(statuss);
    } catch (error) {
        console.log(error);
    }
}

export const getStatus = async(req, res) => {
    const id = req.params.id;

  const statuss = await Statuss.findByPk(id, {
    attributes: ['id','status'],
    include: [{
        model: Requests, attributes:
            ['idUserReqFromId', 'idUserReqToId', 'id', 'status'],
        as: 'id_request__',
        include: [{
            model: Users, attributes:
                ['fullname', 'username', 'id', 'gender'],
            as: 'id_user_req_to__'
        },{
            model: Users, attributes:
                ['fullname', 'username', 'id', 'gender'],
            as: 'id_user_req_from__'
        }]
    }]
  });

  if (!statuss) {
    return res.status(404).json({
      status: 'error',
      message: 'status friendship not found'
    });
  }

  return res.json({
    status: 'success',
    data: statuss
  });
}

export const UpdateStatus = async(req, res) => {

    const schema ={
        status: { type: "enum", values: ["accept", "reject"] }
      };
    
      const validate = v.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json({
          status: 'error',
          message: validate
        });
      }
    
      const id = req.params.id;
      const statuss = await Statuss.findByPk(id);
      if (!statuss) {
        return res.status(404).json({
          status: 'error',
          message: 'status friendship not found'
        });
      }

      const {
        status
      } = req.body;
    
      await statuss.update({
        status
      });
    
      return res.json({
        status: 'success',
        data: {
          id: statuss.id,
          status
        }
      });

}

export const DeleteStatus = async(req, res) => {
    const id = req.body.id;
    const statuss = await Statuss.findByPk(id);
  
    if (!statuss) {
      return res.status(404).json({
        status: 'error',
        message: 'status friendship not found'
      });
    }
  
    await Statuss.destroy({
      where: { id: id }
    });
  
    return res.json({
      status: 'success',
      message: 'status friendship deleted'
    });
}