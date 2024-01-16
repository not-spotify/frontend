import {IEntityCollectionPagination, IPageModelResult} from "@/lib/backendRequestModels";
import {PlaylistVisibility} from "@/lib/enums/PlaylistVisibility";
import {PlaylistUpdateTrackAction} from "@/lib/enums/PlaylistUpdateTrackAction";
import {PlaylistUpdateTrackActionResult} from "@/lib/enums/PlaylistUpdateTrackActionResult";

export interface IPlaylistReadUnlinkedResultDto {
  id: string,
  name: string,
  coverUri: string
  trackIds: string[]
}

export interface IPlaylistReadResultDto extends IPlaylistReadUnlinkedResultDto {

}

export interface IPlaylistReadCollectionResultDto extends IPageModelResult<IPlaylistReadUnlinkedResultDto> {

}

export interface IPlaylistReadCollectionSearchDto extends IEntityCollectionPagination {

}

export interface IPlaylistCreateDto {
  name: string,
  visibility: PlaylistVisibility
}

export interface IPlaylistCloneDto {
  name: string,
  includeTrackIds: boolean
}

export interface IPlaylistUpdateDto {
  //TODO: Incomplete API
}

export interface IPlaylistUpdateCollectionTrackDto {
  tracks: IPlaylistUpdateCollectionUnlinkedTrackDto[]
}

export interface IPlaylistUpdateCollectionUnlinkedTrackDto {
  id: string,
  action: PlaylistUpdateTrackAction
}

export interface IPlaylistUpdateCollectionTrackResultDto {
  tracks: IPlaylistUpdateCollectionUnlinkedTrackResultDto[]
}

export interface IPlaylistUpdateCollectionUnlinkedTrackResultDto {
  id: string,
  action: PlaylistUpdateTrackActionResult
}