import SidePanelMenu from "@/components/sidepanel/menu/SidePanelMenu";
import SidePanelLibrary from "@/components/sidepanel/library/SidePanelLibrary";
import {Property} from "csstype";
import {RefObject} from "react";

interface ISideMenuState {

}

interface ISideMenuProps {
  renderMode: ISidePanelRenderMode,
  renderWidth: Property.Width<string | number> | undefined,
  renderRef: RefObject<HTMLDivElement>
}

export enum ISidePanelRenderMode {
  Thin,
  Wide
}

export default function SidePanel(props: ISideMenuProps) {
  return (
    <div className="d-flex flex-column" ref={props.renderRef} style={{
      width: (() => {
        switch (props.renderMode) {
          case ISidePanelRenderMode.Thin:
            return '80px'
          case ISidePanelRenderMode.Wide:
            return '256px'
        }
      })(),
      minWidth: '80px',
      maxWidth: '256px',
      overflow: "auto"
    }}>
      <SidePanelMenu renderMode={props.renderMode}></SidePanelMenu>
      <SidePanelLibrary renderMode={props.renderMode}></SidePanelLibrary>
    </div>
  )
}