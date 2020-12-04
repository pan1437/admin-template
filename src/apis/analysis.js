import * as http from '@/utils/request'

// 意见反馈列表
export const getFeedbacksList = params => http.get('/feedbacks', params)
// 意见详情
export const editFeedbacks = params => http.get('/feedbacks/' + params)

//已读
export const readFeedbacks = params =>
  http.post('/feedbacks/' + params + '/read', params)
//暂不处理

export const ignoreFeedbacks = params =>
  http.post('/feedbacks/' + params + '/ignore', params)
//删除
export const removeFeedbacks = params => http.deleteDate('/feedbacks/' + params)
