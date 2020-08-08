import React from "react";
import { BaseLayout, BaseContainer, BaseGrid, Panel, NavHeader } from "../components/layouts";
import withAuth from "../components/hoc/withAuth";

import { Router } from "../routes";

import { getUserBlogs, updateBlog } from "../actions";

class BlogDashboard extends React.Component {
  static async getInitialProps({ req }) {
    let blogs = [];
    try {
      blogs = await getUserBlogs(req);
    } catch (err) {
      console.error(err);
    }
    return { blogs };
	}

	redirect = url => {
		Router.pushRoute(url);
	}

	viewBlog = blog => {
		if(blog.status === 'published') {
			this.redirect(`/blogs/${blog.slug}`);
		} else {
			this.redirect(`/blogs/edit/${blog._id}`);
		}
	}

	changeBlogStatus = (initialStatus, blogId) => {
		const status = initialStatus === 'draft' ? 'published' : 'draft';
		updateBlog({status}, blogId).then(() => {
			Router.pushRoute('/blogs/dashboard');
		}).catch(err => {
			console.error(err.message)
		})
	}

  render() {
		const { blogs, auth: {isAdmin}, auth: {isAuthenticated} } = this.props;

    return (
      <BaseLayout mainClass="blog">
        <BaseContainer>
					<NavHeader isAdmin={isAdmin} isAuthenticated={isAuthenticated}/>
					<span className="heading-primary--sub create-blog" onClick={() => this.redirect('/blogs/new')}>
            Create Blog
          </span>
          <BaseGrid>
            {blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((blog) => (
              <React.Fragment key={blog._id}>
                <Panel width={13}>
                  <div className="panel-group">
                    <div title={blog.title} className="heading-primary--main blog-title" onClick={() => this.viewBlog(blog)}>
                      {blog.title}
                    </div>
                  </div>
                </Panel>
                <Panel width={7}>
                  <div className="panel-group">
                    <div className="heading-primary--main blog-status" onClick={() => this.changeBlogStatus(blog.status, blog._id)}>
                      {blog.status}
                    </div>
                  </div>
                </Panel>
              </React.Fragment>
            ))}
          </BaseGrid>
        </BaseContainer>
      </BaseLayout>
    );
  }
}

export default withAuth("admin")(BlogDashboard);
