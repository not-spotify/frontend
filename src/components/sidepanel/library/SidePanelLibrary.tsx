import styles from "@/components/sidepanel/library/library.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import clsx from "clsx";
import {ISidePanelRenderMode} from "@/components/sidepanel/SidePanel";
import MediaItemCard, {IMediaItemCardSize} from "@/components/mediaItemCard/MediaItemCard";

interface ISidePanelLibraryState {

}

interface ISidePanelLibraryProps {
  renderMode: ISidePanelRenderMode,
}

export default function SidePanelLibrary(props: ISidePanelLibraryProps) {
  switch (props.renderMode) {
    case ISidePanelRenderMode.Thin:
      return (
        <div className={clsx("d-flex flex-grow-1 text-white p-1", styles.default)}>
          <div className={clsx("rounded", styles.menuItemListWrapper)}>
            <div className="p-2">
              <div className="d-flex rounded justify-content-center align-items-center"
                   style={{width: '56px', height: '56px'}}>
                <FontAwesomeIcon icon={icon({name: 'lines-leaning'})} size="lg" data-bs-toggle="tooltip"
                                 data-bs-placement="right" title="Your Library"/>
              </div>
            </div>
            <MediaItemCard size={IMediaItemCardSize.Small}></MediaItemCard>
          </div>
        </div>
      )
    case ISidePanelRenderMode.Wide:
      return (
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
            <MediaItemCard line1="Playlist Title" line2="by Username"
                           size={IMediaItemCardSize.Medium}></MediaItemCard>
          </div>
        </div>
      )
  }
}