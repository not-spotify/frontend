'use client'

import './globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "@/components/BootstrapClient";
import {ReactNode, RefObject, useEffect, useRef, useState} from "react"
import clsx from "clsx";
import rootLayoutStyles from '@/styles/rootLayout.module.css'
import SidePanel from "@/components/sidepanel/SidePanel";
import Player from "@/components/player/Player";

interface IRootLayoutProps {
  children?: ReactNode
}

interface IRootLayoutState {
  sidePanelWidthOffset: number,
  sidePanelResizing: boolean,
  mouseClientXPrev: number
}

export default function RootLayout(props: IRootLayoutProps) {
  const [state, setState] = useState({
    sidePanelWidthOffset: 0,
    sidePanelResizing: false,
    mouseClientXPrev: 0
  } as IRootLayoutState)

  let sideBarDivRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null)
  let separatorDivRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let sideBarDivRefCopy = sideBarDivRef.current
    let separatorDivRefCopy = separatorDivRef.current

    const handleSeparatorMouseUp = (event: MouseEvent) => {
      document.body.style.removeProperty('cursor');

      setState((prev) => ({
        ...prev,
        sidePanelResizing: false,
        mouseClientXPrev: 0
      }))
    }

    const handleSeparatorMouseMove = (event: MouseEvent) => {
      if (sideBarDivRefCopy && state.sidePanelResizing) {
        const dx = state.mouseClientXPrev - event.clientX

        const newSidePanelWidthOffset = Math.max(80, Math.min(256, state.sidePanelWidthOffset - dx));

        sideBarDivRefCopy.style.width = `${newSidePanelWidthOffset}px`
        document.body.style.cursor = 'col-resize'

        setState((prev) => ({
          ...prev,
          mouseClientXPrev: event.clientX,
          sidePanelWidthOffset: newSidePanelWidthOffset
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

    if (separatorDivRefCopy) {
      document.addEventListener('mouseup', handleSeparatorMouseUp)
      document.addEventListener('mousemove', handleSeparatorMouseMove)
      separatorDivRefCopy.addEventListener('mousedown', handleSeparatorMouseDown)
    }

    return () => {
      if (separatorDivRefCopy) {
        document.removeEventListener('mouseup', handleSeparatorMouseUp)
        document.removeEventListener('mousemove', handleSeparatorMouseMove)
        separatorDivRefCopy.removeEventListener('mousedown', handleSeparatorMouseDown)
      }
    }
  })

  return (
    <html lang="en">
    <body>
    <div className={clsx("d-flex flex-column", rootLayoutStyles.default)}>
      <div className="d-flex flex-grow-1" style={{overflow: "auto"}}>
        <div className="d-flex flex-column" ref={sideBarDivRef} style={{width: '80px', overflow: "auto"}}>
          <SidePanel></SidePanel>
        </div>
        <div className={clsx("d-flex", rootLayoutStyles.separator)} ref={separatorDivRef}></div>
        <div className="d-flex flex-grow-1">
          {props.children}
        </div>
      </div>
      <Player></Player>
    </div>
    <BootstrapClient></BootstrapClient>
    </body>
    </html>
  )
}
