import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import { Router } from '../routes';

class FourZeroFour extends React.Component {
	componentDidMount = () => {
		setTimeout(() => {Router.pushRoute('/')}, 3000);
	}

	render() {
		return(
			<BaseLayout mainClass="home">
				<div className="home-header">
					<div className="heading-primary--main">404. The page was not found.</div>
					<div className="heading-primary--sub">Please wait while we redirect you...</div>
				</div>
			</BaseLayout>
		)
	}
}

export default (FourZeroFour);
