<!-- 底部导航 -->
<template>
  <div>
    <transition name="slide-up">
      <div class="footer-bar" v-if="ifShow" :class="{'border-shadow':!ifShowFontSize}">
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
    <transition name="slide-up">
      <div class="setting-wrapper" v-if="ifShowFontSize">
        <div class="setting-font-size">
          <div class="preview" :style="{fontSize: fontSizeList[0].fontSize+'px'}">A</div>
          <div class="select">
            <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index">
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point"></div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize+'px'}">A</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      ifShowFontSize: false
    };
  },

  props: {
    ifShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: {
      type: Array
    }
  },

  components: {},

  computed: {},

  mounted(ev) {},

  methods: {
    toggleFontSize() {
      console.log(111);
      // this.$emit('toggleFontSize')
      this.ifShowFontSize = !this.ifShowFontSize;
    },
    showSettingFontSize() {
      this.ifShowFontSize = true;
    },
    hideSettingFontSize() {
      this.ifShowFontSize = false;
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
  background: #fff;
  display: flex;

  &.border-shadow {
    box-shadow: 0 px2rem(-8) px2rem(8) #c0c0c0;
  }

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

.setting-wrapper {
  width: 100%;
  height: px2rem(46);
  position: absolute;
  left: 0;
  bottom: px2rem(46);
  z-index: 2;
  background: #fff;
  box-shadow: 0 px2rem(-8) px2rem(8) #c0c0c0;
}
.setting-font-size {
  @include center();

  .preview {
    text-align: center;
    flex: 0 0 px2rem(56);
    line-height: px2rem(46);
  }
  .select {
    flex: 1;
    display: flex;
  }
  .select-wrapper {
    flex: 1;
    display: flex;
    align-items: center;

    &:first-child {
      .line:first-child {
        border: none;
      }
    }

    &:last-child {
      .line:last-child {
        border: none;
      }
    }

    .line {
      flex: 1;
      height: 0;
      border-top: px2rem(1) solid #ccc;
    }
    .point-wrapper {
      position: relative;
      flex: 0 0 0;
      width: 0;
      height: px2rem(7);
      border-left: px2rem(1) solid #ccc;

      .point {
        width: px2rem(18);
        height: px2rem(18);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        background: #fff;
        border-radius: px2rem(10);
        border: px2rem(1) solid #ccc;
        box-shadow: 0 0 px2rem(2) px2rem(2) #eee;

        &::after {
          content: "";
          display: block;
          width: px2rem(4);
          height: px2rem(4);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          background: #000;
          border-radius: px2rem(3);
        }
      }
    }
  }
}
</style>