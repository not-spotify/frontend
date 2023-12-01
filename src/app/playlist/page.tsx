import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from './playlist.module.css'

export default function Playlist() {
  //TODO: Display playlist details and songs in it, also actions

  return (
    <div className="d-flex flex-grow-1 text-white p-1" style={{overflow: "auto"}}>
      <div className="d-flex rounded flex-fill flex-column bg-dark" style={{overflow: "auto"}}>
        <div className="d-flex sticky-top justify-content-between p-3">
          <div className="d-flex">
            <div className="d-flex rounded-circle align-items-center justify-content-center"
                 style={{width: '32px', height: '32px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
              <FontAwesomeIcon icon={icon({name: 'chevron-left'})} size="lg" data-bs-toggle="tooltip"
                               title="Volume"/>
            </div>
          </div>
          <div className="d-flex">
            <div className="d-flex rounded-circle align-items-center justify-content-center mx-1"
                 style={{width: '32px', height: '32px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
              <FontAwesomeIcon icon={icon({name: 'user'})} size="lg" data-bs-toggle="tooltip"
                               title="Volume"/>
            </div>
            <div className="d-flex rounded-circle align-items-center justify-content-center mx-1"
                 style={{width: '32px', height: '32px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
              <FontAwesomeIcon icon={icon({name: 'bell'})} size="lg" data-bs-toggle="tooltip"
                               title="Favorite"/>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div className="d-flex align-items-end p-2">
            <div className="rounded ratio ratio-1x1"
                 style={{
                   width: '10vw',
                   minWidth: '128px',
                   maxWidth: '192px',
                   backgroundColor: 'rgba(255, 255, 255, 0.1)'
                 }}></div>
          </div>
          <div className="flex-grow-1">
            <p className="my-0">Public Playlist</p>
            <h1 className="display-1 fw-bold">Display 1</h1>
            <p className="small text-secondary">Playlist description</p>
            <span className="mr-2 small">by Username</span>
            <span className="mr-2">30 songs, 1 hr 22 min</span>
          </div>
        </div>
        <div className="d-flex justify-content-between p-3">
          <div className="d-flex align-items-center">
            <div className="d-flex rounded-circle align-items-center justify-content-center"
                 style={{width: '64px', height: '64px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
              <FontAwesomeIcon icon={icon({name: 'play'})} size="xl"/>
            </div>
            <div className="px-3">
              <FontAwesomeIcon icon={icon({name: 'shuffle'})} size="xl"/>
            </div>
            <div className="px-3">
              <FontAwesomeIcon icon={icon({name: 'heart'})} size="xl"/>
            </div>
            <div className="px-3">
              <FontAwesomeIcon icon={icon({name: 'arrow-down'})} size="xl"/>
            </div>
            <div className="px-3">
              <FontAwesomeIcon icon={icon({name: 'ellipsis'})} size="xl"/>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="px-3">
              <FontAwesomeIcon icon={icon({name: 'search'})} size="lg"/>
            </div>
            <div className="px-3">
              <span className="mr-2">Custom Order</span><FontAwesomeIcon icon={icon({name: 'list-ul'})} size="lg"/>
            </div>
          </div>
        </div>
        <div className="d-flex p-3">
          <table className={clsx("table table-dark", styles.tableCustom)}>
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Album</th>
              <th scope="col"><FontAwesomeIcon icon={icon({name: 'clock', style: 'regular'})} size="lg"/></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>3:53</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>3:53</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>3:53</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>3:53</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>3:53</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>3:53</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>3:53</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
