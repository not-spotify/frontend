import {useAuth} from "@/lib/useAuth"
import useSWRImmutable from "swr/immutable"
import {Loading} from "./loading/loading"

export interface IRequireAuthProps {
  children?: React.ReactNode
}

export interface IRequireAuthState {
  message: string
}

export default function RequireAuth(props: IRequireAuthProps) {
  const auth = useAuth()

  const fetcher = async () => await auth.TryRefresh()

  const {data, error, isLoading} = useSWRImmutable("RequireAuth", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateIfStale: false,
    shouldRetryOnError: true
  })

  if (isLoading || auth.state.ForceDisplay)
    return (
      <Loading>
        <span>Authentication</span>
        <small className="text-secondary">{auth.state.Status}</small>
      </ Loading>
    )
  if (error)
    return (
      <Loading>
        <span>Authentication</span>
        <small className="text-warning">{error.message}</small>
        <small className="text-secondary">{auth.state.Status}</small>
      </ Loading>
    )

  return (
    <>
      {props.children}
    </>
  )
}