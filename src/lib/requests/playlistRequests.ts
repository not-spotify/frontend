import {axiosAuthIntercepted, formatAxiosError, HTTP_BACKEND_URL} from "@/lib/backendRequests";
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
} from "@/lib/dto/playlistDtos";
import {ITrackReadCollectionResultDto} from "@/lib/dto/trackDtos";

export async function PlaylistReadCollectionSearch(dataIn: IPlaylistReadCollectionSearchDto) {
  return axiosAuthIntercepted.get(`${HTTP_BACKEND_URL}/Playlist/List`, {
    params: dataIn,
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

export async function PlaylistRead(id: string) {
  return axiosAuthIntercepted.get(`${HTTP_BACKEND_URL}/Playlist/${id}`, {
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

export async function PlaylistReadCollectionTrack(id: string, dataIn: IPlaylistReadCollectionSearchTrackDto) {
  return axiosAuthIntercepted.get(`${HTTP_BACKEND_URL}/Track/${id}/Tracks`, {
    params: dataIn,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      const dataOut: ITrackReadCollectionResultDto = res.data

      return dataOut
    })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}

export async function PlaylistUpdate(id: string, dataIn: IPlaylistUpdateDto) {
  const formData = new FormData();

  Object.keys(dataIn).forEach((k, i, arr) => {
    formData.append(k, arr[i])
  })

  return axiosAuthIntercepted.put(`${HTTP_BACKEND_URL}/Playlist/${id}`, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
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