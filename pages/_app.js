import React from 'react';
import App from 'next/app';
import auth0 from '../services/auth0';
import '../styles/main.scss';

class MyApp extends App {
	static async getInitialProps({Component, router, ctx}) {
		let pageProps = {};
		const user = process.browser ? await auth0.clientAuth() : await auth0.serverAuth(ctx.req);
		if(Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		const isAdmin = user && user[process.env.NAMESPACE + '/role'] === 'admin'
		const auth = { user, isAuthenticated: !!user, isAdmin: !!isAdmin };
		return { pageProps, auth };
	}

	render() {
		const { Component, pageProps, auth } = this.props;
		return (
			<Component {...pageProps} auth={auth} />
		)
	}
}

export default MyApp