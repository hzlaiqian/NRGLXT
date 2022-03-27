import axios from 'axios';

const service = axios.create({
	// if (process.env.NODE_ENV == 'development') {
	// 	baseURL = 'http://localhost:8091/admin_master';
	// } else {
	// 	baseURL = 'http://47.96.18.55:8080/admin_master';
	// }
	// baseURL : 'http://localhost:8091/admin_master'
	baseURL: '/api'
	// timeout: 5000,
	// http://47.96.18.55:8080/nrglxt
});

service.interceptors.request.use(
	config => {
		config.withCredentials = true;
		config.credentials = 'include';
		config.headers.accept = 'application/json';
		config.headers['Content-Type'] = 'application/json';
		config.mode = "cors";
		config.cache = "force-cache";

		// let token = localStorage.getItem("user_token");
		// if (token) {
		// 	config.headers.authorization = token
		// }


		if (config.method === "POST") {
			config.data = JSON.stringify({
				...config.data
			});
		}

		return config;
	},
	error => {
		if (error.response.code == 401) {
			this.$router.push('/login')
		}
		return Promise.reject();
	}
);

service.interceptors.response.use(
	response => {
		if (response.status == 200) {
			return response.data;
		} else {
			return new Promise(() => {})
		}
	},
	error => {
		console.log(error);
		return new Promise(() => {})
	}
);

export default service;
