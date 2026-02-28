
import { Sequelize } from "sequelize";
const __dirname = process.cwd();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialectOptions: {
        ssl: process.env.DB_CHANNELBINDING === 'require'
            ? { require: true, rejectUnauthorized: false }
            : false,
        // channelBinding option is not directly supported by Sequelize or pg,
        // but you can pass it if your environment/driver supports it:
        channelBinding: process.env.DB_CHANNELBINDING
    },
    models: [__dirname + "../models"],
    logging: (sql, options) => {
        // Log errors only
        if (options?.type === 'ERROR') {
            console.error(`[Sequelize] Error: ${options?.message}`);
        }
    }
});

export default sequelize;