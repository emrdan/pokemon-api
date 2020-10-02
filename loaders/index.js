const serverLoader  = require('./server');
const dbLoader = require('./db');

module.exports = async (expressApp) => {
  await dbLoader();
  await serverLoader(expressApp);
};