import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import { Router } from '../routes';

class Forbidden extends React.Component {
	componentDidMount = () => {
		setTimeout(() => {Router.pushRoute('/')}, 2000);
	}

	render() {
		return(
			<BaseLayout mainClass="home">
				<div className="home-header">
					<div className="heading-primary--main">{this.props.title}</div>
				</div>
			</BaseLayout>
		)
	}
}

Forbidden.defaultProps = {
	title: 'Oops... something went wrong',
}

export default withRouter(Forbidden);
