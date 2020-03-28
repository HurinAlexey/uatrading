<template>
  <div id="page">
    <script v-html="schema" type="application/ld+json" />
    <nuxt />
    <LazyHydrate when-visible>
      <app-callback-form ref="callbackForm" />
    </LazyHydrate>
    <button id="scroll-up" class="scroll-up display-n" @click="scrollUp">
      <img src="/images/to-top.png" alt="top">
      <span class="text">Top</span>
    </button>
    <app-customs-calculator v-if="customsCalculatorVisible" :delivery="withDelivery" />
  </div>
</template>

<script>
import $ from 'jquery'
import LazyHydrate from 'vue-lazy-hydration'

export default {
  components: {
    LazyHydrate,
    AppCallbackForm: () => import('@/components/CallbackForm.vue'),
    AppCustomsCalculator: () => import('@/components/CustomsCalculator.vue')
  },
  // head() {
  //     return {
  //         link: [
  //             { rel: 'preload', as:'font', href: '/fonts/NokiaPureHeadline_ULt.ttf', type:'font/ttf', crossorigin:'anonymous' },
  //             { rel: 'preload', as:'font', href: '/fonts/Fontfabric - MullerBold.otf', type:'font/otf', crossorigin:'anonymous' },
  //             { rel: 'preload', as:'font', href: '/fonts/NokiaPureText_Lt.ttf', type:'font/ttf', crossorigin:'anonymous' },
  //             { rel: 'preload', as:'font', href: '/fonts/Fontfabric - MullerThinItalic.otf', type:'font/otf', crossorigin:'anonymous' },
  //             { rel: 'preload', as:'font', href: '/fonts/Fontfabric - MullerThin.otf', type:'font/otf', crossorigin:'anonymous' },
  //             { rel: 'preload', as:'font', href: '/fonts/Fontfabric - MullerRegular.otf', type:'font/otf', crossorigin:'anonymous' },
  //             { rel: 'preload', as:'font', href: '/fonts/Fontfabric - MullerUltraLight.otf', type:'font/otf', crossorigin:'anonymous' },
  //             { rel: 'preload', as:'font', href: '/fonts/Fontfabric - MullerLight.otf', type:'font/otf', crossorigin:'anonymous' }
  //         ]
  //     }
  // },
  data() {
    const schema = {
      "@context" : "http://schema.org",
      "@type" : "Organization",
      "url" : "http://site.com",
      "logo" : "http://site.com/logo.png",
      "description": "Описание компании",
      "address" : {
        "@type" : "PostalAddress",
        "streetAddress" : "Физический адрес",
        "addressLocality" : "Киев",
        "postalCode" : "0200",
        "addressCountry" : "Страна"
      },
      "telephone": "(093) 958 00 34",
      "email": "info@ubtrading.com.ua"
    }

    return {
      schema: JSON.stringify(schema),
      formVisible: false,
      customsCalculatorVisible: false,
      withDelivery: false
    }
  },
  methods: {
    svgAnimate() {
      $('.svg-animate').each(function () {
        if($(this).offset().top < $(document).scrollTop() + $(window).height() - 50 && !$(this).hasClass('animate')) {
            $(this).addClass('animate')
        }
      })
    },
    elemAnimate(elementClass, animationClass) {
      const scrollTop = $(window).scrollTop()
      const winHeight = $(window).height()

      $(`.${elementClass}`).each(function () {
          let offset = $(this).offset().top
          let schemeHeight = $(this).height()
          if(scrollTop + winHeight >= offset && scrollTop <= offset + schemeHeight && !$(this).hasClass(animationClass)) {
              $(this).addClass(animationClass)
          }
      })
    },
    loadLazyBackground() {
      $('.lazy-bg').each(function () {
        const scrollTop = $(window).scrollTop()
        const winHeight = $(window).height()
        let offset = $(this).offset().top
        let elemHeight = $(this).height()
        if(scrollTop + winHeight >= offset && scrollTop <= offset + elemHeight && $(this).hasClass('lazy-bg')) {
            $(this).removeClass('lazy-bg')
        }
      })
    },
    scrollUp() {
      $('body,html').animate({scrollTop: 0}, 1000)
    },
    useAllScrollFuncrions() {
      this.svgAnimate()
      this.elemAnimate('main-animate', 'animate')
      this.elemAnimate('right-animate', 'r-animate')
      this.elemAnimate('left-animate', 'l-animate')
      this.elemAnimate('stop-animate', 'animate-stop')
      this.loadLazyBackground()

      let scroll = $('#scroll-up')
      if(window.innerWidth > 250) {
          if ($(window).scrollTop() > window.innerHeight) {
              scroll.removeClass('display-n')
          } else {
              scroll.addClass('display-n')
          }
      }
    }
  },
  mounted() {
    /* (function(){ document.fontsloaded=0;var d=document;var w=window;function l(){var s = d.createElement('link'); s.rel = 'stylesheet'; s.async = true; s.href = '/css/fonts.css'; var ss = document.getElementsByTagName('link')[0]; ss.parentNode.insertBefore(s, ss);}//эта строка обычная для кода JivoSite
        function zy(){
            //удаляем EventListeners
            if(w.detachEvent){//поддержка IE8
                w.detachEvent('onscroll',zy);
                w.detachEvent('onmousemove',zy);
                w.detachEvent('ontouchmove',zy);
                w.detachEvent('onresize',zy);
            }else {
                w.removeEventListener("scroll", zy, false);
                w.removeEventListener("mousemove", zy, false);
                w.removeEventListener("touchmove", zy, false);
                w.removeEventListener("resize", zy, false);
            }
            if(d.readyState=='complete'){l();}else{if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}
            var cookie_date = new Date ( );
            cookie_date.setTime ( cookie_date.getTime()+60*60*28*1000); //24 часа для Москвы
            d.cookie = "FontsLoaded=1;path=/;expires=" + cookie_date.toGMTString();
        }
        if (d.cookie.search ( 'FontsLoaded' )<0){//проверяем, первый ли это визит на наш сайт, если да, то назначаем EventListeners на события прокрутки, изменения размера окна браузера и скроллинга на ПК и мобильных устройствах, для отложенной загрузке JivoSite.
            if(w.attachEvent){// поддержка IE8
                w.attachEvent('onscroll',zy);
                w.attachEvent('onmousemove',zy);
                w.attachEvent('ontouchmove',zy);
                w.attachEvent('onresize',zy);
            }else {
                w.addEventListener("scroll", zy, {capture: false, passive: true});
                w.addEventListener("mousemove", zy, {capture: false, passive: true});
                w.addEventListener("touchmove", zy, {capture: false, passive: true});
                w.addEventListener("resize", zy, {capture: false, passive: true});
            }
        }else {zy();}
    })(); */

    this.useAllScrollFuncrions()
    
    $(window).on('scroll', () => {
      this.useAllScrollFuncrions()
    })

    this.$root.$on('toggleform', isVisible => {
      if (isVisible) {
        this.$refs.callbackForm.$el.classList.add('active')
      } else {
        this.$refs.callbackForm.$el.classList.remove('active')
      }
    })

    this.$root.$on('closecustomscalculator', () => {
      this.customsCalculatorVisible = false
      this.withDelivery = false
    })

    this.$root.$on('opencustomscalculator', () => {
      this.customsCalculatorVisible = true
      this.withDelivery = false
    })

    this.$root.$on('opencustomscalculatorwithdev', () => {
      this.customsCalculatorVisible = true
      this.withDelivery = true
    })
  }
}
</script>

<style lang="scss">
#page {
  width: 100%;
  overflow-x: hidden;
}

.scroll-up {
    position: fixed;
    bottom: 5%;
    right: 2%;
    width: 50px;
    padding: 8px 3px;
    background-color: #151b1a;
    background-size: contain;
    background-repeat: no-repeat;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    z-index: 11;

    img {
      display: block;
      width: 100%;
      height: 30px;
      margin-bottom: 5px;
      object-fit: contain;
      transition: all .3s;
    }

    .text {
      display: block;
      font-size: 16px;
      color: #fff;
      text-transform: uppercase;
      text-align: center;
    }

    &:hover {
      img {
        transform: translateY(-2px);
      }
    }
}
</style>