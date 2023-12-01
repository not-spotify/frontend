import clsx from "clsx";
import styles from './player.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";

interface IPlayerState {

}

export default function Player() {
  return (
    <div className={clsx("d-flex justify-content-between p-3 text-white", styles.default)}>
      <div className={clsx("d-flex flex-fill", styles.trackInfo)}>
        <div className="rounded"
             style={{width: '64px', height: '64px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
        <div className="d-flex flex-column flex-grow-1 text-left px-3 justify-content-center">
          <div className="py-0 my-0">Title</div>
          <div className="small py-0 my-0">Author</div>
        </div>
      </div>
      <div className={clsx("d-flex flex-fill flex-column justify-content-evenly px-4", styles.commonControls)}>
        <div className={clsx("d-flex align-self-center")}>
          <div className="px-3">
            <FontAwesomeIcon icon={icon({name: 'shuffle'})} size="lg"/>
          </div>
          <div className="px-3">
            <FontAwesomeIcon icon={icon({name: 'backward-step'})} size="lg"/>
          </div>
          <div className="px-3">
            <FontAwesomeIcon icon={icon({name: 'play'})} size="lg"/>
          </div>
          <div className="px-3">
            <FontAwesomeIcon icon={icon({name: 'forward-step'})} size="lg"/>
          </div>
          <div className="px-3">
            <FontAwesomeIcon icon={icon({name: 'repeat'})} size="lg"/>
          </div>
        </div>
        <div className="d-flex">
          <div className="progress w-100" style={{height: '2px'}}>
            <div className="progress-bar" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0"
                 aria-valuemax="100"></div>
          </div>
        </div>
      </div>
      <div className={clsx("d-flex flex-fill justify-content-end align-items-center", styles.miscControls)}>
        <div className={clsx("d-flex")}>
          <div className="nav-item px-2">
            <FontAwesomeIcon icon={icon({name: 'volume-low'})} size="lg" data-bs-toggle="tooltip"
                             title="Volume"/>
          </div>
          <div className="nav-item px-2">
            <FontAwesomeIcon icon={icon({name: 'heart'})} size="lg" data-bs-toggle="tooltip"
                             title="Favorite"/>
          </div>
          <div className="nav-item px-2">
            <FontAwesomeIcon icon={icon({name: 'up-right-and-down-left-from-center'})} size="lg"
                             data-bs-toggle="tooltip"
                             title="Full screen"/>
          </div>
        </div>
      </div>
    </div>
  )
}