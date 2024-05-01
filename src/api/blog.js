import request from '@/utils/request'

// 发布博客
export const blogPublishService = (data) => request.post('/articles', data)

// 获取博客列表
export const blogGetListService = (data) => request.post('/articles/uid', data)

// 获取筛选条件
export const blogGetFilterService = (query) => request.get(`/articles/tagsAndYears/${query}`)
