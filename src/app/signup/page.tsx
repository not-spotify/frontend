"use client"

import PageHeader from "@/components/pageHeader/pageHeader";
import {useAuth} from "@/lib/useAuth";
import {createRef, useState} from "react";

interface ISignUpState {
  usernameRef: React.RefObject<HTMLInputElement>
  emailRef: React.RefObject<HTMLInputElement>
  passwordRef: React.RefObject<HTMLInputElement>
  message?: string
}

export default function SignUp() {
  const auth = useAuth()

  const initialState: ISignUpState =
    {
      usernameRef: createRef(),
      emailRef: createRef(),
      passwordRef: createRef()
    }

  const [state, setState] = useState(initialState);

  async function handleAuthSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!state.usernameRef.current?.value)
      throw new Error("username is null")
    if (!state.emailRef.current?.value)
      throw new Error("email is null")
    if (!state.passwordRef.current?.value)
      throw new Error("password is null")

    const username = state.usernameRef.current.value
    const email = state.emailRef.current.value
    const password = state.passwordRef.current.value

    await auth.SignUp(username, email, password)
  }

  return (
    <div className="d-flex flex-grow-1 text-white p-1" style={{overflow: "auto"}}>
      <div className="d-flex rounded flex-fill flex-column bg-dark" style={{
        overflow: "auto",
        background: "linear-gradient(180deg, rgba(201,99,64,1) 0%, rgba(16,16,16,1) 512px)",
      }}>
        <PageHeader></PageHeader>
        <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
          <h1 className="display-1 fw-bold">Sign Up</h1>
          <form noValidate onSubmit={handleAuthSignUp}>
            <div className="input-group my-1">
              <input type="text" className="form-control" placeholder="Username" required autoFocus
                     ref={state.usernameRef}/>
            </div>
            <div className="input-group my-1">
              <input type="text" className="form-control" placeholder="Email" required
                     ref={state.emailRef}/>
            </div>
            <div className="input-group my-1">
              <input type="password" className="form-control" placeholder="Password" required ref={state.passwordRef}/>
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