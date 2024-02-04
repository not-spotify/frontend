import {axiosAuthIntercepted, HTTP_BACKEND_URL} from "@/lib/backendRequests"
import {
  IPlaylistCloneDto,
  IPlaylistCreateDto,
  IPlaylistReadCollectionResultDto,
  IPlaylistReadCollectionSearchDto,
  IPlaylistReadCollectionSearchTrackDto,
  IPlaylistReadResultDto,
  IPlaylistUpdateCollectionTrackDto,
  IPlaylistUpdateCollectionTrackResultDto,
  IPlaylistUpdateDto
} from "@/lib/dto/playlistDtos"
import {ITrackReadCollectionResultDto} from "@/lib/dto/trackDtos"

export async function PlaylistReadCollectionSearch(dataIn: IPlaylistReadCollectionSearchDto) {
  return (await axiosAuthIntercepted.get(`${HTTP_BACKEND_URL}/Playlist/List`, {
    params: dataIn,
    headers: {
      "Content-Type": "application/json"
    }
  })).data as IPlaylistReadCollectionResultDto
}

export async function PlaylistRead(id: string) {
  return (await axiosAuthIntercepted.get(`${HTTP_BACKEND_URL}/Playlist/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })).data as IPlaylistReadResultDto
}

export async function PlaylistDelete(id: string) {
  return (await axiosAuthIntercepted.delete(`${HTTP_BACKEND_URL}/Playlist/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })).data
}

export async function PlaylistCreate(dataIn: IPlaylistCreateDto) {
  return (await axiosAuthIntercepted.post(`${HTTP_BACKEND_URL}/Playlist`, dataIn, {
    headers: {
      "Content-Type": "application/json"
    }
  })).data as IPlaylistReadResultDto
}

export async function PlaylistClone(id: string, dataIn: IPlaylistCloneDto) {
  return (await axiosAuthIntercepted.put(`${HTTP_BACKEND_URL}/Playlist/${id}/Clone`, dataIn, {
    headers: {
      "Content-Type": "application/json"
    }
  })).data as IPlaylistReadResultDto
}

export async function PlaylistUpdateCollectionTrack(id: string, dataIn: IPlaylistUpdateCollectionTrackDto) {
  return (await axiosAuthIntercepted.post(`${HTTP_BACKEND_URL}/Playlist/${id}/Tracks`, dataIn, {
    headers: {
      "Content-Type": "application/json"
    }
  })).data as IPlaylistUpdateCollectionTrackResultDto
}

export async function PlaylistReadCollectionTrack(id: string, dataIn: IPlaylistReadCollectionSearchTrackDto) {
  return (await axiosAuthIntercepted.get(`${HTTP_BACKEND_URL}/Track/${id}/Tracks`, {
    params: dataIn,
    headers: {
      "Content-Type": "application/json"
    }
  })).data as ITrackReadCollectionResultDto
}

export async function PlaylistUpdate(id: string, dataIn: IPlaylistUpdateDto) {
  const formData = new FormData()

  Object.keys(dataIn).forEach((k, i, arr) => {
    formData.append(k, arr[i])
  })

  return (await axiosAuthIntercepted.put(`${HTTP_BACKEND_URL}/Playlist/${id}`, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })).data as IPlaylistReadResultDto
}