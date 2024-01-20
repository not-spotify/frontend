import {axiosAuthIntercepted, formatAxiosError, HTTP_BACKEND_URL} from "@/lib/backendRequests";
import {ITrackCreateDto, ITrackCreateQuery, ITrackReadResultDto, ITrackUpdateDto} from "@/lib/dto/trackDtos";

export async function TrackRead(id: string) {
  return axiosAuthIntercepted.get(`${HTTP_BACKEND_URL}/Track/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      const dataOut: ITrackReadResultDto = res.data

      return dataOut
    })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}

export async function TrackUpdate(id: string, dataIn: ITrackUpdateDto) {
  return axiosAuthIntercepted.put(`${HTTP_BACKEND_URL}/Track/${id}`, dataIn, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      const dataOut: ITrackReadResultDto = res.data

      return dataOut
    })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}

export async function TrackDelete(id: string) {
  return axiosAuthIntercepted.delete(`${HTTP_BACKEND_URL}/Track/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}

export async function TrackCreate(dataIn: ITrackCreateDto, dataQueryIn: ITrackCreateQuery) {
  return axiosAuthIntercepted.post(`${HTTP_BACKEND_URL}/Track`, dataIn, {
    params: dataQueryIn,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      const dataOut: ITrackReadResultDto = res.data

      return dataOut
    })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}

export async function TrackUpdateCover(id: string, file: File) {
  const formData = new FormData()

  formData.append("cover", file)

  return axiosAuthIntercepted.put(`${HTTP_BACKEND_URL}/Track/${id}/Cover`, formData, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}
