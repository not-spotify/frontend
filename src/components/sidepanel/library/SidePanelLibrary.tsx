import styles from "@/components/sidepanel/library/library.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import clsx from "clsx";
import {ISidePanelRenderMode} from "@/components/sidepanel/SidePanel";

interface ISidePanelLibraryState {

}

interface ISidePanelLibraryProps {
  renderMode: ISidePanelRenderMode,
}

export default function SidePanelLibrary(props: ISidePanelLibraryProps) {
  switch (props.renderMode) {
    case ISidePanelRenderMode.Thin:
      return (
        <>
          <div className={clsx("d-flex flex-grow-1 text-white p-2", styles.default)}>
            <div className={clsx("rounded", styles.menuItemListWrapper)}>
              <ul className={clsx("nav flex-column text-center", styles.menuItemList)}>
                <li className="nav-item p-2">
                  <div className="rounded"
                       style={{width: '48px', height: '48px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
                </li>
                <li className="nav-item p-2">
                  <div className="rounded"
                       style={{width: '48px', height: '48px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
                </li>
              </ul>
            </div>
          </div>
        </>
      )
    case ISidePanelRenderMode.Wide:
      return (
        <>
          <div className={clsx("d-flex flex-grow-1 text-white p-2", styles.default)}>
            <div className={clsx("rounded", styles.menuItemListWrapper)}>
              <ul className={clsx("nav flex-column text-center", styles.menuItemList)}>
                <li className="nav-item p-2 d-flex">
                  <div className="rounded"
                       style={{width: '48px', height: '48px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
                  <div className="flex-grow-1 text-left px-2">
                    <div className="py-0 my-0">Playlist Title</div>
                    <div className="small py-0 my-0">by Username</div>
                  </div>
                </li>
                <li className="nav-item p-2 d-flex">
                  <div className="rounded"
                       style={{width: '48px', height: '48px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
                  <div className="flex-grow-1 text-left px-2">
                    <div className="py-0 my-0">Playlist Title</div>
                    <div className="small py-0 my-0">by Username</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      )
  }
}