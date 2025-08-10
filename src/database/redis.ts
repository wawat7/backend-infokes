import { Redis } from 'ioredis';

// Membuat kelas RedisConnection yang akan memastikan hanya ada satu koneksi Redis
class RedisConnection {
    private static instance: Redis;

    private constructor() {}

    public static getInstance(): Redis {
        if (!RedisConnection.instance) {
            RedisConnection.instance = new Redis({
                host: process.env.REDIS_HOST || 'localhost',
                port: 6379,
                db: 0,
                password: process.env.REDIS_PASSWORD || '',
                connectTimeout: 5000
            });
        }
        return RedisConnection.instance;
    }
}

export default RedisConnection;
