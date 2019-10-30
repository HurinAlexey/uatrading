<template>
    <section class="about lazy-bg">
        <div class="container flex jc-sb pos-r ai-fs fd-c-sm">
            <div class="about__title about__title-USA pos-r c-after">
                <p class="opacity left-animate">О нас</p>
                <svg class="svg-animate pos-a" height="10">
                    <line x1="0" y1="5" x2="100%" y2="5" stroke-width="9" stroke="#cc9557"></line>
                </svg>
            </div>
            <div class="about__description pos-r">
                <p>Команда профессионалов с большим опытом работы в сфере внешнеэкономической деятельности.</p> 
                <p>Знаем все о логистике, таможенном оформлении всех видов товаров и транспортных средств. </p> 
                <p>Понимаем что нужно клиенту и как ему сэкономить. </p> 
                <p>Знаем специфику работы таможенных органов и автомобильного рынка.</p>
                <svg class="svg-animate pos-a" width="62" height="250">
                    <line x1="0" y1="5" x2="100%" y2="5" stroke-width="9" stroke="#cc9557"></line>
                    <line x1="100%" y1="1" x2="100%" y2="100%" stroke-width="18" stroke="#cc9557"></line>
                </svg>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.about {
    color: #494846;
    padding: 120px 0 140px;
    background:url(~static/images/cargo.jpg) no-repeat right center;
    background-size: cover;
    overflow: hidden
}

.about__title {
    color: #979797
}

.about__title:after {
    width: 47px;
    height: 187px;
    background-color: #cc9557;
    top: 65px;
    left: 1px
}

.about__title p {
    font-size: 60px;
    font-family: muller-b;
    line-height: 50px
}

.about__title svg {
    top: 20px;
    left: 195px;
    width: 600px
}

.about__description {
    font-size: 17px;
    padding: 0 15px;
    width: 520px;
    font-family: muller-l
}

.about__description p {
    margin-bottom: 20px;
    font-weight: 600
}

.about__description p:last-of-type {
    padding-right: 40px
}

.about__description svg {
    right: -22px;
    top: calc(100% - 38px);
    stroke-dasharray: 0 200%;
    height: calc(100% - 80px);
}

.about__description svg.animate line:nth-child(2) {
    -webkit-transition-delay: .35s;
    transition-delay: .35s
}


/* Media queries */
@media screen and (max-width:1430px) {
    .about__title svg {
        width: 506px
    }
}

@media screen and (max-width:1300px) {
    .about__title svg {
        width: 230px
    }
}

@media screen and (max-width:991px) {
    .about {
        padding-top: 60px
    }
    .about__description {
        width: 360px
    }
    .about__title svg {
        width: 140px
    }
}

@media screen and (max-width:767px) {
    .about__description {
        -webkit-align-self: flex-end;
        -ms-flex-item-align: end;
        align-self: flex-end
    }
    .about__title svg {
        width: 430px
    }
}

@media screen and (max-width:575px) {
    .about {
        padding-top: 30px;
        background-position: 75% -30px
    }
    .about__title {
        margin-bottom: 10px;
    }
    .about__title p {
        font-size: 25px;
        line-height: 20px
    }
    .about__title:after {
        width: 7px;
        height: 460px;
        background-color: #cc9557;
        top: 65px;
        left: 1px
    }
    .about__title svg {
        display: none
    }
    .about__description {
        width: 92%;
        min-width: 250px;
        font-size: 17px
    }
    .about__description p {
        margin-bottom: 30px
    }
    .about__description svg {
        display: none
    }
    .about__description p:last-of-type {
        padding-right: 0
    }
}
</style>