import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import styles from "./loading.module.css"
import clsx from "clsx";

export interface ILoadingProps {
  children?: React.ReactNode;
}

export function Loading(props: ILoadingProps) {
  return (
    <div className={clsx("d-flex flex-column flex-grow-1 p-4 align-items-center", styles.main)}>
      <div className="m-auto d-flex flex-column align-items-center">
        <LoadingSpinner></LoadingSpinner>
        {props.children}
      </div>
    </div>
  )
}