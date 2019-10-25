export const state = () => ({
    error: null
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
    }
  }
  
  export const mutations = {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  }
  
  export const getters = {
    error: state => state.error
  }
  