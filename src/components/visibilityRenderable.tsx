import React, {useLayoutEffect, useRef, useState} from "react"
import clsx from "clsx"

export interface IVisibleOnceInViewportProps {
  children?: React.ReactNode,
  forceVisibility?: boolean,
  className?: string,
  marginVisibility?: string
}

export interface IVisibilityRenderableState {
  message: string | undefined
  isInViewport: boolean,
  wasInViewport: boolean
}

export default function VisibilityRenderable(props: IVisibleOnceInViewportProps) {
  const initialState: IVisibilityRenderableState =
    {
      message: undefined,
      isInViewport: props.forceVisibility ?? false,
      wasInViewport: props.forceVisibility ?? false,
    }

  const thisRef = useRef(null)

  const [state, setState] = useState(initialState)

  useLayoutEffect(() => {
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      setState((prev) => ({
        ...prev,
        isInViewport: props.forceVisibility ?? entry.isIntersecting,
        wasInViewport: props.forceVisibility ?? (state.wasInViewport || entry.isIntersecting)
      }))
    }, {
      root: null,
      rootMargin: props.marginVisibility ?? "0px",
      threshold: 0
    })

    let thisRefCopy = thisRef.current

    if (thisRefCopy)
      intersectionObserver.observe(thisRefCopy)

    return () => {
      if (thisRefCopy)
        intersectionObserver.unobserve(thisRefCopy)
    }
  })

  return (
    <div className={clsx("d-flex", props.className)} ref={thisRef}>
      {
        (() => {
          if (state.wasInViewport)
            return props.children
        })()
      }
    </div>
  )
}