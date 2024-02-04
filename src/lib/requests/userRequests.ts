import {axiosAuthIntercepted, axiosDefaultIntercepted, HTTP_BACKEND_URL} from "@/lib/backendRequests"
import {
  IUserLoginDto,
  IUserLoginResultDto,
  IUserMeResultDto,
  IUserRefreshDto,
  IUserRefreshResultDto,
  IUserRegisterDto,
  IUserRegisterResultDto
} from "@/lib/dto/userDtos"

export async function UserMe() {
  return (await axiosAuthIntercepted.get(`${HTTP_BACKEND_URL}/User/GetMe`, {
    headers: {
      "Content-Type": "application/json"
    }
  })).data as IUserMeResultDto
}

export async function UserRegister(dataIn: IUserRegisterDto) {
  return (await axiosDefaultIntercepted.post(`${HTTP_BACKEND_URL}/User/Register`, dataIn, {
    headers: {
      'Content-Type': "application/json"
    }
  })).data as IUserRegisterResultDto
}

export async function UserLogin(dataIn: IUserLoginDto) {
  return (await axiosDefaultIntercepted.post(`${HTTP_BACKEND_URL}/User/Login`, dataIn, {
    headers: {
      'Content-Type': "application/json"
    }
  })).data as IUserLoginResultDto
}

export async function UserRefresh(dataIn: IUserRefreshDto) {
  return (await axiosDefaultIntercepted.post(`${HTTP_BACKEND_URL}/User/Refresh`, dataIn, {
    headers: {
      'Content-Type': "application/json"
    }
  })).data as IUserRefreshResultDto
}