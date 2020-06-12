import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import { withRouter } from 'next/router';

class Forbidden extends React.Component {
	componentDidMount = () => {
		setTimeout(() => {this.props.router.push('/')}, 2000);
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
