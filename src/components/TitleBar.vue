<!-- 头部 -->
<template>
  <div>
    <transition name="slide-down">
      <div class="title-bar" v-if="ifShow">
        <div class="back">
          <i class="icon-back"></i>
        </div>
        <div class="right">
          <div class="icon-wrapper">
            <i class="icon-cart"></i>
          </div>
          <div class="icon-wrapper">
            <i class="icon-person"></i>
          </div>
          <div class="icon-wrapper">
            <i class="icon-more"></i>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },

  props: ["ifShow"],

  components: {},

  computed: {},

  mounted(ev) {},

  methods: {}
};
</script>

<style lang='scss' scoped>
@import "../assets/style/global";

.title-bar {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  // @include center();
  z-index: 9;
  height: px2rem(46);
  box-shadow: 0 px2rem(8) px2rem(8) #c0c0c0;
  background: #fff;
  display: flex;

  .back {
    flex: 0 0 px2rem(46);
    @include center();

    .icon-back {
      font-size: px2rem(18);
    }
  }

  .right {
    flex: 1;
    @include center();
    justify-content: flex-end;

    .icon-wrapper {
      width: px2rem(46);
      height: px2rem(46);
      @include center();
      font-size: px2rem(18);
    }
  }
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s;
}
.slide-down-enter,
.slide-down-leave-to {
  transform: translate3d(0, px2rem(-100), 0);
}
.slide-down-enter-to,
.slide-down-leave {
  transform: translate3d(0, 0, 0);
}
</style>