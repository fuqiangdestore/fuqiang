<template>
<div id="flashFood">
  <div class="flashItemwrapper">
  <ul class="itemWrapper" ref="ulWrapper">
    <li class="itemInCovers" v-for="(product, index) in flash_sale_product_list"
    :key="index"
    ref="productItem"
    @click="goToGoodsDetail(product)">
      <img v-lazy="product.small_image" class="itemImage">
      <span class="title">{{product.name}}</span>
      <div class="price">
        <!-- moneyFormat -->
        <p class="nowPrice">{{product.price}}</p>
        <p class="originPrice">{{product.origin_price}}</p>
        <div class="buyCar" >
          <!-- svg -->
        </div>
      </div>
    </li>
  </ul>
  <transition>
    <div>
      <img src="" alt="">
    </div>
  </transition>
  </div>

</div>
</template>

<script>
import BScroll from 'better-scroll'
// import {Toast} from 'vant'

export default {
  props: {
    flash_sale_product_list: Array
  },
  data () {
    return {
      showMoveDot: [], // 控制下落的小圆点显示隐藏
      elLeft: 0, // 当前点击购物车按钮在网页中的绝对top值
      elTop: 0, // 当前点击购物车按钮在网页中的绝对left值
      dropImage: ''
    }
  },
  created () {
    this.dropBalls = []
  },
  mounted () {
    this.$nextTick(() => {
      let contentWrapperWidth = 0
      let el = this.$refs.productItem
      console.log(el)
      for (let i = 0; i < el.length; i++) {
        contentWrapperWidth += el[i].clientWidth
      }
      // 给ul设置值
      this.$refs.ulWrapper.style.width = contentWrapperWidth + 'px';
      if (!this.scroll) {
        // 名字一定要唯一 和父组件独立
        this.scroll = new BScroll('.flashItemwrapper', {
          probeType: 2,
          startX: 0,
          click: true,
          scrollX: true,
          scrollY: false,
          eventPassthrough: 'vertical'
        })
      } else {
        this.scroll.refresh()
      }
    })
  }
}
</script>

<style lang="less" scoped>
#flashFood {
  .flashItemwrapper {
    width: 100%;
    overflow: hidden;
    position: relative;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
  }
  .itemWrapper {
    display: flex;
    justify-content: flex-start;
  }

  .itemInCovers {
    // 设置子li的宽度
  flex: 0 0 6rem;
  align-items: center;
  padding-right: 0.5rem;
  .itemImage {
    width: 100%;
    border-radius: 50%;
    // 等比缩小图片来适应元素的尺寸
    background-size: contain;
    background-image:  url("../../../../images/placeholderImg/product-img-load.png")
  }
  .title {
    padding: 0.2rem;
    display: inline-block;
    font-size: 0.6258rem;
    height: 1.8rem;
    line-height: 1rem;
    font-size: 0.625rem;
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    position: relative;
    padding-left: 0.5rem;
    .nowPrice {
      color: #f37078;
      font-size: 0.928rem;
    }
    .originPrice {
      font-size: 0.6875rem;
      color: #999;
      text-decoration: line-through;
    }
    .buyCar {
      position: absolute;
      right: 0.6rem;
      top: 0.1rem;
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  }
}

</style>
