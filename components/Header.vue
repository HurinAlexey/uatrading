<template>
    <div class="head pos-r c-before c-after flex fd-c jc-sb">

      <div 
        class="parallax" 
        :class="{'bottom-position': data.imagePosition === 'bottom', 'shadow-top': data.tbBackground}" 
        v-if="data.backImage"
    >
          <div class="parallax__wrap">
              <div id="scene">
                  <img 
                    v-lazy="backImage" 
                    data-depth="-0.05" 
                    alt="back image" 
                  />
                  <img 
                    v-if="data.frontImage && imageSize == 'desktop'" 
                    v-lazy="frontImage" 
                    data-depth="0.15" 
                    alt="front image" />
              </div>
          </div>
      </div>

      <header class="flex jc-sb w100">
          <nuxt-link to="/" class="logo block">
              <img src="/images/logo.png" alt="logo" width="41" height="36">
          </nuxt-link>
          <div class="flex">
              <nav :class="{'nav-open': isNavOpen}">
                  <div class="nav__close" @click="closeNav" />
                  <ul class="flex ai-c nav">
                      <li class="pos-r" v-if="data.showAboutImport">
                          <span class="pos-r c-after block nav__link">Все об импорте автомобилей</span>
                          <ul 
                            class="nav__dropdown pos-a  nav__dropdown_1 c-after" 
                            :class="{'nav__dropdown-USA': data.usaBackground, 'nav__dropdown-georgia': data.georgiaBackground}"
                          >
                              <li class="c-after pos-r">
                                <nuxt-link to="/blog" class="block pos-r">
                                    <p class="nav__title flex"><span class="nav__num">01 </span>Автомобильный блог</p>
                                    <p class="nav__about">Актуальные новости и аналитика в сфере импорта автомобилей ...</p>
                                </nuxt-link>
                              </li>
                              <li class="c-after pos-r">
                                <a href="#" class="block pos-r" @click.prevent="openCustomsCalculator">
                                    <p class="nav__title flex"><span class="nav__num">02 </span>Таможенный калькулятор</p>
                                    <p class="nav__about">Расчет таможенных платежей для транспортных средств ...</p>
                                </a>
                              </li>
                              <li class="c-after pos-r">
                                <a href="#" class="block pos-r" @click.prevent="openCustomsCalculatorWithDelivery">
                                    <p class="nav__title flex"><span class="nav__num">03 </span>Расчет стоимости доставки
                                    </p>
                                    <p class="nav__about"> Калькулятор всех расходов по доставке авто с США ...</p>
                                </a>
                              </li>
                          </ul>
                      </li>
                      <li class="pos-r">
                          <span class="pos-r c-after block nav__link">Услуги</span>
                          <ul 
                            class="nav__dropdown nav__dropdown_2 pos-a c-after"
                            :class="{
                                'nav__dropdown-USA': data.usaBackground, 
                                'nav__dropdown-georgia': data.georgiaBackground,
                                'nav__dropdown-tb': data.tbBackground
                            }"
                          >
                              <li class="c-after pos-r">
                                <nuxt-link to="/" class="block pos-r">
                                    <p class="nav__title flex"><span class="nav__num">01 </span>Таможенно-брокерские
                                        услуги</p>
                                    <p class="nav__about">Таможенное оформление всех видов товаров ...</p>
                                </nuxt-link>
                              </li>
                              <li class="c-after pos-r">
                                <nuxt-link to="/usa" class="block pos-r">
                                    <p class="nav__title flex"><span class="nav__num">02 </span>Автомобили из США</p>
                                    <p class="nav__about">Доставка, растаможка и сертификация
                                        авто с США ...</p>
                                </nuxt-link>
                              </li>
                              <li class="c-after pos-r">
                                <nuxt-link to="/georgia" class="block pos-r">
                                    <p class="nav__title flex"><span class="nav__num">03 </span>Автомобили из Грузии</p>
                                    <p class="nav__about">Доставка, растаможка и сертификация
                                        авто с Грузии ...</p>
                                </nuxt-link>
                              </li>
                              <li class="c-after pos-r">
                                <nuxt-link to="/eu" class="block pos-r">
                                    <p class="nav__title flex"><span class="nav__num">04 </span>Автомобили из ЕС</p>
                                    <p class="nav__about">Растаможка и сертификация
                                        автомобилей с Евросоюза ...</p>
                                </nuxt-link>
                              </li>
                          </ul>
                      </li>
                  </ul>
              </nav>
              <div class="flex ai-fs info">
                  <div class="cons">
                      <button class="block btn" @click="showForm">Бесплатная консультация</button>
                  </div>
                  <a href="https://facebook.com" class="block facebook" title="facebook">
                      <svg viewBox="0 0 155.139 155.139" width="18" height="18">
                          <path style="fill:#ffffff;" d="M89.584,155.139V84.378h23.742l3.562-27.585H89.584V39.184
      c0-7.984,2.208-13.425,13.67-13.425l14.595-0.006V1.08C115.325,0.752,106.661,0,96.577,0C75.52,0,61.104,12.853,61.104,36.452
      v20.341H37.29v27.585h23.814v70.761H89.584z"></path>
                      </svg>
                  </a>

                  <ul class="lang pos-r" v-if="data.multilang">
                    <li>
                        <a href="#">Ru</a>
                        <ul class="lang__dropdown pos-a">
                            <li><a href="#">En</a></li>
                        </ul>
                    </li>
                  </ul>
                  
                  
                  <div class="info__tel pos-r">
                      <svg viewBox="0 0 27.442 27.442" width="20" height="20" class="pos-a" @click="togglePhones">
                          <path fill="#ffffff" d="M19.494,0H7.948C6.843,0,5.951,0.896,5.951,1.999v23.446c0,1.102,0.892,1.997,1.997,1.997h11.546
      c1.103,0,1.997-0.895,1.997-1.997V1.999C21.491,0.896,20.597,0,19.494,0z M10.872,1.214h5.7c0.144,0,0.261,0.215,0.261,0.481
      s-0.117,0.482-0.261,0.482h-5.7c-0.145,0-0.26-0.216-0.26-0.482C10.612,1.429,10.727,1.214,10.872,1.214z M13.722,25.469
      c-0.703,0-1.275-0.572-1.275-1.276s0.572-1.274,1.275-1.274c0.701,0,1.273,0.57,1.273,1.274S14.423,25.469,13.722,25.469z
       M19.995,21.1H7.448V3.373h12.547V21.1z"></path>
                      </svg>
                      <div class="info__tel-wrap">
                          <a href="tel:+380939580034" class="block">+38 (093) 958 00 34</a>
                      </div>
                  </div>
              </div>
              <button class="burger" :class="{'burger-open': isNavOpen}" @click="toggleNav" title="burger">
                  <div class="burger-top"></div>
                  <div class="burger-middle"></div>
                  <div class="burger-bottom"></div>
              </button>
  
  
          </div>
      </header>

      <div :class="titleWrapClasses" v-if="data.title && data.subtitle">
          <h1>{{data.title}}</h1>
          <h2 v-html="data.subtitle"></h2>
      </div>

      <div class="cons-mobile flex jc-c">
          <button class="block btn" @click="showForm">Бесплатная консультация</button>
      </div>

      <ul v-if="data.bannerLinks" class="flex pos-r category container fd-c-sm" :class="{'two-items': data.bannerLinks.length === 2}">
          <li 
            v-for="(link, index) of data.bannerLinks"
            :key="index"
            class="w50 w100-sm  pos-r c-after" 
            :class="{
                    'w50': data.bannerLinks.length === 2,
                    'w33': data.bannerLinks.length === 3
                }"
          >
            <nuxt-link :to="link.href" class="block">
                <p class="category__title">{{link.title}}</p>
            </nuxt-link>
          </li>
      </ul>
  
  </div>
