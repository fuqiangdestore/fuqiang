<template>
  <div class="wrapper">
    <div class="subTitleWrapper">
      <ul ref="ulContent">
        <li class="title"
            :class="{slelcted:currentSubTitle === index}"
            v-for="(detailItem, index) in categoriesDetailData"
            :key="detailItem.id"
            ref="subTitle"
            @click="subTitleClick(index)">
          {{detailItem.name}}
        </li>
      </ul>
    </div>
    <!-- 下拉菜单 -->
    <div class="shouMenu"
         @click="menuClick"
         v-show="isShowDropMenu">
      <span class="downMenu" v-if="menuDown">
      </span>
      <span class="unMenu" v-else></span>
    </div>
    <!-- 下拉菜单内容 -->
    <DropMenu :menuDown="!menuDown"
              :categoriesDetailData="categoriesDetailData"
              :currentSubTitle="currentSubTitle"
              @itemClick="itemClick"
              @touchClick="menuClick">
    </DropMenu>
    <!-- 商品内容列表 -->
    <section class="r_list" ref="r-list">
      <div ref="b">
        <div v-for="(it,index) in categoriesDetalData" :key="index" ref="good">
          <p class="productCategoryTitle">{{it.name}}</p>
          <ul class="">
            <li v-for="(item, index) in it.products" :key="index"
                class="list" @click.stop="goToGoodsDetail(item)">
              <div>
                <p>
                  <img v-lazy="item.small_image" alt="">
                </p>
                <div>
                  <p class="name">{{item.product_name}}</p>
                  <p class="des">{{item.spec}}</p>
                  <p class="price">{{item.price | moneyFormat}}</p>
                  <p class="originPrice">{{item.origin_price | moneyFormat}}</p>
                  <div class="iconCartWrapper" @click.stop="addToCar(item)">
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="bottomTip">{{$t('categroy.bottomTop')}}</div>
      </div>
    </section>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {Toast} from 'vant'
import DropMenu from './DropMenu'
import {mapMutations, mapState} from 'vuex'

export default {
  data () {
    return {
      scroll: 0,
      currentSubTitle: 0,
      arrLi: true,
      flag: true,
      value: 0,
      menuDown: true,
      isShowDropMenu: false
    }
  },
  props: {
    categoriesDetailData: Array
  },
  components: {
    DropMenu
  },
  mounted () {
    // 初始化更新滑动组件
    this.$nextTick(() => {
      this._initTitleScroll()
      this._initProductScroll()
      this._isShowDropMenu()
    })
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    categoriesDetailData () {
      this.currentSubTitle = 0
      this.menuDown = true
      // 初始化滑动更新
      this.$nextTick(() => {
        this._initTitleScroll()
        this._initProductScroll()
        // 是否显示下拉菜单按钮
        this._isShowDropMenu()
      })
    }
  },
  methods: {
    // vuex延展的方法
    ...mapMutations(['ADD_GOODS', 'ADD_TO_CART']),
    // titleScroll 滚动的初始化
    _initTitleScroll () {
      let contentWrapperWidth = 120
      let el = this.$refs.subTitle
      for (let i = 0; i < el.length; i++) {
        contentWrapperWidth += el[i].clientWidth
      }
      // 给ul设置宽高 保证可以横向滚动
      this.$refs.ulContent.sytle.width = contentWrapperWidth + 'px'
      if (!this.titleScroll) {
        this.titleScroll = new BScroll('.subTitleWrapper', {
          probeType: 3,
          startX: 0,
          click: true,
          scrollX: true
        })
      } else {
        this.titleScroll.refresh()
      }
    },
    // 产品列表滚动初始化
    _initProductScroll () {
      if (!this.productScroll) {
        this.productScroll = new BScroll(this.$refs.r_list, {
          click: true,
          probeType: 3
        })
      } else {
        this.productScroll.refresh()
        // 进入默认的列表 滚到顶部
        this.productScroll.scrollToElement(this.$refs.good[0], 10, 0, 0)
      }
    },
    // 处理点击subTitle 的事件
    subTitleClick (index) {
      this.flag = true
      // 判断如果蒙版存在 那么久让他消失
      this.menuDown = true
      // 让横向滑动到合适的位置
      this.currentSubTitle = index
      let el = this.$refs.subTitle[index]
      this.titleScroll.scrollToElement(el, 500)
      // 让产品列表根据点击的inex值滚动
      this.arrLi = index
      this.productScroll.scrollToElement(this.$refs.good[index], 100, 0, 0)
      setTimeout(() => {
        this.flag = false
      }, 100)
    },
    // 添加购物车
    ...mapMutations([
      // addToCart: 'ADD_TO_CART'
    ]),
    // 点击下来菜单
    menuClick () {
      this.menuDown = !this.menuDown
    },
    // 点击处理蒙版里的标题
    itemClick (index) {
      this.currentSubTitle = index
      this.subTitleClick(index)
      // 让蒙版消失
      this.menuDown = false
    },
    // 是否显示标题下拉按钮
    _isShowDropMenu () {
      // 如果标题超出 则超过下拉按钮
      let subTitleWrapperWidth = this.$refs.subTitleWrapper.clientWidth
      let ulContentWidth = this.$refs.ulContent.clientWidth
      this.isShowDropMenu = ulContentWidth > subTitleWrapperWidth ? true : false
    },
    // 商品详情页面
    goToGoodsDetail (goods) {
      this.$router.push({
        name: 'goodsDetail',
        // 商品详情页面传递数据
        query: {
          id: goods.id,
          name: goods.name,
          small_image: goods.small_image,
          price: goods.price,
          spec: goods.spec,
          total_sales: goods.total_sales,
          origin_price: goods.origin_price
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  .subTitleWrapper {
    width: 100%;
    height: 2.8rem;
    display: inline-block;
    // 规定段落中的文本不进行换行
    white-space: nowrap;
    border-bottom: solid 0.01rem #e8e9e8;
    overflow: hidden;
    position: fixed;
    z-index: 999;
    top: 2.8rem;
    background-color: white;
    .title {
      display: inline-block;
      font-size: 0.73rem;
      padding: 1rem;
    }
    .selected {
      color: #3cb963;
    }
    .showMenu {
      position: fixed;
      width: 10%;
      height: 2.5rem;
      line-height: 2.5rem;
      right: -0.2rem;
      z-index: 1999;
      margin-top: 0.1rem;
      background-color: white;
      .menuIcon {
        width: 100%;
        height: 2.8rem;
      }
    }
  }
  .r_list {
    position: absolute;
    left: 5.2rem;
    right: 0;
    top: 2.9rem;
    overflow: hidden;
    // 防抖
    -webkit-transform: translateZ(0);
    transform: translateY(0);
    .productCategoryTitle {
      display: inline-block;
      font-size: 0.73rem;
      padding: 1rem;
      border-left: 3px solid #d9dde1;
      height: 0.32rem;
      width: 100%;
      font-size: 0.73rem;
      color: rgb(147, 153, 159) ;
      background-color: #f3f5f7;
      padding-left: 0.28rem;
    }
  }
}

</style>
