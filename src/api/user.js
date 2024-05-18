import request from '@/utils/request'

// 注册接口
export const userRegisterService = (data) => request.post('/users/register', data)

// 登录接口
export const userLoginService = (params) => request.get('/users/login', { params })

// 更改用户信息接口
export const userUpdateService = (data) => request.put('/userInfo', data)

// 获取用户信息接口
export const getUserInfoService = (query) => request.get('/userInfo' + `/?userId=${query}`)

// 获取验证码
export const getCaptchaService = () => request.get('/userInfo/captcha')

// 修改密码
export const updatePasswordService = (data) => request.put('/userInfo/password', data)

// 上传博客背景图
export const uploadBgService = (data) => request.post('/userBlogBackground', data)

// 关注用户
export const followUserService = (data) => request.post('/userInfo/follow', data)

// 获取是否关注
export const getFollowStatusService = (followerId, followeeId) => {
  return request.get('/userInfo/follow', {
    params: {
      followerId,
      followeeId
    }
  })
}

// 取消关注
export const cancelFollowService = (followerId, followeeId) => {
  return request.delete('/userInfo/follow', {
    data: {
      followerId,
      followeeId
    }
  })
}
