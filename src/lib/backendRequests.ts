import axios, {AxiosError} from "axios"
import * as qs from "qs"
import {IDtoError} from "@/lib/backendRequestModels";

export const HTTP_BACKEND_URL = "http://localhost:5000"

export const DefaultParamsSerializer = (params: object) => {
  if (params instanceof URLSearchParams) {
    return params.toString();
  }

  return qs.stringify(params, {
    indices: false,
    allowDots: true
  });
};

export const IsIDtoError = (value: unknown): value is IDtoError => !!value;

//any -> AxiosError
export function formatAxiosError(error: any): string {
  if (error.response) {
    if (IsIDtoError(error.response.data)) {
      const data: IDtoError = error.response.data as IDtoError

      return `[${error.response.status}] ${error.response.statusText} -> [type:${data.type}, title:${data.title}, status:${data.status}, detail:${data.detail}, instance:${data.instance}]`
    }

    return `[${error.response.status}] ${error.response.statusText} -> ${JSON.stringify(error.response.data)}`
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return `(${error.request}) ${error.message}`
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message
  }
}

//Default axios
export const axiosDefaultIntercepted = axios.create()
axiosDefaultIntercepted.defaults.paramsSerializer = {
  serialize: DefaultParamsSerializer
}

export const axiosAuthIntercepted = axios.create()
axiosAuthIntercepted.defaults.paramsSerializer = {
  serialize: DefaultParamsSerializer
}

axiosAuthIntercepted.interceptors.request.use(async (config) => {

  //TODO: Refresh auth if needed

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})