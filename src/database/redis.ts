import * as Redis from 'ioredis';
import redisConfig from '../config/redis';

let n:number = 0;
const redisIndex = [];  // 记录Redis实例索引
const redisList = [];   // 存储Redis实例

export class RedisInstance {
    static async initRedis(method: string, db = 0) {
        const isExist = redisIndex.some(x => x===db);
        if(!isExist){
            // console.log(`[Redis ${db}] 来自 ${method} 方法调用，Redis 实例化了 ${++n}次`);
            redisList[db] = new Redis({...redisConfig, db});
            redisIndex.push(db);
        }else{
            console.log(`[Redis ${db}]来自, ${method} 方法调用`);
        }
        return redisList[db];
    }
}
