const { MongodHelper } = require('mongodb-prebuilt');

const mongodHelper = new MongodHelper(['--port', "27018", "--dbpath", "./mongodb"]);

module.exports = { mongodHelper };
