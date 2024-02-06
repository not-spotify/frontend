export interface IVideoDisplayLocalProps
{
  src: string
}

interface IVideoDisplayLocalState
{
  message: string | undefined
}

export default function VideoDisplayLocal(props: IVideoDisplayLocalProps)
{
  return (
    <video className="img-fluid w-100 h-100" controls>
      <source src={props.src}/>
    </video>
  )
}