import request from '@/utils/request'

// 发布博客
export const blogPublishService = (data) => request.post('/articles', data)
