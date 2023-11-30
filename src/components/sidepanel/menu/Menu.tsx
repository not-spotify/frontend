import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from './menu.module.css'
import clsx from "clsx";

interface ISidePanelMenuState {

}

export default function Menu()
{
  return (
    <>
      <div className={clsx("d-flex text-white p-2", styles.default)}>
        <div className={clsx("rounded", styles.menuItemListWrapper)}>
          <ul className={clsx("nav flex-column text-center", styles.menuItemList)}>
            <li className="nav-item py-4">
              <FontAwesomeIcon icon={icon({name: 'home'}) } size="xl"/>
            </li>
            <li className="nav-item py-4">
              <FontAwesomeIcon icon={icon({name: 'search'})} size="xl"/>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}