import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {
  UserMe,
  UserLogin,
  UserRegister
} from "@/lib/requests/userRequests"
import {IUserLoginResultDto, IUserMeResultDto, IUserRegisterResultDto} from "@/lib/dto/userDtos";

interface IAuthState {
  userId: string | undefined
  Token: string | undefined
  Status: string | undefined
  ForceDisplay: boolean
}

interface IAuthContextProps {
  state: IAuthState,
  setState: Dispatch<SetStateAction<IAuthState>>,
  SignIn: (email: string, password: string) => Promise<IUserLoginResultDto>,
  SignUp: (username: string, email: string, password: string) => Promise<IUserRegisterResultDto>
}

export const authContext = createContext({} as IAuthContextProps)

interface IProvideAuthProps {
  children?: ReactNode
}

export function ProvideAuth(props: IProvideAuthProps) {
  const provideAuth = useProvideAuth()

  useEffect((() => {
    let userId = localStorage.getItem("UserId")

    provideAuth.setState((prev) => ({
      ...prev,
      userId: userId ?? undefined,
    }))
  }), [])

  return (
    <authContext.Provider value={provideAuth}>
      {props.children}
    </authContext.Provider>
  )
}

function useProvideAuth(): IAuthContextProps {
  const initialState: IAuthState = {
    userId: undefined,
    Token: undefined,
    Status: undefined,
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
          Token: res.jwtBearer,
          ForceDisplay: false
        }))
        return res
      })

    await UserMe()
      .then((res: IUserMeResultDto) => {
        setState((prev) => ({
          ...prev,
          userId: res.id,
          ForceDisplay: false
        }))
        return res
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
  }

  const authProvideValue: IAuthContextProps = {
    state,
    setState,
    SignIn,
    SignUp
  }

  return authProvideValue
}

export function useAuth() {
  return useContext(authContext);
}