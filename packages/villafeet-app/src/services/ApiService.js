/*
  global API_BASE_URL
*/

import ApiInterceptor from './ApiInterceptor';

const unsignedEndpoints = ['auth/register', 'auth/login'];

const ApiService = () => {
  const interceptor = new ApiInterceptor(API_BASE_URL, unsignedEndpoints);
	
	function get({endpoint, options = {} }){
		return interceptor.fetchData( { endpoint, options: {...options, method: 'GET'} });
	}
	function post({endpoint, options = {} }){
		return interceptor.fetchData( { endpoint, options: {...options, method: 'POST'} });
	}
	function update({endpoint, options = {} }){
		return interceptor.fetchData( { endpoint, options: {...options, method: 'UPDATE'} });
	}
	function remove({endpoint, options = {} }){
		return interceptor.fetchData( { endpoint, options: {...options, method: 'REMOVE'} });
	}
	//Expose get, post, update, delete methods
	return { get, post, update, remove }
}

//return a Singleton instance
export default new ApiService();