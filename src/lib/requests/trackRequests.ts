// noinspection JSAnnotator

import {axiosAuthIntercepted, axiosDefaultIntercepted, formatAxiosError, HTTP_BACKEND_URL} from "@/lib/backendRequests";
import {id} from "postcss-selector-parser";
import {IUserMeResultDto} from "@/lib/dto/userDtos";
import {ITrackReadResultDto, ITrackUpdateDto} from "@/lib/dto/trackDtos";

export async function ReadTrack(id: string) {
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

export async function UpdateTrack(id: string, dataIn: ITrackUpdateDto) {
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
