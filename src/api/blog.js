import request from '@/utils/request'

// 发布博客
export const blogPublishService = (data) => request.post('/articles', data)

// 获取博客列表
export const blogGetListService = (data) => request.post('/articles/uid', data)

// 获取筛选条件
export const blogGetFilterService = (query) => request.get(`/articles/tagsAndYears/${query}`)

// 增加浏览量
export const blogAddViewService = (id) => request.patch(`/articles/views/${id}`)

// 删除博客
export const blogDeleteService = (id) => request.delete(`/articles/${id}`)

// 获取所有博客
export const blogGetAllService = () => request.get('/articles/allArticles')

// 设置是否私密
export const blogSetPrivateService = (id, data) => request.put(`/articles/${id}/private`, data)

//根据文章id获取发表该文章的用户信息
export const blogGetUserByArticleIdService = (id) => request.get(`/articles/${id}/userInfo`)

// 根据文章id获取文章详情
export const blogGetDetailService = (id) => request.get(`/articles/${id}`)
