<template>
  <div id="page">
    <nuxt />
    <app-callback-form v-if="formVisible" />
    <app-message v-if="messageVisible" />
    <button id="scroll-up" class="scroll-up display-n" />
    <app-customs-calculator v-if="customsCalculatorVisible" />
  </div>
</template>

<script>
import $ from 'jquery'
import AppCallbackForm from '@/components/CallbackForm.vue'
import AppMessage from '@/components/Message.vue'
import AppCustomsCalculator from '@/components/CustomsCalculator.vue'

export default {
  components: {
    AppCallbackForm,
    AppMessage,
    AppCustomsCalculator
  },
  data() {
    return {
      formVisible: false,
      messageVisible: false,
      messageText: '',
      customsCalculatorVisible: false
    }
  },
  methods: {
    showMessage(text) {
      this.messageText = text
      this.showMessage = true
    },
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
    }
  },
  mounted() {
    $(window).on('load scroll', () => {
      this.svgAnimate()
      this.elemAnimate('main-animate', 'animate')
      this.elemAnimate('right-animate', 'r-animate')
      this.elemAnimate('left-animate', 'l-animate')
      this.elemAnimate('stop-animate', 'animate-stop')
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
    background-image:url(~static/images/up.png);
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 11
}
</style>