<template>
  <div id="dashboard">
      <van-tabbar v-model="active" :safe-area-inset-bottom=true
      class="active_tab"
      active-color="#75a342">
      <!-- 给购物车的tabber加一个id 方便加入购物车的小球动画 -->
          <van-tabbar-item v-for="(item,index) in tabbars"
          :key="index"
          :id="index==3?'buycar':''"
          @click="tab(index,item.name)"
          :fixed=true
          >
              <span></span>
              <template slot="icon"
              slot-scope="props">
                  <img :src="props.active?item.active:item.normal" alt="">
              </template>
          </van-tabbar-item>
      </van-tabbar>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'DashBoard',
  mounted () {
  },
  created () {
    // this.tabbarSelected(this.$route.name)
  },
  watch: {
    $route: {
      handler (val, oldval) {
        // this.tabbarSelected(val.name)
      }
    }
  },
  data () {
    return {
      active: 0,
      tabbars: [
        {
          name: 'home',
          titel: 'home.home',
          normal: require('@/images/tabbar/home_default.png'),
          active: require('@/images/tabbar/home_selected.png')
        },
        {
          name: 'category',
          title: 'home.category',
          normal: require('@/images/tabbar/category_default.png'),
          active: require('@/images/tabbar/category_selected.png')
        },
        {
          name: 'eat',
          title: 'home.eat',
          normal: require('@/images/tabbar/eat_default.png'),
          active: require('@/images/tabbar/eat_selected.png')
        },
        {
          name: 'cart',
          title: 'home.cart',
          normal: require('@/images/tabbar/shoppingcart_default.png'),
          active: require('@/images/tabbar/shoppingcart_selected.png'),
          num: 5
        },
        {
          name: 'mine',
          title: 'home.mine',
          normal: require('@/images/tabbar/mine_default.png'),
          active: require('@/images/tabbar/mine_selected.png')
        }
      ]
    }
  },
  methods: {
    tab (index, val) {
      // console.log(a, index)
      this.$router.push({name: val})
    }
    // tabbarSelected (item) {
    //   const mapType = {
    //     home: 0,
    //     category: 1,
    //     eat: 2,
    //     cart: 3,
    //     mine: 4
    //   }
    //   this.active = mapType[item]
    // }
  }
}
</script>

<style lang="less" scoped>
/*转场动画*/
.router-slider-enter-active,
.router-slider-leave-active {
  transition: all 0.3s;
}
.router-slider-enter,
.router-slider-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-moz-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
.moveToCart {
  animation: mymove 0.5s ease-in-out;
}
</style>
