<!-- 底部导航 -->
<template>
  <div>
    <transition name="slide-up">
      <div class="footer-bar" v-if="ifShow" :class="{'border-shadow':!ifShowSetting}">
        <div class="icon-wrapper" @click="toggleSetting(3)">
          <i class="icon-menu"></i>
        </div>
        <div class="icon-wrapper" @click="toggleSetting(2)">
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

        <div class="setting-progress" v-if="showTag===2">
          <div class="progress-wrapper">
            <input type="range" class="progress" min="0" max="100" step="1" @change="onProgressChange($event.target.value)" @input="onProgressInput($event.target.value)" :value="progress" :disabled="!locationLoaded" ref="progress">
          </div>
          <div class="txt-wrapper">
            <div class="txt">{{locationLoaded?progress+'%':'加载中...'}}</div>
          </div>
        </div>
      </div>
    </transition>

    <content-view :ifShowContent="ifShowContent" :navigation="navigation" :bookAvailable="locationLoaded" @jumpTo="jumpTo" />
    <transition name="fade">
      <div class="content-mask" v-if="ifShowContent" @click="hideContent"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import ContentView from './ContentView';

export default {
  data() {
    return {
      ifShowSetting: false,
      showTag: 0,
      progress: 0,
      ifShowContent: false
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
    defaultTheme: Number,
    locationLoaded: Boolean,
    navigation: Object
  },

  components: {
    ContentView
  },

  computed: {},

  mounted(ev) {
  },

  methods: {
    jumpTo(href) {
      this.$emit('jumpTo', href);
    },
    hideContent() {
      this.ifShowContent = false;
    },
    onProgressChange(progress) {
      this.progress = progress;
      this.$emit("onProgressChange", progress);
    },
    onProgressInput(progress) {
      this.progress = progress;
    },
    setTheme(index) {
      this.$emit("setTheme", index);
    },
    toggleSetting(tag) {
      // this.$emit('toggleFontSize')
      this.showTag = tag;
      if(tag===3){
        this.ifShowContent = true;
        this.hideSetting();
      }else{
        this.ifShowContent = false;
        this.showSetting();
      }
    },
    showSetting() {
      this.ifShowSetting = true;
    },
    hideSetting() {
      this.ifShowSetting = false;
    },
    changeFontSize(size) {
      this.$emit("changeFontSize", size);
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

    &:first-child {
      left: px2rem(20);
    }
    &:last-child {
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
.setting-theme {
  height: 100%;
  display: flex;
  .theme-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: px2rem(5);

    .view {
      flex: 1;
      box-sizing: border-box;

      &.border {
        border: 1px solid #ccc;
      }
    }
    .text {
      height: px2rem(18);
      line-height: px2rem(18);
      text-align: center;
      color: #ccc;

      &.selected {
        color: #333;
      }
    }
  }
}
.setting-progress {
  display: flex;
  flex-direction: column;

  .progress-wrapper {
    flex: 1;
    @include center();
    padding: px2rem(12) 0 px2rem(6) 0;

    .progress {
      -webkit-appearance: none;
      width: 80%;
      height: px2rem(2);
      background: #ccc;
      border-radius: px2rem(1);

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: px2rem(20);
        width: px2rem(20);
        // margin-top: -5px; 
        background: #ffffff;
        border-radius: 50%; 
        box-shadow: 0 0 0.125em #3b4547; 
      }
    }
  }
  .txt-wrapper {
    flex: 0 0 px2rem(20);
    @include center();
  }
}
.content-mask{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  z-index: 10;
}
.fade-enter-active,
.fade-leave-active{
  transition: all .3s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
.fade-enter-to,
.fade-leave{
  opacity: 1;
}
</style>