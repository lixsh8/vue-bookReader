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
      <footer-bar 
      :ifShow="ifShow"
      :fontSizeList="fontSizeList"
      :defaultFontSize="defaultFontSize"
      @toggleFontSize="toggleFontSize"
      @changeFontSize="setFontSize"
      :themesList="themesList"
      :defaultTheme="defaultTheme"
      @setTheme="setTheme"
      ref="footerBar"
      :locationLoaded="locationLoaded"
      @onProgressChange="onProgressChange"
      :navigation="navigation"
      @jumpTo="jumpTo"
       />
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
      ],
      defaultFontSize: 16,
      themesList: [
        {
          name: 'default',
          style: {
            body: {'color': '#000', 'background': '#fff'}
          }
        },
        {
          name: 'eye',
          style: {
            body: {'color': '#000', 'background': '#ceeaba'}
          }
        },
        {
          name: 'night',
          style: {
            body: {'color': '#fff', 'background': '#000'}
          }
        },
        {
          name: 'gold',
          style: {
            body: {'color': '#000', 'background': 'rgb(241, 236, 226)'}
          }
        }
      ],
      defaultTheme: 3,
      locationLoaded: false,
      navigation: null
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
      this.themes = this.rendition.themes;
      this.setFontSize(this.defaultFontSize);

      this.registerTheme();
      this.setTheme(this.defaultTheme);

      this.book.ready.then(()=>{
        this.navigation = this.book.navigation;
        // console.log(this.navigation)
        return this.book.locations.generate();
      }).then((res)=>{
        this.locationLoaded = true;
        this.locations = this.book.locations;
        this.onProgressChange(0);
      });
    },
    jumpTo(href) {
      console.log(href);
      this.rendition.display(href)
    },
    onProgressChange(progress) {
      const percentage = progress / 100;
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
      this.rendition.display(location);
    },
    registerTheme() {
      this.themesList.forEach((theme)=>{        
        this.themes.register(theme.name, theme.style);
      })
    },
    setTheme(idx) {
      this.themes.select(this.themesList[idx].name);
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
        this.$refs.footerBar.hideSetting();
      }
    },
    toggleFontSize() {
    },
    setFontSize(size){
      this.defaultFontSize = size;
      if(this.themes){
        this.themes.fontSize(size + 'px');
      }
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