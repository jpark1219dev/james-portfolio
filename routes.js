const routes = require('next-routes');

module.exports = routes()
	.add('notfound', '/*')
// .add('blogs', '/blogs/dashboard')