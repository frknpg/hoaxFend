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
            axios.interceptors.request.use((request) => {
                this.updateApiCallFor(request.url, true);
                return request;
            });

            axios.interceptors.response.use((response) => {
                this.updateApiCallFor(response.config.url, false);
                return response;
            }, (error) => {
                this.updateApiCallFor(error.config.url, false);
                throw error;
            });
        }

        updateApiCallFor = (url, pendingApiCall) => {
            if (url === apiPath) {
                this.setState({ pendingApiCall });
            }
        }

        render() {
            const { pendingApiCall } = this.state;

            return <WrappedComponent pendingApiCall={pendingApiCall} {...this.props} />
        }
    }
}