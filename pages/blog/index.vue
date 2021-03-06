<template>
    <div id="content">
        <app-header :data="header" :phones="phones" class="blog-header" />
        <section class="blog">
            <div class="container">
                <div class="blog__box pos-r c-after flex ai-c fw-w-sm">
                    <div class="flex ai-c w100-sm opacity left-animate">
                        <h1 class="blog__title">Блог</h1>
                        <span class="pos-r blog__descr">Новости, аналитика в сфере  <br>импорта автомобилей
                    </span>
                    </div>
                    <svg class="svg-animate" height="10" width="1000">
                        <line x1="0" y1="5" x2="100%" y2="5" stroke-width="9" stroke="#cc9557"></line>
                    </svg>

                </div>
                <div class="blog__container flex jc-sb fw-w">

                    <main class="main-content">
                        <div v-if="bigPost" class="category-label">Новости</div>

                        <nuxt-link v-if="bigPost" :to="`/blog/${bigPost.slug}`" class="big-post pos-r">
                            <img class="post-image" v-lazy="'/uploads' + bigPost.imageUrl" :alt="bigPost.title" />
                            <div class="bg-mask pos-a" />
                            <div class="post-content pos-a">
                                <h3 class="post-title">{{bigPost.title}}</h3>
                                <div class="post-date flex ai-c">
                                    <img src="/images/clock-white.png" alt="clock" />
                                    {{new Date(bigPost.date) | date}}
                                </div>
                                <div v-html="bigPost.description" class="post-description" />
                            </div>
                        </nuxt-link>

                        <div class="post" v-for="post in posts" :key="post._id">
                            <nuxt-link class="post-image" :to="`/blog/${post.slug}`">
                                <img v-lazy="'/uploads' + post.imageUrl" :alt="post.title" />
                            </nuxt-link>
                            <div class="post-content pos-r">
                                <nuxt-link :to="`/blog/${post.slug}`">
                                    <h3 class="post-title">{{post.title}}</h3>
                                </nuxt-link>
                                <div class="post-date flex ai-c">
                                    <img src="/images/clock-black.png" alt="clock" />
                                    {{new Date(post.date) | date}}
                                </div>
                                <div v-html="post.description" class="post-description" />
                            </div>
                        </div>

                    </main>

                    <aside class="aside-content">
                        <div class="category-wrap" v-for="(category, index) in categoriesData" :key="index">
                            <div class="category-label">{{category.title}}</div>
                            <nuxt-link 
                                v-for="post in category.posts" 
                                :key="post._id" 
                                :to="`/blog/${post.slug}`"
                                class="aside-post pos-r"
                            >
                                <img class="post-image" v-lazy="'/uploads' + post.imageUrl" :alt="post.title" />
                                <div class="bg-mask pos-a" />
                                <h3 class="post-title pos-a">{{post.title}}</h3>
                            </nuxt-link>
                        </div>
                    </aside>

                </div>

                <ul v-if="breadcrumbs" class="breadcrumbs">
                    <li v-for="(item, index) of breadcrumbs" :key="index">
                        <span v-if="!item.path">{{ item.text }}</span>
                        <span v-else>
                            <router-link :to="item.path">{{ item.text }}</router-link>
                            <span class="separator">/</span>
                        </span>
                    </li>
                </ul>
            </div>
        </section>
        <div v-if="pages > 1" class="pagination">
            <span
                v-for="page in pages"
                :key="page"
                class="page-link"
                :class="{'active': page == currentPage}"
                @click.prevent="changePage(page)"
            >{{page}}</span>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/Header.vue'


