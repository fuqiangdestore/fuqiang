<template>
  <div class="scrollTop" v-show="showTop" @click="toTop">
  <svg-icon iconClass="backtotop" class="backtotop"></svg-icon>
  </div>
</template>

<script>
import svgIcon from '../svgIcon/index'
export default {
  components: {svgIcon},
  name: 'scroll-top',
  data () {
    return {
      scrollTop: 0,
      time: 0,
      dPramas: 20,
      scrollState: 0
    }
  }
}
</script>

<style>

</style>
