import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import auth0 from '../services/auth0';

class Index extends React.Component {
	render() {
		const { isAuthenticated, user } = this.props.auth;
		return(
			<BaseLayout mainClass="home">
				<div className="main-header">
					{ !isAuthenticated && (
						<>
							<div className="heading-primary--main">Hello World!</div>
							<div className="heading-primary--sub" onClick={auth0.login} style={{cursor: "pointer", marginTop: "10px"}}>Log In</div>
						</>
					)}
					{ isAuthenticated && (
						<>
							<div className="heading-primary--main">Hi {user.name}!</div>
							<span className="heading-primary--sub" onClick={auth0.logout} style={{cursor: "pointer", marginTop: "10px"}}>Log Out</span>
						</>
					)}
				</div>
			</BaseLayout>
		)
	}
}

export default Index;