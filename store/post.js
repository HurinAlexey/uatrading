export const actions = {
    async fetch({commit}) {
        try {
            return await this.$axios.$get('/api/post')
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async fetchByPageNumber({commit}, page) {
        try {
            return await this.$axios.$get(`/api/post/pagination/${page}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async fetchByCategory({commit}, id) {
        try {
            return await this.$axios.$get(`/api/post/category/${id}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async remove({commit}, id) {
        try {
            return await this.$axios.$delete(`/api/post/${id}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async update({commit}, {id, title, slug, categories, order, text, description, metaTitle, metaDescription, keywords, image}) {
        try {
            const fd = new FormData()

            fd.append('title', title)
            fd.append('slug', slug)
            fd.append('categories', categories)
            fd.append('order', order)
            fd.append('text', text)
            fd.append('description', description)
            fd.append('metaTitle', metaTitle)
            fd.append('metaDescription', metaDescription)
            fd.append('keywords', keywords)
            if (image) fd.append('image', image, image.name)            

            return await this.$axios.$put(`/api/post/${id}`, fd)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async create({commit}, {title, slug, categories, order, text, description, metaTitle, metaDescription, keywords, image}) {
        try {
            const fd = new FormData()

            fd.append('title', title)
            fd.append('slug', slug)
            fd.append('categories', categories)
            fd.append('order', order)
            fd.append('text', text)
            fd.append('description', description)
            fd.append('metaTitle', metaTitle)
            fd.append('metaDescription', metaDescription)
            fd.append('keywords', keywords)
            fd.append('image', image, image.name)

            return await this.$axios.$post('/api/post', fd)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async fetchById({commit}, id) {
        try {
            return await this.$axios.$get(`/api/post/${id}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async fetchBySlug({commit}, slug) {
        try {
            return await this.$axios.$get(`/api/post/single/${slug}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    }
}
