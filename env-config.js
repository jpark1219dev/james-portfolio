const prod = process.env.NODE_ENV === 'production';

module.exports = {
	'process.env.BASE_URL': prod ? 'https://james-portfolio.vercel.app/' : 'http://localhost:3000',
	'process.env.NAMESPACE': 'https://www.jamespark.co',
	'process.env.CLIENT_ID': 'HN9ANqg2TsBau4cn6zOeNpG3Zr6sB0TK'
}