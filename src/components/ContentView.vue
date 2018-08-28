<!-- 左侧导航 -->
<template>
  <transition name="slide-left">
    <div class="content" v-if="ifShowContent && bookAvailable">
      <div class="item" v-for="(item, index) in navigation.toc" :key="index" @click="jumpTo(item.href)">{{item.label}}</div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: "ContentView",
  data() {
    return {};
  },
  props: {
    ifShowContent: Boolean,
    bookAvailable: Boolean,
    navigation: Object
  },

  components: {},

  computed: {},

  mounted(ev) {
    console.log(this.navigation)
  },

  methods: {
    jumpTo(href) {
      this.$emit('jumpTo', href);
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/style/global";

.content {
  position: absolute;
  left: 0;
  top: 0;
  width: px2rem(260);
  height: 100%;
  background: #fff;
  z-index: 11;

  .item{
    line-height: px2rem(40);
    padding-left: px2rem(20);
  }
}
.slide-left-enter-active,
.slide-left-leave-active{
  transition: all .3s;
}
.slide-left-enter,
.slide-left-leave-to{
  transform: translate3d(-100%, 0, 0);
}
.slide-left-enter-to,
.slide-left-leave{
  transform: translate3d(0, 0, 0);
}
</style>