import {Router} from 'express';
import {UserController} from "../controllers/userController";
import authFilter from "../middlewares/AuthFilter";

const router = Router();

router.get('/', authFilter, UserController.getAllUsers);
router.get('/:id', authFilter, UserController.findUserById);
router.get('/:name/name', authFilter, UserController.findUserByName);
router.get('/:email/email', authFilter, UserController.findUserByEmail);
router.post('/', authFilter, UserController.createUser);
router.delete('/:id', authFilter, UserController.deleteUser);
router.put('/:id', authFilter, UserController.updateUser);

export default router;
