export const actions = {
    async uploadTable({commit}, {title, file}) {
        try {
            const fd = new FormData()

            
            fd.append('title', title)
            fd.append('file', file, file.name)

            return await this.$axios.$post('/api/calculator', fd)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async getData({commit}, title) {
        try {
            return await this.$axios.$get(`/api/calculator/${title}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    }
}
