export const actions = {
    async fetch({commit}) {
        try {
            return await this.$axios.$get('/api/category')
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async remove({commit}, id) {
        try {
            return await this.$axios.$delete(`/api/category/${id}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async update({commit}, {id, title}) {
        try {
            return await this.$axios.$put(`/api/category/${id}`, {title})
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async create({commit}, {title}) {
        try {
            return await this.$axios.$post('/api/category', {title})
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async fetchById({commit}, id) {
        try {
            return await this.$axios.$get(`/api/category/${id}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    }
}
