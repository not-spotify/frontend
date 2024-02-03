'use client'

import './globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "@/components/BootstrapClient";
import {ReactNode, RefObject, useLayoutEffect, useRef, useState} from "react"
import clsx from "clsx";
import rootLayoutStyles from '@/styles/rootLayout.module.css'
import SidePanel, {ISidePanelRenderMode} from "@/components/sidepanel/SidePanel";
import Player from "@/components/player/Player";
import {ProvideAuth} from "@/lib/useAuth";
import {ProvideUser} from "@/lib/useUser";

interface IRootLayoutProps {
  children?: ReactNode
}

interface IRootLayoutState {
  sidePanelRenderModeCounter: number,
  sidePanelResizing: boolean,
  mouseClientXPrev: number,
  sidePanelRenderMode: ISidePanelRenderMode
}

export default function RootLayout(props: IRootLayoutProps) {
  const [state, setState] = useState({
    sidePanelRenderModeCounter: 0,
    sidePanelResizing: false,
    mouseClientXPrev: 0
  } as IRootLayoutState)

  const sideBarRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const separatorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const sideBarRefCopy = sideBarRef.current
    const separatorRefCopy = separatorRef.current

    const handleSeparatorMouseUp = (event: MouseEvent) => {
      document.body.style.removeProperty('cursor')

      setState((prev) => ({
        ...prev,
        sidePanelResizing: false,
        mouseClientXPrev: 0
      }))
    }

    const handleSeparatorMouseMove = (event: MouseEvent) => {
      if (sideBarRefCopy && state.sidePanelResizing) {
        const dx = state.mouseClientXPrev - event.clientX

        const newSidePanelWidthOffset = Math.max(0, Math.min(64, state.sidePanelRenderModeCounter - dx));
        const newSidePanelRenderMode = newSidePanelWidthOffset > 32 ? ISidePanelRenderMode.Wide : ISidePanelRenderMode.Thin;

        document.body.style.cursor = 'col-resize'

        setState((prev) => ({
          ...prev,
          mouseClientXPrev: event.clientX,
          sidePanelRenderModeCounter: newSidePanelWidthOffset,
          sidePanelRenderMode: newSidePanelRenderMode
        }))
      }
    }

    const handleSeparatorMouseDown = (event: MouseEvent) => {
      setState((prev) => ({
        ...prev,
        sidePanelResizing: true,
        mouseClientXPrev: event.clientX
      }))
    }

    if (separatorRefCopy) {
      document.addEventListener('mouseup', handleSeparatorMouseUp)
      document.addEventListener('mousemove', handleSeparatorMouseMove)
      separatorRefCopy.addEventListener('mousedown', handleSeparatorMouseDown)
    }

    return () => {
      if (separatorRefCopy) {
        document.removeEventListener('mouseup', handleSeparatorMouseUp)
        document.removeEventListener('mousemove', handleSeparatorMouseMove)
        separatorRefCopy.removeEventListener('mousedown', handleSeparatorMouseDown)
      }
    }
  })

  return (
    <html lang="en">
    <body style={{minWidth: '768px'}}>
    <BootstrapClient></BootstrapClient>
    <ProvideAuth>
      <ProvideUser>
        <div className={clsx("d-flex flex-column", rootLayoutStyles.default)}>
          <div className="d-flex flex-grow-1" style={{overflow: "auto"}}>
            <SidePanel renderMode={state.sidePanelRenderMode ?? ISidePanelRenderMode.Thin}
                       renderRef={sideBarRef}></SidePanel>
            <div className={clsx("d-flex", rootLayoutStyles.separator)} ref={separatorRef}></div>
            <div className="d-flex flex-grow-1 bg-black" style={{overflow: "auto"}}>
              {props.children}
            </div>
          </div>
          <Player></Player>
        </div>
      </ProvideUser>
    </ProvideAuth>
    </body>
    </html>
  )
}