</template>

<script>
import {isMobile} from 'mobile-device-detect'

export default {
  props: ['data'],
  data() {
      return {
        isNavOpen: false,
        imageSize: 'desktop'
      }
  },
  computed: {
      titleWrapClasses() {
          if (this.$route.path === '/') {
              return 'title-wrap-tb w100'
          }
          return 'title-wrap w50 w66-lg w75-md w100-sm'
      },
      backImage() {
          if (this.data.backImage) {
            return this.data.backImage[this.imageSize]
          }
      },
      frontImage() {
          if (this.data.frontImage) {
            return this.data.frontImage[this.imageSize]
          }
      }
  },
  methods: {
      showForm() {
          this.$root.$emit('toggleform', true)
      },
      togglePhones() {
          document.querySelector('.info__tel-wrap').classList.toggle('info__tel-open')
      },
      toggleNav() {
          this.isNavOpen = !this.isNavOpen
          if (this.isNavOpen) {
            document.body.classList.add('body-fix')
          } else {
            document.body.classList.remove('body-fix')
          }
      },
      closeNav() {
          this.isNavOpen = false
          document.body.classList.remove('body-fix')
      },
      openCustomsCalculator() {
          this.$root.$emit('opencustomscalculator')
      },
      openCustomsCalculatorWithDelivery() {
          this.$root.$emit('opencustomscalculatorwithdev')
      }
  },
  beforeMount() {
    if (window.outerWidth <= 500) {
        this.imageSize = 'mobile'
    }
  },
  mounted() {
    if (!isMobile) {
        const Parallax = require('parallax-js')
        const scene = document.getElementById('scene')
        var parallaxInstance
        if (scene) parallaxInstance = new Parallax(scene)  
    }  

    window.onresize = () => {
        if (window.outerWidth <= 500) {
            this.imageSize = 'mobile'
        } else {
            this.imageSize = 'desktop'
        }
    }
  },
  watch: {
      imageSize(value) {
          this.imageSize = value
      }
  }
}
</script>

