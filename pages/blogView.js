import React from 'react';
import { BaseLayout, BaseContainer, BaseGrid, Panel, NavHeader } from '../components/layouts';

import { getBlogBySlug } from '../actions';

class BlogView extends React.Component {
	static async getInitialProps({query,req, res}) {
		let blog = {};
		const slug = query.slug;

		try {
			blog = await getBlogBySlug(slug);
			if (blog === null) {
				res.redirect('/notfound');
			}
			return { blog };
		} catch (err) {
			console.error(err);
			res.redirect('/notfound');
		}
	}

	render() {
		const { blog, auth: {isAdmin}, auth: {isAuthenticated} } = this.props;

		return (
			<BaseLayout mainClass="blog">
				<BaseContainer>
					<NavHeader isAdmin={isAdmin} isAuthenticated={isAuthenticated}/>
					<BaseGrid>
						<Panel width={14}>
							<div className={`panel-group`}>
								<div className={`slate-editor-content`} dangerouslySetInnerHTML={{ __html: blog.story }}></div>
							</div>
						</Panel>
					</BaseGrid>
				</BaseContainer>
			</BaseLayout>
		)
	}
}

export default BlogView;