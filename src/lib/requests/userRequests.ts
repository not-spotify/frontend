import {axiosDefaultIntercepted, formatAxiosError, HTTP_BACKEND_URL} from "@/lib/backendRequests";
import {
  IUserLoginDto,
  IUserLoginResultDto,
  IUserMeResultDto,
  IUserRegisterDto,
  IUserRegisterResultDto
} from "@/lib/dto/userDtos";

export async function UserMe() {
  return axiosDefaultIntercepted.get(`${HTTP_BACKEND_URL}/User/Me`, {
    headers: {
      'Content-Type': "application/json"
    }
  })
    .then((res) => {
      const dataOut: IUserMeResultDto = res.data

      return dataOut
    })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}

export async function UserRegister(dataIn: IUserRegisterDto) {
  return axiosDefaultIntercepted.post(`${HTTP_BACKEND_URL}/User/Register`, dataIn, {
    headers: {
      'Content-Type': "application/json"
    }
  })
    .then((res) => {
      const dataOut: IUserRegisterResultDto = res.data

      return dataOut
    })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}

export async function UserLogin(dataIn: IUserLoginDto) {
  return axiosDefaultIntercepted.post(`${HTTP_BACKEND_URL}/User/Login`, dataIn, {
    headers: {
      'Content-Type': "application/json"
    }
  })
    .then((res) => {
      const dataOut: IUserLoginResultDto = res.data

      return dataOut
    })
    .catch((error) => {
      throw new Error(formatAxiosError(error));
    })
}