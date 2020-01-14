<template>
  <div id="content">
    <LazyHydrate when-visible>
        <app-header :data="header" />
    </LazyHydrate>
    <main>
        
      <LazyHydrate when-visible>
          <app-about />
      </LazyHydrate>
      
      <LazyHydrate when-visible>
          <app-advantages :data="advantages" />
      </LazyHydrate>

      <div class="cars-bg lazy-bg">
        
        <section class="what pos-r">
            <div class="container">
                <div class="what__title pos-r c-after">
                    <p class="opacity left-animate">Почему</p>
                    <p class="what__title_large opacity right-animate">автомобили</p>
                    <p class="what__title_last opacity left-animate">с Грузии?</p>
                    <svg class="svg-animate  pos-a">
                        <line x1="0" y1="5" x2="100%" y2="5" stroke-width="9" stroke="#cc9557"></line>
                        <line x1="100%" y1="5" x2="100%" y2="100%" stroke-width="18" stroke="#cc9557"></line>
                    </svg>
                </div>
            </div>

            <div class="what__block pos-r c-before c-after blk-block blk-block-georgia lazy-bg">
                <div class="container flex fw-w jc-fe">
                    <div class="what__item pos-r c-after w33 w50-md w100-esm">
                        <h4>Большой выбор</h4>
                        <p>авторынок <a href="https://autopapa.ge/ru/page/about?currency=usd" target="_blank">AUTOPAPA</a> 
                          самый большой и современный авторынок на Кавказе, общая площадь  которого составляет  
                          225 тыс. квадратных метров, вместимостью 5000 автомобилей с Кореи, ЕС, аукционов США</p>
                    </div>
                    <div class="what__item pos-r c-after w33 w50-md w100-esm">
                        <h4>Таможенная оценка</h4>
                        <p>методика контроля таможенной стоимости автомобилей с Грузии таможней 
                          достаточно прозрачна, что существенно минимизирует риск повышение таможенной стоимости 
                          при таможенном оформлении</p>
                    </div>
                    <div class="what__item pos-r c-after w33 w50-md w100-esm">
                        <h4>Восстановленные авто</h4>
                        <p>в отличии от большинства авто с США, авто с Грузии импортируются в 
                          Украину уже отремонтированными. На территории авторынка можно провести тест драйв, полную 
                          диагностику авто в СТО, а также самостоятельно проверить состояние автомобиля до ремонта 
                          по базах данным <a href="https://autoastat.com/" target="_blank">AUTOASTAT</a>, 
                          <a href="https://autoauctions.io/" target="_blank">AUTOAUCTIONS</a>, 
                          <a href="https://www.carfax.eu/" target="_blank">CARFAX</a></p>
                    </div>
                    <div class="what__item pos-r c-after w33 w50-md w100-esm">
                        <h4>Хорошая цена</h4>
                        <p>экономия в сравнении с рынком Украины до 40%</p>
                    </div>
                    <div class="what__item pos-r c-after w33 w50-md w100-esm">
                        <h4>Быстрая логистика</h4>
                        <p>в отличие от авто с США, доставка в Украину 
                          осуществляется всего за два дня</p>
                    </div>

                    <div class="what__item pos-r c-after w33 w50-md w100-esm">
                        <h4>Богатая комплектация</h4>
                        <p>практически все автомобили в хорошей комплектации</p>
                    </div>
                </div>
            </div>

            <svg class="svg-animate work__svg pos-a">
                <line x1="100%" y1="-100" x2="100%" y2="100%" stroke-width="18" stroke="#cc9557"></line>
                <line x1="100%" y1="100%" x2="0" y2="100%" stroke-width="18" stroke="#cc9557"></line>

            </svg>
        </section>
        
        <LazyHydrate when-visible>
            <app-working-schema :items="schemaItems" class="work-georgia" :usaClass="true" />
        </LazyHydrate>

      </div>

      <LazyHydrate when-visible>
          <app-blog :posts="blogPosts" />
      </LazyHydrate>

      <LazyHydrate when-visible>
          <app-consultation :title="consultationTitle" class="help-georgia" />
      </LazyHydrate>
      
    </main>
    <LazyHydrate when-visible>
        <app-footer :data="footer" />
    </LazyHydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'

