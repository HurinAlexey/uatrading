<template>
  <div id="content">
    <LazyHydrate when-visible>
        <app-header :data="header" :phones="phones" />
    </LazyHydrate>
    <main>
      
      <LazyHydrate when-visible>
          <app-about />
      </LazyHydrate>

      <div class="cars-bg lazy-bg">

        <LazyHydrate style="position:relative;z-index:1;" when-visible>
            <app-advantages :data="advantages" />
        </LazyHydrate>

        <section class="what pos-r">
            <div class="container">
                <div class="what__title pos-r c-after">
                        <p class="opacity left-animate">Что</p>
                        <p class="what__title_large opacity right-animate">входит</p>
                        <p class="what__title_last opacity left-animate">в услугу?</p>
                    <svg class="svg-animate pos-a">
                        <line x1="0" y1="5" x2="100%" y2="5" stroke-width="9" stroke="#cc9557"></line>
                        <line x1="100%" y1="5" x2="100%" y2="100%" stroke-width="18" stroke="#cc9557"></line>
                    </svg>
                </div>
            </div>
            <div class="what__block pos-r c-before c-after blk-block blk-block-EU lazy-bg">
                <div class="container flex fw-w jc-fe">
                    <div class="what__item pos-r c-after w33 w50-md w100-esm">
                        <p>Консультация по всем вопросам таможенного оформления и оптимизации налогообложения</p>
                    </div>
                    <div class="what__item pos-r c-after w33 w50-md w100-esm">
                        <p>Оформление предварительной декларации (ПД)</p>
                    </div>
                    <div class="what__item pos-r c-after w33 w50-md w100-esm">
                        <p>Декларирование автомобиля таможенным органам</p>
                    </div>
                    <div class="what__item pos-r c-after w33 w50-md w100-esm">
                        <p>Расчет таможенных платежей (с учетом данных каталога schwacke и таможенных оформлений аналогичных авто)</p>
                    </div>
                    <div class="what__item pos-r c-after w33 w50-md w100-esm">
                        <p>Получение документов о соответствии автомобиля экологическим нормам ЕВРО 2-6</p>
                    </div>
                    <div class="what__item pos-r c-after w33 w50-md w100-esm">
                        <p>Представление интересов клиента на всех этапах таможенного оформления</p>
                    </div>
                </div>
            </div>
            <svg class="svg-animate work__svg pos-a">
                <line x1="100%" y1="-100" x2="100%" y2="100%" stroke-width="18" stroke="#cc9557"></line>
                <line x1="100%" y1="100%" x2="0" y2="100%" stroke-width="18" stroke="#cc9557"></line>
            </svg>
        </section>
        
        <LazyHydrate when-visible>
            <app-working-schema :items="schemaItems" class="work-EU" />
        </LazyHydrate>

      </div>

      <LazyHydrate when-visible>
          <app-blog :posts="blogPosts" />
      </LazyHydrate>

      <LazyHydrate when-visible>
          <app-consultation :title="consultationTitle" class="help-EU" />
      </LazyHydrate>
      
    </main>
    <LazyHydrate when-visible>
        <app-footer :data="footer" :breadcrumbs="breadcrumbs" :phones="phones" />
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
      breadcrumbs: [
        {
          url: 'https://ubtrading.com.ua',
          path: '/',
          text: 'Таможенно-брокерские услуги'
        },
        {
          url: 'https://ubtrading.com.ua/eu',
          text: 'Автомобили из Евросоюза'
        }
      ],
      header: {
        title: 'Таможенно-брокерские услуги',
        subtitle: 'Профессиональное таможенное оформление и сертификация автомобилей,<br> мотоциклов и других видов транспортных средств с Евросоюза «под ключ»',
        backImage: {
            desktop: 'images/new-bg-es.jpg',
            mobile: 'images/new-bg-es-mobile.jpg'
        },
        frontImage: {
            desktop: 'images/new-avto-es.png'
        },
        multilang: false,
        showAboutImport: true,
        bannerLinks: [
          {title: 'США', href: '/usa'},
          {title: 'Грузия', href: '/georgia'},
          {title: 'Евросоюз', href: '/eu'}
        ]
      },
      advantages: {
        backgroundImage: 'images/bg4.png',
        items: [
          {
            icon: 'images/why-1.png',
            text: 'Является лицензированным <a href="http://tradecar.hostronavt.ru/sfs.gov.ua/dovidniki--reestri--perelik/reestri/94921.html" rel="nofollow"> <br> таможенным брокером</a>'
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
            icon: 'images/why-2.png',
            text: 'Более 10 лет опыта работы в сфере внешнеэкономической деятельности'
          },
          {
            icon: 'images/why-5.png',
            text: 'Доступная цена услуг (у нас нет скрытых и дополнительных платежей). Оплата после выполнения услуг.'
          },
          {
            icon: 'images/why-6.png',
            text: 'Официальные юридические отношения с клиентами'
          },
          {
            icon: 'images/why-3.png',
            text: 'Таможенное оформление любого автомобиля всего за 3 часа'
          },
          {
            icon: 'images/why-7.png',
            text: 'Особые условия для постоянных и системных клиентов'
          }
        ],
        withSvg: true
      },
      schemaItems: [
          {
              title: 'Перед покупкой автомобиля',
              text: `<p>Проверить соответствие автомобиля экологическим нормам (не ниже 
                        ЕВРО 2 – для б/у легковых автомобилей, не ниже ЕВРО 5 – для новых 
                        легковых и грузовых автомобилей);</p>
                    <p>Проверить снятие б/у автомобиля с регистрации в уполномоченных органах 
                        (<i><a href="https://historiapojazdu.gov.pl/" target="_blank" rel="nofollow">Польша</a>, 
                            <a href="https://www.regitra.lt/" target="_blank" rel="nofollow">Литва</a>, 
                            <a href="https://eteenindus.mnt.ee/main.jsf" target="_blank" rel="nofollow">Эстония</a></i>)</p>`
          },
          {
              title: 'Перед пересечением границы',
              text: `<p>Заключить с таможенным брокером договор на право декларирования товаров клиента 
                        перед таможенными органами Украины</p>
                    <p>Расчет таможенных платежей таможенным брокером (с учетом данных каталога schwacke 
                        и таможенных оформлений аналогичных авто)</p>
                    <p>Оплата таможенных платежей собственником автомобиля (Оплата проводится собственником 
                        авто либо лицом по доверенности через кассу банка или онлайн банкинг, а также любым лицом 
                        через терминал банка непосредственно на расчетный счет таможни, в которой планируется 
                        таможенное оформление. <a href="http://kyiv.sfs.gov.ua/dfs-u-regioni/mitnitsya/kontakti/" target="_blank" rel="nofollow">Реквизиты Киевской городской таможни</a></p>
                    <p>Оформление таможенным брокером предварительной декларация (ПД) для пропуска авто на 
                        территорию Украины</p>`
          },
          {
              title: 'Пересечение границы Украины',
              text: `<p>Выбрать полосу движения по красному коридору в пункте пропуска на украинской границе</p>
                    <p>Назвать номер предварительной декларации (ПД) инспектору таможни</p>
                    <p>Пройти процедуру пропуска на таможенную территорию Украины (таможенный досмотр, подписания 
                        акта досмотра, взятие обязательства о доставке авто, получение документов с отметками таможни)</p>`
          },
          {
              title: 'Перед таможенным оформлением',
              text: `<p>Получить от <a href="https://mtu.gov.ua/content/perelik-priznachenih-organiv-iz-sertifikacii-kolisnih-transportnih-zasobiv.html" target="_blank" rel="nofollow"> 
                        уполномоченных органов</a> сертификат или справку на соответствие транспортного средства 
                        экологическим нормам </p>
                    <p>Доставить автомобиль в зону таможенного контроля внутренней таможни, в которой проводилось 
                        оформление предварительной декларации (ПД), на протяжении установленных законодательством 
                        10 календарных дней с момента пересечения границы</p>`
          },
          {
              title: 'Документы для таможенного оформления',
              text: `<p>Подтверждение права собственности на автомобиль (договор купли-продажи (контракт)</p>
                    <p>Подтверждение стоимости автомобиля (договор купли-продажи (контракт) или инвойс 
                        (счет-фактура) – обязательные; экспортная таможенная декларация ЕС, SWIFT 
                        платёж – не обязательные)</p>
                    <p>Подтверждение соответствия автомобиля экологичным нормам в Украине (сертификат 
                        соответствия или справка от 
                        <a href="https://mtu.gov.ua/content/perelik-priznachenih-organiv-iz-sertifikacii-kolisnih-transportnih-zasobiv.html" target="_blank" rel="nofollow">уполномоченных органов</a>)</p>
                    <p>Документы на автомобиль (техпаспорт – для б/у авто)</p>
                    <p>Документы на собственника автомобиля (паспорт, код ИНН, загранпаспорт, нотариальная 
                        доверенность (в случае пересечения границы лицом по доверенности)</p>
                    <p>Документы для получения льготы (сертификат происхождения EUR1 (для получения 
                        юридическими лицами преференций при таможенном оформлении)</p>`
          },
          {
              title: 'Таможенное оформление',
              text: `<p>Декларирование таможенным брокером таможенному органу автомобиля, 
                        на основании полученных от клиента документов, путем подачи таможенной 
                        декларации и предусмотренных законодательством документов</p>
                    <p>Прохождение таможенного досмотра и других этапов таможенного оформления</p>
                    <p>Получить в таможне заверенную оформленную таможенную декларацию и документ 
                        на право регистрации в органах полиции после завершения таможенного оформления.</p>`
          }
      ],
      consultationTitle: 'Нужна квалифицированная помощь?',
      footer: {
        slogan: 'Пока вы думаете, остальные уже ездят!',
        backgroundImage: 'images/footer-bg-EU.jpg'
      }
    }
  },
  async asyncData({store}) {
    let meta = await store.dispatch('meta/fetchByPageName', 'eu')
    if(!meta) {
      meta = {
        title: 'UBTrading',
        description: 'Таможено-брокерскик услуги.',
        keywords: ''
      }
    }
    let phones = await store.dispatch('option/fetchByTitle', 'phones')
    phones = phones.value.split(',')
    phones = phones.map(item => {
      let result = {text: item}
      result.href = 'tel:+' + item.replace(/\D/gi, '')
      return result
    })
    let {posts} = await store.dispatch('post/fetchByPageNumber', 1)
    posts = posts.slice(0, 4)
    return {meta, phones, blogPosts: posts}
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        { hid: 'description', name: 'description', content: this.meta.description },
        { hid: 'keywords', name: 'keywords', content: this.meta.keywords }
      ],
      link: [
        { rel: 'canonical', href: 'https://ubtrading.com.ua/eu' }
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
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 992px) {
  .work__svg {
    height: 160px;
  }
}

@media screen and (max-width: 767px) {
  .what__block {
    background-size: 200% 100%;
    background-position: right;
  }
}
</style>
