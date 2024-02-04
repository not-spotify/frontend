import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {useAuth} from "@/lib/useAuth";
import {IUserMeResultDto} from "@/lib/dto/userDtos";
import {useRouter} from 'next/navigation';
import {UserMe} from "@/lib/requests/userRequests";
import {formatAxiosError} from "@/lib/backendRequests";
import useSWRImmutable from "swr/immutable";

interface IUserState {
  userReadResult?: IUserMeResultDto
  message?: string
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

  const fetcher = async () => {
    console.log("[useUser:ProvideUser]")

    await provideUser.TryRefresh()
  }

  const {data, error, isLoading} = useSWRImmutable(["ProvideUser", auth.state.userId], fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: false,
    shouldRetryOnError: true
  })

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
    ForceDisplay: false
  }

  const [state, setState] = useState(initialState)

  async function TryRefresh() {
    console.log("[useUser:TryRefresh]: Populate data...")

    setState((prev) => ({
      ...prev,
      message: "Refreshing...",
      ForceDisplay: true
    }))

    await UserMe()
      .then((res: IUserMeResultDto) => {
        setState((prev) => ({
          ...prev,
          userReadResult: res,
          message: undefined,
          IsRefreshRequired: false
        }))
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          message: `User refresh failed! ${formatAxiosError(error)}`
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