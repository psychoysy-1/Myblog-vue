import request from '@/utils/request'

// 获取照片墙
export const getPhotoWallService = (userId) =>
  request.get('/photoWall/getPhotoWall', { params: { userId } })