<style lang="scss" scoped>
.head {
    height: 100vh;
    min-height: 650px;
    color: #fff;

    &.blog-header {
        height: auto;
        min-height: 0;
        padding-bottom: 60px;
        margin-bottom: -80px;
        background-image: url(~static/images/blog-header.png);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: right bottom;
        z-index: 10;
    }
}

.head>* {
    position: relative;
    z-index: 1
}

.head:before {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    opacity: .6
}

header {
    padding: 25px 35px;
    z-index: 100!important
}

.parallax {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: -1
}

.parallax.shadow-top::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100px;
    background-image: linear-gradient(180deg,rgba(0,0,0,.15) 0,rgba(0,0,0,.15) 20%,transparent);
    z-index: 2;
}

.parallax__wrap {
    position: absolute;
    top: -50px;
    left: -50px;
    right: -50px;
    bottom: -50px
}

.parallax img {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.parallax.bottom-position img {
    object-position: center bottom;
}

#scene,
#scene>div {
    width: 100%;
    height: 100%
}

.nav__dropdown {
    -webkit-transform-origin: 50% 0;
    transform-origin: 50% 0;
    -webkit-transform: scaleY(0);
    transform: scaleY(0);
    -webkit-transition: -webkit-transform .5s;
    transition: -webkit-transform .5s;
    transition: transform .5s;
    transition: transform .5s, -webkit-transform .5s;
    width: 280px;
    padding: 0 20px;
    top: 35px;
    z-index: 10;
    overflow: hidden
}

.nav__dropdown::after {
    top: -35px;
    left: -35px;
    right: -35px;
    bottom: -35px;
    z-index: -1;
    background-image:url(~static/images/blur-service-es.jpg);
}

.nav__dropdown-USA::after {
    background-image:url(~static/images/blur-service-usa.jpg);
}

.nav__dropdown-georgia::after {
    background-image:url(~static/images/blur-service-georgia.jpg);
}

.nav__dropdown-tb::after {
    background-image:url(~static/images/blur-service-tb.jpg);
    background-size: cover;
}

.nav__dropdown_1 {
    right: -15px
}

.nav__dropdown_2 {
    left: -25px
}

.nav__dropdown>* {
    opacity: 0;
    -webkit-transition: opacity .1s;
    transition: opacity .1s
}

