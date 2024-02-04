import {icon} from '@fortawesome/fontawesome-svg-core/import.macro'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import styles from './menu.module.css'
import clsx from "clsx"
import {ISidePanelRenderMode} from "@/components/sidepanel/SidePanel"
import {useRouter} from "next/navigation"

interface ISidePanelMenuState {

}

interface ISidePanelMenuProps {
  renderMode: ISidePanelRenderMode,
}

export default function SidePanelMenu(props: ISidePanelMenuProps) {
  const router = useRouter()

  return (
    <>
      <div className={clsx("d-flex text-white p-1", styles.default)}>
        <div className={clsx("rounded", styles.menuItemListWrapper)}>
          <div className={clsx("d-flex flex-column text-left", styles.menuItemList)}>
            <div className="d-flex p-2">
              <div className="d-flex rounded justify-content-center align-items-center"
                   style={{width: '56px', height: '56px'}}>
                <FontAwesomeIcon icon={icon({name: 'home'})} size="lg" data-bs-toggle="tooltip"
                                 data-bs-placement="right" title="Home"/>
              </div>
              <div className={clsx("d-flex flex-column flex-grow-1 text-left px-3 justify-content-center", {
                ["d-none"]: props.renderMode == ISidePanelRenderMode.Thin
              })}>
                <div className="py-0 my-0"><strong>Home</strong></div>
              </div>
            </div>
            <div className="d-flex p-2">
              <div className="d-flex rounded justify-content-center align-items-center"
                   style={{width: '56px', height: '56px'}}>
                <FontAwesomeIcon icon={icon({name: 'search'})} size="lg" data-bs-toggle="tooltip"
                                 data-bs-placement="right" title="Search"/>
              </div>
              <div className={clsx("d-flex flex-column flex-grow-1 text-left px-3 justify-content-center", {
                ["d-none"]: props.renderMode == ISidePanelRenderMode.Thin
              })}>
                <div className="py-0 my-0"><strong>Search</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}