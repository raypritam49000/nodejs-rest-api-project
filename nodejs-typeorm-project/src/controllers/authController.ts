import {Request, Response} from 'express';
import {User} from '../entities/User';
import http from 'http';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {AppDataSource} from "../config/database";

const AuthController = {

    registerUser: async (req: Request, res: Response) => {
        try {
            const userRepository = AppDataSource.getRepository(User);

            const userByEmail = await userRepository.findOne({where: {email: req.body.email}});

            if (userByEmail) {
                return res.status(409).json({
                    message: 'Email is already used with another account',
                    status: http.STATUS_CODES[409],
                    statusCode: 409,
                    success: false,
                });
            }

            const newUser = userRepository.create(req.body);
            const savedUser = await userRepository.save(newUser);

            return res.status(201).json({
                status: http.STATUS_CODES[201],
                statusCode: 201,
                data: savedUser,
                message: 'User has been registered successfully',
            });
        } catch (error) {
            return res.status(500).send({
                message: error.message,
                status: http.STATUS_CODES[500],
                statusCode: 500,
                success: false,
            });
        }
    },

    loginUser: async (req: Request, res: Response) => {
        try {
            const {username, password} = req.body;

            const userRepository = AppDataSource.getRepository(User);

            const userByEmail = await userRepository.findOne({where: {email: username}});

            if (!userByEmail) {
                return res.status(404).json({
                    message: 'User is not registered. Please register first!!!',
                    status: http.STATUS_CODES[404],
                    statusCode: 404,
                    success: false,
                });
            }

            if (!(await bcryptjs.compare(password, userByEmail.password))) {
                return res.status(401).json({
                    message: 'Bad credentials. Please check your username and password.',
                    status: http.STATUS_CODES[401],
                    statusCode: 401,
                    success: false,
                });
            }

            const token = jwt.sign({userByEmail}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});

            return res.status(200).json({
                status: http.STATUS_CODES[200],
                statusCode: 200,
                token: token,
                message: 'User has been logged in successfully',
            });

        } catch (error) {
            return res.status(500).send({
                message: error.message,
                status: http.STATUS_CODES[500],
                statusCode: 500,
                success: false,
            });
        }
    },
};

export default AuthController;
