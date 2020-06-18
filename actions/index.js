import axios from 'axios';
import Cookies from 'js-cookie';

import { getCookieFromReq } from '../helpers/utils';

const axiosInstance = axios.create({
	baseURL: `${process.env.BASE_URL}/api/v1`,
	timeout: 3000
})

const setAuthHeader = req => {
	const token = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON('jwt');

	if(token) {
		return { headers: {'authorization': `Bearer ${token}`}}
	}
	return undefined;
}


//---------------- PORTFOLIO ACTIONS ----------------------//


//---------------- BLOG ACTIONS ----------------------//

export const createBlog = (blogData, lockId) => {
	return axiosInstance.post(`/blogs?lockId=${lockId}`, blogData, setAuthHeader())
		.then(response => response.data)
		.catch(err => rejectPromise(err))
}
