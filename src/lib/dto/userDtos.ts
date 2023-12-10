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
  userId: string
  jwtBearer: string
  refreshToken: string
  refreshTokenValidDue: Date
  jwtBearerValidDue: Date
}

export interface IUserRefreshDto {
  jti: string
  refreshToken: string
  userId: string
}

export interface IUserRefreshResultDto {
  userId: string
  jwtBearer: string
  refreshToken: string
  refreshTokenValidDue: Date
  jwtBearerValidDue: Date
}