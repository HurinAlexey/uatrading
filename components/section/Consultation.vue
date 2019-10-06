<template>
    <section class="help pos-r">
        <svg class="svg-animate pos-a help__svg_1" height="80">
            <line x1="0" y1="5" x2="100%" y2="5" stroke-width="9" stroke="#cc9557"></line>
            <line x1="100%" y1="1" x2="100%" y2="100%" stroke-width="100" stroke="#cc9557"></line>
        </svg>
        <div class="help__container pos-r c-after c-before blak-block">
            <div class="help__wrap">
                <div class="help__title">{{ title }}</div>

                <a href="#" class="inl-block btn t-center" @click.prevent="showForm">Получить бесплатную консультацию</a>
            </div>
        </div>
        <img src="images/new-success.png" alt="consultation" class="help__img pos-a">
    </section>
</template>

<script>
export default {
    props: ['title'],
    methods: {
        showForm() {
            this.$root.$emit('toggleform', true)
        }
    }
}
</script>

<style lang="scss" scoped>
.help {
    padding: 195px 0 280px;
    overflow: hidden
}

.help>img {
    right: 0;
    top: 269px;
    left: calc(50vw + 150px);
    height: auto;
    width: calc(50vw - 150px)
}

.help__svg_1 {
    width: calc(50% + 25px);
    right: calc(50% - 25px);
    top: 116px;
    height: 710px
}

.help__svg_1 line:first-child {
    -webkit-transition: all 1.5s;
    transition: all 1.5s
}

.help__svg_1 line:last-child {
    -webkit-transition: all 1.8s .5s linear;
    transition: all 1.8s .5s linear
}

.help__svg_2 {
    bottom: 0;
    right: calc(50% - 25px)
}

.help__svg_2 line {
    -webkit-transition: all 1s 1.3s linear;
    -webkit-transition: all 1.5s 2s linear;
    transition: all 1.5s 2s linear
}

.help__svg_3 {
    left: calc(50vw + 250px);
    bottom: 143px
}

.help__svg_3 line:last-child {
    -webkit-transition: all 4s .3s linear;
    transition: all 4s .3s linear
}

.help__container {
    padding: 50px 0 0 0;
    width: 100%;
    height: 350px;
    background-size: cover!important;
    background-image:url(~static/images/bg-help.png);
    background-repeat: no-repeat;
    background-color: #ececec
}

.help__wrap {
    padding: 10px 100px 0 100px
}

.help__title {
    font-family: muller-ultra;
    font-size: 32px;
    line-height: 50px;
    padding-left: 20px;
    color: #fff;
    border-left: 2px solid #cc9557;
    margin-bottom: 60px
}

.help .btn {
    margin-left: 100px;
    font-size: 21px;
    padding: 6px 15px;
    -webkit-transition: all .5s;
    transition: all .5s
}

.help .btn:hover {
    background: rgba(204, 139, 78, .7);
    -webkit-transition: all .5s;
    transition: all .5s
}


/* Media queries */
@media screen and (max-width:1700px) {
    .help__container {
        background-size: contain
    }
}

@media screen and (max-width:1367px) {
    .help__svg_2 {
        height: 287px
    }
}

@media screen and (max-width:1281px) {
    .help__container {
        padding-bottom: 45px;
        padding-right: 100px
    }
    .help__svg_2 {
        height: 308px
    }
}

@media screen and (max-width:991px) {    
    .help {
        padding: 100px 0
    }
    .help__svg_1 {
        top: 20px
    }
    .help__svg_2 {
        height: 100px
    }
    .help__svg_3 {
        bottom: 50px
    }
    .help__container::before {
        display: none
    }
    .help>img {
        left: calc(50vw + 80px);
        width: calc(50vw - 80px);
        top: 150px
    }
    .help .btn {
        margin: 0
    }
}

@media screen and (max-width:767px) {
    .help {
        padding-bottom: 40vw
    }
    .help__title {
        font-size: 24px;
        line-height: 28px;
        padding-left: 15px
    }
    .help>img {
        top: initial;
        width: 60vw;
        left: 40vw;
        bottom: 100px
    }
    .help__container {
        padding-right: 10px;
        padding-bottom: 70px
    }
    .help__svg_2 {
        right: 70vw;
        height: 40vw
    }
    .help__svg_1 {
        right: 70vw
    }
    .help__svg_3 {
        left: 50vw;
        height: 100px
    }
    .help .btn {
        font-size: 14px;
        border-width: 1px;
        padding: 5px 8px
    }
}

@media screen and (max-width:575px) {
    .help {
        padding-top: 30px;
        padding-bottom: 50vw
    }
    .help .container {
        padding: 0
    }
    .help__svg_1 {
        display: none
    }
    .help__svg_2 {
        right: 80vw;
        width: 25px;
        height: 50vw
    }
    .help__svg_2 line {
        stroke-width: 32px
    }
    .help__svg_3 {
        bottom: 46px;
        left: 58vw
    }
    .help__svg_3 line {
        stroke-width: 12px
    }
    .help__svg_3 line:first-child {
        stroke-width: 6px
    }
    .help__container {
        width: 100%;
        padding: 30px 14px 60px
    }
    .help__title {
        margin-bottom: 25px;
        line-height: 32px
    }
    .help>img {
        bottom: 77px;
        width: 70vw
    }
}
</style>