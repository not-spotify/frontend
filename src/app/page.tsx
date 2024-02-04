"use client"

import PageHeader from "@/components/pageHeader/pageHeader"
import Link from "next/link"

export default function Root() {
  return (
    <div className="d-flex flex-grow-1 text-white p-1" style={{overflow: "auto"}}>
      <div className="d-flex rounded flex-fill flex-column bg-dark" style={{
        overflow: "auto",
        background: "linear-gradient(180deg, rgba(201,99,64,1) 0%, rgba(16,16,16,1) 512px)",
      }}>
        <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
          <h1 className="fw-bold">not-spotify</h1>
          <div className="d-flex flex-column p-4">
            <div className="hstack gap-3">
              <Link type="button" className="btn btn-outline-dark" href="/signup">Sign Up</Link>
              <div className="vr"></div>
              <Link type="button" className="btn btn-outline-dark" href="/signin">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
