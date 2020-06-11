import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import { getCookieFromReq } from '../helpers/utils';

const CLIENT_ID = process.env.CLIENT_ID;

class Auth {

	constructor() {
		this.auth0 = new auth0.WebAuth({
			domain: 'dev-mdn7fmml.auth0.com',
			clientID: CLIENT_ID,
			redirectUri: `${process.env.BASE_URL}/callback`,
			responseType: 'token id_token',
			scope: 'openid profile'
		});
	}

	handleAuthentication = () => {
		return new Promise((resolve, reject) => {
			this.auth0.parseHash((err, authResult) => {
				if(authResult && authResult.accessToken && authResult.idToken) {
					this.setSession(authResult);
					resolve();
				} else if (err) {
					reject();
					console.log(err);
				}
			});
		})
	}

	setSession = authResult => {
		Cookies.set('jwt', authResult.idToken);
	}

	logout = () => {
		Cookies.remove('jwt');
		this.auth0.logout({
			returnTo: process.env.BASE_URL,
			clientID: CLIENT_ID
		})
	}

	login = () => {
		this.auth0.authorize();
	}

	getJWKS = async () => {
		const res = await axios.get('https://dev-mdn7fmml.auth0.com/.well-known/jwks.json');
		const jwks = res.data;
		return jwks;
	}

	verifyToken = async token => {
		if(token) {
			const decodedToken = jwt.decode(token, { complete: true });
			if(!decodedToken) { return undefined; }
			const jwks = await this.getJWKS();
			const jwk = jwks.keys[0];

			//BUILD CERTIFICATE
			let cert = jwk.x5c[0];
			cert = cert.match(/.{1,64}/g).join('\n');
			cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

			if(jwk.kid === decodedToken.header.kid) {
				try {
					const verifiedToken = jwt.verify(token, cert);
					const expiresAt = verifiedToken.exp * 1000;
					return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;
				} catch(err) {
					return undefined;
				}
			}

			const expiresAt = decodedToken.exp * 1000;

			return (decodedToken && new Date().getTime() < expiresAt) ? decodedToken : undefined;
		}
		return undefined;
	}

	clientAuth = async () => {
		const token = Cookies.getJSON('jwt');
		const verifiedToken = await this.verifyToken(token);

		return verifiedToken;
	}

	serverAuth = async req => {
		if(req.headers.cookie) {
			const token = getCookieFromReq(req, 'jwt');
			const verifiedToken = await this.verifyToken(token);
			return verifiedToken;
		}
		return undefined;
	}
}

const auth0Client = new Auth();

export default auth0Client;