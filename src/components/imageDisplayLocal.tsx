export interface IImageDisplayLocalProps
{
  alt?: string | undefined
  src: string | undefined
}

export default function ImageDisplayLocal(props: IImageDisplayLocalProps)
{
  return (
    <img alt={props.alt} src={props.src} style={{
      objectFit: "cover"
    }} className="img-fluid w-100 h-100"/>
  )
}