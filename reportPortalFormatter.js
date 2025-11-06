const { createRPFormatterClass } = require('@reportportal/agent-js-cucumber');
const rpConfig = require('./reportportal.bdd.config.json');

module.exports = createRPFormatterClass(rpConfig);
