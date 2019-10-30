<template>
    <div>
        <section class="why pos-r lazy-bg" :class="data.sectionClass" :style="{backgroundImage: `url(${data.backgroundImage})`}">
            <div class="container">
                <div class="why__title" :class="data.titleClass">
                    <div class="why__title-main opacity left-animate">Почему</div>
                    <div class="pos-r why__sub-title opacity right-animate">мы лучше?
                        <svg class="svg-animate pos-a animate" height="6">
                            <line x1="0" y1="3" x2="100%" y2="3" stroke-width="6" stroke="#cc9557"></line>
                        </svg>
                    </div>
                </div>
                <div class="why__block flex fw-w ai-c pos-r">

                    <div
                        v-for="(item, index) of data.items" 
                        :key="index"
                        class="why__item flex ai-c w33 w50-md w100-sm"
                    >
                        <div class="why__img pos-r c-before flex jc-c ai-c">
                            <div class="why__img-wrap">
                                <img :src="item.icon" alt="icon">
                            </div>
                        </div>
                        <p v-html="item.text" class="why__about" />
                    </div>

                </div>
            </div>
        </section>
        <div class="container pos-r">
            <svg v-if="data.withSvg" class="bottom-svg svg-animate pos-a " width="350" height="250">
                <line x1="5" y1="0" x2="5" y2="100%" stroke-width="9" stroke="#cc9557"></line>
                <line x1="1" y1="100%" x2="100%" y2="100%" stroke-width="18" stroke="#cc9557"></line>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data']
}
</script>

<style lang="scss" scoped>
.why {
    padding-top: 55px;
    top: -143px;
    margin-bottom: -143px;
    background-size: cover;
    background-position: center;
    z-index: 1
}

.why__USA {
    background-size: 100% 100%;
    background-position: left top;
}

.why .container {
    width: 1300px;
    left: 40px;
    position: relative
}

.why__USA,
.why__tb {
    padding-top: 10px;
    top: -143px;
    margin-bottom: -143px;
    z-index: 1
}

.why__USA .container,
.why__tb .container {
    width: 1300px;
    position: relative
}

@media screen and (min-width:768px) {
    .why__USA .container,
    .why__tb .container {
        left: 40px
    }
}

.why__title {
    margin-left: -100px
}

.why__title-USA {
    position: relative;
    top: 30px
}

.why__title-main {
    font-size: 60px;
    color: #ada3a5;
    font-family: muller-b;
    line-height: 50px
}

.why__sub-title {
    font-size: 40px;
    color: #fff;
    font-family: muller-r;
    margin-left: 140px
}

.why__title .why__sub-title svg {
    right: 103%;
    width: 600px;
    top: 17px
}

.why__block {
    padding-top: 70px;
    color: #fff;
    left: 20px
}

.bottom-svg {
    left: calc(100% - 20px);
    bottom: 0;
    height: 200px;
    z-index: -1
}

.bottom-svg line:last-child {
    -webkit-transition-delay: .75s;
    transition-delay: .75s
}

.why__item {
    margin-bottom: 70px;
    padding-right: 30px;
    -webkit-transition: all .5s;
    transition: all .5s
}

.why__img {
    width: 54px;
    height: 54px;
    background-color: #fff;
    z-index: 1;
    margin-right: 30px;
    overflow: hidden;
    -webkit-transition: all .5s;
    transition: all .5s
}

.why__img-wrap {
    width: 28px;
    height: 30px;
    overflow: hidden
}

.why__img-wrap img {
    width: 100%;
    height: 100%;
    -o-object-fit: contain;
    object-fit: contain
}

.why__img:before {
    z-index: -1;
    top: -5px;
    left: -5px;
    bottom: -5px;
    right: -5px;
    -webkit-filter: blur(3px);
    filter: blur(3px);
    background:url(~static/images/whyitem.png) no-repeat center;
    background-size: cover;
    opacity: .8
}

.why__img svg {
    width: 37px;
    height: 37px
}

.why__about {
    width: calc(100% - 100px);
    font-family: muller-ultra;
    font-size: 14px;
    font-weight: 300
}

.why__about a {
    color: #cc9557
}

.why__title-main {
    font-size: 48px;
    margin-left: 50px
}

.why:after {
    right: -140px
}


/* Media queries */
@media screen and (max-width:1367px) {
    .why__about {
        width: 210px
    }
}

@media screen and (max-width:1300px) {
    .why .container {
        left: 0;
        width: 1220px
    }
    .bottom-svg {
        left: 98%
    }
}

@media screen and (max-width:991px) {
    .why {
        padding-top: 30px;
        background-size: cover;
    }
    .why__item:nth-child(even) {
        padding-right: 0;
        padding-left: 15px
    }
    .why__item:nth-child(odd) {
        padding-right: 15px
    }
    .why__block {
        padding-top: 30px;
        left: 0
    }
    .why__title {
        margin-left: 0
    }
}

@media screen and (max-width:767px) {
    .why {
        padding-bottom: 20px;
    }
    .why__item {
        padding: 0!important;
        margin-bottom: 40px;
    }
    .why__img {
        margin-right: 30px
    }
    .why__about {
        width: auto;
    }
    .why__title .svg-animate {
        display: block
    }
}

@media screen and (max-width:575px) {
    .why {
        padding-top: 20px
    }
    .why__title-main {
        font-size: 25px;
        line-height: 20px
    }
    .why__sub-title {
        font-size: 17px;
        margin-left: 60px
    }
    .why__title span svg {
        top: 7px;
        height: 4px
    }
    .why::after {
        background-position: 38% -115px;
        bottom: -110px
    }
    .why__img {
        width: 40px;
        height: 40px;
        margin-right: 10px
    }
    .why__img svg {
        width: 26px;
        height: 26px
    }
    .why__item {
        margin-bottom: 37px
    }
    .why__about {
        width: calc(100% - 50px)
    }
}
</style>