<template>
    <section class="work">
        <div class="container work__title-wrap pos-r">
            <div class="work__title pos-r c-after">
                <p class="opacity left-animate">
                    Схема </p>
                <div class="opacity right-animate">работы</div>

            </div>

        </div>
        <div class="work__block pos-r c-before c-after bl-block-USA lazy-bg">
            <div class="container flex fd-c fw-w ai-fs" ref="itemsContainer">

                <div 
                    v-for="(item, index) of items"
                    :key="index"
                    ref="schemaItem"
                    class="work__item flex w33 w50-md w100-sm work__item_open pos-r"
                >
                    <div class="work__num">
                        0{{ index + 1 }}
                    </div>
                    <p class="work__about">
                        {{ item.title }}
                        <span class="c-after pos-r"> ...</span>
                    </p>
                    <div v-html="item.text" class="work__text left-0 pos-a" :class="{'work__text-USA': usaClass}" />
                </div>
                
            </div>
        </div>
    </section>
</template>

<script>
import $ from 'jquery'

export default {
    props: ['items', 'usaClass'],
    methods: {
        calculateSectionHeight() {
            let items = this.$refs['schemaItem']
            let maxItemHeight = 0
            let columns = 1
            let rows = 0

            for (let item of items) {
                if (item.clientHeight > maxItemHeight) maxItemHeight = item.clientHeight
            }

            if (window.outerWidth >= 992) {
                columns = 3
            } else if (window.outerWidth >= 768) {
                columns = 2
            }

            rows = Math.ceil(items.length / columns)

            return rows * maxItemHeight
        }
    },
    mounted() {
        this.$refs['itemsContainer'].style.height = this.calculateSectionHeight() + 'px'

        window.onresize = () => {
            this.$refs['itemsContainer'].style.height = this.calculateSectionHeight() + 'px'
        }

        $('.work__item').click(function () {
            if ($(window).outerWidth() < 992) {
                if ($(this).hasClass('work__text_open')) {
                    $(this).removeClass('work__text_open')
                } else {
                    $('.work__item').removeClass('work__text_open')
                    $(this).addClass('work__text_open')
                }
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.work {
    position: relative;
    padding-bottom: 0
}

.work--tb {
    background-color: #fff;
}

.work::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 70px;
    background-color: #ececec;
}

.work__title-wrap {
    padding: 80px 10px 150px;
    overflow: hidden
}

.work__title {
    font-family: muller-b, serif;
    color: #ada3a5;
    font-size: 60px;
    line-height: 39px
}

.work__title div {
    font-size: 39px;
    color: #7b6a6e;
    margin-left: 94px
}

.work__title::after {
    background-color: #cc9557;
    left: -2px;
    top: 70px;
    height: 300px;
    width: 48px
}

.work__block {
    position: relative;
    padding-bottom: 80px;
    background-image: url(~static/images/bg-schema-USA.png);
    background-size: 100% 100%;
    color: #fff;
    z-index: 2;
}

.work-USA .work__block {
    background-image: url("~static/images/usa-work.png");
}

.work-EU .work__block {
    background-image: url("~static/images/eu-work.png");
}

.work-georgia .work__block {
    background-image: url("~static/images/georgia-work.png");
}

.work__block::after {
    left: 0
}

.work__block::before {
    border-left: 80px solid rgba(49, 37, 38, .75);
    left: 65%;
    border-right: none;
    z-index: 1
}

.work__block svg {
    bottom: -30px;
    left: calc(65% + 33px);
    z-index: 0
}

.work__block svg line {
    -webkit-transition: all 4s linear;
    transition: all 4s linear
}

.work--tb .svg-wrap {
    z-index: 1;
}

.work--tb .svg-wrap svg {
    position: absolute;
    left: calc(100% - 32px);
    bottom: 0;
    width: calc(100% - 12px);
    height: 200px;
}

.work--tb .svg-wrap svg line:last-child {
    -webkit-transition-delay: .3s;
    transition-delay: .3s;
}

.work__text {
    -webkit-transition: transform ease .3s;
    transition: transform ease .3s;
    padding: 22px;
    font-family: muller-thin, serif;
    width: 100%;
    left: 0;
    right: 0;
    top: calc(100% - 20px);
    font-size: 13px;
    background-image:url(~static/images/blur-es-schema.jpg);
    background-size: cover;
    visibility: hidden;
    opacity: 0;
    transform: rotateX(96deg);
}

.work__text>* {
    opacity: 0;
    -webkit-transition: opacity .1s;
    transition: opacity .1s
}

.work__text p {
    margin-bottom: 15px
}

.work__text-USA {
    -webkit-transition: transform .3s;
    transition: transform .3s;
    padding: 22px;
    font-family: muller-thin, serif;
    width: 100%;
    left: 0;
    right: 0;
    top: calc(100% - 20px);
    font-size: 13px;
    background-image:url(~static/images/blur-schema-usa.jpg);
    background-size: cover;
    opacity: 0;
    transform: rotateX(96deg);
}

.work__text-USA>* {
    opacity: 0;
    -webkit-transition: opacity .1s;
    transition: opacity .1s
}

.work__text-USA p {
    margin-bottom: 22px
}

.work__num {
    font-size: 16px;
    font-family: muller-ultra, serif;
    white-space: nowrap;
    color: #cc9557
}

.work__title-wrap svg {
    top: 0;
    right: 20px;
    width: calc(100% - 307px);
    height: 148px
}

.work__title-wrap svg line:last-child {
    -webkit-transition-delay: .3s;
    transition-delay: .3s
}

.work__title--tb svg {
    top: 55px;
    left: 295px;
    bottom: 0;
    right: 30px;
    width: calc(100% - 307px);
    height: 180px;
}

.work__title--tb svg line:last-child {
    -webkit-transition-delay: 1s;
    transition-delay: 1s
}

.work__about {
    padding: 0 15px;
    font-family: muller-ultra, serif;
    font-size: 16px
}

.work__about span {
    color: #cc9557;
    display: none
}

.work__about span::after {
    border-top: 6px solid rgba(255, 255, 255, .6);
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    bottom: 0;
    left: 150%
}

.work__item {
    padding: 50px 0 35px 40px;
    font-size: 15px;
    perspective: 1000px;
}

.work__item a {
    color: #cc9557
}

.work__item_open .work__about span {
    display: inline-block
}

.work__item:hover {
    z-index: 2
}

.work__item:hover .work__text {
    visibility: visible;
    opacity: 1;
    transform: rotateX(0);
}

.work__item:hover .work__text>* {
    opacity: 1
}

.work__text_open {
    z-index: 2!important
}

.work__text_open .work__text {
    visibility: visible;
    -webkit-transform: scaleY(1)!important;
    transform: scaleY(1)!important
}

.work__text_open .work__text>* {
    opacity: 1!important;
    -webkit-transition: opacity .1s .3s!important;
    transition: opacity .1s .3s!important
}

/* Media queries */
@media screen and (max-width:1300px) {
    .work__text {
        width: 400px;
        left: 0
    }
}

@media screen and (max-width:991px) {
    .work__title-wrap {
        padding-bottom: 80px
    }
    .work__block {
        padding-bottom: 25px;
        background-size: 250% 100%;
    }
    .work__item {
        padding: 30px 0
    }
    .work__item:hover {
        z-index: 0
    }
    .work__item:hover .work__text {
        -webkit-transform: scaleY(0);
        transform: scaleY(0)
    }
    .work__item:hover .work__text>* {
        opacity: 0
    }
    .work__text {
        width: 100%;
        left: 0
    }
    .work__block {
        padding-top: 25px
    }
}

@media screen and (max-width:575px) {
    .work {
        background-size: auto;
    }
    .work__title-wrap {
        padding: 20px 30px 40px
    }
    .work__title-wrap svg {
        right: 30px;
        height: 54px;
        top: -2px;
        width: calc(100% - 174px)
    }
    .work__title-wrap svg line {
        stroke-width: 12px
    }
    .work__title {
        font-size: 25px;
        line-height: 18px
    }
    .work__about {
        line-height: 17px
    }
    .work__title div {
        font-size: 21px;
        color: #7b6a6e;
        margin-left: 33px
    }
    .work__title::after {
        width: 16px;
        top: 21px
    }
    .work__item {
        padding: 15px 0 10px;
        font-size: 14px
    }
    .work__text {
        width: 100%;
        left: 0
    }
    .work__block {
        padding-top: 10px
    }
    .work__block::before {
        border-left-width: 30px
    }
    .work__block svg {
        display: none
    }
}
</style>