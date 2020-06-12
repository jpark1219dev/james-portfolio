const express = require('express');
const path = require('path');
const next = require('next');
const mongoose = require('mongoose');
const routes = require('../routes');


const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = routes.getRequestHandler(app);
const config = require('./config');

const bodyParser = require('body-parser');

const robotsOptions = {
	root: path.join(__dirname, "../public"),
	headers: {
		'Content-Type': 'text/plain;charset=UTF-8'
	}
}

//ROUTES

const blogRoutes = require('./routes/blog');

mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('----- Connected to database'))
	.catch(err => console.error(err))

app.prepare().then(() => {
	const server = express();
	server.use(bodyParser.json());

	server.use('/api/v1/blogs', blogRoutes);

	server.get('/robots.txt', (req, res) => {
		return res.status(200).sendFile('robots.txt', robotsOptions);
	})

	server.get('*', (req, res) => {
		return handle(req, res);
	})

	server.use(function(err, req, res, next) {
		if(err.name === 'UnauthorizedError') {
			res.status(401).send({title: 'Invalid Token', detail: 'Access is forbidden due to invalid token'})
		}
		// if(err.name === 'Error') {
		// 	res.status(401).send({title: 'Denied', detail: 'Access is forbidden due to missing credentials'})
		// }
	})

	const PORT = process.env.PORT || 3000;
	server.listen(PORT, (err) => {
		if(err) { console.log(err); }
		console.log(`----- Server is ready on port: ${PORT}`)
	})
})