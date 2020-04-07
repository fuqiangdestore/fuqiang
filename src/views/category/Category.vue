<template>
  <div id="category">
    <Header></Header>
    <!-- 内容 -->
    <div class="listWrapper" v-if="!isShowLoading"></div>
    <!-- 左边 -->
    <div class="leftWrapper">
      <ul class="wrapper">
        <li class="categoryItem"
            v-for="(cate, index) in categoriesData"
            :class="{selected: currentIndex === index}"
            @click="clickLeftLi(index)"
            :key="cate.id" ref="menuList">
            <span class="textWrapper">{{cate.name}}</span>
        </li>
      </ul>
    </div>
    <!-- 右边 -->
    <ContentView :categoriesDetailData="categoriesDetailData" />
  </div>
  <!-- <skeleton  /> -->
  <!-- <LoadingGif v-show="isShowLoadingGif" /> -->
</template>

<script>
import Header from './components/SearchHead'
import ContentView from './components/ContentView'
import BScroll from 'better-scroll'
import {getCategoryData, getCategoryDetailData} from './../../serve/index'
export default {
  data () {
    return {
      // 是否显示加载图标
      isShowLoading: true,
      // 左边列表数据
      categoriesData: [],
      // 右边列表数据
      categoriesDetailData: [],
      // 左边item 选中与否
      currentIndex: 0,
      isShowLoadingGif: false
    }
  },
  mounted () {
    this._initData()
  },
  components: {
    Header,
    ContentView
  },
  methods: {
    async _initData () {
      // 获取左边的数据
      let leftRes = await getCategoryData()
      if (leftRes.success) {
        this.categoriesData = leftRes.data.cate
      }
      // 隐藏loading
      this.isShowLoading = false
      // 初始化滚动视图
      this.$nextTick(() => {
        if (!this.lefyScroll) {
          this.leftScroll = new BScroll('.leftWrapper', {
            probeType: 3,
            click: true,
            scrollY: true,
            tap: true,
            mouseWhell: true
          })
        } else {
          this.leftScroll.refresh()
        }
      })
    },
    // 处理左边的点击
    async clickLeftLi (index) {
      this.isShowLoadingGif = true
      // 改变索引
      this.currentIndex = index
      // 滚动到对应的位置
      setTimeout(() => {
        let menuLists = this.$refs.menuList
        let el = menuLists[index]
        // 滚动到对应的元素上
        this.leftScroll.scrollToElement(el, 300)
      }, 900)
      // 获取右边的数据
      let param
      if (index >= 9) {
        param = `/lk0${index + 1}`
      } else {
        param = `/lk00${index + 1}`
      }
      let rightRes = await getCategoryDetailData(param)
      if (rightRes.success) {
        this.categoriesDetailData = rightRes.data.cate
      }
      this.isShowLoadingGif = false
    }
  }
}
</script>

<style lang="less" scoped>
#category{
 width: 100%;
 height: 100%;
 background-color: #f5f5f5;
 overflow: hidden;
 border: 1px solid red;
}
.text{
  width: 20rem;
  height: 30rem;
  border: 1px solid red;
}
.listWrapper {
  display: flex;
  position: absolute;
  top: 2.75rem;
  bottom: 3rem;
  width: 100%;
  overflow: hidden;
  border: 1px solid red;
}
.leftWrapper{
  background-color: #f4f4f4;
  width: 5.3125rem;
  flex: 0 0 5.3125rem;
  border: 1px solid red;
}
.categoryItem{
  padding: 0.75rem 0;
  border-bottom: solid 0.01rem #e8e9e8;
  position: relative;
  border: 1px solid red;
}
.categoryItem .textWrapper{
  line-height: 1.25rem;
  border-left: solid 0.1875rem transparent;
  padding: 0.3125rem 0.6875rem;
  font-size: 0.8125rem;
  color: #666666;
}
.categoryItem .selected{
  background-color: #fff;
}
.categoryItem .selected .textWrapper{
  border-left-color: #3cb963;
  font-weight: bold;
  font-size: 0.875rem;
  color: #333;
}
@media (min-width: 960px) {
  .wrapper {
    border-right: 0.01rem solid #e8e9e8;
  }
  .wrapper .categoryItem {
    background: #fff;
  }
}

</style>
