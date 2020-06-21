import React from 'react';
import { BaseLayout, BaseContainer } from '../components/layouts';
import withAuth from '../components/hoc/withAuth';

import { Router } from '../routes';
import Editor from '../components/slate-editor/Editor';

import { createBlog, getBlogById, updateBlog } from '../actions';

class BlogEditor extends React.Component {
	static async getInitialProps({query, req, res}) {
		if(query.id) {
			let blog = {};
			try {
				blog = await getBlogById(query.id);
				if( blog === null) {
					res.redirect('/notfound');
				}
				return { mode: 'edit', blog };
			} catch (err) {
				console.error(err);
				res.redirect('/notfound');
			}
		} else {
			return { mode: 'create' }
		}
	}

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

		createBlog(blog, lockId).then(createdBlog => {
			this.setState({isSaving: false});
			alert("hooray you created a post!");
			//note that it saved successfully!
			Router.pushRoute(`/blogs/edit/${createdBlog._id}`)
		}).catch(err => {
			this.setState({isSaving: false});
			alert("something went wrong");
			//note that something went wrong
			const message = err.message || 'error message is unavailable';
			console.error(message);
		})
	}

	updateBlog = (story, heading) => {
		const { blog } = this.props;

		const updatedBlog = {};
		updatedBlog.title = heading.title;
		updatedBlog.subTitle = heading.subtitle;
		updatedBlog.story = story;

		this.setState({isSaving: true});

		updateBlog(updatedBlog, blog._id).then(updatedBlog => {
			//note that it saved successfully!
			this.setState({isSaving: false});
		}).catch(err => {
			this.setState({isSaving: false});
			const message = err.message || 'Server Error!';
			//note that something went wrong
			console.error(message);
		})
	}

	render() {
		const { isSaving } = this.state;
		const { mode, blog } = this.props;

		return (
			<BaseLayout mainClass="home">
				<BaseContainer>
					{/* <Panel width={10}> */}
					<Editor 
						initialValue={mode==="create" ? null : blog.story} 
						isLoading={isSaving} 
						save={mode==="create" ? this.saveBlog : this.updateBlog} 
						mode={mode}
					/>
					{/* </Panel> */}
					{/* <Panel width={10}>
					</Panel> */}
				</BaseContainer>
			</BaseLayout>
		)
	}
}

export default withAuth('admin')(BlogEditor);
