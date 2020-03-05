<template>
  <div id="category">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
// import func from '../../../vue-temp/vue-editor-bridge'
export default {
  data () {
    return {
      arr: [1, 2, 3, 4, 5]
    }
  },
  mounted () {
    this.initData()
  },
  methods: {

  }
}

</script>

<style lang="less" scoped>
#category{
  // display: flex;

}
.div1{
  width: 5rem;
  height: 6rem;
  border: 2px solid black;
  display: inline;
}
.div2{
  width: 5rem;
  height: 5rem;
  border: 2px solid black;
  display: inline-block;
}.div3{
  width: 5rem;
  height: 5rem;
  border: 2px solid black;
  display: inline-block;

}.div4{
  width: 5rem;
  height: 5rem;
  border: 2px solid black;
  display: inline-block;

}.div5{
  width: 5rem;
  height: 5rem;
  border: 2px solid black;
}

</style>
