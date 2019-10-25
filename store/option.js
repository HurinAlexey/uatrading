export const actions = {
    async fetch({commit}) {
        try {
            return await this.$axios.$get('/api/option')
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async fetchByTitle({commit}, title) {
        try {
            return await this.$axios.$get(`/api/option/single/${title}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async remove({commit}, id) {
        try {
            return await this.$axios.$delete(`/api/option/${id}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async update({commit}, {id, title, value}) {
        try {
            return await this.$axios.$put(`/api/option/${id}`, {title, value})
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async create({commit}, {title, value}) {
        try {  
            return await this.$axios.$post('/api/option', {title, value})
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    }
}
  