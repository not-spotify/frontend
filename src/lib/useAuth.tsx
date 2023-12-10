import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {
  UserMe,
  UserLogin,
  UserRegister,
  UserRefresh
} from "@/lib/requests/userRequests"
import {IUserLoginResultDto, IUserMeResultDto, IUserRefreshResultDto, IUserRegisterResultDto} from "@/lib/dto/userDtos";
import {formatAxiosError} from "@/lib/backendRequests";
import {jwtDecode} from "jwt-decode";
import Router from "next/router";

interface IAuthState {
  userId: string | undefined
  JsonWebTokenExpiresAt: Date | undefined
  RefreshTokenExpiresAt: Date | undefined
  JsonWebToken: string | undefined
  RefreshToken: string | undefined
  Status: string | undefined
  IsRefreshRequired: boolean
  ForceDisplay: boolean
}

interface IAuthContextProps {
  state: IAuthState
  setState: Dispatch<SetStateAction<IAuthState>>
  SignIn: (email: string, password: string) => Promise<IUserLoginResultDto>
  SignUp: (username: string, email: string, password: string) => Promise<IUserRegisterResultDto>
  Refresh: () => Promise<IUserRefreshResultDto>
  SignOut: () => void
  TryRefresh: () => Promise<void>
}

export const authContext = createContext({} as IAuthContextProps)

interface IProvideAuthProps {
  children?: ReactNode
}

export function ProvideAuth(props: IProvideAuthProps) {
  const provideAuth = useProvideAuth()

  useEffect((() => {
    let userId = localStorage.getItem("UserId")
    let jsonWebTokenExpiresAt = localStorage.getItem("JsonWebTokenExpiresAt")
    let refreshTokenExpiresAt = localStorage.getItem("RefreshTokenExpiresAt")
    let jsonWebToken = localStorage.getItem("JsonWebToken")
    let refreshToken = localStorage.getItem("RefreshToken")

    provideAuth.setState((prev) => ({
      ...prev,
      userId: userId ?? undefined,
      JsonWebToken: jsonWebToken ?? undefined,
      RefreshToken: refreshToken ?? undefined,
      JsonWebTokenExpiresAt: jsonWebTokenExpiresAt ? new Date(jsonWebTokenExpiresAt) : undefined,
      RefreshTokenExpiresAt: refreshTokenExpiresAt ? new Date(refreshTokenExpiresAt) : undefined,
    }))

    if (provideAuth.state.IsRefreshRequired) {
      provideAuth.TryRefresh()
    }
  }), [provideAuth.state.IsRefreshRequired])

  return (
    <authContext.Provider value={provideAuth}>
      {props.children}
    </authContext.Provider>
  )
}

