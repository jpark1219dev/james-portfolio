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

const rejectPromise = (resError) => {
	let error = {};

	if (resError && resError.response && resError.response.data) {
		error = resError.response.data;
	} else {
		error = resError;
	}

	return Promise.reject(error);
}


//---------------- PORTFOLIO ACTIONS ----------------------//


//---------------- BLOG ACTIONS ----------------------//

export const createBlog = (blogData, lockId) => {
	return axiosInstance.post(`/blogs?lockId=${lockId}`, blogData, setAuthHeader())
		.then(response => response.data)
		.catch(err => rejectPromise(err))
}

export const getBlogById = blogId => {
	return axiosInstance.get(`/blogs/${blogId}`)
		.then(response => response.data)
}

export const updateBlog = (blogData, blogId) => {
	return axiosInstance.patch(`/blogs/${blogId}`, blogData, setAuthHeader())
		.then(response => response.data)
		.catch(err => rejectPromise(err))
}

export const getBlogBySlug = async slug => {
	return await axiosInstance.get(`/blogs/s/${slug}`).then(response => response.data);
}

export const getUserBlogs = async req => {
	return await axiosInstance.get(`/blogs/list`, setAuthHeader(req))
		.then(response => response.data);
}
