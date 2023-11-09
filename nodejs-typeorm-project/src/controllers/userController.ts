import {Request, Response} from 'express';
import {AppDataSource} from "../config/database";
import {User} from "../entities/User";

export const UserController = {

    getAllUsers: async (req: Request, res: Response) => {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },

    createUser: async (req: Request, res: Response) => {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const newUser = userRepository.create(req.body);
            await userRepository.save(newUser);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const {id} = req.params;
            const user = await userRepository.findOne({where: {id}});

            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }

            await userRepository.remove(user);
            res.json({message: 'User deleted'});
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },

    updateUser: async (req: Request, res: Response) => {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const {id} = req.params;
            const user = await userRepository.findOne({where: {id}});

            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }

            userRepository.merge(user, req.body);
            const updatedUser = await userRepository.save(user);
            res.json(updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },

    findUserById: async (req: Request, res: Response) => {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const {id} = req.params;
            const user = await userRepository.findOne({where: {id}});

            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }

            res.json(user);
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },

    findUserByName: async (req: Request, res: Response) => {
        try {
            const query = 'SELECT * FROM user WHERE name = ?';
            const entityManager = AppDataSource.createEntityManager();
            const results = await entityManager.query<User>(query, [req.params.name]);
            res.json(results);
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },

    findUserByEmail: async (req: Request, res: Response) => {
        try {
            const {email} = req.params;

            if (!email) {
                return res.status(400).json({message: 'Name parameter is missing'});
            }

            const userRepository = AppDataSource.getRepository(User);

            const results = await userRepository
                .createQueryBuilder('user')
                .where('user.email = :email', {email})
                .getMany();

            res.json(results);
        } catch (error) {
            console.error('Error fetching user by name:', error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },
};