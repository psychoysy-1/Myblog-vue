import request from '@/utils/request'

// 获取照片墙
export const getPhotoWallService = () => request.get('/photoWall/getPhotoWall')
