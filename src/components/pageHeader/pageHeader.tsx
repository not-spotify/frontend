import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useAuth} from "@/lib/useAuth";

interface IPageHeaderState {

}

export default function PageHeader() {
  const auth = useAuth()

  return (
    <div className="d-flex sticky-top justify-content-between p-3">
      <div className="d-flex">
        <div className="d-flex rounded-circle align-items-center justify-content-center"
             style={{width: '32px', height: '32px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <FontAwesomeIcon icon={icon({name: 'chevron-left'})} size="lg"/>
        </div>
      </div>
      <div className="d-flex">
        <div className="d-flex rounded-circle align-items-center justify-content-center mx-1"
             style={{width: '32px', height: '32px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <a className="nav-link" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
            <FontAwesomeIcon icon={icon({name: 'user'})} size="lg"/>
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li>
              <hr className="dropdown-divider"></hr>
            </li>
            <li><a className="dropdown-item" onClick={auth.SignOut}>Log out</a></li>
          </ul>
        </div>
        <div className="d-flex rounded-circle align-items-center justify-content-center mx-1"
             style={{width: '32px', height: '32px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <FontAwesomeIcon icon={icon({name: 'bell'})} size="lg"/>
        </div>
      </div>
    </div>
  )
}