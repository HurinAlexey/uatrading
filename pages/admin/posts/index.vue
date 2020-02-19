<template>
    <div>
        <h1>Посты</h1>
        <nuxt-link to="/admin/posts/create">
            <el-button type="primary">Создать пост</el-button>
        </nuxt-link>

        <el-menu :default-active="activeTab" mode="horizontal" class="category-menu">
            <el-menu-item index="1" @click="changeCategory(null)">
                Все посты
            </el-menu-item>
            <el-menu-item 
                v-for="(category, index) of categories" 
                :key="category._id" 
                :index="String(index + 2)"
                @click="changeCategory(category._id)"
            >
                {{category.title}}
            </el-menu-item>
        </el-menu>

        <div class="posts-list">
            <div class="post" v-for="post of posts" :key="post._id">
                <img :src="`/uploads${post.imageUrl}`" class="image" :alt="post.title">
                <div class="content">
                    <h3>{{post.title}}</h3>
                    <div class="bottom-info">
                        <time class="time">{{new Date(post.date) | date}}</time>
                        <div class="buttons-group">
                            <el-button type="danger" size="small" @click="deletePost(post.title, post._id)">Удалить</el-button>
                            <a :href="`/admin/posts/${post._id}`">
                                <el-button type="warning" size="small">Редактировать</el-button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    data() {
        return {
            activeTab: '1'
        }
    },
    async asyncData({store, query}) {
        let posts = []
        const categories = await store.dispatch('category/fetch')
        if (query.category) {
            posts = await store.dispatch('post/fetchByCategory', query.category)
        } else {
            posts = await store.dispatch('post/fetch')
        }
        return {posts, categories}
    },
    methods: {
        async deletePost(title, id) {
            try {
                await this.$confirm(`Вы действительно хитите удалить пост "${title}"?`, {type: 'warning'})
                await this.$store.dispatch('post/remove', id)
                    .then(() => {
                        this.$message.success('Пост удален!')
                        this.posts = this.posts.filter(post => post._id !== id)
                    })
            } catch (e) {}
        },
        async changeCategory(id) {
            if (id) {
                this.posts = await this.$store.dispatch('post/fetchByCategory', id)
                this.$router.push({ query: { category: id } })
            } else {
                this.posts = await this.$store.dispatch('post/fetch')
                this.$router.push('/admin/posts')
            }
        }
    },
    mounted() {
        let currentCategory = this.$route.query.category
        if (currentCategory) {
            this.categories.forEach((item, index) => {
                if (item._id === currentCategory) {
                    this.activeTab = String(index + 2)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
h1 {
    font-size: 28px;
    margin-bottom: 40px;
}

.category-menu {
    margin: 20px 0;
}

.posts-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;

    .post {
        width: calc((100% / 3) - 40px);
        margin: 20px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

        .image {
            display: block;
            width: 100%;
            height: 300px;
            object-fit: cover;
        }

        .content {
            padding: 15px;
            background-color: #fff;
            
            .bottom-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
}
</style>
