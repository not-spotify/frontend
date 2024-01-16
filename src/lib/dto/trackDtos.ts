import {TrackVisibility} from "@/lib/enums/TrackVisibility";

export interface ITrackReadResultDto {
  coverUri: string
  name: string
  author: string
  visibility: TrackVisibility,
}

export interface ITrackUpdateDto {
  visibility: TrackVisibility,
  coverUri: string,
  name: string
}

export interface ITrackCreateDto {
  uploadingTrack: string,
  uploadingCover: string
}

export interface ITrackCreateQuery {
  name: string,
  author: string,
  visibility: TrackVisibility
}