import clsx from "clsx";
import styles from './player.module.css'

interface IPlayerState {

}

export default function Player()
{
  return(
    <div className={clsx("d-flex p-3", styles.default)}>
      <div className="d-flex">1</div>
      <div className="d-flex flex-grow-1">2</div>
      <div className="d-flex">3</div>
    </div>
  )
}