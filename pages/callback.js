import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import auth0Client from '../services/auth0';
import { withRouter } from 'next/router';

class Callback extends React.Component {
	componentDidMount = async () => {
		await auth0Client.handleAuthentication();
		this.props.router.push('/');
	}

	render() {
		return(
			<BaseLayout mainClass="home">
				<div className="home-header">
					<div className="heading-primary--main">Signing you in...</div>
				</div>
			</BaseLayout>
		)
	}
}

export default withRouter(Callback);