import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/images/not-found.jpg',
  loading: '/images/placeholder-gray.jpg',
  throttleWait: 0,
  attempt: 1
})