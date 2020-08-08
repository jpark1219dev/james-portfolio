import React from 'react';
import { BaseLayout, BaseContainer } from "../components/layouts";
import { Router } from '../routes';

class Forbidden extends React.Component {
	componentDidMount = () => {
		setTimeout(() => {Router.pushRoute('/')}, 2000);
	}

	render() {
		return(
			<BaseLayout mainClass="home">
				<BaseContainer>
					<div className="heading-primary--main">{this.props.title}</div>
					<div className="heading-primary--sub mt-sm">Being redirected...</div>
				</BaseContainer>
			</BaseLayout>
		)
	}
}

Forbidden.defaultProps = {
	title: 'Oops... something went wrong',
}

export default Forbidden;
