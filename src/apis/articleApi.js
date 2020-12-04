import * as http from '@/utils/request'

//标签列表
export const tagArticle = params => http.get('/admin/article/tag', params)

//添加标签
export const addTagArticle = params => http.post('/admin/article/tag', params)

//修改标签
export const editTagArticle = params =>
  http.put('/admin/article/tag/' + params.id, params)

//删除标签 deleteDate
export const removeTagArticle = params =>
  http.deleteDate('/admin/article/tag/' + params.id, params)

//文章分类管理

export const getArticleType = params =>
  http.get('/admin/articlecategory', params)

// 添加类别
export const addArticleType = params =>
  http.post('/admin/articlecategory', params)

// 编辑分类
export const editArticleType = params =>
  http.put('/admin/articlecategory/' + params.id, params)

//删除分类
export const deleteArticleType = params =>
  http.deleteDate('/admin/articlecategory/' + params.id, params)

//文章列表
export const getArticleList = params => http.get('/admin/article', params)

//添加文章
export const addArticleManage = params =>
  http.post('/admin/article/manage', params)

//主编添加文章
export const addArticle = params => http.post('/admin/article', params)

//编辑文章
export const editArticleManage = params =>
  http.put('/admin/article/' + params.id + '/manage', params)

//编辑文章 主编
export const editArticle = (id, params) =>
  http.put('/admin/article/' + id, params)

//获取文章详情
export const getArticleDetails = params =>
  http.get('/admin/article/' + params.id, params)

//获取文章类型
export const articleType = params => http.get('/admin/articlecategory', params)

//草稿箱
export const articleDraft = params => http.get('/admin/article/draft', params)

//待审核列表
export const articleNoAudit = params =>
  http.get('/admin/article/pending', params)

//设置置顶
export const articleTop = params =>
  http.put('/admin/article/' + params.id + '/top', params)

//下线
export const articleOnline = params =>
  http.put('/admin/article/' + params.id + '/online', params)

//审批发布
export const articleStatus = params =>
  http.put('/admin/article/' + params.id + '/status', params)

//非主编删除
export const removeArticle = params =>
  http.deleteDate('/admin/article/' + params.id, params)

//主编删除
export const removeArticleManage = params =>
  http.deleteDate('/admin/article/' + params.id + '/manage', params)

// 首页推荐值
export const articleSort = (id, params) =>
  http.put('/admin/article/sort/' + id, params)

//文章评论
export const getArticleComment = params =>
  http.get('/admin/article/' + params.id + '/comment', params)
//展示隐藏评论
export const showArticleComment = params =>
  http.put('/admin/article/comment/' + params.id + '/show', params)
