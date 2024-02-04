import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react"
import {UserLogin, UserRefresh, UserRegister} from "@/lib/requests/userRequests"
import {IUserLoginResultDto, IUserRefreshResultDto, IUserRegisterResultDto} from "@/lib/dto/userDtos"
import {formatAxiosError} from "@/lib/backendRequests"
import {jwtDecode} from "jwt-decode"
import {useRouter} from 'next/navigation'
import useSWRImmutable from "swr/immutable"

interface IAuthState {
  userId?: string
  JsonWebTokenExpiresAt?: Date
  RefreshTokenExpiresAt?: Date
  JsonWebToken?: string
  RefreshToken?: string
  message?: string
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

    await provideAuth.TryRefresh()
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

  const initialState: IAuthState = {}

  const [state, setState] = useState(initialState)

  async function SignIn(email: string, password: string) {
    setState((prev) => ({
      ...prev,
      message: "Signing in...",
    }))

    const res = await UserLogin({
      email: email,
      password: password
    })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          message: `Sign in failed! ${formatAxiosError(error)}`
        }))

        throw error
      })

    setState((prev) => ({
      ...prev,
      userId: res.userId,
      JsonWebToken: res.jwtBearer,
      JsonWebTokenExpiresAt: res.jwtBearerValidDue,
      RefreshToken: res.refreshToken,
      RefreshTokenExpiresAt: res.refreshTokenValidDue
    }))

    if (localStorage) {
      localStorage.setItem("JsonWebTokenExpiresAt", new Date(res.jwtBearerValidDue).toISOString())
      localStorage.setItem("RefreshTokenExpiresAt", new Date(res.refreshTokenValidDue).toISOString())
      localStorage.setItem("JsonWebToken", res.jwtBearer)
      localStorage.setItem("RefreshToken", res.refreshToken)
      localStorage.setItem("UserId", res.userId)
    }

    return res
  }

  async function SignUp(username: string, email: string, password: string) {
    setState((prev) => ({
      ...prev,
      message: "Signing up..."
    }))

    return await UserRegister({
      email: email,
      password: password,
      userName: username
    })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          message: `Sign up failed! ${formatAxiosError(error)}`
        }))

        throw error
      })
  }

  async function Refresh() {
    setState((prev) => ({
      ...prev,
      message: "Refreshing..."
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

    const res = await UserRefresh({
      jti: jsonWebTokenData.jti,
      refreshToken: state.RefreshToken,
      userId: state.userId
    })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          message: `Auth refresh failed! ${formatAxiosError(error)}`
        }))

        throw error
      })

    setState((prev) => ({
      ...prev,
      userId: res.userId,
      JsonWebToken: res.jwtBearer,
      JsonWebTokenExpiresAt: res.jwtBearerValidDue,
      RefreshToken: res.refreshToken,
      RefreshTokenExpiresAt: res.refreshTokenValidDue
    }))

    if (localStorage) {
      localStorage.setItem("JsonWebTokenExpiresAt", new Date(res.jwtBearerValidDue).toISOString())
      localStorage.setItem("RefreshTokenExpiresAt", new Date(res.refreshTokenValidDue).toISOString())
      localStorage.setItem("JsonWebToken", res.jwtBearer)
      localStorage.setItem("RefreshToken", res.refreshToken)
      localStorage.setItem("UserId", res.userId)
    }

    return res
  }

  async function SignOut() {
    setState((prev) => ({
      ...prev,
      message: "Signing out..."
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
      RefreshTokenExpiresAt: undefined
    }))

    router.replace("/signin")
  }

  async function TryRefresh() {
    const dateNow = new Date()

    console.log("[useAuth:TryRefresh]: Populate state from localStorage...")

    const jsonWebTokenExpiresAt = localStorage.getItem("JsonWebTokenExpiresAt")
    const refreshTokenExpiresAt = localStorage.getItem("RefreshTokenExpiresAt")
    const jsonWebToken = localStorage.getItem("JsonWebToken")
    const refreshToken = localStorage.getItem("RefreshToken")

    if (!jsonWebTokenExpiresAt || !jsonWebToken || !refreshTokenExpiresAt || !refreshToken) {
      console.log("[useAuth:TryRefresh]: jsonWebToken and refreshToken data was not found, no action...")
      return
    }

    const JsonWebTokenExpiresAtDate = (jsonWebTokenExpiresAt ? new Date(jsonWebTokenExpiresAt) : undefined) ?? new Date(-8640000000000000)
    const RefreshTokenExpiresAtDate = (refreshTokenExpiresAt ? new Date(refreshTokenExpiresAt) : undefined) ?? new Date(-8640000000000000)

    const isJsonWebTokenValid = JsonWebTokenExpiresAtDate >= dateNow && jsonWebToken
    const isRefreshTokenInvalid = RefreshTokenExpiresAtDate < dateNow || !refreshToken

    if (isRefreshTokenInvalid) {
      console.log("[useAuth:TryRefresh]: refreshToken is not valid, signing out...")
      await SignOut()
    }

    if (isJsonWebTokenValid && !isRefreshTokenInvalid) {
      console.log("[useAuth:TryRefresh]: jsonWebToken and refreshToken data was found and is valid!")

      setState((prev) => ({
        ...prev,
        JsonWebToken: jsonWebToken,
        JsonWebTokenExpiresAt: JsonWebTokenExpiresAtDate,
        RefreshToken: refreshToken,
        RefreshTokenExpiresAt: RefreshTokenExpiresAtDate
      }))

      return
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
  return useContext(authContext)
}