const prod = process.env.NODE_ENV === 'production';

module.exports = {
	'process.env.BASE_URL': prod ? 'https://www.jamesjinpark.com' : 'http://localhost:3000',
	'process.env.NAMESPACE': 'https://www.jamesjinpark.com',
	'process.env.CLIENT_ID': 'HN9ANqg2TsBau4cn6zOeNpG3Zr6sB0TK'
}