const { createClient } = require('redis');

let redisClient = {};

const connectRedis = async () => {
    redisClient = createClient({
        socket: {
            host: "redis",
            port: "6379"
        }
    });

    redisClient.on("error", (err) => console.log(err));

    await redisClient.connect();
    console.log("✅ Redis conectado");
}

const getRedisClient = () => redisClient;

module.exports = {
    connectRedis,
    getRedisClient
}