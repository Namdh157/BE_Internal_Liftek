process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
/* eslint-disable no-console */
const mongoose = require('mongoose');
const util = require('util');
const init = require('./config/init');
const socketIO = require('socket.io');
const http = require('http');
const aiClient = require('socket.io-client');
const redisAdapter = require('socket.io-redis');
const oracleDb = require('oracledb');
const path = require('path');

// const initNotice = require('./server/helpers/agenda');
oracleDb.outFormat = oracleDb.OUT_FORMAT_OBJECT;
// Global variables
require('./server/variables/global');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();
// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');

const debug = require('debug')('boilerplate_nodejs:index');
// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;
// connect to mongo db
const mongoUri = config.mongo.host;
if (process.env.REPLICA_SET) {
  if (process.env.IS_REPORT_DB) {
    mongoose.connect(mongoUri, {
      user: config.mongo.user,
      pass: config.mongo.pass,
      readPreference: 'secondaryPreferred',
      socketTimeoutMS: 60 * 1000,
      replicaSet: process.env.REPLICA_SET,
      useCreateIndex: true,
    });
  } else {
    mongoose.connect(mongoUri, {
      user: config.mongo.user,
      pass: config.mongo.pass,
      // readPreference: 'primary',
      socketTimeoutMS: 60 * 1000,
      replicaSet: process.env.REPLICA_SET,
      useCreateIndex: true,
    });
  }
} else {
  mongoose.connect(mongoUri, {
    user: config.mongo.user,
    pass: config.mongo.pass,
    server: {
      socketOptions: {
        keepAlive: 1,
      },
    },
    socketTimeoutMS: 60 * 1000,
    useCreateIndex: true,
  });
}

mongoose.connection.on('error', (error) => {

  // throw new Error(`unable to connect to database: ${mongoUri}`);
});
// 
// oracleDb.initOracleClient({ libDir: process.env.INIT_ORACLE_CLIENT });  // connect trên window
oracleDb
  .getConnection({
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PWD,
    connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${process.env.ORACLE_HOST})(PORT=${process.env.ORACLE_PORT
      }))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=${process.env.ORACLE_SERVICE})))`,
  })
  .then((connection) => {

    global.mysqlConnection = connection;
  })
  .catch((err) => {


  });
// print mongoose logs in dev env
// if (config.mongooseDebug) {
//   mongoose.set('debug', (collectionName, method, query, doc) => {
//     debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
//   });
// }

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // eslint-disable-next-line new-cap
  const server = http.Server(app);

  global.io = socketIO(server, {
    cors: {
      origin: '*',
    },
    transports: ['websocket', 'polling'],
  });

  // global.socketClientAi = aiClient('http://192.168.1.238:5000');

  // global.socketClientAi.on('connect', () => {
  //   
  //   global.socketClientAi.on('register-result', (data) => {
  //     
  //     global.io.emit(data.clientSid, data);
  //   });
  //   global.socketClientAi.on('result-camera', (data) => {
  //     
  //     global.io.emit(data.clientSid, data);
  //   });

  //   global.socketClientAi.on('on-result-image', (data) => {
  //     
  //     global.io.emit(data.clientSid, data);
  //   });
  // });

  // global.socketClientAi.on('disconnect', () => {
  //   
  // });

  const io = global.io;
  // listen on port config.port
  server.listen(config.port, '0.0.0.0', () => {
    init(app);
    global.hshSocketUser = {};
    global.hshUserSocket = {};
    global.hshIdSocket = {};
    global.userCount = 0;
    global.smsCount = 0;
    global.appRoot = path.resolve(__dirname);
    // initNotice()
    // eslint-disable-next-line import/newline-after-import
    io.adapter(redisAdapter({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }));
    global.io.on(
      'connection',
      // eslint-disable-next-line import/newline-after-import
      // eslint-disable-next-line global-require
      require('./server/socket/index'),
    );
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}

module.exports = app;
