const routes = require('next-routes');
//https://github.com/fridays/next-routes/blob/master/README.md

module.exports = routes()
.add('blog-create', '/blogs/new', 'blogEditor')
.add('blog-update', '/blogs/edit/:id', 'blogEditor')
.add('blogs-dashboard', '/blogs/dashboard', 'blogDashboard')
.add('blog-view', '/blogs/:slug', 'blogView')

// .add('blog-update', 'blogEditor', '/blogs/:id/edit')


