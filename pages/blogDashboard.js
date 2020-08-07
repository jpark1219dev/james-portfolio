import React from 'react';
import { BaseLayout, BaseContainer, Panel } from '../components/layouts';
import withAuth from '../components/hoc/withAuth';

import { Router } from '../routes';

import { getUserBlogs } from '../actions';

class BlogDashboard extends React.Component {
	static async getInitialProps({req}) {
		let blogs = [];
		try {
			blogs = await getUserBlogs(req);
			console.log(blogs);
		} catch(err) {
			console.error(err);
		}
		return { blogs };
	}

	render() {
		const { blogs } = this.props;
		console.log(blogs);

		return (
			<BaseLayout mainClass="blogDashboard">
				<BaseContainer>
					{blogs.map(blog => (
					<React.Fragment key={blog._id}>
						<Panel width={13}>
							<div className="panel-group">
								<div title={blog.title} className="heading-primary--main blog-title">{blog.title}</div>
							</div>
						</Panel>
						<Panel width={7}>
							<div className="panel-group">
								<div className="heading-primary--main blog-status">Published</div>
							</div>
						</Panel>
					</React.Fragment>
					))}
					<React.Fragment>
						<Panel width={13}>
							<div className="panel-group">
								<div title={`A Really Really Really Really Long Title`} className="heading-primary--main blog-title">A Really Really Really Really Long Title</div>
							</div>
						</Panel>
						<Panel width={7}>
							<div className="panel-group">
								<div className="heading-primary--main blog-status">Published</div>
							</div>
						</Panel>
					</React.Fragment>
				</BaseContainer>
			</BaseLayout>
		)
	}
}

export default withAuth('admin')(BlogDashboard);