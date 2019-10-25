export const actions = {
    async fetch({commit}) {
        try {
            return await this.$axios.$get('/api/meta')
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async remove({commit}, id) {
        try {
            return await this.$axios.$delete(`/api/meta/${id}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async update({commit}, {id, page, title, description, keywords}) {
        try {        
            return await this.$axios.$put(`/api/meta/${id}`, {page, title, description, keywords})
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async create({commit}, {page, title, description, keywords}) {
        try {
            return await this.$axios.$post('/api/meta', {page, title, description, keywords})
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async fetchById({commit}, id) {
        try {
            return await this.$axios.$get(`/api/meta/${id}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async fetchByPageName({commit}, page) {
        try {
            return await this.$axios.$get(`/api/meta/single/${page}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    }
}
