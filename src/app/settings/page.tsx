"use client"

import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import PageHeader from "@/components/pageHeader/pageHeader";
import RequireAuth from "@/components/requireAuth";

interface ISettingsState {

}

export default function Settings() {
  return (
    <div className="d-flex flex-grow-1 text-white p-1" style={{overflow: "auto"}}>
      <div className="d-flex rounded flex-fill flex-column bg-dark" style={{
        overflow: "auto",
        background: "linear-gradient(180deg, rgba(201,99,64,1) 0%, rgba(16,16,16,1) 512px)",
      }}>
        <PageHeader></PageHeader>
        <RequireAuth>
          <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
            <h1 className="display-1 fw-bold">Settings</h1>
            <div className="d-flex flex-column w-100 p-4 flex-fill">
              <ul className="nav nav-underline nav-fill rounded-top" style={{background: 'rgba(0, 0, 0, 0.5)'}}>
                <li className="nav-item">
                  <a className="nav-link active text-white" aria-current="page" href="#">Account</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-secondary" href="#">Playback</a>
                </li>
              </ul>
              <div className="d-flex flex-fill p-2 rounded-bottom" style={{background: 'rgba(0, 0, 0, 0.5)'}}>
                test
              </div>
            </div>
          </div>
        </RequireAuth>
      </div>
    </div>
  )
}
