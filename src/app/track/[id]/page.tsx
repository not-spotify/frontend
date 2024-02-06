"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro"
import PageHeader from "@/components/pageHeader/pageHeader"
import {ITrackReadResultDto} from "@/lib/dto/trackDtos"
import React, {useState} from "react"
import {TrackRead} from "@/lib/requests/trackRequests"
import useSWRImmutable from "swr/immutable"
import ImageDisplayLocal from "@/components/imageDisplayLocal"

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

  const handlePlay = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //TODO: usePlayer, force play track
  }

  const handleLike = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //TODO:
  }

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
                 }}>
              <ImageDisplayLocal src={"https://geo-media.beatport.com/image_size/1400x1400/fd2656f5-8731-4814-b565-c903e767e5d5.jpg"}></ImageDisplayLocal>
            </div>
          </div>
          <div className="flex-grow-1 placeholder-glow">
            <h1 className="display-1 fw-bold">{state.track?.name ?? <span className="placeholder col-6">TRACK_NAME</span>}</h1>
            <span className="small"><strong>{state.track?.author ?? <span className="placeholder col-2">by TRACK_AUTHOR</span>}</strong></span>
            <span className="m-2">&#8226;</span>
            <span><span className="placeholder col-1">TRACK_YEAR</span></span>
            <span className="m-2">&#8226;</span>
            {/*PLAYTIME*/}
            <span><span className="placeholder col-1">0 hr 00 min</span></span>
          </div>
        </div>
        <div className="d-flex justify-content-between p-3">
          <div className="d-flex align-items-center">
            <div className="d-flex rounded-circle align-items-center justify-content-center" onClick={handlePlay}
                 style={{width: '64px', height: '64px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
              <FontAwesomeIcon icon={icon({name: 'play'})} size="xl"/>
            </div>
            <div className="px-3" onClick={handleLike}>
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
