<template>
    <footer 
        class="footer footer--tb pos-r"
        :style="{backgroundImage: `url(${data.backgroundImage})`}"
    >
        <nav class="footer__nav">
            <div class="container">
                    <ul class="footer__menu flex fw-w jc-sa">
                        <li 
                            v-for="(link, index) of links"
                            :key="index"
                            class="footer__menu-item"
                        >
                            <nuxt-link v-if="link.href" :to="link.href">{{link.title}}</nuxt-link>
                            <span v-if="!link.href && link.onclick" @click="link.onclick">{{link.title}}</span>
                        </li>
                    </ul>
            </div>
        </nav>
        <div class="flex jc-sb footer__top fd-cr-sm ai-c-sm">
            <div class="footer__logo">Ⓒ UBTrading.ltd</div>
            <div class="footer__reestr">
                <p>ООО “Укрброк Трейдинг”<br>
                    реестр таможенных брокеров<br>
                    серия АА 000652
                </p>
            </div>
            <div class="footer__item-wrap"></div>
            <div class="footer__contacts footer__item-wrap flex jc-fe jc-c-sm">
                <div>
                    <div class="flex ai-c footer__item footer__change-pos">
                        <svg viewBox="0 0 27.442 27.442" width="22" height="22">
                            <path d="M19.494,0H7.948C6.843,0,5.951,0.896,5.951,1.999v23.446c0,1.102,0.892,1.997,1.997,1.997h11.546
            c1.103,0,1.997-0.895,1.997-1.997V1.999C21.491,0.896,20.597,0,19.494,0z M10.872,1.214h5.7c0.144,0,0.261,0.215,0.261,0.481
            s-0.117,0.482-0.261,0.482h-5.7c-0.145,0-0.26-0.216-0.26-0.482C10.612,1.429,10.727,1.214,10.872,1.214z M13.722,25.469
            c-0.703,0-1.275-0.572-1.275-1.276s0.572-1.274,1.275-1.274c0.701,0,1.273,0.57,1.273,1.274S14.423,25.469,13.722,25.469z
            M19.995,21.1H7.448V3.373h12.547V21.1z"></path>
                        </svg>
                        <div class="footer__tel">
                            <a href="tel_3A+380939580034" class="block">+38 (093) 958 00 34</a>
                            <a href="tel_3A+380967609069" class="block">+38 (096) 760 90 69</a>
                        </div>
                    </div>
                    <div class="flex ai-c footer__item">
                        <svg viewBox="0 0 512 512" width="16" height="16">
                            <path d="M448,64H64C28.656,64,0,92.656,0,128v256c0,35.344,28.656,64,64,64h384c35.344,0,64-28.656,64-64V128
            C512,92.656,483.344,64,448,64z M342.656,234.781l135.469-116.094c0.938,3,1.875,6,1.875,9.313v256
            c0,2.219-0.844,4.188-1.281,6.281L342.656,234.781z M448,96c2.125,0,4,0.813,6,1.219L256,266.938L58,97.219
            C60,96.813,61.875,96,64,96H448z M33.266,390.25C32.828,388.156,32,386.219,32,384V128c0-3.313,0.953-6.313,1.891-9.313
            L169.313,234.75L33.266,390.25z M64,416c-3.234,0-6.172-0.938-9.125-1.844l138.75-158.563l51.969,44.531
            C248.578,302.719,252.297,304,256,304s7.422-1.281,10.406-3.875l51.969-44.531l138.75,158.563C454.188,415.062,451.25,416,448,416
            H64z"></path>
                        </svg>
                        <div>
                            <a href="mailto:info@ubtrading.com.ua" class="block">info@ubtrading.com.ua</a>
                        </div>
                    </div>
                    <div class="flex ai-c footer__item">
                        <svg viewBox="0 0 491.86 491.86" width="16" height="16" style="transform: scaleX(-1); margin-top: -6px">
                            <polygon points="250.354,205.709 0,205.709 0,232.497 21.404,232.497 21.404,476.057 198.398,476.057
                198.398,232.497 250.354,232.497         "></polygon>
                            <path d="M379.818,327.33c0.046,0,0.129,0.03,0.183,0.03c32.649,0.951,51.284-8.78,54.174-34.646
                l13.244-119.099c2.47-22.19-15.224-39.122-32.9-45.6l-0.143-0.046c0,0-6.303-2.05-12.067-2.836
                c-6.008-0.801-11.922,0.282-11.922,0.282c-13.808,1.61-27.448,11.374-27.448,11.374c-25.395,18.087-64.764,21.995-117.099,11.602
                c-13.166-2.649-25.965,5.946-28.58,19.107c-2.616,13.164,5.938,25.955,19.106,28.572c21.94,4.375,42.346,6.539,61.17,6.539
                c17.107,0,32.475-1.894,46.921-5.497l-0.115,1.68l-8.44,75.909c-44.21,1.597-72.062,10.705-82.979,27.249
                c-14.765,22.482-38.754,113.12-45.75,140.925c-3.616,14.363,5.113,28.938,19.478,32.563c2.185,0.549,4.39,0.823,6.561,0.823
                c12.004,0,22.952-8.122,26.008-20.285c12.329-48.979,29.363-99.745,37.141-115.817
                C302.805,326.181,345.436,325.437,379.818,327.33z"></path>
                            <circle cx="395.883" cy="67.804" r="54.305"></circle>
                            <path d="M484.646,274.65l7.213-93.507c0.019-0.53-0.18-1.045-0.548-1.427
                c-0.369-0.382-0.876-0.598-1.407-0.598h-29.679c-1.054,0-1.918,0.834-1.956,1.888l-6.706,93.575
                c-0.883,28.85-9.383,64.332-57.84,64.332c-0.687,0-53.585-0.119-53.585-0.119c-0.001,0-0.001,0-0.001,0
                c-0.52,0-1.016,0.206-1.384,0.572c-0.366,0.367-0.573,0.866-0.573,1.385v28.914c0,1.081,0.876,1.957,1.957,1.957l48.645-0.002
                v66.461h-15.273c-19.994,0-36.885,17.552-36.885,38.325c0,1.081,0.876,1.956,1.956,1.956h19.266c1.081,0,1.957-0.875,1.957-1.956
                c0-7.642,6.272-14.098,13.698-14.098h63.341c7.43,0,13.706,6.456,13.706,14.098c0,1.081,0.877,1.956,1.957,1.956h19.273
                c1.08,0,1.956-0.875,1.956-1.956c0-20.773-16.895-38.325-36.893-38.325h-15.259v-70.026
                C469.347,366.764,480.43,319.431,484.646,274.65z"></path>
                            <path d="M203.534,177.154h-91.717L80.775,63.399c-0.219-0.8-1.043-1.273-1.842-1.052l-16.552,4.516
                c-0.384,0.105-0.71,0.358-0.907,0.703c-0.198,0.346-0.25,0.755-0.145,1.139L96.12,196.193c0.178,0.652,0.771,1.105,1.447,1.105
                h105.968c0.829,0,1.5-0.671,1.5-1.5v-17.145C205.034,177.825,204.363,177.154,203.534,177.154z"></path>
                        </svg>
                        <div>
                            Киев
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer__bottom">
            <div class="think">
                <p class="think__descr opacity left-animate">{{data.slogan}}</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
            links: [
                {
                    title: 'Автомобильный блог', 
                    href: '/blog'
                },
                {
                    title: 'Таможенный калькулятор 2019',
                    onclick() {
                        console.log('some logic')
                    }
                },
                {
                    title: 'Калькулятор доставки авто с США',
                    onclick() {
                        console.log('some logic')
                    }
                },
                {
                    title: 'Таможенно-брокерские услуги',
                    href: '/'
                },
                {
                    title: 'Автомобили с США',
                    href: '/usa'
                },
                {
                    title: 'Автомобили с Грузии',
                    href: '/georgia'
                },
                {
                    title: 'Автомобили с ЕС',
                    href: '/eu'
                }
            ]
        }
    },
    mounted() {
        this.links = this.links.filter(item => item.href !== this.$route.path)
    }
}
</script>