function useProvideAuth(): IAuthContextProps {
  const initialState: IAuthState = {
    userId: undefined,
    JsonWebTokenExpiresAt: undefined,
    RefreshTokenExpiresAt: undefined,
    JsonWebToken: undefined,
    RefreshToken: undefined,
    Status: undefined,
    IsRefreshRequired: false,
    ForceDisplay: false
  }

  const [state, setState] = useState(initialState)

  async function SignIn(email: string, password: string) {
    setState((prev) => ({
      ...prev,
      Status: "Signing in...",
      ForceDisplay: true
    }))

    const result = await UserLogin({
      email: email,
      password: password
    })
      .then((res: IUserLoginResultDto) => {
        setState((prev) => ({
          ...prev,
          userId: res.userId,
          JsonWebToken: res.jwtBearer,
          JsonWebTokenExpiresAt: res.jwtBearerValidDue,
          RefreshToken: res.refreshToken,
          RefreshTokenExpiresAt: res.refreshTokenValidDue,
          IsRefreshRequired: false,
          ForceDisplay: false
        }))
        return res
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          Status: `Sign in failed! ${formatAxiosError(error)}`
        }))
      })

    return result
  }

  async function SignUp(username: string, email: string, password: string) {
    setState((prev) => ({
      ...prev,
      Status: "Signing up...",
      ForceDisplay: true
    }))

    return await UserRegister({
      email: email,
      password: password,
      userName: username
    })
      .then((res: IUserRegisterResultDto) => {
        setState((prev) => ({
          ...prev,
          ForceDisplay: false
        }))
        return res
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          Status: `Sign up failed! ${formatAxiosError(error)}`
        }))
      })
  }

  async function Refresh() {
    setState((prev) => ({
      ...prev,
      Status: "Refreshing...",
      ForceDisplay: true
    }))

    const jsonWebTokenData = jwtDecode(state.JsonWebToken ?? throw new Error("state.JsonWebToken is null"))

    return await UserRefresh({
      jti: jsonWebTokenData.jti ?? throw new Error("jsonWebTokenData.jti is null"),
      refreshToken: state.RefreshToken ?? throw new Error("state.RefreshToken is null"),
      userId: state.userId ?? throw new Error("state.userId is null")
    })
      .then((res: IUserRefreshResultDto) => {
        setState((prev) => ({
          ...prev,
          userId: res.userId,
          JsonWebToken: res.jwtBearer,
          JsonWebTokenExpiresAt: res.jwtBearerValidDue,
          RefreshToken: res.refreshToken,
          RefreshTokenExpiresAt: res.refreshTokenValidDue,
          IsRefreshRequired: false,
          ForceDisplay: false
        }))
        return res
      })
  }

  function SignOut() {
    setState((prev) => ({
      ...prev,
      Status: "Signing out...",
      ForceDisplay: true
    }))

    localStorage.removeItem("UserId")
    localStorage.removeItem("JsonWebTokenExpiresAt")
    localStorage.removeItem("RefreshTokenExpiresAt")
    localStorage.removeItem("JsonWebToken")
    localStorage.removeItem("RefreshToken")

    setState((prev) => ({
      ...prev,
      userId: undefined,
      JsonWebToken: undefined,
      JsonWebTokenExpiresAt: undefined,
      RefreshToken: undefined,
      RefreshTokenExpiresAt: undefined,
      IsRefreshRequired: false,
      ForceDisplay: false
    }))
  }

  async function TryRefresh() {
    const dateNow = new Date()

    if (!state.userId) {
      let userId = localStorage.getItem("UserId")
      let jsonWebTokenExpiresAt = localStorage.getItem("JsonWebTokenExpiresAt")
      let refreshTokenExpiresAt = localStorage.getItem("RefreshTokenExpiresAt")
      let jsonWebToken = localStorage.getItem("JsonWebToken")
      let refreshToken = localStorage.getItem("RefreshToken")

      let JsonWebTokenExpiresAtDate = (jsonWebTokenExpiresAt ? new Date(jsonWebTokenExpiresAt) : undefined) ?? new Date(-8640000000000000)
      let RefreshTokenExpiresAtDate = (refreshTokenExpiresAt ? new Date(refreshTokenExpiresAt) : undefined) ?? new Date(-8640000000000000)

      let isJsonWebTokenValid = JsonWebTokenExpiresAtDate >= dateNow && jsonWebToken
      let isRefreshTokenInvalid = RefreshTokenExpiresAtDate < dateNow || !refreshToken

      console.log(userId)
      console.log(JsonWebTokenExpiresAtDate, isJsonWebTokenValid)
      console.log(RefreshTokenExpiresAtDate, isRefreshTokenInvalid)

      if (userId && isJsonWebTokenValid)
        return

      if (userId && isRefreshTokenInvalid)
        await SignOut()
    }

    if (!state.IsRefreshRequired) {
      let isJsonWebTokenValid = (state.JsonWebTokenExpiresAt ?? new Date(-8640000000000000)) >= dateNow && state.JsonWebToken
      let isRefreshTokenInvalid = (state.RefreshTokenExpiresAt ?? new Date(-8640000000000000)) < dateNow && !state.RefreshToken

      if (state.userId && isJsonWebTokenValid)
        return

      if (state.userId && isRefreshTokenInvalid)
        await SignOut()
    }

    return await Refresh()
      .catch(async () => {
        await Router.replace("/signin")
      })
  }

  const authProvideValue: IAuthContextProps = {
    state,
    setState,
    SignIn,
    SignUp,
    Refresh,
    SignOut,
    TryRefresh
  }

  return authProvideValue
}

export function useAuth() {
  return useContext(authContext);
}