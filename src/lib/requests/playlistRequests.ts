// noinspection JSAnnotator

import {axiosAuthIntercepted, axiosDefaultIntercepted, formatAxiosError, HTTP_BACKEND_URL} from "@/lib/backendRequests";
import {
  IPlaylistCloneDto,
  IPlaylistCreateDto,
  IPlaylistReadCollectionResultDto,
  IPlaylistReadCollectionSearchDto,
  IPlaylistReadResultDto,
  IPlaylistUpdateCollectionTrackDto,
  IPlaylistUpdateCollectionTrackResultDto,
  IPlaylistUpdateDto
} from "@/lib/dto/playlistDtos";

export async function PlaylistReadCollectionSearch(dataIn: IPlaylistReadCollectionSearchDto) {
  return axiosAuthIntercepted.get(`${HTTP_BACKEND_URL}/Playlist`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      const dataOut: IPlaylistReadCollectionResultDto = res.data

      return dataOut
    })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}

export async function PlaylistCreate(dataIn: IPlaylistCreateDto) {
  return axiosAuthIntercepted.post(`${HTTP_BACKEND_URL}/Playlist`, dataIn, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      const dataOut: IPlaylistReadResultDto = res.data

      return dataOut
    })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}

export async function PlaylistClone(id: string, dataIn: IPlaylistCloneDto) {
  return axiosAuthIntercepted.put(`${HTTP_BACKEND_URL}/Playlist/${id}/Clone`, dataIn, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      const dataOut: IPlaylistReadResultDto = res.data

      return dataOut
    })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}

export async function PlaylistUpdate(id: string, dataIn: IPlaylistUpdateDto) {
  return axiosAuthIntercepted.put(`${HTTP_BACKEND_URL}/Playlist/${id}`, dataIn, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      const dataOut: IPlaylistReadResultDto = res.data

      return dataOut
    })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}

export async function PlaylistDelete(id: string) {
  return axiosAuthIntercepted.delete(`${HTTP_BACKEND_URL}/Playlist/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}

export async function PlaylistUpdateCollectionTrack(id: string, dataIn: IPlaylistUpdateCollectionTrackDto) {
  return axiosAuthIntercepted.post(`${HTTP_BACKEND_URL}/Playlist/${id}/Tracks`, dataIn, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      const dataOut: IPlaylistUpdateCollectionTrackResultDto = res.data

      return dataOut
    })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}

export async function TrackUpdateCover(id: string, file: File) {
  let formData = new FormData()

  formData.append("cover", file)

  return axiosAuthIntercepted.put(`${HTTP_BACKEND_URL}/Playlist/${id}/Cover`, formData, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}