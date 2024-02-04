import {useUser} from "@/lib/useUser"
import useSWRImmutable from "swr/immutable"
import {Loading} from "@/components/loading/loading"

export interface IRequireUserProps {
  children?: React.ReactNode
}

export interface IRequireUserState {
  message: string
}

export default function RequireUser(props: IRequireUserProps) {
  const user = useUser()

  const fetcher = async () => await user.TryRefresh()

  const {data, error, isLoading} = useSWRImmutable("RequireUser", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateIfStale: false,
    shouldRetryOnError: true
  })

  if (isLoading || user.state.message)
    return (
      <Loading>
        <span>User</span>
        <small className="text-secondary">{user.state.message}</small>
      </ Loading>
    )
  if (error)
    return (
      <Loading>
        <span>User</span>
        <small className="text-warning">{error.message}</small>
        <small className="text-secondary">{user.state.message}</small>
      </ Loading>
    )

  return (
    <>
      {props.children}
    </>
  )
}