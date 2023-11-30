import styles from "@/components/sidepanel/library/library.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import clsx from "clsx";

interface ISidePanelLibraryState {

}

export default function Library() {
  return (
    <>
      <div className={clsx("d-flex flex-grow-1 text-white p-2", styles.default)}>
        <div className={clsx("rounded", styles.menuItemListWrapper)}>
          <ul className={clsx("nav flex-column text-center", styles.menuItemList)}>
            <li className="nav-item p-2">
              <div className="rounded" style={{width: '48px', height:'48px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
            </li>
            <li className="nav-item p-2">
              <div className="rounded" style={{width: '48px', height:'48px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
            </li>
            <li className="nav-item p-2">
              <div className="rounded" style={{width: '48px', height:'48px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
            </li>
            <li className="nav-item p-2">
              <div className="rounded" style={{width: '48px', height:'48px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
            </li>
            <li className="nav-item p-2">
              <div className="rounded" style={{width: '48px', height:'48px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
            </li>
            <li className="nav-item p-2">
              <div className="rounded" style={{width: '48px', height:'48px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
            </li>
            <li className="nav-item p-2">
              <div className="rounded" style={{width: '48px', height:'48px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
            </li>
            <li className="nav-item p-2">
              <div className="rounded" style={{width: '48px', height:'48px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}