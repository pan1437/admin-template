import * as http from '@/utils/request'

// 短信列表
export const smsList = data => http.get('/admin/smslog', data)