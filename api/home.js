import fly from '../utils/request'
/**
 * 获取轮播图
 */
export const getBanners = () => fly.get('/home/swiperdata')

/**
 * 获取分类数据
 * */
export const getNavList = () => fly.get('/home/catitems')

/**
 * 获取楼层数据
 * */
export const getFloorList = () => fly.get('/home/floordata')
