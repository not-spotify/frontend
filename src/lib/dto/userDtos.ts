export interface IUserMeResultDto {
  id: string,
  userName: string,
  email: string
}

export interface IUserRegisterDto {
  userName: string,
  email: string,
  password: string
}

export interface IUserRegisterResultDto {
  id: string
}

export interface IUserLoginDto {
  email: string,
  password: string
}

export interface IUserLoginResultDto {
  jwtBearer: string
}