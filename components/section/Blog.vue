<template>
    <section class="blog">
        <div class="container">
            <div class="blog__box pos-r c-after flex ai-c fw-w-sm">
                <div class="flex ai-c w100-sm opacity left-animate">
                    <span class="blog__title">Блог</span>
                    <span class="pos-r blog__descr">Новости, аналитика в сфере  <br>импорта автомобилей
                </span>
                </div>
                <svg class="svg-animate w50-sm w33-esm" height="10" width="800">
                    <line x1="0" y1="5" x2="100%" y2="5" stroke-width="9" stroke="#cc9557"></line>

                </svg>
                <nuxt-link to="/blog" class="blog__more blog__descr hover">Читать больше...</nuxt-link>

            </div>
            <div class="blog__container flex jc-sa fw-w-md">

                <!-- <nuxt-link 
                    v-for="(post, index) of posts"
                    :key="index"
                    :to="'/blog/' + post.slug" 
                    class="blog__item pos-r block"
                >
                    <img v-lazy="'/uploads' + post.imageUrl" :alt="post.title">
                    <div class="blog__text">
                        <div class="blog__name">
                            {{post.title}}
                        </div>
                        <div class="blog__date">{{new Date(post.date) | date}}</div>
                        <div class="blog__content">
                            {{ post.description }}
                        </div>
                    </div>
                </nuxt-link> -->

                <swiper :options="swiperOption">
                    <swiper-slide v-for="(post, index) of posts" :key="index">
                        <div class="swiper-slide-wrapper">
                            <nuxt-link 
                                :to="'/blog/' + post.slug" 
                                class="blog__item pos-r block"
                            >
                                <img v-lazy="'/uploads' + post.imageUrl" :alt="post.title">
                                <div class="blog__text">
                                    <div class="blog__name">
                                        {{post.title}}
                                    </div>
                                    <div class="blog__date">{{new Date(post.date) | date}}</div>
                                    <div class="blog__content">
                                        {{ post.description }}
                                    </div>
                                </div>
                            </nuxt-link>
                        </div>
                    </swiper-slide>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>

            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ['posts'],
    data() {
        return {
            swiperOption: {
                slidesPerView: 4,
                spaceBetween: 40,
                autoplay: false,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    767: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    991: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                        autoplay: {
                            delay: 5000,
                        }
                    }
                }
            }
        }
    },
    mounted() {
        this.posts.forEach(post => {
            if(post.description.length > 190) {
                post.description = post.description.slice(0, 190) + '...'
            }
        })
    }
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
    font-family: muller-l, serif
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
    font-family: muller-b, serif
}

.blog__text {
    padding: 15px 15px 30px;
    min-height: 270px;
}

.blog__date {
    font-family: muller-thini, serif;
    font-size: 10px;
    margin: 10px 0;
    color: #828282
}

.blog__container {
    margin: 0 -15px
}

.swiper-slide-wrapper {
    padding: 10px
}

.blog__item {
    position: relative;
    background-color: #fff;
    margin-bottom: 10px;
    z-index: 1;
    -webkit-transition: all .5s;
    transition: all .5s
}

.blog__item:hover {
    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, .3);
    box-shadow: 0 0 10px rgba(0, 0, 0, .3)
}

.blog__item:hover::before {
    opacity: 0
}

.blog__item img {
    display: block;
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.blog__text p {
    font-family: muller-l, serif;
    font-size: 12px;
    margin-bottom: 7px
}

.blog__content {
    height: 105px;
    overflow-y: hidden;
}

.swiper-button-prev,
.swiper-button-next {
    background-image: url('/images/swiper-arrow.svg');
}
.swiper-button-prev {
    transform: scaleX(-1);
}

.swiper-button-prev:focus,
.swiper-button-next:focus {
    outline: none;
}


/* Media queries */
@media screen and (max-width:1281px) {
    .blog__item:before {
        background-position: 0 -69px
    }
}

@media screen and (min-width:992px) {
    .swiper-button-prev,
    .swiper-button-next {
        display: none;
    }
}

@media screen and (max-width:991px) {
    .blog__item {
        width: 280px;
        max-width: 100%;
        margin: auto;
    }
    .blog__item:before {
        background-position: 0 -100px
    }
    .swiper-button-prev {
        left: 0;
    }
    .swiper-button-next {
        right: 0;
    }
}

@media screen and (max-width:767px) {
    .blog__title>div {
        margin-bottom: 15px
    }
    .blog__title::after {
        top: 12px
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
}
</style>