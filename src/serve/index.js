import ajax from './ajax'

// 1. 定义基础路径 http://cangdu.org
const BASE_URL = 'http://api.7-orange.cn:7300/mock/5def6a2d448e330a1116366e/api/'

/** ***Home 模块*******/
export const getHomeData = () => ajax(BASE_URL + 'homeApi')

// 分类
export const getCategoryData = () => ajax(BASE_URL + 'homeApi/categories')
export const getCategoryDetailData = (params) => ajax(BASE_URL + 'homeApi/categoriesdetail' + params)
