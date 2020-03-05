import Vue from 'vue'
// 1.Tabbar
import {
  Tabbar,
  TabbarItem
} from 'vant'

// grid
import {
  Grid,
  GridItem
} from 'vant'

// 倒计时
import {CountDown} from 'vant'
// 5.图片懒加载
import {
  Lazyload
} from 'vant'

// 6 tab标签页
import { Tab, Tabs } from 'vant'

Vue.use(Tab)
Vue.use(Tabs)

Vue.use(Lazyload)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Grid).use(GridItem)
Vue.use(CountDown)
