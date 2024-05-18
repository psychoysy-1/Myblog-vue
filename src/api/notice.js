import request from '@/utils/request'

// 获取关注者文章列表
export const getFollowersArticlesService = (followerId) =>
  request.get('/userInfo/followed-articles', {
    params: {
      followerId
    }
  })
