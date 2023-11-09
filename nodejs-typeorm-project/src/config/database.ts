import {DataSource} from "typeorm";
import "reflect-metadata"
import {User} from "../entities/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "0003pray",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
});
