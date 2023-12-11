import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {useAuth} from "@/lib/useAuth";
import {IUserMeResultDto} from "@/lib/dto/userDtos";
import {useRouter} from 'next/navigation';
import {UserMe} from "@/lib/requests/userRequests";
import {formatAxiosError} from "@/lib/backendRequests";

interface IUserState {
  userReadResult: IUserMeResultDto | undefined
  Status: string | undefined
  IsRefreshRequired: boolean,
  ForceDisplay: boolean
}

interface IUserContextProps {
  state: IUserState
  setState: Dispatch<SetStateAction<IUserState>>
  TryRefresh: () => Promise<void>
}

export const userContext = createContext({} as IUserContextProps)

interface IProvideUserProps {
  children?: ReactNode
}

export function ProvideUser(props: IProvideUserProps) {
  const auth = useAuth()
  const provideUser = useProvideUser()

  useEffect((() => {
    provideUser.setState((prev) => ({
      ...prev,
      IsRefreshRequired: true,
      userReadResult: undefined,
    }))
  }), [auth.state.userId])

  useEffect((() => {
    if (provideUser.state.IsRefreshRequired)
      provideUser.TryRefresh()
  }), [provideUser.state.IsRefreshRequired])

  return (
    <userContext.Provider value={provideUser}>
      {props.children}
    </userContext.Provider>
  )
}

function useProvideUser(): IUserContextProps {
  const auth = useAuth()
  const router = useRouter()

  const initialState: IUserState = {
    IsRefreshRequired: false,
    Status: undefined,
    userReadResult: undefined,
    ForceDisplay: false
  }

  const [state, setState] = useState(initialState)

  async function TryRefresh() {
    console.log("[useUser:TryRefresh]: Populate data...")

    if (!state.IsRefreshRequired && state.userReadResult) {
      console.log("[useUser:TryRefresh]: Refresh is not required...")
      return
    }

    setState((prev) => ({
      ...prev,
      Status: "Refreshing...",
      ForceDisplay: true
    }))

    await UserMe()
      .then((res: IUserMeResultDto) => {
        setState((prev) => ({
          ...prev,
          userReadResult: res,
          Status: undefined,
          IsRefreshRequired: false
        }))
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          Status: `User refresh failed! ${formatAxiosError(error)}`
        }))
      })
  }

  return {
    state,
    setState,
    TryRefresh
  }
}

export function useUser() {
  return useContext(userContext);
}