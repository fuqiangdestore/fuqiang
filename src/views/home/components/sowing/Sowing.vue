<template>
  <swiper id="swiper"
          :options="swiperOption"
          ref="mySwiper">
      <swiper-slide v-for="(sowing, index) in sowing_list"
                    :key="sowing.public_id">
      <img :src="sowing.icon_url" :alt="sowing.public_url">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination">
      </div>
  </swiper>
</template>

<script>
// 引入swiper.css
import 'swiper/dist/css/swiper.css'

import {swiper, swiperSlide} from 'vue-awesome-swiper'

export default {
  props: {
    sowing_list: ''
  },
  data () {
    return {
      swiperOption: {
        // 进来就加载
        notNextTick: true,
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        // 自动播放
        autoplay: {
          delay: 3000,
          // 最后一个是否停止
          stopOnLastSlide: false,
          // 用户操作swiper 之后 是否禁止autoplay
          disableOnInteraction: false
        },
        observer: true,
        observerParents: true,
        // 速度
        speed: 600,
        on: {
          slideChangeTransitionEnd () {
          }

        }
      }

    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style scoped>
#swiper {
  padding-top: 6rem;
  width: 95%;
  height: 10rem;
  border-radius: 1rem;
}
#swiper img {
  width: 100%;
  height: 100%;
}
/*
穿透修改样式
*/
#swiper >>> .swiper-pagination-bullet-active {
  background-color: #75a342;
}

#swiper >>> .swiper-pagination-bullet {
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 0;
}
</style>
