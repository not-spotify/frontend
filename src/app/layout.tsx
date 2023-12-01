'use client'

import './globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "@/components/BootstrapClient";
import {ReactNode, RefObject, useEffect, useLayoutEffect, useRef, useState} from "react"
import clsx from "clsx";
import rootLayoutStyles from '@/styles/rootLayout.module.css'
import SidePanel, {ISidePanelRenderMode} from "@/components/sidepanel/SidePanel";
import Player from "@/components/player/Player";

interface IRootLayoutProps {
  children?: ReactNode
}

interface IRootLayoutState {
  sidePanelWidthOffset: number,
  sidePanelResizing: boolean,
  mouseClientXPrev: number,
  sidePanelRenderMode: ISidePanelRenderMode
}

export default function RootLayout(props: IRootLayoutProps) {
  const [state, setState] = useState({
    sidePanelWidthOffset: 0,
    sidePanelResizing: false,
    mouseClientXPrev: 0
  } as IRootLayoutState)

  const sideBarRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null)
  const separatorRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null)

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

        const newSidePanelWidthOffset = Math.max(80, Math.min(256, state.sidePanelWidthOffset - dx));
        const newSidePanelRenderMode = newSidePanelWidthOffset > 176 ? ISidePanelRenderMode.Wide : ISidePanelRenderMode.Thin;

        sideBarRefCopy.style.width = `${newSidePanelRenderMode == ISidePanelRenderMode.Wide ? 256 : 80}px`
        document.body.style.cursor = 'col-resize'

        setState((prev) => ({
          ...prev,
          mouseClientXPrev: event.clientX,
          sidePanelWidthOffset: newSidePanelWidthOffset,
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
    <body>
    <BootstrapClient></BootstrapClient>
    <div className={clsx("d-flex flex-column", rootLayoutStyles.default)}>
      <div className="d-flex flex-grow-1" style={{overflow: "auto"}}>
        <SidePanel renderMode={state.sidePanelRenderMode ?? ISidePanelRenderMode.Thin}
                   renderRef={sideBarRef}></SidePanel>
        <div className={clsx("d-flex", rootLayoutStyles.separator)} ref={separatorRef}></div>
        <div className="d-flex flex-grow-1">
          {props.children}
        </div>
      </div>
      <Player></Player>
    </div>
    </body>
    </html>
  )
}
