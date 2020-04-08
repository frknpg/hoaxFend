import React, { Component } from 'react';
import axios from 'axios';

const getDisplayName = (WrappedComponent) => {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const withApiProgress = (WrappedComponent, apiPath) => {
	return class extends Component {

		static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`;

		state = {
			pendingApiCall: false,
		}

		componentDidMount = () => {
			this.requestInterceptor = axios.interceptors.request.use((request) => {
				console.log('deneme ' + apiPath);
				this.updateApiCallFor(request.url, true);
				return request;
			});
			this.requestInterceptor = axios.interceptors.response.use((response) => {
				this.updateApiCallFor(response.config.url, false);
				return response;
			}, (error) => {
				this.updateApiCallFor(error.config.url, false);
				throw error;
			});
		}

		componentWillUnmount = () => {
			axios.interceptors.request.eject(this.requestInterceptor);
			axios.interceptors.response.eject(this.responseInterceptor);
		}

		updateApiCallFor = (url, pendingApiCall) => {
			if (url === apiPath) {
				this.setState({ pendingApiCall });
			}
		}

		render() {
			const pendingApiCall = this.state.pendingApiCall || this.props.pendingApiCall;

			return <WrappedComponent {...this.props} pendingApiCall={pendingApiCall} />
		}
	}
}