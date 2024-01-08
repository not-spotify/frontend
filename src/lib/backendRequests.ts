import axios, {AxiosError} from "axios"
import * as qs from "qs"
import {IDtoError} from "@/lib/backendRequestModels";
import {UserRefresh} from "@/lib/requests/userRequests";
import {jwtDecode} from "jwt-decode";
import {IUserRefreshResultDto} from "@/lib/dto/userDtos";

export const HTTP_BACKEND_URL = "http://localhost:9780"

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
  const dateNow = new Date()
  //TODO: Refresh auth if needed

  if (typeof window !== 'undefined' && localStorage) {
    const jsonWebToken = localStorage.getItem("JsonWebToken");
    const jsonWebTokenExpiresAt = localStorage.getItem("JsonWebTokenExpiresAt")
    const refreshToken = localStorage.getItem("RefreshToken")
    const refreshTokenExpiresAt = localStorage.getItem("RefreshTokenExpiresAt")
    const userId = localStorage.getItem("UserId")

    let isJsonWebTokenValid = (new Date(jsonWebTokenExpiresAt ?? -8640000000000000)) >= dateNow && jsonWebToken
    let isRefreshTokenInvalid = (new Date(refreshTokenExpiresAt ?? -8640000000000000)) < dateNow && !refreshToken

    if (!isJsonWebTokenValid && !isRefreshTokenInvalid) {
      const jsonWebTokenData = jwtDecode(jsonWebToken)

      console.log("[axiosAuthIntercepted]: Trying to refresh before request, since JsonWebToken no longer valid...")

      if (!jsonWebTokenData.jti) throw new Error("jsonWebTokenData.jti is null")
      if (!refreshToken) throw new Error("state.RefreshToken is null")
      if (!userId) throw new Error("state.userId is null")

      return await UserRefresh({
        jti: jsonWebTokenData.jti,
        refreshToken: refreshToken,
        userId: userId
      })
        .then((res: IUserRefreshResultDto) => {
          localStorage.setItem("JsonWebTokenExpiresAt", new Date(res.jwtBearerValidDue).toISOString())
          localStorage.setItem("RefreshTokenExpiresAt", new Date(res.refreshTokenValidDue).toISOString())
          localStorage.setItem("JsonWebToken", res.jwtBearer)
          localStorage.setItem("RefreshToken", res.refreshToken)
          localStorage.setItem("UserId", res.userId)

          console.log(`[axiosAuthIntercepted]: Successfully refreshed!, continue...`)

          config.headers.common['Authorization'] = `Bearer ${res.jwtBearer}`

          return config;
        })
        .catch((error) => Promise.reject(error))
    }

    console.log("[axiosAuthIntercepted]: Refresh before request is not required, continue...")

    config.headers.setAuthorization(`Bearer ${jsonWebToken}`)
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})