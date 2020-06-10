import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';

class Index extends React.Component {
	render() {
		return(
			<BaseLayout mainClass="home">
				<div className="main-header">
					<div className="heading-primary--main">Hello World!</div>
				</div>
			</BaseLayout>
		)
	}
}

export default Index;