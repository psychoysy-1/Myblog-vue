import request from '@/utils/request'

// 注册接口
export const userRegisterService = (data) => request.post('/users/register', data)
