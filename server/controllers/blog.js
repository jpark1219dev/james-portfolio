const Blog = require('../models/blog');
const slugify = require('slugify');
const AsyncLock = require('async-lock');
const lock = new AsyncLock();

exports.getUserBlogs = (req, res) => {
	const userId = req.user.sub;

	Blog.find({userId}, function(err, userBlogs) {
		if(err) {
			return res.status(422).send(err);
		}
		return res.json(userBlogs);
	})
}

exports.createBlog = (req, res) => {
	const lockId =req.query.lockId;

	if(!lock.isBusy(lockId)) {
		lock.acquire(lockId, function(done) {
			const blogData = req.body;
			const blog = new Blog(blogData);
			if(req.user) {
				blog.userId = req.user.sub;
				blog.author = req.user.name;
			}

			blog.save((err, createdBlog) => {
				setTimeout(() => {done()}, 2000);
				if(err) {
					return res.status(422).send(err);
				}
				return res.json(createdBlog);
			})
		}, function(err, res) {
			err && console.log(err);
		});
	} else {
		return res.status(422).send({message: 'Blog is currently being saved'});
	};
}