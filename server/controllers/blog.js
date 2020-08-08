const Blog = require('../models/blog');
const slugify = require('slugify');
const moment = require('moment');
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
				//make blog title unique
				blog.userId = req.user.sub;
				blog.author = req.user.name;
			}

			blog.save((err, createdBlog) => {
				setTimeout(() => {done()}, 2000);
				if(err) {
					return res.status(422).send(err);
					return res.status(422).send('this is nuts!');
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

exports.getBlogById = (req, res) => {
	const blogId = req.params.id;

	Blog.findById(blogId, (err, foundBlog) => {
		if (err) {
			return res.status(422).send(err);
		}
		return res.json(foundBlog);
	})
}

exports.updateBlog = (req, res) => {
	const blogId = req.params.id;
	const blogData = req.body;

	Blog.findById(blogId, function(err, foundBlog) {
		if (err) {
			return res.status(422).send(err);
		}

		//TEMP TO TURN OFF LATER TO NOT DEFAULT UPDATE TO PUBLISHING BLOGS
		// blogData.status = "published";

		//find way to update slug when existing published blogs with slug are updated using dates in url 
		//1. there needs to be a way for slug to change when blog of title get changed
		//2. there needs to be a way to avoid blogs with same titles and get same slug urls creating error
		if (blogData.status && blogData.status === "published" && !foundBlog.slug) {
			const newSlug = blogData.title ? blogData.title : foundBlog.title;
			foundBlog.slug = slugify(newSlug, {
				replacement: '-',
				remove: /[*+~.()'"!:@?\-]/g,
				lower: true
			});
		}

		if (blogData.status && blogData.status === "draft" && foundBlog.slug) {
			foundBlog.slug = undefined;
		}

		foundBlog.set(blogData);
		foundBlog.updatedAt = new Date();
		foundBlog.save(function(err, foundBlog) {
			if (err) {
				return res.status(422).send(err);
			}
			return res.json(foundBlog);
		})
	})
}

exports.getBlogBySlug = (req, res) => {
	const slug = req.params.slug;
	Blog.findOne({slug}, function(err, foundBlog) {
		if (err) {
			return res.status(422).send(err);
		}
		return res.json(foundBlog);
	});
}

exports.getBlogs = (req, res) => {
	Blog.find({status: 'published'})
		.sort({'createdAt': -1})
		.exec(function(err, publishedBlogs) {
			if(err) {
				return res.status(422).send(err);
			}
			return res.json(publishedBlogs);
		});
}