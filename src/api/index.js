import request from '../utils/request';

export const get = (url, query) => {
	return request({
		url: url,
		method: 'GET',
		params: query
	});
};

export const post = (url, query) => {
	return request({
		url: url,
		method: 'POST',
		data: query
	});
};

export const put = (url, query) => {
	return request({
		url: url,
		method: 'PUT',
		params: query
	});
};


export const deletez = (url, query) => {
	return request({
		url: url,
		method: 'POST',
		data: query
	});
};
