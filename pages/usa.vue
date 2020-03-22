<template>
  <div id="content">
    <LazyHydrate when-visible>
        <app-header :data="header" />
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
                    <p class="opacity left-animate">Почему</p>
                    <p class="what__title_large opacity right-animate">автомобили</p>
                    <p class="what__title_last opacity left-animate">с США?</p>
                    <svg class="svg-animate  pos-a">
                        <line x1="0" y1="5" x2="100%" y2="5" stroke-width="9" stroke="#cc9557"></line>
                        <line x1="100%" y1="5" x2="100%" y2="100%" stroke-width="18" stroke="#cc9557"></line>
                    </svg>
                </div>
            </div>
            <div class="what__block pos-r c-before c-after blk-block-USA lazy-bg">
                <div class="flex fw-w jc-sa">
                    <div class="what__box-first">
                        <div class="what__item pos-r c-after what__item-width w50-md w100-esm">
                            <h4>Хорошая цена</h4>
                            <p>экономия в сравнении с рынком Украины до 40%</p>
                        </div>
                        <div class="what__item pos-r c-after what__item-width w50-md w100-esm">
                            <h4>Минимальный пробег</h4>
                            <p>на аукционах представлены авто преимущественно с небольшим пробегом</p>
                        </div>

                        <div class="what__item pos-r c-after what__item-width w50-md w100-esm">
                            <h4>Богатая комплектация</h4>
                            <p>практически все автомобили в хорошей комплектации</p>
                        </div>
                        <div class="what__item pos-r c-after what__item-width w50-md w100-esm">
                            <h4>Реальный пробег</h4>
                            <p>в США введена уголовная ответственность за изменения данных о пробеге. 
                                Открытые базы данных страховых компаний позволяют узнать почти все о авто</p>
                        </div>
                        <div class="what__item pos-r c-after what__item-width w50-md w100-esm">
                            <h4>Качественная сборка</h4>
                            <p>стандарты США существенно отличаются от остальных стран, поэтому на их рынок 
                              поставляются узлы и агрегаты лучшего качества</p>
                        </div>
                        
                        <div class="what__item pos-r c-after what__item-width w50-md w100-esm">
                            <h4>Возможность оценки повреждений</h4>
                            <p>на аукционе видны повреждения на авто, возможно заказать инспекционный 
                                осмотр авто и реально просчитать бюджет на ремонт и купить авто с минимальными 
                                дефектами</p>
                        </div>
                    </div>

                    <div class="what__box-second">
                        <div class="what__item pos-r c-after">
                            <h4>Таможенная оценка</h4>
                            <p>методика контроля таможенной стоимости автомобилей с США таможней достаточно 
                                прозрачна, что существенно минимизирует риск повышение таможенной стоимости 
                                при таможенном оформлении</p>
                        </div>
                    </div>

                </div>
            </div>
            <svg class="svg-animate work__svg pos-a">
                <line x1="100%" y1="-100" x2="100%" y2="100%" stroke-width="18" stroke="#cc9557"></line>
                <line x1="100%" y1="100%" x2="0" y2="100%" stroke-width="18" stroke="#cc9557"></line>

            </svg>
        </section>
        
        <LazyHydrate when-visible>
            <app-working-schema :items="schemaItems" class="work-USA" :usaClass="true" />
        </LazyHydrate>

      </div>
      
      <LazyHydrate when-visible>
          <app-blog :posts="blogPosts" />
      </LazyHydrate>

      <LazyHydrate when-visible>
          <app-consultation :title="consultationTitle" class="help-USA" />
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
        title: 'Автомобили из США',
        subtitle: 'Профессиональные подбор, покупка, доставка, таможенное оформление и<br> сертификация автомобилей, мотоциклов и других видов транспортных<br> средств с аукционов США',
        backImage: {
            desktop: 'images/new-bg-usa.jpg',
            mobile: 'images/new-bg-usa-mobile.jpg'
        },
        frontImage: {
            desktop: 'images/new-avto-usa.png'
        },
        usaBackground: true,
        multilang: false,
        showAboutImport: true,
        bannerLinks: [
          {title: 'США', href: '/usa'},
          {title: 'Грузия', href: '/georgia'},
          {title: 'Евросоюз', href: '/eu'}
        ]
      },
      advantages: {
        sectionClass: 'why__USA',
        titleClass: 'why__title-USA',
        backgroundImage: 'images/bg-about-USA.png',
        items: [
          {
            icon: 'images/why-2.png',
            text: 'Более 10 лет опыта работы в сфере внешнеэкономической деятельности'
          },
          {
            icon: 'images/about-USA-10.png',
            text: 'Официальные юридические отношения с клиентами'
          },
          {
            icon: 'images/about-USA-11.png',
            text: 'Являемся лицензированным <a href="http://sfs.gov.ua/dovidniki--reestri--perelik/reestri/94921.html" rel="nofollow"> таможенным брокером</a> (Таможенное оформление любого автомобиля всего за 3 часа)'
          },
          {
            icon: 'images/about-USA-4.png',
            text: 'Работаем без посредников и "под ключ"'
          },
          {
            icon: 'images/about-USA-2.png',
            text: 'Профессиональный подбор и проверка автомобилей (бесплатный отчет Carfax)'
          },
          {
            icon: 'images/about-USA-9.png',
            text: 'Особые условия для постоянных и системных клиентов'
          },
          {
            icon: 'images/about-USA-7.png',
            text: 'Предлагаем лучшую цену на рынке (у нас нет скрытых и дополнительных платежей)'
          },
          {
            icon: 'images/about-USA-5.png',
            text: 'Прозрачная система оплаты за авто напрямую аукциону'
          },
          {
            icon: 'images/about-USA-12.png',
            text: 'У нас на счету более тысячи растаможенных авто'
          }
        ],
        withSvg: false
      },
      schemaItems: [
          {
              title: 'Заключение официального договора',
              text: `<p>с целью минимизации рисков для клиента, закрепления цены услуг, 
                    законности и прозрачности всех операций, мы осуществляем официальные 
                    юридические отношения с клиентами</p>`
          },
          {
              title: 'Подбор и проверка авто с аукционов США',
              text: `<p>профессионально подберем автомобиль на аукционах США либо поможем 
                    вам подобрать самостоятельно без каких-либо рисков. Проведем 
                    проверку авто по базе данных США CarFax, осуществим при необходимости 
                    выездной инспекционный осмотр. Подбор автомобиля будет осуществляться 
                    до полного удовлетворение условиям клиента</p>`
          },
          {
              title: 'Участие в аукционе',
              text: `<p>участие в торгах проводится при полном онлайн взаимодействии с клиентом. 
                    Все финансовые решения на торгах, в том числе о повышение цены лота, 
                    максимально допустимой цене, принимается лично заказчиком</p>`
          },
          {
              title: 'Покупка',
              text: `<p>после окончания торгов на аукционе клиент на протяжении 3 дней лично 
                    осуществляет оплату за автомобиль через международную межбанковскую 
                    систему SWIFT в любом банке Украины непосредственно на счет аукциона 
                    в США</p>`
          },
          {
              title: 'Проверка авто в порту США',
              text: `<p>с целью фиксации состояния автомобиля перед погрузкой в контейнер, 
                    осуществим полную его фото фиксацию</p>`
          },
          {
              title: 'Доставка автомобиля в Украину',
              text: `<p>доставим автомобиль из США в Украину морем либо авиатранспортом в 
                    кратчайшие строки</p>`
          },
          {
              title: 'Экспедирование груза в порту Украины',
              text: `<p>проведем выгрузку автомобиля с контейнера и доставку его в таможню 
                    без задержек. С целью фиксации состояния автомобиля после выгрузки 
                    с контейнера, осуществим повторную полную его фото фиксацию</p>`
          },
          {
              title: 'Таможенное оформление',
              text: `<p>в отличии от большинства  фирм по доставке авто из-за рубежа, мы являемся 
                    лицензированным
                    <a href=" http://sfs.gov.ua/dovidniki--reestri--perelik/reestri/94921.html" target="_blank" rel="nofollow">таможенным брокером</a>
                    с большим опытом растаможки всех видов товаров в Украине.  Проведем 
                    таможенное оформление любого авто до 3 часов без каких-либо рисков 
                    для клиента</p>`
          }
      ],
      consultationTitle: 'Нужна квалифицированная помощь?',
      footer: {
        slogan: 'Пока вы думаете, остальные уже ездят!',
        backgroundImage: 'images/footer-bg-USA.jpg'
      }
    }
  },
  async asyncData({store}) {
      let meta = await store.dispatch('meta/fetchByPageName', 'usa')
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
      ],
      link: [
        { rel: 'canonical', href: 'https://ubtrading.com.ua/usa' }
      ]
    }
  },
  mounted() {
    document.querySelector('body').classList.remove('body-fix')
  }
}
</script>
