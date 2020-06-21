import React from 'react';
import { BaseLayout, BaseContainer, Panel } from '../components/layouts';

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
		const { blog } = this.props;
		return (
			<BaseLayout mainClass="home">
				<BaseContainer>
					<Panel width={10}>
						<div className={`panel-group`}>
							<div className={`slate-editor-content`} dangerouslySetInnerHTML={{ __html: blog.story }}></div>
						</div>
					</Panel>
				</BaseContainer>
			</BaseLayout>
		)
	}
}

export default BlogView;