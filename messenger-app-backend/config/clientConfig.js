const com = require('../custom_modules/com');

module.exports = {
	clientPasswordProvided: (typeof process.env.CLIENT_PASSWORD === 'undefined'?false:true),
	clientPassword: (typeof process.env.CLIENT_PASSWORD === 'undefined'?com.makeId(16):process.env.CLIENT_PASSWORD),
	cookieSecret: (typeof process.env.CLIENT_COOKIESECRET === 'undefined'?com.makeId(16):process.env.CLIENT_COOKIESECRET),
}