export default {
    components: {
        AppHeader
    },
    data() {
        return {
            header: {
                showAboutImport: true
            },
            breadcrumbs: [
                {
                    url: 'https://ubtrading.com.ua',
                    path: '/',
                    text: 'Таможенно-брокерские услуги'
                },
                {
                    url: 'https://ubtrading.com.ua/blog',
                    text: 'Блог'
                }
            ]
        }
    },
    async asyncData({store, query}) {
        const currentPage = query.page || 1
        let meta = await store.dispatch('meta/fetchByPageName', 'blog')
        if(!meta) {
            meta = {
                title: 'UBTrading',
                description: 'Таможено-брокерскик услуги.',
                keywords: ''
            }
        }
        let phones = await store.dispatch('option/fetchByTitle', 'phones')
        phones = phones.value.split(',')
        phones = phones.map(item => {
            let result = {text: item}
            result.href = 'tel:+' + item.replace(/\D/gi, '')
            return result
        })
        let data = await store.dispatch('post/fetchByPageNumber', currentPage)
        let {posts, pages} = data
        let categories = await store.dispatch('category/fetch')
        let categoriesData = []
        for (let category of categories) {
            let categoryPosts = await store.dispatch('post/fetchByCategory', category._id)
            categoriesData.push({
                title: category.title,
                posts: categoryPosts
            })
        }
        let bigPost = null
        if (currentPage == '1') {
            bigPost = posts[0]
            posts = posts.slice(1)
        }
        return {meta, phones, posts, pages, currentPage, bigPost, categoriesData}
    },
    head() {
        return {
            title: this.currentPage == 1 ? this.meta.title : this.meta.title + ` - ${this.currentPage}`,
            meta: [
                {
                    hid: 'description', 
                    name: 'description', 
                    content: this.currentPage == 1 ? this.meta.description : this.meta.description + ` Страница блога ${this.currentPage}.`
                },
                { 
                    hid: 'keywords', 
                    name: 'keywords', 
                    content: this.meta.keywords 
                }
            ],
            link: [
                { rel: 'canonical', href: 'https://ubtrading.com.ua/blog' }
            ]
        }
    },
    jsonld() {
        const items = this.breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@id': item.url,
                name: item.text,
            }
        }))
        return {
            '@context': 'http://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: items,
        }
    },
    methods: {
        async changePage(page) {
            let data = await this.$store.dispatch('post/fetchByPageNumber', page)
            let posts = data.posts
            let bigPost = null
            if (page == '1') {
                bigPost = posts[0]
                posts = posts.slice(1)
            }
            if (page == 1) {
                this.$router.push('/blog')
            } else {
                this.$router.push(`/blog?page=${page}`)
            }
            this.posts = posts
            this.bigPost = bigPost
            this.currentPage = page
        }
    },
    mounted() {
        document.querySelector('body').classList.remove('body-fix')
    }
}
</script>

<style lang="scss" scoped>
.blog {
    position: relative;
    padding-top: 90px;
    padding-bottom: 50px;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}

.blog__box {
    margin-bottom: 30px;
    font-size: 32px;
    color: #9d9d9d
}

.blog__box::after {
    position: absolute;
    content: "";
    display: inline-block;
    background-color: #cc9557;
    left: -5px;
    top: -150px;
    height: 115px;
    width: 48px
}

.blog__title {
    position: relative;
    padding-right: 10px;
    color: #a19699;
    font-family: muller-b, serif;
    font-size: 60px;
    font-weight: 400;
    line-height: 34px
}

.blog__title::after {
    position: absolute;
    content: " ";
    display: inline;
    background-color: #a19699;
    width: 1px;
    height: 30px;
    top: 5px;
    right: -3px
}

.blog__descr {
    font-size: 14px;
    padding: 0 15px;
    white-space: nowrap;
    font-family: NokiaPureHeadline, serif
}

.main-content {
    width: calc(70% - 20px);
}

.aside-content {
    width: calc(30% - 20px);
}

.category-label {
    position: relative;
    width: 120px;
    padding: 5px 15px;
    font-size: 16px;
    line-height: 20px;
    text-transform: uppercase;
    text-align: center;
    margin-left: auto;
    background-color: #cc9557;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 100%;
        display: block;
        width: 50px;
        height: 30px;
        background: url("/images/category-before.png") center no-repeat;
    }
}

