import fetch from 'auth/FetchInterceptor'

const AuthService = {}

AuthService.login = function (data) {
	return fetch({
		url: 'http://localhost:8080/api/v1/auth/authenticate',
		method: 'post',
		data: data
	})
}

AuthService.register = function (data) {
	return fetch({
		url: 'http://localhost:8080/api/v1/auth/register',
		method: 'post',
		data: data
	});
}

AuthService.logout = function () {
	return fetch({
		url: '/auth/logout',
		method: 'post'
	})
}

AuthService.loginInOAuth = function () {
	return fetch({
		url: '/auth/loginInOAuth',
		method: 'post'
	})
}

export default AuthService;