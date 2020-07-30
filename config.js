module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000,
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'sql9.freemysqlhosting.net',
        user: process.env.MYSQL_USER || 'sql9356519',
        password: process.env.MYSQL_PASS || 'GShsWyAasf',
        database: process.env.MYSQL_DB || 'sql9356519',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    },
    cacheService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3003,
    },
    redis: {
        host:
            process.env.REDIS_HOST ||
            'redis-15757.c15.us-east-1-2.ec2.cloud.redislabs.com',
        port: process.env.REDIS_PORT || 15757,
        password: process.env.REDIS_PASS || 'juanchito667',
    },
}
