import React from 'react';
import { BaseLayout, BaseContainer, Panel } from '../components/layouts';
import withAuth from '../components/hoc/withAuth';

import { Router } from '../routes';
import Editor from '../components/slate-editor/Editor';

import { createBlog } from '../actions';

class BlogEditor extends React.Component {
	state = {
		isSaving: false,
		lockId: Math.floor(1000 + Math.random() * 9000)
	}

	saveBlog = (story, headers) => {
		const { lockId } = this.state;
		const blog = {};
		blog.title = headers.title;
		blog.subTitle = headers.subtitle;
		blog.story = story;
		this.setState({isSaving: true});

		//check for missing title and subtitle so that createBlog api is not triggered

		console.log(blog);

		createBlog(blog, lockId).then(createdBlog => {
			this.setState({isSaving: false});
			alert("hooray you created a post!");
			//note that it saved successfully!
			Router.pushRoute(`/blogs/${createdBlog._id}/edit`)
		}).catch(err => {
			this.setState({isSaving: false});
			alert("something went wrong");
			//note that something went wrong
			const message = err.message || 'error message is unavailable';
			console.error(message);
		})
	}

	render() {
		const { isSaving } = this.state;
		return (
			<BaseLayout mainClass="home">
				<BaseContainer>
					{/* <Panel width={10}> */}
					<Editor isLoading={isSaving} save={this.saveBlog} />
					{/* </Panel> */}
					{/* <Panel width={10}>
					</Panel> */}
				</BaseContainer>
			</BaseLayout>
		)
	}
}

export default withAuth('admin')(BlogEditor);
