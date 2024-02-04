'use client'

import './globals.css'
import "bootstrap/dist/css/bootstrap.min.css"
import React, {ReactNode, RefObject, useLayoutEffect, useRef, useState} from "react"
import clsx from "clsx"
import SidePanel, {ISidePanelRenderMode} from "@/components/sidepanel/SidePanel"
import Player from "@/components/player/Player"
import styles from "@/app/main/main.module.css"
import RequireAuth from "@/components/requireAuth"
import RequireUser from "@/components/requireUser"

interface IMainLayoutProps {
  children?: ReactNode
}

interface IMainLayoutState {
  sidePanelRenderModeCounter: number,
  sidePanelResizing: boolean,
  clientXPrev: number,
  sidePanelRenderMode: ISidePanelRenderMode
}

export default function MainLayout(props: IMainLayoutProps) {
  const initialState: IMainLayoutState = {
    sidePanelRenderModeCounter: 0,
    sidePanelResizing: false,
    clientXPrev: 0,
    sidePanelRenderMode: ISidePanelRenderMode.Thin
  }

  const [state, setState] = useState(initialState)

  const sideBarRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const separatorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  const handleSeparatorMouseUpGlobal = (event: MouseEvent) => {
    document.body.style.removeProperty('cursor')

    setState((prev) => ({
      ...prev,
      sidePanelResizing: false,
      clientXPrev: event.clientX,
    }))
  }

  const handleSeparatorMouseMoveGlobal = (event: MouseEvent) => {
    if (state.sidePanelResizing) {
      const dx = state.clientXPrev - event.clientX

      const newSidePanelWidthOffset = Math.max(0, Math.min(64, state.sidePanelRenderModeCounter - dx))
      const newSidePanelRenderMode = newSidePanelWidthOffset > 32 ? ISidePanelRenderMode.Wide : ISidePanelRenderMode.Thin

      document.body.style.cursor = 'col-resize'

      setState((prev) => ({
        ...prev,
        clientXPrev: event.clientX,
        sidePanelRenderModeCounter: newSidePanelWidthOffset,
        sidePanelRenderMode: newSidePanelRenderMode
      }))
    }
  }

  const handleSeparatorMouseMoveGlobalBackground = (event: MouseEvent) => {
    setState((prev) => ({
      ...prev,
      clientXPrev: event.clientX,
    }))
  }

  const handleSeparatorMouseDownSeparator = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setState((prev) => ({
      ...prev,
      sidePanelResizing: true
    }))
  }

  const handleSeparatorMouseDownGlobal = (event: MouseEvent) => {
    setState((prev) => ({
      ...prev,
      clientXPrev: event.clientX
    }))
  }

  useLayoutEffect(() => {
    document.addEventListener('mousemove', handleSeparatorMouseMoveGlobalBackground)

    return () => {
      document.removeEventListener('mousemove', handleSeparatorMouseMoveGlobalBackground)
    }
  }, [])

  useLayoutEffect(() => {
    document.addEventListener('mousemove', handleSeparatorMouseMoveGlobal)
    document.addEventListener('mouseup', handleSeparatorMouseUpGlobal)
    document.addEventListener('mouseup', handleSeparatorMouseDownGlobal)

    return () => {
      document.removeEventListener('mousemove', handleSeparatorMouseMoveGlobal)
      document.removeEventListener('mouseup', handleSeparatorMouseUpGlobal)
      document.removeEventListener('mouseup', handleSeparatorMouseDownGlobal)
    }
  }, [state.sidePanelResizing])

  return (
    <RequireAuth>
      <RequireUser>
        <div className={clsx("d-flex flex-column w-100", styles.default)}>
          <div className="d-flex flex-grow-1" style={{overflow: "auto"}}>
            <SidePanel renderMode={state.sidePanelRenderMode ?? ISidePanelRenderMode.Thin}
                       renderRef={sideBarRef}></SidePanel>
            <div className={clsx("d-flex", styles.separator)} ref={separatorRef}
                 onMouseDown={handleSeparatorMouseDownSeparator}></div>
            <div className="d-flex flex-grow-1 bg-black" style={{overflow: "auto"}}>
              {props.children}
            </div>
          </div>
          <Player></Player>
        </div>
      </RequireUser>
    </RequireAuth>
  )
}
