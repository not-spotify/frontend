import {axiosAuthIntercepted, formatAxiosError, HTTP_BACKEND_URL} from "@/lib/backendRequests";
import {ITrackCreateDto, ITrackReadResultDto, ITrackUpdateDto} from "@/lib/dto/trackDtos";

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
  const formData = new FormData();

  Object.keys(dataIn).forEach((k, i, arr) => {
    formData.append(k, arr[i])
  })

  return axiosAuthIntercepted.put(`${HTTP_BACKEND_URL}/Track/${id}`, dataIn, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
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

export async function TrackCreate(dataIn: ITrackCreateDto) {
  return axiosAuthIntercepted.post(`${HTTP_BACKEND_URL}/Track`, dataIn, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
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
