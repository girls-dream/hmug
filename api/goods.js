import fly from '../utils/request'
// 获取商品列表
export const getGoodsListApi = data => fly.get('/goods/search', data)
