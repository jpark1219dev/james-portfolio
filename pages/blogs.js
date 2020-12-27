import React from "react";
import moment from "moment";
import { BaseLayout, BaseContainer, BaseGrid, Panel, NavHeader } from "../components/layouts";
import { shortenText } from "./../helpers/utils";

import { Router } from "../routes";

import { getBlogs } from "../actions";

class Blogs extends React.Component {
	static async getInitialProps({ req }) {
		let blogs = [];
		try {
			blogs = await getBlogs(req);
		} catch(err) {
			console.error(err);
		}
		return {blogs};
	}

	viewBlog = blog => {
		Router.pushRoute(`/blogs/${blog.slug}`);
	}

  render() {
		const { blogs, auth: {isAdmin}, auth: {isAuthenticated} } = this.props;
		
    return (
      <BaseLayout mainClass="blog">
        <BaseContainer>
          <NavHeader isAdmin={isAdmin} isAuthenticated={isAuthenticated} />
					<BaseGrid>
						{blogs && blogs.map((blog) => (
							<React.Fragment key={blog._id}>
                <Panel width={13}>
                  <div className="panel-group" onClick={() => this.viewBlog(blog)}>
                    <div title={blog.title} className="heading-primary--main blog-title">
                      {blog.title}
                    </div>
										<div title={blog.subTitle} className="heading-primary--sub blog-title">
                      {shortenText(blog.subTitle, 124)}
                    </div>
                  </div>
                </Panel>
                <Panel width={7}>
                  <div className="panel-group">
                    <div className="heading-primary--main">
                      {moment(blog.createdAt).format("MMM Do YYYY")}
                    </div>
										<div className="heading-primary--sub">
                      {blog.author}
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

export default Blogs;
