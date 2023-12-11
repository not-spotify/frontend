"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import clsx from "clsx";
import PageHeader from "@/components/pageHeader/pageHeader";
import {useAuth} from "@/lib/useAuth";
import {useRouter} from 'next/navigation';
import {createRef, useState} from "react";

interface ISignInState {
  emailRef: React.RefObject<HTMLInputElement>
  passwordRef: React.RefObject<HTMLInputElement>
  message: string | undefined
}

export default function SignIn() {
  const auth = useAuth()
  const router = useRouter();

  if (auth.state.userId)
    router.replace("/")

  const initialState: ISignInState =
    {
      emailRef: createRef(),
      passwordRef: createRef(),
      message: undefined
    }

  const [state, setState] = useState(initialState);

  async function handleAuthSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const email = state.emailRef.current?.value ?? throw new Error("email is null")
    const password = state.passwordRef.current?.value ?? throw new Error("password is null")

    await auth.SignIn(email, password)
  }

  return (
    <div className="d-flex flex-grow-1 text-white p-1" style={{overflow: "auto"}}>
      <div className="d-flex rounded flex-fill flex-column bg-dark" style={{
        overflow: "auto",
        background: "linear-gradient(180deg, rgba(201,99,64,1) 0%, rgba(16,16,16,1) 512px)",
      }}>
        <PageHeader></PageHeader>
        <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
          <h1 className="display-1 fw-bold">Sign In</h1>
          <form noValidate onSubmit={handleAuthSignIn}>
            <div className="input-group my-1">
              <input type="text" className="form-control" placeholder="Username" required autoFocus
                     ref={state.emailRef}/>
            </div>
            <div className="input-group my-1">
              <input type="password" className="form-control" placeholder="Password" required ref={state.passwordRef}/>
            </div>
            <div className="d-grid gap-1 my-1">
              <button type="submit" className="btn btn-dark btn-block">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}