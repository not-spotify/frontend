import {TrackVisibility} from "@/lib/enums/TrackVisibility";

export interface ITrackReadResultDto {
  type: string,
  title: string,
  status: number,
  detail: string,
  instance: string,
  additionalProp1: string,
  additionalProp2: string,
  additionalProp3: string
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