export default {
  components: {
    LazyHydrate,
    AppHeader: () => import('@/components/Header.vue'),
    AppAbout: () => import('@/components/section/About.vue'),
    AppAdvantages: () => import('@/components/section/Advantages.vue'),
    AppWorkingSchema: () => import('@/components/section/WorkingSchema.vue'),
    AppBlog: () => import('@/components/section/Blog.vue'),
    AppConsultation: () => import('@/components/section/Consultation.vue'),
    AppFooter: () => import('@/components/Footer.vue')
  },
  data() {
    return {
      header: {
        title: 'Таможенно-брокерские услуги',
        subtitle: 'Профессиональное таможенное оформление и сертификация автомобилей с Грузии «под ключ»',
        backImage: {
            desktop: 'images/georgia-bg-main.jpg',
            mobile: 'images/georgia-bg-main-mob.jpg'
        },
        georgiaBackground: true,
        multilang: false,
        showAboutImport: true,
        bannerLinks: [
          {title: 'США', href: '/usa'},
          {title: 'Грузия', href: '/georgia'},
          {title: 'Евросоюз', href: '/eu'}
        ]
      },
      advantages: {
        backgroundImage: 'images/georgia-bg.png',
        items: [
          {
            icon: 'images/about-USA-11.png',
            text: 'Является лицензированным <a href="http://sfs.gov.ua/dovidniki--reestri--perelik/reestri/94921.html"> <br>таможенным брокером</a>'
          },
          {
            icon: 'images/why-4.png',
            text: 'Минимизируем риски повышения таможенной стоимости'
          },
          {
            icon: 'images/why-8.png',
            text: 'На счету более тысячи растаможенных авто'
          },
          {
            icon: 'images/about-USA-1.png',
            text: 'Более 10 лет опыта работы в сфере внешнеєкономической деятельности'
          },
          {
            icon: 'images/about-USA-7.png',
            text: 'Доступная цена услуг (у нас нет скрытых и дополнительных платежей)'
          },
          {
            icon: 'images/about-USA-10.png',
            text: 'Официальные юридические отношения с клиентами'
          },
          {
            icon: 'images/about-USA-3.png',
            text: 'Таможенное оформление любого автомобиля всего за 3 часа'
          },
          {
            icon: 'images/about-USA-9.png',
            text: 'Особые условия для постоянных и системных клиентов'
          }
        ],
        withSvg: true
      },
      schemaItems: [
          {
              title: 'Перед покупкой автомобиля',
              text: `<p>Проверить соответствие автомобиля экологическим нормам (не ниже ЕВРО 2 – для б/у 
                      легковых автомобилей, не ниже ЕВРО 5 – для новых легковых и грузовых автомобилей)</p>
                    <p>Проверить текущее техническое состояние автомобиля воспользовавшись местными СТО</p>
                    <p>Проверить состояние автомобиля до ремонта на основе данных интернет-сайтов результатов 
                      торгов с аукционов США <a href="https://autoastat.com/" target="_blank">AUTOASTAT</a>, 
                      <a href="https://autoauctions.io/" target="_blank">AUTOAUCTIONS</a> (в течении года хранятся 
                      данные о результатах торгов, цене покупки, фото автомобиля на момент торгов со всеми видимыми повреждениями)</p>
                    <p>Проверить всю страховую историю автомобиля на основе данных Министерства юстиции США 
                      <a href="https://www.carfax.eu/" target="_blank">CARFAX</a></p>
                    <p>Узнать цену покупки авто в США перекупщиками с Грузии на основе данных интернет-сайтов 
                      <a href="https://autoastat.com/" target="_blank">AUTOASTAT</a>,  
                      <a href="https://autoauctions.io/" target="_blank">AUTOAUCTIONS</a> для понимания 
                      адекватности цены продажи вам автомобиля</p>
                    <p>Узнать ориентировочную цену автомобиля происхождением с ЕС на основе цен на аналогичные 
                      авто с автоплощадок <a href="https://www.mobile.de/" target="_blank">MOBILE</a>, 
                      <a href="https://www.autoscout24.com/" target="_blank">AUTOSCOUT24</a> для понимания адекватности 
                      цены продажи вам автомобиля</p>
                    <p>Уточнить в таможенного брокера в Украине точную сумму таможенных платежей подлежащих 
                      оплате в госбюджет при таможенном оформлении</p>
                    <p>Просчитать рентабельность сделки с учетом цены продажи авто в Грузии, логистики, 
                      таможенных платежей, сертификации автомобиля, платежей при постановке на учет в органах 
                      полиции, стоимости аналогичных автомобилей на рынке Украины, других сопутствующих затрат на покупку авто</p>`
          },
          {
              title: 'Перед пересечением границы',
              text: `<p>ЗЗаключить с таможенным брокером договор на право декларирования товаров 
                      клиента перед таможенными органами Украины</p>
                    <p>Расчет таможенных платежей таможенным брокером (с учетом таможенных 
                      оформлений аналогичных авто и данных аукционов США)</p>
                    <p>Оплата таможенных платежей непосредственно на расчетный счет таможни собственником 
                      автомобиля (оплата проводится собственником авто либо лицом по доверенности через кассу 
                      банка или онлайн банкинг, а также любым лицом через терминал банка непосредственно на 
                      расчетный счет таможни, в которой планируется таможенное оформление</p>
                    <p>Оформление таможенным брокером предварительной декларации (ПД), на основе которой 
                      должностное лицо таможни осуществляет пропуск автомобиля на территорию Украины</p>`
          },
          {
              title: 'Пересечение границы Украины',
              text: `<p>Воспользоваться экспедиционными услугами в порту (если автомобиль следует 
                        самостоятельно без сопровождения)</p>
                    <p>Назвать номер предварительной декларации инспектору таможни</p>
                    <p>Пройти процедуру пропуска на таможенную территорию Украины (таможенный досмотр, 
                        подписания акта досмотра, взятие обязательства о доставке авто, получение документов 
                        с отметками таможни)</p>`
          },
          {
              title: 'Перед таможенным оформлением',
              text: `<p>Получить от <a href="https://mtu.gov.ua/content/perelik-priznachenih-organiv-iz-sertifikacii-kolisnih-transportnih-zasobiv.html" target="_blank">уполномоченных органов</a> 
                        сертификат или справку на соответствие транспортного средства экологическим нормам</p>
                    <p>Доставить автомобиль в зону таможенного контроля внутренней таможни, в которой проводилось 
                        оформление предварительной декларации (ПД), на протяжении установленных законодательством 
                        10 календарных дней с момента пересечения границы</p>`
          },
          {
              title: 'Документы для таможенного оформления',
              text: `<p>Подтверждение права собственности на автомобиль (договор купли-продажи (контракт)</p>
                    <p>Подтверждение стоимости автомобиля (договор купли-продажи (контракт) или инвойс 
                      (счет-фактура) – обязательные; экспортная таможенная декларация, SWIFT платёж – не 
                      обязательные)</p>
                    <p>Подтверждение соответствия автомобиля экологичным нормам в Украине (сертификат соответствия 
                      или справка от <a href="https://mtu.gov.ua/content/perelik-priznachenih-organiv-iz-sertifikacii-kolisnih-transportnih-zasobiv.html" target="_blank">
                      уполномоченных органов</a>)</p>
                    <p>Документы на автомобиль (техпаспорт – для б/у авто)</p>
                    <p>Документы на собственника автомобиля (паспорт, код ИНН, нотариальная доверенность (в случае 
                      пересечения границы лицом по доверенности)</p>`
          },
          {
              title: 'Таможенное оформление',
              text: `<p>Декларирование таможенным брокером таможенному органу автомобиля, на основании полученных 
                        от клиента документов, путем подачи таможенной декларации и предусмотренных законодательством 
                        документов</p>
                    <p>Прохождение таможенного досмотра и других этапов таможенного оформления</p>
                    <p>Получить в таможне заверенную оформленную таможенную декларацию и документ на право 
                        регистрации в органах полиции после завершения таможенного оформления.</p>`
          }
      ],
      consultationTitle: 'Нужна квалифицированная помощь?',
      footer: {
        slogan: 'Пока вы думаете, остальные уже ездят!',
        // backgroundImage: 'images/footer-bg-georgia.jpg'
        backgroundImage: 'images/demo-footer.jpg'
      }
    }
  },
  async asyncData({store}) {
    let meta = await store.dispatch('meta/fetchByPageName', 'georgia')
    if(!meta) {
      meta = {
        title: 'UBTrading',
        description: 'Таможено-брокерскик услуги.',
        keywords: ''
      }
    }
    let {posts} = await store.dispatch('post/fetchByPageNumber', 1)
    posts = posts.slice(0, 4)
    return {meta, blogPosts: posts}
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
    document.querySelector('body').classList.remove('body-fix')
  }
}
</script>

<style lang="scss" scoped>
.work__svg {
  height: 158px;
}

@media screen and (max-width: 1920px) {
  .work__svg {
    height: 158px;
  }
}

@media screen and (max-width: 1240px) {
  .what__box-first,
  .what__box-second {
    width: 100%;
  }
  .what__box-second .what__item {
    max-width: 650px;
  }
}

@media screen and (max-width: 991px) {
  .what__box-second {
    justify-content: flex-start;
  }
  .what__box-second .what__item {
    width: 66%;
  }
  .what__block {
    background-size: 200% 100%;
    background-position: right;
  }
}

@media screen and (max-width: 767px) {
  .what__box-second .what__item {
    width: 100%;
  }
  .what__block.blk-block-georgia {
    background-size: 100% 150%;
  }
  .work__svg {
    height: 156px;
  }
}

@media screen and (max-width: 575px) {
  .what__block.blk-block-georgia {
    padding: 30px 0;
  }
  .work__svg {
    height: 51px;
  }
}
</style>
