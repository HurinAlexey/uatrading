<template>
    <section class="blog">
        <div class="container">
            <div class="blog__box pos-r c-after flex ai-c fw-w-sm">
                <div class="flex ai-c w100-sm opacity left-animate">
                    <span class="blog__title">Блог&nbsp;</span>
                    <span class="pos-r blog__descr">Новости, аналитика в сфере  <br>импорта автомобилей
                </span>
                </div>
                <svg class="svg-animate w50-sm w33-esm" height="10" width="800">
                    <line x1="0" y1="5" x2="100%" y2="5" stroke-width="9" stroke="#cc9557"></line>

                </svg>
                <nuxt-link to="/blog" class="blog__more blog__descr hover">Читать больше...</nuxt-link>

            </div>
            <div class="blog__container flex jc-sa fw-w-md">

                <nuxt-link 
                    v-for="(post, index) of posts"
                    :key="index"
                    :to="'/blog/' + post.slug" 
                    class="blog__item pos-r block"
                >
                    <img :src="post.imageSrc" :alt="post.title">
                    <div class="blog__category pos-a">
                        {{post.category}}
                    </div>
                    <div class="blog__text">
                        <div class="blog__name">
                            {{post.title}}
                        </div>
                        <div class="blog__date">{{post.date | date}}</div>
                        <div v-html="post.text" class="blog__content" />
                    </div>
                </nuxt-link>

            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ['posts']
}
</script>

<style lang="scss" scoped>
.blog {
    position: relative;
    padding-top: 150px;
    padding-bottom: 50px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}

.blog__box {
    margin-bottom: 75px;
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
    color: #a19699;
    font-family: muller-b;
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
    font-family: muller-r
}

.blog__category {
    text-align: center;
    font-size: 10px;
    color: #fff;
    background-color: #3182c9;
    border-radius: 5px;
    padding: 5px 10px 3px;
    left: 20px;
    top: 20px
}

.blog__name {
    font-family: muller-b
}

.blog__text {
    padding: 15px 15px 30px
}

.blog__date {
    font-family: muller-thini;
    font-size: 10px;
    margin: 10px 0;
    color: #828282
}

.blog__item {
    position: relative;
    background-color: #fff;
    margin-bottom: 10px;
    z-index: 1;
    width: 21%;
    -webkit-transition: all .5s;
    transition: all .5s
}

.blog__item:hover {
    -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, .5);
    box-shadow: 0 0 15px rgba(0, 0, 0, .5)
}

.blog__item:hover::before {
    opacity: 0
}

.blog__item img {
    width: 100%;
    height: auto!important
}

.blog__text p {
    font-family: muller-l;
    font-size: 12px;
    margin-bottom: 7px
}


/* Media queries */
@media screen and (max-width:1281px) {
    .blog__item:before {
        background-position: 0 -69px
    }
}

@media screen and (max-width:991px) {
    .blog__item {
        width: 40%;
        margin-bottom: 35px
    }
    .blog__item:before {
        background-position: 0 -100px
    }
}

@media screen and (max-width:767px) {
    .blog__title>div {
        margin-bottom: 15px
    }
    .blog__title::after {
        top: 12px
    }
    .blog__item:nth-child(n+3) {
        display: none
    }
    .blog__item:before {
        background-position: 0 -72px
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
    .blog__item {
        display: none
    }
}
</style>