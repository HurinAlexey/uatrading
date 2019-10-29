<template>
  <div id="content">
    <app-header :data="header" />
    <main>

      <div class="problems-wrap">
          <section class="problems">
              <div class="white-text">Опасаетесь проблем при таможенном оформлении?</div>
              <div class="questions">
                  <div class="questions__list-wrap" data-depth="0.05">
                      <ul class="questions__list">
                          <li>Необоснованное повышение таможенной стоимости?</li>
                          <li>Составление протокола о нарушении таможенных правил?</li>
                          <li>Необоснованное изменение кода товара?</li>
                          <li>Коррупционные риски?</li>
                          <li>Затраты при простое транспортного средства?</li>
                      </ul>
                  </div>
                  <div class="questions__list-wrap" data-depth="0.15">
                      <ul class="questions__list text-bg-left">
                          <li>Необоснованное повышение таможенной стоимости?</li>
                          <li>Составление протокола о нарушении таможенных правил?</li>
                          <li>Необоснованное изменение кода товара?</li>
                          <li>Коррупционные риски?</li>
                          <li>Затраты при простое транспортного средства?</li>
                      </ul>
                  </div>
                  <div class="questions__list-wrap" data-depth="0.25">
                      <ul class="questions__list text-bg-right">
                          <li>Необоснованное повышение таможенной стоимости?</li>
                          <li>Составление протокола о нарушении таможенных правил?</li>
                          <li>Необоснованное изменение кода товара?</li>
                          <li>Коррупционные риски?</li>
                          <li>Затраты при простое транспортного средства?</li>
                      </ul>
                  </div>
              </div>
              <div class="white-text text-right">Хотите этого избежать?</div>
          </section>
      </div>

      <app-about />

      <app-advantages :data="advantages" />

      <section class="what pos-r">
          <div class="container">
              <div class="what__title pos-r c-after">
                  <p class="opacity left-animate">Что</p>
                  <p class="what__title_large opacity right-animate">входит</p>
                  <p class="what__title_last opacity left-animate">в услугу?</p>
                  <svg class="svg-animate  pos-a">
                      <line x1="0" y1="5" x2="100%" y2="5" stroke-width="9" stroke="#cc9557"></line>
                      <line x1="100%" y1="5" x2="100%" y2="100%" stroke-width="18" stroke="#cc9557"></line>
                  </svg>
              </div>
          </div>
          <div class="what__block pos-r c-before c-after blk-block-tb">
              <div class="container">
                  <div class="flex fw-w jc-sa">

                      <div class="what__item what__item-tb pos-r c-after w33 w50-md w100-esm">
                          <p>Консультация по любым вопросам таможенного оформления и оптимизации налогообложения</p>
                      </div>
                      <div class="what__item what__item-tb pos-r c-after w33 w50-md w100-esm">
                          <p>Получение разрешительных документов контролирующих органов</p>
                      </div>
      
                      <div class="what__item what__item-tb pos-r c-after w33 w50-md w100-esm">
                          <p>Расчет таможенных платежей</p>
                      </div>
                      <div class="what__item what__item-tb pos-r c-after w33 w50-md w100-esm">
                          <p>Классификация товаров по УКТВЭД</p>
                      </div>
                      <div class="what__item what__item-tb pos-r c-after w33 w50-md w100-esm">
                          <p>Декларирование товаров заказчика таможенным органам</p>
                      </div>                
                      <div class="what__item what__item-tb pos-r c-after w33 w50-md w100-esm">
                          <p>Представление интересов заказчика на всех этапах таможенного оформления</p>
                      </div>
      
                  </div>
              </div>
          </div>
      </section>

      <section class="work">
          <div class="container work__title-wrap pos-r">
              <div class="work__title pos-r c-after">
                  <p class="opacity left-animate">
                      Схема </p>
                  <div class="opacity right-animate">работы</div>                
                  <svg class="svg-animate  pos-a">
                      <line x1="0" y1="5" x2="100%" y2="5" stroke-width="9" stroke="#cc9557"></line>
                      <line x1="100%" y1="5" x2="100%" y2="100%" stroke-width="18" stroke="#cc9557"></line>
                  </svg>
              </div>

          </div>
          <div class="work__block pos-r c-before c-after bl-block-tb">
              <div class="container flex fw-w jc-sa ai-fs pos-r">

                  <div class="work__item flex w35 w50-md w100-sm pos-r">
                      <div class="work__num">
                          Шаг 1
                      </div>
                      <p class="work__about">
                          Заключение договора на оказание услуг и получение документов на груз
                      </p>
                  </div>

                  <div class="work__item flex w35 w50-md w100-sm pos-r">
                      <div class="work__num">
                          Шаг 2
                      </div>
                      <p class="work__about">
                          Анализ документов и определение мер тарифного и нетарифного регулирования
                      </p>
                  </div>

                  <div class="work__item flex w35 w50-md w100-sm pos-r">
                      <div class="work__num">
                          Шаг 3
                      </div>
                      <p class="work__about">
                          Получение разрешительных документов от других контролирующих органов
                      </p>
                  </div>
                  
                  <div class="work__item flex w35 w50-md w100-sm pos-r">
                      <div class="work__num">
                          Шаг 4
                      </div>
                      <p class="work__about">
                          Таможенное оформление груза
                      </p>
                  </div>
                  
              </div>
          </div>

          <div class="container pos-r svg-wrap">
              <svg class="svg-animate pos-a">
                  <line x1="5" y1="0" x2="5" y2="100%" stroke-width="9" stroke="#cc9557"></line>
                  <line x1="1" y1="100%" x2="100%" y2="100%" stroke-width="18" stroke="#cc9557"></line>
              </svg>
          </div>
      </section>

      <app-consultation :title="consultationTitle" />
      
    </main>
    <app-footer :data="footer" />
  </div>
