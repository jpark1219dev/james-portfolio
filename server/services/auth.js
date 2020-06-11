const jwt = require('express-jwt');
const jwksClient = require('jwks-rsa');

const config = require('../config');
const NAMESPACE = config.NAMESPACE;

exports.checkJWT = jwt({
	secret: jwksClient.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 50,
		jwksUri: 'https://dev-mdn7fmml.auth0.com/.well-known/jwks.json'
	}),
	audience: 'HN9ANqg2TsBau4cn6zOeNpG3Zr6sB0TK',
	issuer: 'https://dev-mdn7fmml.auth0.com/',
	algorithms: ['RS256']
})

exports.checkRole = role => (req, res, next) => {
	const user = req.user;
	if(user && user[NAMESPACE + '/role'] && user[NAMESPACE + '/role'] === role) {
		next();
	} else {
		return res.status(401).send({title: 'Denied', detail: 'Access is forbidden due to missing credentials'})
	}
}