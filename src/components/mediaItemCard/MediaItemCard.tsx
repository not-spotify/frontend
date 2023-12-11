import clsx from "clsx";
import styles from "@/components/mediaItemCard/mediaItemCard.module.css";

export enum IMediaItemCardSize {
  Small,
  Medium,
  Large
}

interface IMediaItemCardProps {
  line1: string | undefined
  line2: string | undefined
  imageSrc: string | undefined
  fillBackground: boolean
  size: IMediaItemCardSize
}

export default function MediaItemCard(props: IMediaItemCardProps) {
  switch (props.size) {
    case IMediaItemCardSize.Small:
      return (
        <div className={clsx("d-flex flex-column", styles.container, {
          [styles.containerFilled]: props.fillBackground
        })}>
          <div className="p-2">
            <div className="rounded"
                 style={{width: '56px', height: '56px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
          </div>
        </div>
      )
    case IMediaItemCardSize.Medium:
      return (
        <div className={clsx("p-2 d-flex rounded", styles.container, {
          [styles.containerFilled]: props.fillBackground
        })}>
          <div className={clsx("rounded", styles.imageContainer)}>
            {
              (() => {
                if (props.imageSrc)
                  return (
                    <img src={props.imageSrc}/>
                  )
              })()
            }
          </div>
          <div className="d-flex flex-column flex-grow-1 text-left px-3 justify-content-center">
            <div className="py-0 my-0">
              <strong>{props.line1}</strong>
            </div>
            <div className="small py-0 my-0">{props.line2}</div>
          </div>
        </div>
      )
    case IMediaItemCardSize.Large:
      break;
  }
}