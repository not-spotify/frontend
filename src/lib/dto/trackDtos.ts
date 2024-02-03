import {TrackVisibility} from "@/lib/enums/TrackVisibility";
import {IPageModelResult} from "@/lib/backendRequestModels";

export interface ITrackReadUnlinkedResultDto {
  coverUri: string
  isAvailable: boolean
  trackUri: string
  visibility: TrackVisibility
  name: string
  author: string
}

export interface ITrackReadCollectionResultDto extends IPageModelResult<ITrackReadUnlinkedResultDto> {

}

export interface ITrackReadResultDto extends ITrackReadUnlinkedResultDto {

}

export interface ITrackUpdateDto {
  Visibility: TrackVisibility
  RemoveCover: boolean
  Cover: File
  Name: string
}

export interface ITrackCreateDto {
  Name: string
  Author: string
  Track: File
  Cover: File
  Visibility: TrackVisibility
}