<style lang="scss" scoped>
.footer {
    background:url(~static/images/footer-bg.jpg) no-repeat center;
    background-size: cover;
    color: #fff;
    fill: #fff
}

.footer__top {
    padding: 20px 50px 0
}

.footer__logo {
    position: absolute;
    top: calc(75% + 39px);
    left: 50px;
    font-family: muller-ultra;
    color: #bdbdbd;
}

.footer__reestr {
    position: absolute;
    top: calc(75% - 3px);
    left: 50%;
    width: 240px;
    text-align: center;
    font-family: muller-ultra;
    color: #bdbdbd;
    transform: translate(-50%, 0);
}

.footer__item-wrap {
    width: 50%;
}

.footer__nav {
    font-family: muller-ultra;
    padding: 0;
    line-height: 20px;
    background-color: #000;
}

.footer__menu-column {
    width: 50%;
    padding-right: 10px;
}

.footer__menu-item {
    padding: 10px;
}

.footer__menu-item span {
    cursor: pointer;
}

.footer__menu-item a:hover,
.footer__menu-item span:hover {
    color: #cc9557;
}

.footer__contacts {
    font-size: 12px
}

.footer__contacts svg {
    margin-right: 10px
}

.footer__item {
    margin-bottom: 10px;
    font-family: muller-thin
}

.footer__change-pos {
    position: relative;
    left: -4px
}

.footer__tel a {
    padding: 2px 0;
    font-size: 14px;
    line-height: 16px
}

.footer__bottom {
    padding: 15px 0 161px
}

.think {
    background-color: rgba(196, 196, 196, .3);
    padding: 10px 10px 5px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-top: 20px
}

.think__descr {
    font-family: NokiaPureHeadline;
    font-size: 25px;
    padding-bottom: 5px;
    color: #bdbdbd
}

/* Media queries */


@media screen and (max-width:767px) {
    .footer {
        background:url(~static/images/footer-bg-mob.png) no-repeat center top;
        background-size: cover
    }
    .footer__menu {
        display: none;
    }
    .footer__item {
        width: 240px;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center
    }
    .footer__bottom {
        padding: 0 0 100px;
    }
    .footer__reestr {
        margin-top: 15px;
        font-size: 10px;
    }
    .think {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center
    }
    .think__descr {
        font-size: 14px
    }
}

@media screen and (max-width:575px) {
    .footer__bottom {
        padding-bottom: 130px;
    }
    .footer__reestr {
        margin-top: 0;
        top: calc(75% - 20px);
    }
}
</style>