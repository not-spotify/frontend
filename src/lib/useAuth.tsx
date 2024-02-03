import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {UserLogin, UserRefresh, UserRegister} from "@/lib/requests/userRequests"
import {IUserLoginResultDto, IUserRefreshResultDto, IUserRegisterResultDto} from "@/lib/dto/userDtos";
import {formatAxiosError} from "@/lib/backendRequests";
import {jwtDecode} from "jwt-decode";
import {useRouter} from 'next/navigation';
import useSWRImmutable from "swr/immutable";

interface IAuthState {
  userId?: string
  JsonWebTokenExpiresAt?: Date
  RefreshTokenExpiresAt?: Date
  JsonWebToken?: string
  RefreshToken?: string
  message?: string
  // IsRefreshRequired: boolean
  ForceDisplay: boolean
}

interface IAuthContextProps {
  state: IAuthState
  setState: Dispatch<SetStateAction<IAuthState>>
  SignIn: (email: string, password: string) => Promise<void | IUserLoginResultDto>
  SignUp: (username: string, email: string, password: string) => Promise<void | IUserRegisterResultDto>
  Refresh: () => Promise<void | IUserRefreshResultDto>
  SignOut: () => void
  TryRefresh: () => Promise<void>
}

export const authContext = createContext({} as IAuthContextProps)

interface IProvideAuthProps {
  children?: ReactNode
}

export function ProvideAuth(props: IProvideAuthProps) {
  const provideAuth = useProvideAuth()

  const fetcher = async () => {
    console.log("[useAuth:ProvideAuth]")

    const userId = localStorage.getItem("UserId")
    const jsonWebTokenExpiresAt = localStorage.getItem("JsonWebTokenExpiresAt")
    const refreshTokenExpiresAt = localStorage.getItem("RefreshTokenExpiresAt")
    const jsonWebToken = localStorage.getItem("JsonWebToken")
    const refreshToken = localStorage.getItem("RefreshToken")

    provideAuth.setState((prev) => ({
      ...prev,
      userId: userId ?? undefined,
      JsonWebToken: jsonWebToken ?? undefined,
      RefreshToken: refreshToken ?? undefined,
      JsonWebTokenExpiresAt: jsonWebTokenExpiresAt ? new Date(jsonWebTokenExpiresAt) : undefined,
      RefreshTokenExpiresAt: refreshTokenExpiresAt ? new Date(refreshTokenExpiresAt) : undefined,
    }))

    provideAuth.TryRefresh()
  }

  const {data, error, isLoading} = useSWRImmutable(["ProvideAuth"], fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: false,
    shouldRetryOnError: true
  })

  return (
    <authContext.Provider value={provideAuth}>
      {props.children}
    </authContext.Provider>
  )
}

function useProvideAuth(): IAuthContextProps {
  const router = useRouter()

  const initialState: IAuthState = {
    ForceDisplay: false
  }

  const [state, setState] = useState(initialState)

  async function SignIn(email: string, password: string) {
    setState((prev) => ({
      ...prev,
      message: "Signing in...",
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

        if (localStorage) {
          localStorage.setItem("JsonWebTokenExpiresAt", new Date(res.jwtBearerValidDue).toISOString())
          localStorage.setItem("RefreshTokenExpiresAt", new Date(res.refreshTokenValidDue).toISOString())
          localStorage.setItem("JsonWebToken", res.jwtBearer)
          localStorage.setItem("RefreshToken", res.refreshToken)
          localStorage.setItem("UserId", res.userId)
        }

        return res
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          message: `Sign in failed! ${formatAxiosError(error)}`
        }))
      })

    return result
  }

  async function SignUp(username: string, email: string, password: string) {
    setState((prev) => ({
      ...prev,
      message: "Signing up...",
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
          message: `Sign up failed! ${formatAxiosError(error)}`
        }))
      })
  }

  async function Refresh() {
    setState((prev) => ({
      ...prev,
      message: "Refreshing...",
      ForceDisplay: true
    }))

    if (!state.JsonWebToken)
      throw new Error("state.JsonWebToken is null")

    const jsonWebTokenData = jwtDecode(state.JsonWebToken)

    if (!jsonWebTokenData.jti)
      throw new Error("jsonWebTokenData.jti is null")
    if (!state.RefreshToken)
      throw new Error("state.RefreshToken is null")
    if (!state.userId)
      throw new Error("state.userId is null")

    return await UserRefresh({
      jti: jsonWebTokenData.jti,
      refreshToken: state.RefreshToken,
      userId: state.userId
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

        if (localStorage) {
          localStorage.setItem("JsonWebTokenExpiresAt", new Date(res.jwtBearerValidDue).toISOString())
          localStorage.setItem("RefreshTokenExpiresAt", new Date(res.refreshTokenValidDue).toISOString())
          localStorage.setItem("JsonWebToken", res.jwtBearer)
          localStorage.setItem("RefreshToken", res.refreshToken)
          localStorage.setItem("UserId", res.userId)
        }

        return res
      })
  }

  async function SignOut() {
    setState((prev) => ({
      ...prev,
      message: "Signing out...",
      ForceDisplay: true
    }))

    if (localStorage) {
      localStorage.removeItem("UserId")
      localStorage.removeItem("JsonWebTokenExpiresAt")
      localStorage.removeItem("RefreshTokenExpiresAt")
      localStorage.removeItem("JsonWebToken")
      localStorage.removeItem("RefreshToken")
    }

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

    await router.replace("/signin")
  }

  async function TryRefresh() {
    const dateNow = new Date()

    console.log("[useAuth:TryRefresh]: Populate state from localStorage...")

    const userId = localStorage.getItem("UserId")
    const jsonWebTokenExpiresAt = localStorage.getItem("JsonWebTokenExpiresAt")
    const refreshTokenExpiresAt = localStorage.getItem("RefreshTokenExpiresAt")
    const jsonWebToken = localStorage.getItem("JsonWebToken")
    const refreshToken = localStorage.getItem("RefreshToken")

    const JsonWebTokenExpiresAtDate = (jsonWebTokenExpiresAt ? new Date(jsonWebTokenExpiresAt) : undefined) ?? new Date(-8640000000000000)
    const RefreshTokenExpiresAtDate = (refreshTokenExpiresAt ? new Date(refreshTokenExpiresAt) : undefined) ?? new Date(-8640000000000000)

    const isJsonWebTokenValid = JsonWebTokenExpiresAtDate >= dateNow && jsonWebToken
    const isRefreshTokenInvalid = RefreshTokenExpiresAtDate < dateNow || !refreshToken

    if (userId && isJsonWebTokenValid && !isRefreshTokenInvalid) {
      console.log("[useAuth:TryRefresh]: userId, jsonWebToken and refreshToken data was found and is valid!")

      setState((prev) => ({
        ...prev,
        userId: userId,
        JsonWebToken: jsonWebToken,
        JsonWebTokenExpiresAt: JsonWebTokenExpiresAtDate,
        RefreshToken: refreshToken,
        RefreshTokenExpiresAt: RefreshTokenExpiresAtDate,
        IsRefreshRequired: false,
        ForceDisplay: false
      }))

      return
    }

    if (isRefreshTokenInvalid) {
      console.log("[useAuth:TryRefresh]: refreshToken is not valid, signing out...")
      await SignOut()
    }

    await Refresh()
      .catch(async (reason) => {
        console.log(`[useAuth:TryRefresh]: Refresh received an error... ${reason}`)
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