.nav__dropdown li {
    -webkit-transition: all .2s;
    transition: all .2s;
    padding: 15px 0;
    z-index: 1
}

.nav__dropdown li::after {
    z-index: -1;
    background: rgba(255, 255, 255, .05);
    top: -1px;
    left: -30px;
    right: -30px;
    bottom: -1px;
    -webkit-transition: opacity .3s;
    transition: opacity .3s;
    opacity: 0
}

.nav__dropdown li:hover::after {
    opacity: 1
}

.nav__dropdown li:not(:last-child) {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    -o-border-image: linear-gradient(to right, transparent, rgba(255, 255, 255, .3), transparent) .5 stretch;
    border-image: -webkit-gradient(linear, left top, right top, from(transparent), color-stop(rgba(255, 255, 255, .3)), to(transparent)) .5 stretch;
    border-image: linear-gradient(to right, transparent, rgba(255, 255, 255, .3), transparent) .5 stretch
}

.nav__title {
    font-size: 13px;
    font-family: muller-r, serif
}

.nav__num {
    padding-right: 5px
}

.nav__about {
    font-size: 12px;
    padding: 10px 0 0 25px;
    font-family: muller-thini, serif;
    font-style: italic
}

.nav>li {
    margin-right: 45px;
    padding-bottom: 40px
}

.nav>li:hover .nav__dropdown {
    -webkit-transform: scaleY(1);
    transform: scaleY(1)
}

.nav>li:hover .nav__dropdown>* {
    opacity: 1;
    -webkit-transition: opacity .1s .3s;
    transition: opacity .1s .3s
}

.nav__link {
    padding-right: 15px;
    font-family: muller-r, serif
}

.nav__link:after {
    border-top: 6px solid rgba(255, 255, 255, .6);
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    bottom: 0;
    right: 4px
}

.info>* {
    padding: 0 10px
}

.info>:not(:last-child) {
    /* border-right: 1px solid #fff; */
    height: 20px
}

.info .btn {
    margin: -2px 30px 0 0;
    font-size: 14px;
    line-height: 1.5;
    background-color: transparent;
    cursor: pointer;
    -webkit-transition: all .5s;
    transition: all .5s
}

.info .btn:hover {
    background: rgba(204, 139, 78, .7);
    -webkit-transition: all .5s;
    transition: all .5s
}

.info .facebook {
    margin-right: 20px;
}

.info__tel {
    padding-left: 25px;
    font-family: muller-thin, serif;
    font-size: 16px;
    line-height: 20px;
}

.info__tel-wrap {
    position: relative;
    top: -2px;
}

.info__tel svg {
    top: 0;
    left: 4px
}

.cons-mobile {
    display: none
}

.lang {
    padding-top: 3px;
    font-size: 16px;
    font-family: muller-thin, serif
}

.lang>li>a {
    display: block;
    margin-top: -3px
}

.lang__dropdown {
    display: none;
    top: 100%;
    left: 0
}

.lang__dropdown li {
    padding: 5px 6px
}

.lang__dropdown li:hover {
    background-color: rgba(255, 255, 255, .1);
    color: #e7e7e7
}

.lang:hover {
    background-color: rgba(255, 255, 255, .1);
    color: #e7e7e7
}

.lang:hover .lang__dropdown {
    display: block
}

.title-wrap {
    padding-left: 45px;
    border-left: 6px solid #cc9557;
    text-shadow: 0 0 60px #000;
    margin-bottom: 20px
}

.title-wrap-tb {
    position: absolute;
    bottom: 25%;
    text-align: center;
    text-shadow: 0 0 60px #000;
}

h1 {
    font-size: 42px;
    font-family: NokiaPureHeadline, serif;
    line-height: 50px;
    margin-bottom: 15px;
    letter-spacing: normal;
    font-weight: 100;
    -webkit-transform: scaleY(1.5) translateY(100px);
    transform: scaleY(1.5) translateY(100px);
    -webkit-filter: blur(10px);
    filter: blur(10px);
    opacity: 0;
    -webkit-animation: h 1s 1s forwards;
    animation: h 1s 1s forwards
}

