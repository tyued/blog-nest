import { join } from 'path';
export default {
    type: 'mysql',
    host: '121.40.155.153',
    port: 3306,
    username: 'root',
    password: '******',
    database: 'testdb',
    entities: [join(__dirname,'../','**/**.entity{.ts,.js}')],
    synchronize: true,
}