"use client"

import PageHeader from "@/components/pageHeader/pageHeader";

interface ISignUpState {

}

export default function SignUp() {
  return (
    <div className="d-flex flex-grow-1 text-white p-1" style={{overflow: "auto"}}>
      <div className="d-flex rounded flex-fill flex-column bg-dark" style={{
        overflow: "auto",
        background: "linear-gradient(180deg, rgba(201,99,64,1) 0%, rgba(16,16,16,1) 512px)",
      }}>
        <PageHeader></PageHeader>
        <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
          <h1 className="display-1 fw-bold">Sign Up</h1>
          <form noValidate>
            <div className="input-group my-1">
              <input type="text" className="form-control" placeholder="Username" required autoFocus/>
            </div>
            <div className="input-group my-1">
              <input type="password" className="form-control" placeholder="Password" required/>
            </div>
            <div className="d-grid gap-1 my-1">
              <button type="submit" className="btn btn-dark btn-block">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}