h2 {
    font-size: 16px;
    line-height: 25px;
    font-family: muller-ultra, serif;
    font-weight: 100;
    -webkit-transform: scaleY(1.5) translateY(100px);
    transform: scaleY(1.5) translateY(100px);
    -webkit-filter: blur(10px);
    filter: blur(10px);
    opacity: 0;
    -webkit-animation: h 1s 1.5s forwards;
    animation: h 1s 1.5s forwards
}

@-webkit-keyframes h {
    100% {
        -webkit-transform: none;
        transform: none;
        -webkit-filter: none;
        filter: none;
        opacity: 1
    }
}

@keyframes h {
    100% {
        -webkit-transform: none;
        transform: none;
        -webkit-filter: none;
        filter: none;
        opacity: 1
    }
}

.category {
    padding: 20px 0 10px;
    max-width: 1110px;
    border-top-width: 1px;
    border-top-style: solid;
    -o-border-image: linear-gradient(to right, transparent, rgba(255, 255, 255, .5), transparent) 1 stretch;
    border-image: -webkit-gradient(linear, left top, right top, from(transparent), color-stop(rgba(255, 255, 255, .5)), to(transparent)) 1 stretch;
    border-image: linear-gradient(to right, transparent, rgba(255, 255, 255, .5), transparent) 1 stretch
}

.category.two-items {
    max-width: 740px;
}

.category li {
    padding: 0 30px 20px
}

.category li::after {
    width: 0;
    height: 3px;
    background-color: #fff;
    top: -22px;
    left: 0;
    -webkit-transition: all .4s;
    transition: all .4s
}

.category li:hover::after {
    width: 100%!important;
    -webkit-transition: all .8s;
    transition: all .8s
}

.category li:not(:last-child) {
    border-right-width: 1px;
    border-right-style: solid;
    -o-border-image: linear-gradient(to bottom, transparent, rgba(255, 255, 255, .5), transparent) 1 stretch;
    border-image: -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(rgba(255, 255, 255, .5)), to(transparent)) 1 stretch;
    border-image: linear-gradient(to bottom, transparent, rgba(255, 255, 255, .5), transparent) 1 stretch
}

.category li>* {
    opacity: .5
}

.category .category_active>*,
.category .nuxt-link-active,
.category li:hover>* {
    opacity: 1
}

.category__title {
    text-align: center;
    color: #cc9557;
    font-size: 20px;
    margin-bottom: 20px;
    font-family: NokiaPureHeadline, serif;
    text-transform: uppercase;
    position: relative;
    top: 20px
}

.category__text {
    font-size: 12px
}

.burger {
    display: none
}

/* Media queries */
@media screen and (min-width:1600px) {
    .title-wrap-tb {
        bottom: 32%;
    }
}

@media screen and (max-width:1600px) {
    .blog-header {
        background-size: auto;
    }
}

@media screen and (max-width:1281px) {
    .nav>li {
        margin-right: 20px
    }
    .parallax .avto {
        background-position: -150px center
    }
}