</template>

<script>
import Parallax from 'parallax-js'
import AppHeader from '@/components/Header.vue'
import AppAbout from '@/components/section/About.vue'
import AppAdvantages from '@/components/section/Advantages.vue'
import AppConsultation from '@/components/section/Consultation.vue'
import AppFooter from '@/components/Footer.vue'

export default {
  components: {
    AppHeader,
    AppAbout,
    AppAdvantages,
    AppConsultation,
    AppFooter
  },
  data() {
    return {
      header: {
        title: 'Таможенно-брокерские услуги',
        subtitle: 'Грамотные решения для внешнеэкономической деятельности',
        backImage: 'images/tb-bg.jpg',
        frontImage: 'images/dude.png',
        usaBackground: true,
        multilang: true,
        showAboutImport: false,
        bannerLinks: [
          {title: 'Товары', href: '/'},
          {title: 'Автомобили', href: '/usa'}
        ]
      },
      advantages: {
        backgroundImage: 'images/tb-why.png',
        items: [
          {
            icon: 'images/why-2.png',
            text: 'Более 10 лет опыта работы в сфере внешнеэкономической деятельности'
          },
          {
            icon: 'images/why-4.png',
            text: 'Оплата услуг после качественного их выполнения'
          },
          {
            icon: 'images/why-1.png',
            text: 'Представление интересов клиента на всех этапах таможенного оформления'
          },
          {
            icon: 'images/why-3.png',
            text: 'Таможенное оформление любого груза «под ключ» за день'
          },
          {
            icon: 'images/why-7.png',
            text: 'Выгодные условия для постоянных клиентов'
          },
          {
            icon: 'images/why-5.png',
            text: 'Доступная цена услуг (у нас нет скрытых и дополнительных платежей)'
          },
          {
            icon: 'images/why-6.png',
            text: 'Помощь в оптимизации налогообложения'
          }
        ]
      },
      consultationTitle: 'Нужен надежный таможенный брокер?',
      footer: {
        slogan: 'Мы не решаем проблем – мы их не допускаем!',
        backgroundImage: 'images/footer-tb.jpg'
      }
    }
  },
  async asyncData({store}) {
      let meta = await store.dispatch('meta/fetchByPageName', 'index')
      if(!meta) {
        meta = {
          title: 'UBTrading',
          description: 'Таможено-брокерскик услуги.',
          keywords: ''
        }
      }
      return {meta}
  },
  head() {
      return {
          title: this.meta.title,
          meta: [
            { hid: 'description', name: 'description', content: this.meta.description },
            { hid: 'keywords', name: 'keywords', content: this.meta.keywords }
          ]
      }
  },
  mounted() {
    const questionsScene = document.getElementsByClassName('questions')[0]
    const questionsParallaxInstance = new Parallax(questionsScene)
  }
}
</script>

<style lang="scss" scoped>
.problems {
    position: relative;
    padding: 35px 0;
    overflow: hidden;
    background-color: #ececec;
    background-image:url(~static/images/questions-bg.png);
    background-size: cover;
}

.problems-wrap {
    position: relative;
}

.problems-wrap::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    display: block;
    border: 40px solid transparent;
    border-top-color: #1f1b1e;
    transform: translateX(-50%);
    z-index: 2;
}

.problems .white-text {
    font-family: NokiaPureText_Lt;
    font-size: 20px;
    color: #fff;
    margin-left: 40px;
}

.problems .white-text.text-right {
    margin-left: 0;
    margin-right: 40px;
    text-align: right;
}

