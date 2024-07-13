import Router from 'express';
import AuthController from '../Controllers/AuthController.js';
import { check } from 'express-validator'
import AuthMiddlewareHelper from '../Services/AuthMiddlewareHelper.js';

const authRouter = new Router();

authRouter.post(
    '/auth/registration', 
    [
        check('email', 'Email empty!').isString().isEmail().notEmpty(),
        check('password', 'Password incorrect!').notEmpty(),
    ],
    AuthController.registration); //Create
authRouter.post('/auth/login', AuthController.login); //Read


export default authRouter;