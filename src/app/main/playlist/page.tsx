"use client"

import clsx from "clsx"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro"
import styles from './playlist.module.css'
import PageHeader from "@/components/pageHeader/pageHeader"

export default function Playlist() {
  //TODO: Display playlist details and songs in it, also actions

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
                 }}></div>
          </div>
          <div className="flex-grow-1">
            <p className="my-0">Public Playlist</p>
            <h1 className="display-1 fw-bold">Playlist Name</h1>
            <p className="small my-0">Playlist description</p>
            <span className="small">by <strong>Username</strong></span>
            <span className="m-2">&#8226;</span>
            <span>30 songs</span>
            <span className="m-2">&#8226;</span>
            <span>1 hr 22 min</span>
          </div>
        </div>
        <div className="d-flex justify-content-between p-3">
          <div className="d-flex align-items-center">
            <div className="d-flex rounded-circle align-items-center justify-content-center"
                 style={{width: '64px', height: '64px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
              <FontAwesomeIcon icon={icon({name: 'play'})} size="xl"/>
            </div>
            <div className="px-3">
              <FontAwesomeIcon icon={icon({name: 'shuffle'})} size="xl"/>
            </div>
            <div className="px-3">
              <FontAwesomeIcon icon={icon({name: 'heart'})} size="xl"/>
            </div>
            <div className="px-3">
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
