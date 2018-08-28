<!-- 底部导航 -->
<template>
  <div>
    <transition name="slide-up">
      <div class="footer-bar" v-if="ifShow" :class="{'border-shadow':!ifShowSetting}">
        <div class="icon-wrapper">
          <i class="icon-menu"></i>
        </div>
        <div class="icon-wrapper" @click="toggleSetting(1)">
          <i class="icon-progress"></i>
        </div>
        <div class="icon-wrapper" @click="toggleSetting(1)">
          <i class="icon-bright"></i>
        </div>
        <div class="icon-wrapper" @click="toggleSetting(0)">
          <i class="">Aa</i>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="setting-wrapper" v-if="ifShowSetting">
        <div class="setting-font-size" v-if="showTag===0">
          <div class="preview" :style="{fontSize: fontSizeList[0].fontSize+'px'}">A</div>
          <div class="select">
            <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index">
              <div class="line"></div>
              <div class="point-wrapper" @click="changeFontSize(item.fontSize)">
                <div class="point" v-show="defaultFontSize==item.fontSize"></div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize+'px'}">A</div>
        </div>
        <div class="setting-theme" v-if="showTag===1">
          <div class="theme-item" v-for="(item, index) in themesList" :key="index" @click="setTheme(index)">
            <div class="view" :style="item.style.body" :class="{'border': item.name === 'default'}"></div>
            <div class="text" :class="{'selected': defaultTheme===index}">item.name</div>
          </div>
        </div>

        <div class="setting-location" v-if="showTag===3">
          <div class="slide">
            <input type="slide">
          </div>
          <div class="loading">正在加载</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      ifShowSetting: false,
      showTag: 0
    };
  },

  props: {
    ifShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: {
      type: Array
    },
    defaultFontSize: {
      type: Number,
      default: 12
    },
    themesList: Array,
    defaultTheme: Number
  },

  components: {},

  computed: {},

  mounted(ev) {},

  methods: {
    setTheme(index) {
      this.$emit('setTheme', index);
    },
    toggleSetting(tag) {
      // this.$emit('toggleFontSize')
      this.showTag = tag;
      this.showSetting()
    },
    showSetting() {
      this.ifShowSetting = true;
    },
    hideSetting() {
      this.ifShowSetting = false;
    },
    changeFontSize(size) {
      this.$emit('changeFontSize', size)
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
  padding: 0 px2rem(20);

  .preview {
    text-align: center;
    flex: 0 0 px2rem(56);
    line-height: px2rem(46);
    position: absolute;

    &:first-child{
      left: px2rem(20);
    }
    &:last-child{
      right: px2rem(10);
    }
  }
  .select {
    flex: 1;
    display: flex;
    height: px2rem(46);
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
.setting-theme{
  height: 100%;
  display: flex;
  .theme-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: px2rem(5);

    .view{
      flex: 1;
      box-sizing: border-box;

      &.border{
        border: 1px solid #ccc;
      }
    }
    .text{
      height: px2rem(18);
      line-height: px2rem(18);
      text-align: center;
      color: #ccc;

      &.selected{
        color: #333;
      }
    }
  }
}
</style>