@media screen and (max-width:991px) {
    .category.container {
        width: 100%!important;
        margin: 0
    }
    .category li {
        padding: 0 20px
    }
    nav {
        -webkit-transform: translateX(100%);
        transform: translateX(100%);
        -webkit-transition: -webkit-transform .5s;
        transition: -webkit-transform .5s;
        transition: transform .5s;
        transition: transform .5s, -webkit-transform .5s;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 100;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end
    }
    .nav-open {
        -webkit-transform: none;
        transform: none
    }
    .nav {
        display: block;
        background-color: rgba(0, 0, 0, .95);
        width: 60%;
        min-width: 350px;
        padding: 80px 60px 20px 20px;
        overflow-y: scroll;
        height: 100vh
    }
    .nav::-webkit-scrollbar {
        display: none
    }
    .nav__close {
        width: 40%;
        height: 100%
    }
    .nav__dropdown {
        position: static;
        -webkit-transform: none;
        transform: none;
        width: 100%;
        padding: 20px 10px;
        background: 0 0
    }
    .nav__dropdown>* {
        opacity: 1
    }
    .nav__dropdown li::after,
    .nav__dropdown::after {
        display: none
    }
    .nav>li {
        margin: 0;
        padding: 0
    }
    .burger {
        display: block;
        width: 30px;
        height: 27px;
        background-color: transparent;
        border: none;
        position: relative;
        top: -3px;
        z-index: 101
    }
    .burger>div {
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #fff;
        -webkit-transition: -webkit-transform .5s;
        transition: -webkit-transform .5s;
        transition: transform .5s;
        transition: transform .5s, -webkit-transform .5s
    }
    .burger-top {
        top: 0;
        -webkit-transform-origin: 0 50%;
        transform-origin: 0 50%
    }
    .burger-middle {
        top: calc(50% - 1px)
    }
    .burger-bottom {
        bottom: 0;
        -webkit-transform-origin: 0 50%;
        transform-origin: 0 50%
    }
    .burger-open .burger-middle {
        -webkit-transform: scaleX(0);
        transform: scaleX(0)
    }
    .burger-open .burger-top {
        -webkit-transform: rotate(45deg) scaleX(1.18);
        transform: rotate(45deg) scaleX(1.18)
    }
    .burger-open .burger-bottom {
        -webkit-transform: rotate(-45deg) scaleX(1.18);
        transform: rotate(-45deg) scaleX(1.18)
    }
    .info {
        padding-right: 15px
    }
    .info__tel {
        padding: 0 10px
    }
    .info__tel svg {
        position: static;
        cursor: pointer
    }
    .info__tel-wrap {
        display: none
    }
    .info__tel-open {
        display: block;
        position: absolute;
        right: 0;
        background-color: rgba(0, 0, 0, .7);
        width: auto;
        top: 120%;
        white-space: nowrap;
        padding: 10px 10px 5px;
        z-index: 10
    }
}

@media screen and (max-width:767px) {
    .blog-header {
        background-size: cover;
        background-position: 70% bottom;
    }

    .parallax .bg {
        background-position: 20% center
    }
    .parallax .avto {
        background-position: 20% center
    }
    .title-wrap {
        padding-left: 14px;
        margin: 50px 0 50px
    }
    .logo img {
        width: 38px;
        height: auto
    }
    h1 {
        font-size: 34px;
        line-height: 34px
    }
    h2 {
        font-size: 18px
    }
    .cons {
        display: none
    }
    .category li::after {
        display: none
    }
    .category.two-items {
        max-width: 100%;
    }
    .cons-mobile {
        display: block;
        position: absolute;
        top: 75px;
        right: 20px;
    }
    .cons-mobile .btn {
        padding: 4px 8px;
        font-size: 14px;
        background-color: rgba(0, 0, 0, .2);
        border-width: 1px;
    }
    .category {
        padding: 0!important;
        background-color: rgba(0, 0, 0, .7);
        border-top: 1px solid #cbcac9;
        -o-border-image: 0;
        border-image: 0;
        text-align: center
    }
    .category__title {
        top: 0;
    }
    .category__text {
        display: none
    }
    .category__hover {
        display: none
    }
    .category__title {
        margin: 0
    }
    .category_active {
        background-color: #cc9557
    }
    .category_active .category__title {
        color: #fff
    }
    .category li {
        border-bottom: 1px solid #cbcac9;
        -o-border-image: 0!important;
        border-image: 0!important;
        border-right: none!important;
        padding: 15px
    }
}

@media screen and (max-width:575px) {    
    .parallax .avto {
        background-position: 30% center
    }
    header {
        padding: 15px
    }
    .title-wrap {
        padding: 0;
    }
    h1 {
        font-size: 26px;
        line-height: 30px;
    }
    .title-wrap h1 {
        padding-left: 8px;
    }
    h2 {
        font-size: 14px;
        padding-left: 8px;
        line-height: 16px
    }
    .category__title {
        font-size: 18px
    }
    .logo img {
        width: 33px
    }
}

@media screen and (max-width:450px) {
    .nav {
        width: 100%;
        min-width: 300px
    }
    .nav__close {
        width: 0
    }
}
</style>