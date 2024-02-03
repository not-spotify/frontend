"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import PageHeader from "@/components/pageHeader/pageHeader";
import {ITrackReadResultDto} from "@/lib/dto/trackDtos";
import {useState} from "react";
import {TrackRead} from "@/lib/requests/trackRequests";
import useSWRImmutable from "swr/immutable";

interface ITrackParams {
  id: string
}

interface ITrackProps {
  params: ITrackParams
}

interface ITrackState {
  track: ITrackReadResultDto | null
}

export default function Track(props: ITrackProps) {
  const initialState: ITrackState =
    {
      track: null
    }

  const [state, setState] = useState(initialState)

  const fetcher = async () => {
    const trackReadResult = await TrackRead(props.params.id)

    setState((prev) => ({
      ...prev,
      track: trackReadResult
    }))
  }

  const {data, error, isLoading} = useSWRImmutable(["TrackFetch", props.params.id], fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateIfStale: false,
    shouldRetryOnError: true
  })

  return (
    <div className="d-flex flex-grow-1 text-white p-1" style={{overflow: "auto"}}>
      <div className="d-flex rounded flex-fill flex-column" style={{
        overflow: "auto",
        background: "linear-gradient(180deg, rgba(99,64,201,1) 0%, rgba(16,16,16,1) 512px)",
      }}>
        <PageHeader></PageHeader>
        <div className="d-flex">
          <div className="d-flex align-items-end p-3">
            <div className="rounded ratio ratio-1x1 shadow"
                 style={{
                   width: '10vw',
                   minWidth: '128px',
                   maxWidth: '192px',
                   backgroundColor: 'rgba(255, 255, 255, 0.1)'
                 }}></div>
          </div>
          <div className="flex-grow-1">
            <p className="my-0">Track GUID:{props.params.id}</p>
            <h1 className="display-1 fw-bold">Track Name</h1>
            <span className="small">by <strong>Author</strong> on <strong>Album</strong></span>
            <span className="m-2">&#8226;</span>
            <span>2023</span>
            <span className="m-2">&#8226;</span>
            <span>2 min 33 sec</span>
          </div>
        </div>
        <div className="d-flex justify-content-between p-3">
          <div className="d-flex align-items-center">
            <div className="d-flex rounded-circle align-items-center justify-content-center"
                 style={{width: '64px', height: '64px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
              <FontAwesomeIcon icon={icon({name: 'play'})} size="xl"/>
            </div>
            <div className="px-3">
              <FontAwesomeIcon icon={icon({name: 'heart'})} size="xl"/>
            </div>
            <div className="px-3">
              <FontAwesomeIcon icon={icon({name: 'ellipsis'})} size="xl"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
