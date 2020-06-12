import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import auth0 from '../services/auth0';
import NavLink from '../components/shared/NavLink';

class Index extends React.Component {
	render() {
		const { isAuthenticated, user } = this.props.auth;
		return(
			<BaseLayout mainClass="home">
				<div className="home-header">
					{ !isAuthenticated && (
						<>
							<div className="home-header__navigation mb-sm"> 
								<NavLink route="/about">
									<span className="heading-tertiary nav-link">About</span>
								</NavLink>
								<NavLink route="/projects">
									<span className="heading-tertiary nav-link">Projects</span>
								</NavLink>
								<NavLink route="/blogs">
									<span className="heading-tertiary nav-link">Blogs</span>
								</NavLink>
								<NavLink route="/contact">
									<span className="heading-tertiary nav-link">Contact</span>
								</NavLink>
							</div>
							<div className="heading-primary--main">About!</div>
							<div className="heading-primary--sub mt-sm nav-link" onClick={auth0.login}>Log In</div>
						</>
					)}
					{ isAuthenticated && (
						<>
							<div className="home-header__navigation mb-sm"> 
								<NavLink route="/about">
									<span className="heading-tertiary nav-link">About</span>
								</NavLink>
								<NavLink route="/projects">
									<span className="heading-tertiary nav-link">Projects</span>
								</NavLink>
								<NavLink route="/blogs">
									<span className="heading-tertiary nav-link">Blogs</span>
								</NavLink>
								<NavLink route="/contact">
									<span className="heading-tertiary nav-link">Contact</span>
								</NavLink>
							</div>
							<div className="heading-primary--main">Hi {user.name}!</div>
							<div className="heading-primary--main">You are in About!</div>
							<div className="heading-primary--sub mt-sm nav-link" onClick={auth0.logout}>Log Out</div>
						</>
					)}
				</div>
			</BaseLayout>
		)
	}
}

export default Index;