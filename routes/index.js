import express from "express";
import { getUsers, getUser, Register, Login, Update, Delete, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { Create, getRequests, getRequest, UpdateRequest, DeleteRequest } from "../controllers/Requests.js";
import { CreateStatus, getStatuss, getStatus, UpdateStatus, DeleteStatus } from "../controllers/Statuss.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.get('/users/:id', verifyToken, getUser);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.put('/users/:id', verifyToken, Update);
router.delete('/users', verifyToken, Delete);
router.delete('/logout', Logout);

router.post('/requests', verifyToken, Create);
router.get('/requests', verifyToken, getRequests);
router.get('/requests/:id', verifyToken, getRequest);
router.put('/requests/:id', verifyToken, UpdateRequest);
router.delete('/requests', verifyToken, DeleteRequest);

router.post('/statuss', verifyToken, CreateStatus);
router.get('/statuss', verifyToken, getStatuss);
router.get('/statuss/:id', verifyToken, getStatus);
router.put('/statuss/:id', verifyToken, UpdateStatus);
router.delete('/statuss', verifyToken, DeleteStatus);
 
export default router;