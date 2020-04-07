<template>
  <div id="home">
    <div v-if="!isShowLoading">
       <!-- 头部地理位置和搜索框 -->
    <div class="head">
      <Header></Header>
      <!-- 轮播图 -->
      <Sowing :sowing_list="sowing_list"></Sowing>
      <!-- tip -->
      <Tip :home_ad="home_ad"/>
    </div>
    <!-- nav导航 -->
    <Nav :nav_list = "nav_list"></Nav>
    <!-- 跳转到会员页面 -->
    <VipTip></VipTip>
    <!-- 限时抢购 -->
    <flash-buy :flash_sale_product_list="flash_sale_product_list"></flash-buy>
    <!-- 特色商品 -->
    <SpecialZone :specialZone="specialZone" />
    <!-- 底部切换商品区 -->
    <TabbarGoodsItem :tabbar_all_product_list="tabbar_all_product_list"
                     :flash_sale_product_list="flash_sale_product_list"/>
    </div>
  </div>
</template>

<script>
import {getHomeData} from './../../serve/index'
import Header from './components/header/Header'
import Sowing from './components/sowing/Sowing'
import Tip from './components/tip/Tip'
import Nav from './components/nav/Nav'
import VipTip from './components/myVip/VipTip'
import FlashBuy from './components/flash/FlashBuy'
import SpecialZone from './components/special/SpecialZone'
import TabbarGoodsItem from './components/tabbar/TabbarGoodsItem'

export default {
  data () {
    return {
      isShowLoading: false, // 是否加载动画
      sowing_list: [], // 首页轮播数据
      home_ad: '', // 首页广告
      nav_list: [], // 首页导航
      flash_sale_product_list: [], // 限时抢购
      specialZone: {}, // 特色专区数据
      tabbar_all_product_list: [] // tabbar菜单数据
    }
  },
  created () {
    this._initData()
  },
  components: {
    Header,
    Sowing,
    Tip,
    Nav,
    VipTip,
    FlashBuy,
    SpecialZone,
    TabbarGoodsItem
  },
  methods: {
    // 数据初始化
    async _initData () {
      const response = await getHomeData()
      if (response.success) {
        const data = response.data
        // 轮播图赋值
        this.sowing_list = data.list[0].icon_list
        // 获取首页广告图
        this.home_ad = data.home_ad.image_url
        // navlist赋值
        this.nav_list = data.list[2].icon_list
        // 限时抢购专区
        this.flash_sale_product_list = data.list[3].product_list
        // 特色专区赋值
        this.specialZone = data.special_zone
        // tab标签页赋值
        this.tabbar_all_product_list = data.list[12].product_list
      }
    }
  }
}
</script>

<style lang="less" scoped>
#home{
  background-color: "#f5f5f5";
  padding-bottom: 3rem;
  .head{
    margin-top: -3rem;
    width: 100%;
    background-image: url("http://518taole.7-orange.cn/backImage.png");
  }
}

</style>
