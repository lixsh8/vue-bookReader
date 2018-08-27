<!--  -->
<template>
  <div class="epub">
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="cover">
        <div class="left" @click="prev"></div>
        <div class="center" @click="toggleTitleAndFootbar"></div>
        <div class="right" @click="next"></div>
      </div>
      <title-bar :ifShow="ifShow" />
      <footer-bar :ifShow="ifShow" :fontSizeList="fontSizeList" @toggleFontSize="toggleFontSize" ref="footerBar" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import EPub from "epubjs";
import TitleBar from './TitleBar';
import FooterBar from './FooterBar';

export default {
  data() {
    return {
      ifShow: false,
      fontSizeList:[
        {fontSize: 12},
        {fontSize: 14},
        {fontSize: 16},
        {fontSize: 18},
        {fontSize: 20},
        {fontSize: 22},
        {fontSize: 24}
      ]
    };
  },

  components: {
    TitleBar,
    FooterBar
  },

  computed: {},

  mounted() {
    this.renderBook();
  },

  methods: {
    renderBook() {
      var url = "/static/2018_Book_AgileProcessesInSoftwareEngine.epub";
      this.book = new EPub(url);
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight
      });
      this.rendition.display();
    },
    prev(ev) {
      this.rendition.prev();
    },
    next() {
      this.rendition.next();
    },
    toggleTitleAndFootbar() {
      this.ifShow = !this.ifShow;

      if(!this.ifShow) {
        this.$refs.footerBar.hideSettingFontSize();
      }
    },
    toggleFontSize() {
      console.log(111)
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/style/global";

.read-wrapper {
  position: relative;

  .cover {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    z-index: 1;

    .left {
      flex: 0 0 px2rem(100);
    }
    .center {
      flex: auto;
    }
    .right {
      flex: 0 0 px2rem(100);
    }
  }
}
</style>