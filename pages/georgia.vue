<template>
  <div id="content">
    <app-header :data="header" />
    <main>

      <app-about />

      <app-advantages :data="advantages" />

      <div class="cars-bg">
        
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
            <div class="what__block pos-r c-before c-after blk-block-georgia">
                <div class="container flex fw-w jc-sa">

                    <div class="what__box-first">
                        <div class="what__item-width w50-md w100-esm">
                            <div class="what__item pos-r c-after">
                                <p>Большой выбор (авторынок <a href="https://autopapa.ge/ru/page/about?currency=usd" target="_blank">AUTOPAPA</a> 
                                    самый большой и современный авторынок на Кавказе, общая площадь  которого составляет  
                                    225 тыс. квадратных метров, вместимостью 5000 автомобилей с Кореи, ЕС, аукционов США)</p>
                            </div>
                            <div class="what__item pos-r c-after">
                                <p>Таможенная оценка (методика контроля таможенной стоимости автомобилей с Грузии таможней 
                                        достаточно прозрачна, что существенно минимизирует риск повышение таможенной стоимости 
                                        при таможенном оформлении)</p>
                            </div>
                        </div>
                        <div class="what__item-width w50-md w100-esm">
                            <div class="what__item pos-r c-after">
                                <p>Хорошая цена (экономия в сравнении с рынком Украины до 40%)</p>
                            </div>
                            <div class="what__item pos-r c-after">
                                <p>Быстрая логистика (в отличие от авто с США, доставка в Украину 
                                    осуществляется всего за два дня)</p>
                            </div>
                            <div class="what__item pos-r c-after">
                                <p>Богатая комплектация (практически все автомобили в хорошей комплектации)</p>
                            </div>
                        </div>

                    </div>

                    <div class="what__box-second">
                        <div class="what__item pos-r c-after">
                                <p>Восстановленные авто (в отличии от большинства авто с США, авто с Грузии импортируются в 
                                    Украину уже отремонтированными. На территории авторынка можно провести тест драйв, полную 
                                    диагностику авто в СТО, а также самостоятельно проверить состояние автомобиля до ремонта 
                                    по базах данным <a href="https://autoastat.com/" target="_blank">AUTOASTAT</a>, 
                                    <a href="https://autoauctions.io/" target="_blank">AUTOAUCTIONS</a>, 
                                    <a href="https://www.carfax.eu/" target="_blank">CARFAX</a></p>
                        </div>
                    </div>

                </div>
            </div>
            <svg class="svg-animate work__svg pos-a">
                <line x1="100%" y1="-100" x2="100%" y2="100%" stroke-width="18" stroke="#cc9557"></line>
                <line x1="100%" y1="100%" x2="0" y2="100%" stroke-width="18" stroke="#cc9557"></line>

            </svg>
        </section>

        <app-working-schema :items="schemaItems" />

      </div>

      <app-blog :posts="blogPosts" />

      <app-consultation :title="consultationTitle" />
      
    </main>
    <app-footer :data="footer" />
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue'
import AppAbout from '@/components/section/About.vue'
import AppAdvantages from '@/components/section/Advantages.vue'
import AppWorkingSchema from '@/components/section/WorkingSchema.vue'
import AppBlog from '@/components/section/Blog.vue'
import AppConsultation from '@/components/section/Consultation.vue'
import AppFooter from '@/components/Footer.vue'

export default {
  components: {
    AppHeader,
    AppAbout,
    AppAdvantages,
    AppWorkingSchema,
    AppBlog,
    AppConsultation,
    AppFooter
  },
  data() {
    return {
      header: {
        title: 'Таможенно-брокерские услуги',
        subtitle: 'Профессиональное таможенное оформление <br> транспортных средств с Грузии «под ключ»',
        backImage: 'images/georgia-bg-main.jpg',
        multilang: false,
        showAboutImport: true,
        bannerLinks: [
          {title: 'Автомобили из США', href: '/usa'},
          {title: 'Автомобили из Грузии', href: '/georgia'},
          {title: 'Автомобили из ЕС', href: '/eu'}
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
              title: 'Перед пересечением границы',
              text: `<p>- Заключить с таможенным брокером договор на право декларирования 
                        товаров клиента перед таможенными органами Украины</p>
                    <p>- Расчет таможенных платежей таможенным брокером (с учетом таможенных 
                        оформлений аналогичных авто и данных аукционов США)</p>
                    <p>- Оплата таможенных платежей собственником автомобиля (Оплата проводится 
                        собственником авто либо лицом по доверенности через кассу банка или онлайн 
                        банкинг, а также любым лицом через терминал банка непосредственно на расчетный 
                        счет таможни, в которой планируется таможенное оформление. Реквизиты Киевской 
                        <a href="http://kyiv.sfs.gov.ua/dfs-u-regioni/mitnitsya/kontakti/" target="_blank">городской таможни</a></p>
                    <p>- Оформление таможенным брокером предварительной декларация для пропуска авто 
                        на территорию Украины</p>`
          },
          {
              title: 'Пересечение границы Украины',
              text: `<p>- Воспользоваться экспедиционными услугами в порту (если автомобиль следует 
                        самостоятельно без сопровождения)</p>
                    <p>- Назвать номер предварительной декларации инспектору таможни</p>
                    <p>- Пройти процедуру пропуска на таможенную территорию Украины (таможенный досмотр, 
                        подписания акта досмотра, взятие обязательства о доставке авто, получение документов 
                        с отметками таможни)</p>`
          },
          {
              title: 'Перед таможенным оформлением',
              text: `<p>- Получить от <a href="https://mtu.gov.ua/content/perelik-priznachenih-organiv-iz-sertifikacii-kolisnih-transportnih-zasobiv.html" target="_blank">уполномоченных органов</a> 
                        сертификат или справку на соответствие транспортного средства экологическим нормам</p>
                    <p>- Доставить автомобиль в зону таможенного контроля внутренней таможни, в которой проводилось 
                        оформление предварительной декларации (ПД), на протяжении установленных законодательством 
                        10 календарных дней с момента пересечения границы</p>`
          },
          {
              title: 'Документы для таможенного оформления',
              text: `<p>- Подтверждение права собственности на автомобиль (договор купли-продажи (контракт)</p>
                    <p>- Подтверждение стоимости автомобиля (договор купли-продажи (контракт) или инвойс 
                        (счет-фактура) – обязательные; экспортная таможенная декларация ЕС, SWIFT платёж – не 
                        обязательные)</p>
                    <p>- Подтверждение соответствия автомобиля экологичным нормам в Украине (сертификат 
                        соответствия или справка от <a href="https://mtu.gov.ua/content/perelik-priznachenih-organiv-iz-sertifikacii-kolisnih-transportnih-zasobiv.html" target="_blank">уполномоченных органов</a>)</p>
                    <p>- Документы на автомобиль (техпаспорт – для б/у авто)</p>
                    <p>- Документы на собственника автомобиля (паспорт, код ИНН, загранпаспорт, нотариальная 
                        доверенность (в случае пересечения границы лицом по доверенности)</p>
                    <p>- Документы для получения льготы (сертификат происхождения EUR1 (для получения 
                        юридическими лицами преференций при таможенном оформлении)</p>`
          },
          {
              title: 'Таможенное оформление',
              text: `<p>- Декларирование таможенным брокером таможенному органу автомобиля, на основании полученных 
                        от клиента документов, путем подачи таможенной декларации и предусмотренных законодательством 
                        документов</p>
                    <p>- Прохождение таможенного досмотра и других этапов таможенного оформления</p>
                    <p>- Получить в таможне заверенную оформленную таможенную декларацию и документ на право 
                        регистрации в органах полиции после завершения таможенного оформления.</p>`
          }
      ],
      blogPosts: [
        {
          title: 'Lorem ipsum dolor sit amet.',
          slug: 'post1',
          date: new Date(),
          category: 'Таможня',
          imageSrc: 'images/blog.jpg',
          text: `<p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor.</p>`
        },
        {
          title: 'Lorem ipsum dolor sit amet.',
          slug: 'post1',
          date: new Date(),
          category: 'Таможня',
          imageSrc: 'images/blog.jpg',
          text: `<p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor.</p>`
        },
        {
          title: 'Lorem ipsum dolor sit amet.',
          slug: 'post1',
          date: new Date(),
          category: 'Таможня',
          imageSrc: 'images/blog.jpg',
          text: `<p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor.</p>`
        },
        {
          title: 'Lorem ipsum dolor sit amet.',
          slug: 'post1',
          date: new Date(),
          category: 'Таможня',
          imageSrc: 'images/blog.jpg',
          text: `<p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor.</p>`
        }
      ],
      consultationTitle: 'Нужна квалифицированная помощь?',
      footer: {
        slogan: 'Пока вы думаете, остальные уже ездят!',
        backgroundImage: 'images/footer-bg.jpg'
      }
    }
  }
}
</script>
