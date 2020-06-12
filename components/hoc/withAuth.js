import React from "react";
import Forbidden from "./../../pages/foribbden";

export default role => 
	Component => {
		return class withAuth extends React.Component {
			static async getInitialProps(args) {
				const pageProps =
					(await Component.getInitialProps) &&
					(await Component.getInitialProps(args));

				return { ...pageProps };
			}

			renderAuthorizedPage() {
				const { isAuthenticated, user } = this.props.auth;
				const userRole = user && user[`${process.env.NAMESPACE}/role`];
				let isAuthorized = false;

				if(role) {
					if(userRole && userRole === role) {
						isAuthorized = true;
					} else {
						isAuthorized = false;
					}
				}

				if(!isAuthenticated) {
					return (
						<Forbidden title={"Try signing in to view this page"} />
					)
				} else if (!isAuthorized) {
					return (
						<Forbidden title={"Credentials are missing for access"} />
					)
				} else {
					return <Component {...this.props} />;
				}
			}
			render() {
				return this.renderAuthorizedPage();
			}
		}
	}