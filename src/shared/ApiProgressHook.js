import { useState, useEffect } from 'react';
import axios from 'axios';

export const useApiProgress = (apiPath) => {
  const [pendingApiCall, setPendingApiCall] = useState(false);

  useEffect(() => {
    let requestInterceptor, responseInterceptor;

    const updateApiCallFor = (url, pendingApiCall) => {
      if (url === apiPath) {
        setPendingApiCall(pendingApiCall);
      }
    }

    const registerInterceptors = () => {
      requestInterceptor = axios.interceptors.request.use((request) => {
        updateApiCallFor(request.url, true);
        return request;
      });
      requestInterceptor = axios.interceptors.response.use((response) => {
        updateApiCallFor(response.config.url, false);
        return response;
      }, (error) => {
        updateApiCallFor(error.config.url, false);
        throw error;
      });
    }

    const unregisterInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    }

    registerInterceptors();

    return function unmount() {
      unregisterInterceptors();
    }
  }, [apiPath]);

  return pendingApiCall;
};