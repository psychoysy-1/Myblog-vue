import request from '@/utils/request'

// 获取统计值
export const getStatisticsService = () => request.get('/statistics/monthlyArticleCount')
