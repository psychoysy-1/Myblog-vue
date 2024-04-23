import request from '@/utils/request'

// 注册接口
export const userRegisterService = (data) => request.post('/users/register', data)

// 登录接口
export const userLoginService = (params) => request.get('/users/login', { params })

// 更改用户信息接口
export const userUpdateService = (data) => request.put('/userInfo', data)

// 获取用户信息接口
export const getUserInfoService = (query) => {
  return request.get('/userInfo' + `/?userId=${query}`)
}
