const { createClient } = require("redis");

const redisClient = createClient({
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
});

redisClient.on("error", (error) => {
    console.error("Redis error: ", error);
});

const connectRedis = () => {
   try {
        redisClient.on("connect", () => {
             console.log("Redis connected");
        });

   } catch (error) {
        console.error("Connect redis error: ", error);
   }
}

module.exports = {redisClient, connectRedis};
