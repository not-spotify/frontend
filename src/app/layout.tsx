'use client'

import './globals.css'
import "bootstrap/dist/css/bootstrap.min.css"
import BootstrapClient from "@/components/BootstrapClient"
import {ReactNode} from "react"
import clsx from "clsx"
import styles from "@/app/app.module.css"
import {ProvideUser} from "@/lib/useUser"
import {ProvideAuth} from "@/lib/useAuth"

interface IAppLayoutProps {
  children?: ReactNode
}

interface IAppLayoutState {

}

export default function AppLayout(props: IAppLayoutProps) {
  return (
    <html lang="en">
    <body style={{minWidth: '768px'}}>
    <BootstrapClient></BootstrapClient>
    <ProvideAuth>
      <ProvideUser>
        <div className={clsx("d-flex flex-column", styles.default)}>
          <div className="d-flex flex-grow-1 bg-black" style={{overflow: "auto"}}>
            {props.children}
          </div>
        </div>
      </ProvideUser>
    </ProvideAuth>
    </body>
    </html>
  )
}