.big-post {
    display: block;
    width: 100%;
    height: 450px;
    margin-bottom: 30px;
    overflow: hidden;

    .post-image {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all .5s;
    }

    .bg-mask {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .2);
    }

    .post-content {
        left: 30px;
        bottom: 30px;
        width: calc(50% - 30px);
        color: #fff;
    }

    &:hover .post-image {
        transform: scale(1.05);
    }
}

.post {
    display: flex;
    position: relative;
    width: 100%;
    margin-bottom: 61px;

    &::after {
        content: "";
        position: absolute;
        bottom: -30px;
        left: 0;
        display: block;
        width: 100%;
        height: 1px;
        background-color: #dbdbdb;
    }

    &:last-of-type {
        margin-bottom: 30px;

        &::after {
            display: none;
        }
    }

    .post-image {
        display: block;
        width: 35%;

        img {
            display: block;
            width: 100%;
            height: 100%;
            min-height: 250px;
            object-fit: cover;
        }
    }

    .post-content {
        width: 65%;
        padding: 30px;

        h3 {
            display: inline-block;
            transition: all .3s;

            &:hover {
                color: #cc9557;
            }
        }

        .more-link {
            right: 0;
            bottom: 0;
            padding: 5px 15px;
            font-size: 12px;
            line-height: 15px;
            text-transform: uppercase;
            background-color: #cc9557;
            transition: all .2s;

            &:hover {
                color: #fff;
            }
        }
    }
}

.post-content {

    .post-title {
        font-size: 20px;
        margin-bottom: 15px;
    }

    .post-date {
        font-size: 12px;
        margin-bottom: 10px;

        img {
            display: block;
            width: auto;
            height: 12px;
            margin-right: 8px;
        }
    }
}

.category-wrap {
    margin-bottom: 50px;
}

.aside-post {
    display: block;
    width: 100%;
    height: 250px;
    margin-bottom: 30px;
    overflow: hidden;

    .post-image {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all .5s;
    }

    .bg-mask {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .2);
    }

    .post-title {
        left: 0;
        bottom: 0;
        padding: 15px 20px;
        font-size: 18px;
        color: #fff;
    }

    &:hover .post-image {
        transform: scale(1.05);
    }
}

.breadcrumbs {
    position: relative;
    top: -10px;
    display: flex;
    flex-wrap: wrap;
    color: #979797;

    a:hover {
        color: #cc9557;
    }

    .separator {
        display: inline-block;
        margin: 0 5px;
    }
}

.pagination {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #342027;

    .page-link {
        display: block;
        width: 30px;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        cursor: pointer;

        &.active,
        &:hover {
            color: #cc9557;
        }
    }
}

/* Media queries */
@media screen and (max-width:991px) {
    .blog__container {
        flex-direction: column;
    }

    .main-content {
        width: 100%;
    }

    .aside-content {
        width: 100%;
    }
}

@media screen and (max-width:767px) {
    .blog__title {
        margin-bottom: 15px
    }
    .blog__title::after {
        top: 12px
    }

    .post {
        flex-direction: column;

        .post-image,
        .post-content {
            width: 100%;
        }
    }
}

@media screen and (max-width:575px) {
    .blog {
        padding-bottom: 0;
        padding-top: 100px
    }
    .blog__box::after {
        left: 5px;
        height: 80px;
        width: 16px;
        top: -100px
    }
    .blog__title {
        margin-bottom: 30px;
        font-size: 25px;
        color: #1c0001;
        opacity: .7
    }
    .blog__title::after {
        display: none
    }
    .blog__title_small {
        white-space: normal;
        font-size: 14px;
        padding: 0 5px
    }
    a.blog__title_small {
        padding: 0 0 0 70px
    }
    .blog__title svg line {
        stroke-width: 5px;
        opacity: 1
    }

    .big-post {
        height: 400px;

        .post-content {
            left: 20px;
            bottom: 20px;
            width: calc(100% - 40px);
        }
    }

    .post .post-content {
        padding: 20px;
    }
    .post::after {
        bottom: -20px;
    }
}
</style>