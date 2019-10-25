<template>
  <div id="page">
    <script v-html="schema" type="application/ld+json" />
    <nuxt />
    <app-callback-form v-if="formVisible" />
    <button id="scroll-up" class="scroll-up display-n" @click="scrollUp" />
    <app-customs-calculator v-if="customsCalculatorVisible" />
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
      customsCalculatorVisible: false
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
    scrollUp() {
      $('body,html').animate({scrollTop: 0}, 1000)
    }
  },
  mounted() {
    
    $(window).on('load scroll', () => {
      this.svgAnimate()
      this.elemAnimate('main-animate', 'animate')
      this.elemAnimate('right-animate', 'r-animate')
      this.elemAnimate('left-animate', 'l-animate')
      this.elemAnimate('stop-animate', 'animate-stop')

      let scroll = $('#scroll-up')
      if(window.innerWidth > 250) {
          if ($(window).scrollTop() > window.innerHeight) {
              scroll.removeClass('display-n')
          } else {
              scroll.addClass('display-n')
          }
      }
    })

    this.$root.$on('toggleform', isVisible => {
      this.formVisible = isVisible
    })

    this.$root.$on('closecustomscalculator', () => {
      this.customsCalculatorVisible = false
    })

    this.$root.$on('opencustomscalculator', () => {
      this.customsCalculatorVisible = true
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
    right: 5%;
    width: 40px;
    height: 40px;
    background-color: transparent;
    background-image:url(~static/images/up.png);
    background-size: contain;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    z-index: 11
}
</style>