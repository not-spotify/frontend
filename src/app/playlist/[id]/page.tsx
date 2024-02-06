"use client"

import clsx from "clsx"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro"
import styles from './playlist.module.css'
import PageHeader from "@/components/pageHeader/pageHeader"
import {IPlaylistReadCollectionSearchTrackDto, IPlaylistReadResultDto} from "@/lib/dto/playlistDtos"
import React, {useState} from "react"
import {PlaylistRead, PlaylistReadCollectionTrack} from "@/lib/requests/playlistRequests"
import ImageDisplayLocal from "@/components/imageDisplayLocal"
import {ITrackReadUnlinkedResultDto} from "@/lib/dto/trackDtos"
import useSWRImmutable from "swr/immutable"

interface IPlaylistParams {
  id: string
}

interface IPlaylistProps {
  params: IPlaylistParams
}

interface IPlaylistState {
  playlist: IPlaylistReadResultDto | null
  playlistTracks: ITrackReadUnlinkedResultDto[]
  playlistTracksPage: number
}

export default function Playlist(props: IPlaylistProps) {
  const initialState: IPlaylistState =
    {
      playlist: null,
      playlistTracks: [],
      playlistTracksPage: 1
    }

  const [state, setState] = useState(initialState)

  const fetcherPlaylist = async () => {
    const playlistReadResult = await PlaylistRead(props.params.id)

    setState((prev) => ({
      ...prev,
      playlist: playlistReadResult
    }))
  }

  const fetcherPlaylistTracks = async () => {
    const dataIn: IPlaylistReadCollectionSearchTrackDto =
      {
        PageModel: {
          Page: state.playlistTracksPage,
          PageSize: 20
        }
      }

    const playlistReadResult = await PlaylistReadCollectionTrack(props.params.id, dataIn)

    setState((prev) => ({
      ...prev,
      playlistTracks: [...state.playlistTracks, ...playlistReadResult.items]
    }))
  }

  const fetcherPlaylistSwr = useSWRImmutable(["PlaylistFetch", props.params.id], fetcherPlaylist, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateIfStale: false,
    shouldRetryOnError: true
  })

  const fetcherPlaylistTracksSwr = useSWRImmutable(["PlaylistFetchTracks", props.params.id, state.playlistTracksPage], fetcherPlaylistTracks, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateIfStale: false,
    shouldRetryOnError: true
  })

  const handlePlay = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //TODO: usePlayer, force play playlist
  }

  const handleLike = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //TODO:
  }

  const handleShuffle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //TODO:
  }

  const handleDownload = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //TODO:
  }

  return (
    <div className="d-flex flex-grow-1 text-white p-1" style={{overflow: "auto"}}>
      <div className="d-flex rounded flex-fill flex-column bg-dark" style={{
        overflow: "auto",
        background: "linear-gradient(180deg, rgba(201,99,64,1) 0%, rgba(16,16,16,1) 512px)",
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
              <ImageDisplayLocal
                src={"https://geo-media.beatport.com/image_size/1400x1400/fd2656f5-8731-4814-b565-c903e767e5d5.jpg"}></ImageDisplayLocal>
            </div>
          </div>
          <div className="flex-grow-1 placeholder-glow">
            <p className="my-0"><span className="placeholder col-6">PLAYLIST_VISIBILITY</span></p>
            <h1 className="display-1 fw-bold">{state.playlist?.name ?? <span className="placeholder col-6">PLAYLIST_NAME</span>}</h1>
            <p className="small my-1"><span className="placeholder col-4">PLAYLIST_DESCRIPTION</span></p>
            <span className=""><strong><span className="placeholder col-2">by PLAYLIST_AUTHOR</span></strong></span>
            <span className="m-2">&#8226;</span>
            {/*TRACK_COUNT*/}
            <span><span className="placeholder col-1">00 tracks</span></span>
            <span className="m-2">&#8226;</span>
            {/*TOTAL_PLAYTIME*/}
            <span><span className="placeholder col-1">0 hr 00 min</span></span>
          </div>
        </div>
        <div className="d-flex justify-content-between p-3">
          <div className="d-flex align-items-center">
            <div className="d-flex rounded-circle align-items-center justify-content-center" onClick={handlePlay}
                 style={{width: '64px', height: '64px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
              <FontAwesomeIcon icon={icon({name: 'play'})} size="xl"/>
            </div>
            <div className="px-3" onClick={handleShuffle}>
              <FontAwesomeIcon icon={icon({name: 'shuffle'})} size="xl"/>
            </div>
            <div className="px-3" onClick={handleLike}>
              <FontAwesomeIcon icon={icon({name: 'heart'})} size="xl"/>
            </div>
            <div className="px-3" onClick={handleDownload}>
              <FontAwesomeIcon icon={icon({name: 'arrow-down'})} size="xl"/>
            </div>
            <div className="px-3">
              <FontAwesomeIcon icon={icon({name: 'ellipsis'})} size="xl"/>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="px-3">
              <FontAwesomeIcon icon={icon({name: 'search'})} size="lg"/>
            </div>
            <div className="px-3">
              <span className="mr-2">Custom Order</span><FontAwesomeIcon icon={icon({name: 'list-ul'})} size="lg"/>
            </div>
          </div>
        </div>
        <div className="d-flex p-3">
          <table className={clsx("table table-dark", styles.tableCustom)}>
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Album</th>
              <th scope="col"></th>
              <th scope="col"><FontAwesomeIcon icon={icon({name: 'clock', style: 'regular'})} size="lg"/></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">1</th>
              <td>SampleTitle</td>
              <td>SampleAuthor</td>
              <td>SampleAlbum</td>
              <td><FontAwesomeIcon icon={icon({name: 'heart', style: 'regular'})} size="lg"/></td>
              <td>3:53</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
