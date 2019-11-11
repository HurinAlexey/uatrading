<template>
  <div id="page">
    <script v-html="schema" type="application/ld+json" />
    <nuxt />
    <app-callback-form ref="callbackForm" />
    <button id="scroll-up" class="scroll-up display-n" @click="scrollUp">
      <img src="/images/to-top.png" alt="top">
      <span class="text">Top</span>
    </button>
    <app-customs-calculator v-if="customsCalculatorVisible" :delivery="withDelivery" />
  </div>
</template>

<script>
import $ from 'jquery'
import AppCallbackForm from '@/components/CallbackForm.vue'
import AppCustomsCalculator from '@/components/CustomsCalculator.vue'

export default {
  components: {
    AppCallbackForm,
    AppCustomsCalculator
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