import {axiosAuthIntercepted, HTTP_BACKEND_URL} from "@/lib/backendRequests"
import {ITrackCreateDto, ITrackReadResultDto, ITrackUpdateDto} from "@/lib/dto/trackDtos"

export async function TrackRead(id: string) {
  return (await axiosAuthIntercepted.get(`${HTTP_BACKEND_URL}/Track/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })).data as ITrackReadResultDto
}

export async function TrackUpdate(id: string, dataIn: ITrackUpdateDto) {
  const formData = new FormData()

  Object.keys(dataIn).forEach((k, i, arr) => {
    formData.append(k, arr[i])
  })

  return (await axiosAuthIntercepted.put(`${HTTP_BACKEND_URL}/Track/${id}`, dataIn, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })).data as ITrackReadResultDto
}

export async function TrackDelete(id: string) {
  return (await axiosAuthIntercepted.delete(`${HTTP_BACKEND_URL}/Track/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })).data
}

export async function TrackCreate(dataIn: ITrackCreateDto) {
  return (await axiosAuthIntercepted.post(`${HTTP_BACKEND_URL}/Track`, dataIn, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })).data as ITrackReadResultDto
}
