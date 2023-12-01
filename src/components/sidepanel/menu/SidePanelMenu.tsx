import {icon} from '@fortawesome/fontawesome-svg-core/import.macro'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from './menu.module.css'
import clsx from "clsx";
import {ISidePanelRenderMode} from "@/components/sidepanel/SidePanel";

interface ISidePanelMenuState {

}

interface ISidePanelMenuProps {
  renderMode: ISidePanelRenderMode,
}

export default function SidePanelMenu(props: ISidePanelMenuProps) {
  switch (props.renderMode) {
    case ISidePanelRenderMode.Thin:
      return (
        <>
          <div className={clsx("d-flex text-white p-2", styles.default)}>
            <div className={clsx("rounded pl-5 pr-5", styles.menuItemListWrapper)}>
              <ul className={clsx("nav flex-column text-left", styles.menuItemList)}>
                <li className="nav-item py-3">
                  <FontAwesomeIcon icon={icon({name: 'home'})} size="lg" data-bs-toggle="tooltip"
                                   data-bs-placement="right" title="Home"/>
                </li>
                <li className="nav-item py-3">
                  <FontAwesomeIcon icon={icon({name: 'search'})} size="lg" data-bs-toggle="tooltip"
                                   data-bs-placement="right" title="Search"/>
                </li>
              </ul>
            </div>
          </div>
        </>
      )
    case ISidePanelRenderMode.Wide:
      return (
        <>
          <div className={clsx("d-flex text-white p-2", styles.default)}>
            <div className={clsx("rounded pl-5 pr-5", styles.menuItemListWrapper)}>
              <ul className={clsx("nav flex-column text-left", styles.menuItemList)}>
                <li className="nav-item py-3">
                  <div className="row">
                    <div className="col-2">
                      <FontAwesomeIcon icon={icon({name: 'home'})} size="lg" data-bs-toggle="tooltip"
                                       data-bs-placement="right" title="Home"/>
                    </div>
                    <div className="col">
                      Home
                    </div>
                  </div>
                </li>
                <li className="nav-item py-3">
                  <div className="row">
                    <div className="col-2">
                      <FontAwesomeIcon icon={icon({name: 'search'})} size="lg" data-bs-toggle="tooltip"
                                       data-bs-placement="right" title="Search"/>
                    </div>
                    <div className="col">
                      Search
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      )
  }
}