"use client"

import PageHeader from "@/components/pageHeader/pageHeader"
import RequireAuth from "@/components/requireAuth"
import RequireUser from "@/components/requireUser"
import {useUser} from "@/lib/useUser"

interface ISettingsState {

}

export default function Settings() {
  const user = useUser()

  return (
    <div className="d-flex flex-grow-1 text-white p-1" style={{overflow: "auto"}}>
      <div className="d-flex rounded flex-fill flex-column bg-dark" style={{
        overflow: "auto",
        background: "linear-gradient(180deg, rgba(201,99,64,1) 0%, rgba(16,16,16,1) 512px)",
      }}>
        <PageHeader></PageHeader>
        <RequireAuth>
          <RequireUser>
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
                <div className="d-flex flex-fill flex-column p-2 rounded-bottom"
                     style={{background: 'rgba(0, 0, 0, 0.5)'}}>
                  <p>Username: {user.state.userReadResult?.userName}</p>
                  <p>Email: {user.state.userReadResult?.email}</p>
                  <p>Id: {user.state.userReadResult?.id}</p>
                </div>
              </div>
            </div>
          </RequireUser>
        </RequireAuth>
      </div>
    </div>
  )
}
