export const state = () => ({
    error: null,
    currency: null,
    calculationError: null
  })
  
  export const actions = {
    nuxtServerInit({dispatch}) {
      dispatch('auth/autoLogin')
    },
    async sendCallbackMail({commit}, {name, phone}) {
      try {
        return await this.$axios.$post('/api/mail', {name, phone})
      } catch (e) {
        commit('setError', e, {root: true})
        throw e
      }
    },
    async getCurrency({commit}, date) {
      try {
        let year = String(date.getFullYear())
        let month = String(date.getMonth() + 1)
        if (month.length === 1) month = '0' + month
        let day = String(date.getDate())
        if (day.length === 1) day = '0' + day
        let dateString = year + month + day
        const eurData = await this.$axios.$get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=${dateString}&json`)
        const usdData = await this.$axios.$get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=${dateString}&json`)
        if (eurData.length === 0 || usdData.length === 0) {
          let error = new Error('Нет данных для указаной даты.')
          commit('setCalculationError', error)
        } else {
          const eurRate = eurData[0].rate
          const usdRate = usdData[0].rate
          const currency = {
            'USD': usdRate,
            'EUR': eurRate
          }
          commit('setCurrency', currency)
          commit('clearCalculationError')
        }
      } catch (e) {
        commit('setError', e, {root: true})
        throw e
      }
    }
  }
  
  export const mutations = {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
    setCurrency(state, currency) {
      state.currency = currency
    },
    setCalculationError(state, error) {
      state.calculationError = error
    },
    clearCalculationError(state) {
      state.calculationError = null
    },
  }
  
  export const getters = {
    error: state => state.error,
    currency: state => state.currency,
    calculationError: state => state.calculationError
  }
  