<!-- 底部导航 -->
<template>
  <div>
    <transition name="slide-up">
      <div class="footer-bar" v-if="ifShow">
        <div class="icon-wrapper">
          <i class="icon-menu"></i>
        </div>
        <div class="icon-wrapper">
          <i class="icon-progress"></i>
        </div>
        <div class="icon-wrapper">
          <i class="icon-bright"></i>
        </div>
        <div class="icon-wrapper" @click="toggleFontSize">
          <i class="">Aa</i>
        </div>
      </div>
    </transition>

    <div class="setting-wrapper" :v-if="ifShowFontSize">
      <div class="setting-font-size">

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      ifShowFontSize: false
    };
  },

  props: ["ifShow"],

  components: {},

  computed: {},

  mounted(ev) {},

  methods: {
    toggleFontSize() {
      this.$emit('toggleFontSize')
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/style/global";

.footer-bar {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 9;
  height: px2rem(46);
  box-shadow: 0 px2rem(-8) px2rem(8) #c0c0c0;
  background: #fff;
  display: flex;

  .icon-wrapper {
    flex: 1 0 auto;
    @include center();
    font-size: px2rem(18);
  }
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s;
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translate3d(0, px2rem(100), 0);
}
.slide-up-enter-to,
.slide-up-leave {
  transform: translate3d(0, 0, 0);
}
</style>