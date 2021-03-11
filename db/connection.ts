import { Sequelize } from 'sequelize';

const db = new Sequelize('udemy_node_11_ts_rest_server', 'test', 'test', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});

export default db;