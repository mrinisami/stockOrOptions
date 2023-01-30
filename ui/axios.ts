import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

import { camelizeKeys, decamelizeKeys } from "humps";
import { env } from "./utils/env";

const api = axios.create({ baseURL: env.api.baseUri });
// Axios middleware to convert all api responses to camelCase
api.interceptors.response.use((response: AxiosResponse) => {
  if (response.data && response.headers["content-type"] === "application/json") {
    response.data = camelizeKeys(response.data);
  }
  return response;
});
// Axios middleware to convert all api requests to snake_case
api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.params) {
    config.params = decamelizeKeys(config.params);
  }
  if (config.data) {
    config.data = decamelizeKeys(config.data);
  }
  return config;
});
export default api;
