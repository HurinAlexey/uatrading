<template>
    <div id="content">
        <app-header :data="header" class="blog-header" />
        <section class="blog">
            <div class="container">
                <div class="blog__box pos-r flex ai-c fw-w-sm">
                    <div class="flex ai-c w100-sm opacity left-animate">
                        <nuxt-link to="/blog"><span class="blog__title">Блог</span></nuxt-link>
                        <h1 class="pos-r blog__descr blog__descr--post">{{post.title}}</h1>
                    </div>
                    <svg class="svg-animate" height="10" width="1000">
                        <line x1="0" y1="5" x2="100%" y2="5" stroke-width="9" stroke="#cc9557"></line>
                    </svg>
                </div>
                <div class="blog__container flex jc-sb fw-w">

                    <main class="main-content">
                        <div class="post">
                            <div class="post-date flex ai-c jc-fe">
                                <img src="/images/clock-black.png" alt="clock" />
                                {{new Date(post.date) | date}}
                            </div>
                            <img class="post-image" :src="'/uploads' + post.imageUrl" :alt="post.title" />
                            <div class="post-content pos-r">
                                <div v-html="post.text" class="post-text" />
                            </div>
                        </div>
                        <button class="back-button flex ai-c" @click="$router.push('/blog')">
                            <img src="/images/arrow-left.png" alt="back" /> Вернуться
                        </button>
                    </main>

                    <aside class="aside-content">
                        <div class="category-wrap" v-for="(category, index) in categoriesData" :key="index">
                            <div class="category-label">{{category.title}}</div>
                            <div class="flex fw-w">
                                <nuxt-link 
                                    v-for="post in category.posts" 
                                    :key="post._id" 
                                    :to="`/blog/${post.slug}`"
                                    class="aside-post pos-r"
                                >
                                    <img class="post-image" :src="'/uploads' + post.imageUrl" :alt="post.title" />
                                    <div class="bg-mask pos-a" />
                                    <h3 class="post-title pos-a">{{post.title}}</h3>
                                </nuxt-link>
                            </div>
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
            }
        }
    },
    async asyncData({store, params}) {
        const slug = params.slug
        let post = await store.dispatch('post/fetchBySlug', slug)
        let categories = await store.dispatch('category/fetch')
        let categoriesData = []
        for (let category of categories) {
            let categoryPosts = await store.dispatch('post/fetchByCategory', category._id)
            categoriesData.push({
                title: category.title,
                posts: categoryPosts
            })
        }

        const breadcrumbs = [
            {
                url: 'https://ubtrading.com.ua',
                path: '/',
                text: 'Таможенно-брокерские услуги'
            },
            {
                url: 'https://ubtrading.com.ua/blog',
                path: '/blog',
                text: 'Блог'
            },
            {
                url: 'https://ubtrading.com.ua/blog/' + slug,
                text: (post.metaTitle && post.metaTitle !== 'undefined') ? post.metaTitle : post.title
            }
        ]
        return {post, categoriesData, breadcrumbs}
    },
    head() {
        return {
            title: (this.post.metaTitle && this.post.metaTitle !== 'undefined') ? this.post.metaTitle : this.post.title,
            meta: [
                { hid: 'description', name: 'description', content: (this.post.metaDescription && this.post.metaDescription !== 'undefined') ? this.post.metaDescription : this.post.description },
                { hid: 'keywords', name: 'keywords', content: (this.post.keywords && this.post.keywords !== 'undefined') ? this.post.keywords : '' }
            ],
            link: [
                { rel: 'canonical', href: 'https://ubtrading.com.ua/blog/' + this.$route.params.slug }
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
    mounted() {
        document.querySelector('body').classList.remove('body-fix')

        let router = this.$router
        document.querySelectorAll('.read-also').forEach(el => {
            el.onclick = function(e) {
                let path = this.getAttribute('data-href')
                if (path) router.push(path)
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.blog-header {
    min-height: 0;
    padding-bottom: 60px;
    margin-bottom: -80px;
    background-image: url(~static/images/blog-header.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right bottom;
    z-index: 10;
}

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
    display: block;
    position: relative;
    padding-right: 10px;
    color: #a19699;
    font-family: muller-b, serif;
    font-size: 60px;
    font-weight: 400;
    line-height: 1;
}

.blog__title::after {
    position: absolute;
    content: "";
    display: block;
    background-color: #a19699;
    width: 1px;
    height: 45px;
    top: 5px;
    right: -3px
}

.blog__descr {
    font-size: 16px;
    padding: 0 15px;
}

.blog__descr--post {
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
    // margin-right: 15px;
    margin-left: auto;
    background-color: #cc9557;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 100%;
        display: block;
        border: 15px solid transparent;
        border-right-width: 25px;
        border-left-width: 25px;
        border-right-color: #cc9557;
        border-bottom-color: #cc9557;
    }
}

.post {
    width: 100%;
    margin-bottom: 30px;

    .post-image {
        position: relative;
        display: block;
        width: 100%;
        height: 400px;
        // width: 400px;
        // max-width: 45%;
        // height: auto;
        // margin: 0 20px 20px 0;
        margin-bottom: 30px;
        // float: left;
        object-fit: contain;
        z-index: 2;
    }

    .post-date {
        margin-bottom: 20px;
        font-size: 16px;

        img {
            display: block;
            width: auto;
            height: 16px;
            margin-right: 10px;
        }
    }

    .post-text {
        font-size: 15px;
    }
}

.category-wrap {
    margin: 30px auto;
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

.category-post {
    display: block;
    width: calc((100% / 3) - 30px);
    height: 250px;
    margin: 0 15px 15px;
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

.back-button {
    padding: 10px 20px;
    font-size: 16px;
    line-height: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #cc9557;
    transition: all .3s;

    img {
        display: block;
        width: auto;
        height: 16px;
        margin-right: 10px;
        transition: all .3s;
    }

    &:hover {
        img {
            transform: translateX(-5px);
        }
    }
}

/* Media queries */
@media screen and (max-width:1600px) {
    .blog-header {
        background-size: auto;
    }
}

@media screen and (max-width:991px) {
    .category-post {
        height: 200px;
    }

    .main-content {
        width: 100%;
    }

    .aside-content {
        display: none;
    }
}

@media screen and (max-width:767px) {
    .blog-header {
        background-size: cover;
        background-position: 70% bottom;
    }

    .blog__title {
        margin-bottom: 15px
    }
    .blog__title::after {
        top: 12px
    }

    .post .post-image {
        float: none;
        width: 500px;
        max-width: 100%;
        height: auto;
        margin: 0 auto 30px;
    }

    .category-label {
        margin-right: 0;
    }

    .category-post {
        width: 100%;
        height: 250px;
        margin: 0 0 15px;
    }
}

.breadcrumbs {
    position: relative;
    top: -10px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    color: #979797;

    a:hover {
        color: #cc9557;
    }

    .separator {
        display: inline-block;
        margin: 0 5px;
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
}
</style>