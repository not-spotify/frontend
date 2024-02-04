"use client"

import PageHeader from "@/components/pageHeader/pageHeader"
import {useAuth} from "@/lib/useAuth"
import {useUser} from "@/lib/useUser"
import MediaItemCard, {IMediaItemCardSize} from "@/components/mediaItemCard/MediaItemCard"

export default function Main() {
  const user = useUser()

  return (
    <div className="d-flex flex-grow-1 text-white p-1" style={{overflow: "auto"}}>
      <div className="d-flex rounded flex-fill flex-column bg-dark" style={{
        overflow: "auto",
        background: "linear-gradient(180deg, rgba(201,99,64,1) 0%, rgba(16,16,16,1) 512px)",
      }}>
        <PageHeader></PageHeader>
        <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-start">
          <div className="d-flex flex-column w-100 p-4">
            <h1 className="fw-bold">Welcome back, {user.state.userReadResult?.userName}</h1>
          </div>
          <div className="d-flex w-100 p-4 flex-column">
            <p className="lead">Playlists</p>
            <div className="align-content-center flex-wrap row row-cols-xl-4 row-cols-2 g-2 flex-grow-1">
              <div className="col">
                <MediaItemCard line1="Playlist Title" line2="by Username" fillBackground={true}
                               size={IMediaItemCardSize.Medium}></MediaItemCard>
              </div>
              <div className="col">
                <MediaItemCard line1="Playlist Title" line2="by Username" fillBackground={true}
                               size={IMediaItemCardSize.Medium}></MediaItemCard>
              </div>
              <div className="col">
                <MediaItemCard line1="Playlist Title" line2="by Username" fillBackground={true}
                               size={IMediaItemCardSize.Medium}></MediaItemCard>
              </div>
              <div className="col">
                <MediaItemCard line1="Playlist Title" line2="by Username" fillBackground={true}
                               size={IMediaItemCardSize.Medium}></MediaItemCard>
              </div>
            </div>
          </div>
          <div className="d-flex w-100 p-4 flex-column">
            <p className="lead">Tracks</p>
            <div className="align-content-center flex-wrap row row-cols-xl-4 row-cols-2 g-2 flex-grow-1">
              <div className="col">
                <MediaItemCard line1="Title" line2="Author" fillBackground={true}
                               size={IMediaItemCardSize.Medium}></MediaItemCard>
              </div>
              <div className="col">
                <MediaItemCard line1="Title" line2="Author" fillBackground={true}
                               size={IMediaItemCardSize.Medium}></MediaItemCard>
              </div>
              <div className="col">
                <MediaItemCard line1="Title" line2="Author" fillBackground={true}
                               size={IMediaItemCardSize.Medium}></MediaItemCard>
              </div>
              <div className="col">
                <MediaItemCard line1="Title" line2="Author" fillBackground={true}
                               size={IMediaItemCardSize.Medium}></MediaItemCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
