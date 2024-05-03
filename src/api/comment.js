import request from '@/utils/request'

// 发布评论
export const commentCreateService = (data) => {
  return request.post('/comments/create', data, {
    params: {
      uid: data.uid
    }
  })
}

// 根据文章id获取评论列表
export const commentListService = (aid) => request.get('/comments', { params: { aid } })

// 删除评论
export const commentDeleteService = (cid) => request.delete('/comments', { params: { cid } })
