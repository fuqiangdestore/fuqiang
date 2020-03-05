import Vue from 'vue'
import Router from 'vue-router'

// 引入一级组件
import Dashboard from '../views/dashboard/Dashboard.vue'
// import state from '../store/state'

// 懒加载二级组件 tarber
const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const Eat = () => import('../views/eat/Eat.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Mine = () => import('../views/mine/Mine.vue')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/dashboard',
    // 是否数据缓存
    meta: {
      keepAlive: true
    }
  },
  {
    // 根页面
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [{
      path: '/dashboard',
      redirect: '/dashboard/home',
      meta: {
        keepAlive: true
      }
    },
    {
      // 主页
      path: 'home',
      name: 'home',
      component: Home,
      // 缓存与否
      meta: {
        keepAlive: true
      }
    },
    {
      // 分类
      path: 'category',
      name: 'category',
      component: Category,
      meta: {
        keepAlive: true
      }
    },
    {
      // 吃什么
      path: 'eat',
      name: 'eat',
      component: Eat,
      meta: {
        keepAlive: true
      }
    },
    {
      // 购物车
      path: 'cart',
      name: 'cart',
      component: Cart,
      meta: {
        keepAlive: true
      }
    },
    {
      // 我的
      path: 'mine',
      name: 'mine',
      component: Mine,
      meta: {
        keepAlive: true
      }
    }]
  }
  ]
})
