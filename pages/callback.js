import React from 'react';
import { BaseLayout, BaseContainer } from "../components/layouts";
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
				<BaseContainer>
					<div className="heading-primary--main">Signing you in...</div>
				</BaseContainer>
			</BaseLayout>
		)
	}
}

export default withRouter(Callback);