.problems .questions {
    position: relative;
    margin: 40px auto;
    font-family: muller-b;
    text-align: center;
    color: #cc9557;
}
.problems .questions__list {
    display: block;
}
.problems .questions__list.text-bg-left {
    opacity: .2;
    transform: translate(-35%, 70px);
}
.problems .questions__list.text-bg-right {
    opacity: .2;
    transform: translate(35%, -70px);
}
.problems .questions__list-wrap {
    display: block;
    width: 100%;
}
.problems .questions__list li:nth-of-type(1) {
    font-size: 13px;
    transform: translateX(100px);
}
.problems .questions__list li:nth-of-type(2) {
    font-size: 18px;
    transform: translateX(-120px);
}
.problems .questions__list li:nth-of-type(3) {
    font-size: 22px;
}
.problems .questions__list li:nth-of-type(4) {
    font-size: 14px;
    transform: translateX(180px);
}
.problems .questions__list li:nth-of-type(5) {
    font-size: 16px;
    transform: translateX(-100px);
}

.work {
    position: relative;
    padding-bottom: 0;
    background-color: #fff;
}

.work::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 55px;
    background-color: #ececec;
}

.work__title-wrap {
    padding: 80px 10px 150px;
    overflow: hidden
}

.work__title {
    font-family: muller-b;
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
    padding: 40px 0;
    background-image: url(~static/images/schema-tb.png);
    background-size: 100% 100%;
    color: #fff;
    z-index: 2;
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

.work .svg-wrap {
    z-index: 1;
}

.work .svg-wrap svg {
    position: absolute;
    left: calc(100% - 32px);
    bottom: 0;
    width: calc(100% - 12px);
    height: 200px;
}

.work .svg-wrap svg line:last-child {
    webkit-transition-delay: .3s;
    transition-delay: .3s;
}

.work__text {
    -webkit-transition: transform ease .3s;
    transition: transform ease .3s;
    padding: 22px;
    font-family: muller-thin;
    width: 100%;
    left: 0;
    right: 0;
    top: calc(100% - 20px);
    font-size: 13px;
    background-image:url(~static/images/blur-es-schema.jpg);
    background-size: cover;
    opacity: 0;
    transform: rotateX(96deg);
}

.work__text>* {
    opacity: 0;
    -webkit-transition: opacity .1s;
    transition: opacity .1s
}

.work__text p {
    margin-bottom: 22px
}

.work__num {
    font-size: 16px;
    font-family: muller-ultra;
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

.work__title svg {
    top: 55px;
    left: 295px;
    bottom: 0;
    right: 30px;
    width: calc(100% - 307px);
    height: 180px;
}

.work__title svg line:last-child {
    -webkit-transition-delay: 1s;
    transition-delay: 1s
}

.work__about {
    padding: 0 15px;
    font-family: muller-ultra;
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

@media screen and (max-width:767px) {
    .problems .questions {
        margin: 20px auto;
    }
    .problems .questions__list.text-bg-left,
    .problems .questions__list.text-bg-right {
        display: none
    }
    .problems .questions__list li:nth-of-type(1) {
        transform: translateX(80px);
    }
    .problems .questions__list li:nth-of-type(2) {
        transform: translateX(-30px);
    }
    .problems .questions__list li:nth-of-type(3) {
        transform: translateX(50px);
    }
    .problems .questions__list li:nth-of-type(4) {
        transform: translateX(150px);
    }
    .problems .questions__list li:nth-of-type(5) {
        transform: translateX(-80px);
    }

    .work__block {
        background-size: cover;
    }
}

@media screen and (max-width:575px) {
    .work {
        padding-bottom: 25px;
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
        line-height: 20px
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
    .work__block .container {
        padding-top: 10px
    }
    .work__block::before {
        border-left-width: 30px
    }
    .work__block svg {
        display: none
    }

    .problems .white-text {
        font-size: 16px;
        margin-left: 10px;
    }
    .problems .white-text.text-right {
        margin-right: 10px;
    }
    .problems .questions {
        margin: 10px auto;
    }
    .problems .questions__list {
        padding: 0 5px;
    }
    .problems .questions__list li:nth-of-type(1) {
        font-size: 11px;
        text-align: right;
        transform: translateX(0);
    }
    .problems .questions__list li:nth-of-type(2) {
        font-size: 15px;
        text-align: left;
        transform: translateX(0);
    }
    .problems .questions__list li:nth-of-type(3) {
        font-size: 19px;
        transform: translateX(0);
    }
    .problems .questions__list li:nth-of-type(4) {
        font-size: 12px;
        text-align: right;
        transform: translateX(0);
    }
    .problems .questions__list li:nth-of-type(5) {
        font-size: 14px;
        text-align: left;
        transform: translateX(0);
    }
}
</style>
