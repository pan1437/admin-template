import * as http from '@/utils/request'

//问诊单列表
export const getDiagnoses = params => http.get('/diagnoses', params)

//订单详情
export const getOrderDiagnoses = params =>
  http.get('/diagnoses/' + params.id + '/order')

export const getPrescriptions = params =>
  http.get('/prescriptions/' + params.id + '/order')
//中药订单 /prescriptions
export const prescriptions = params => http.get('/prescriptions', params)
//问诊详情
export const getDiagnosesIm = params =>
  http.get('/diagnoses/' + params + '/im', params)
