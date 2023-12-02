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
          <div className={clsx("d-flex flex-grow-1 text-white p-1", styles.default)}>
            <div className={clsx("rounded", styles.menuItemListWrapper)}>
              <div className="p-2">
                <div className="d-flex rounded justify-content-center align-items-center"
                     style={{width: '56px', height: '56px'}}>
                  <FontAwesomeIcon icon={icon({name: 'lines-leaning'})} size="lg" data-bs-toggle="tooltip"
                                   data-bs-placement="right" title="Your Library"/>
                </div>
              </div>
              <div className={clsx("d-flex flex-column", styles.menuItemList)}>
                <div className="p-2">
                  <div className="rounded"
                       style={{width: '56px', height: '56px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    case ISidePanelRenderMode.Wide:
      return (
        <>
          <div className={clsx("d-flex flex-grow-1 text-white p-1", styles.default)}>
            <div className={clsx("rounded", styles.menuItemListWrapper)}>
              <div className="d-flex p-2">
                <div className="d-flex rounded justify-content-center align-items-center"
                     style={{width: '56px', height: '56px'}}>
                  <FontAwesomeIcon icon={icon({name: 'lines-leaning'})} size="lg" data-bs-toggle="tooltip"
                                   data-bs-placement="right" title="Your Library"/>
                </div>
                <div className="d-flex flex-column flex-grow-1 text-left px-3 justify-content-center">
                  <div className="py-0 my-0"><strong>Your Library</strong></div>
                </div>
              </div>
              <div className={clsx("d-flex flex-column", styles.menuItemList)}>
                <div className="p-2 d-flex">
                  <div className="rounded"
                       style={{width: '56px', height: '56px', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
                  <div className="d-flex flex-column flex-grow-1 text-left px-3 justify-content-center">
                    <div className="py-0 my-0">
                      <strong>Playlist Title</strong>
                    </div>
                    <div className="small py-0 my-0">by Username</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
  }
}