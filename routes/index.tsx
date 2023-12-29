import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import { WEBAPP_URL } from '$utils/constants.ts'
import { getAllCityList } from '$utils/list.ts'

const TITLE = 'coffee location'
const DESCRIPTION = 'Looking around the world for the best cup of coffee'

interface Data {
  cities: string[]
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const cities = await getAllCityList()
    return ctx.render({ cities })
  },
}

export default function Home({ data }: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name='description' content={DESCRIPTION} />
        <meta property='og:title' content={TITLE} />
        <meta property='og:description' content={DESCRIPTION} />
        <meta property='og:image' content='/cover.png' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={WEBAPP_URL} />
        <meta property='og:site_name' content={TITLE} />
        <meta property='og:site_name' content={TITLE} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <header>
        <h1>{TITLE}</h1>
        <section class='about_block'>
          <p class='about_block__desc'>{DESCRIPTION}</p>
          <img src='/head.svg' class='about_block__img' />
          <a href='https://t.me/coffee_places_bot' class='bot_btn'>
            telegram bot
          </a>
        </section>
        <p class='header__desc'>
          Say goodbye to wasting time on maps — our Telegram bot will guide you
          to the perfect coffee spot near you in no time.
        </p>
      </header>
      <section class='work'>
        <div class='cities'>
          <h2 class='cities__title'>Cities we work in</h2>
          <ul class='cities__list'>
            {data.cities.map((it) => <li key={it} class='cities__item'>{it}
            </li>)}
            <li class='cities__item'>your city coming soon...</li>
          </ul>
        </div>
        <div class='steps'>
          <ul class='steps__list'>
            <li class='steps__item'>Send your location to the bot</li>
            <li class='steps__item'>
              Choose the best option for you and enjoy
            </li>
          </ul>
          <img
            src='/device.png'
            srcset='/device@2x.png 2x'
            alt='Device illustration'
            class='steps__img'
          />
        </div>
      </section>
      <section class='prop'>
        <div class='find'>
          <h2 class='find__title'>What we are looking for in coffee places</h2>
          <ul class='find__list'>
            <li class='find__item'>coffee quality</li>
            <li class='find__item'>stability</li>
            <li class='find__item'>food</li>
            <li class='find__item'>atmosphere</li>
            <li class='find__item'>working conditions</li>
            <li class='find__item'>interior</li>
            <li class='find__item'>events</li>
            <li class='find__item'>culture</li>
          </ul>
        </div>
        <div class='stat'>
          <dl class='stat__list'>
            <div class='stat__item'>
              <dt class='stat__title'>cities</dt>
              <dd class='stat__value'>{data.cities.length}</dd>
            </div>
            <div class='stat__item'>
              <dt class='stat__title'>years</dt>
              <dd class='stat__value'>04</dd>
            </div>
            <div class='stat__item'>
              <dt class='stat__title'>spots</dt>
              <dd class='stat__value'>200+</dd>
            </div>
          </dl>
          <img src='/properties.svg' class='stat__img' />
          <a href='https://t.me/coffee_places_bot' class='bot_btn'>
            telegram bot
          </a>
        </div>
      </section>
      <footer>
        <section class='footer__section'>
          <h3 class='footer__title'>For cooperation</h3>
          <ul class='footer__list'>
            <li class='footer__item'>
              <a
                href='https://t.me/deryfe'
                aria-label='telegram link'
                class='footer__link'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='20'
                  viewBox='0 0 24 20'
                  fill='none'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M1.64987 8.61754C8.09231 5.81067 12.3883 3.96021 14.5378 3.06616C20.675 0.513465 21.9503 0.0700353 22.7815 0.0553929C22.9643 0.0521725 23.3731 0.0974795 23.6379 0.312329C23.8614 0.493743 23.9229 0.738808 23.9524 0.910809C23.9818 1.08281 24.0185 1.47463 23.9893 1.78079C23.6568 5.27524 22.2177 13.7553 21.4856 17.6692C21.1758 19.3253 20.5658 19.8805 19.9753 19.9349C18.6919 20.053 17.7174 19.0867 16.4744 18.272C14.5294 16.997 13.4305 16.2033 11.5425 14.9591C9.36064 13.5213 10.7751 12.731 12.0185 11.4395C12.344 11.1015 17.9985 5.95828 18.1079 5.49172C18.1216 5.43336 18.1343 5.21585 18.0051 5.101C17.8759 4.98615 17.6851 5.02542 17.5475 5.05666C17.3524 5.10093 14.2452 7.1547 8.22584 11.2179C7.34386 11.8236 6.545 12.1187 5.82924 12.1032C5.04018 12.0861 3.52233 11.657 2.39397 11.2903C1.00999 10.8404 -0.0899676 10.6025 0.00581423 9.8385C0.0557033 9.44054 0.603723 9.03356 1.64987 8.61754Z'
                    fill='#2D2D2D'
                  />
                </svg>
              </a>
            </li>
            <li class='footer__item'>
              <a
                href='mailto:coffeelocation.bot@gmail.com'
                aria-label='email link'
                class='footer__link'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='27'
                  height='22'
                  viewBox='0 0 27 22'
                  fill='none'
                >
                  <path
                    d='M24.6111 1.27777H2.38889C1.62183 1.27777 1 1.8996 1 2.66666V19.3333C1 20.1004 1.62183 20.7222 2.38889 20.7222H24.6111C25.3782 20.7222 26 20.1004 26 19.3333V2.66666C26 1.8996 25.3782 1.27777 24.6111 1.27777Z'
                    fill='#2D2D2D'
                    stroke='white'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M24.6106 1.97198L13.4995 12.3887L2.38841 1.97198'
                    stroke='white'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </a>
            </li>
            <li class='footer__item'>
              <a
                href='https://www.instagram.com/coffee_location_tbs?igsh=aXQwdnNtd2JsNXdu&utm_source=qr'
                aria-label='instagram link'
                class='footer__link'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    d='M12 0C8.74101 0 8.33234 0.0138258 7.0524 0.0722013C5.77514 0.13047 4.90283 0.333355 4.13952 0.629949C3.35041 0.936617 2.6812 1.34696 2.0141 2.01406C1.34696 2.68117 0.936617 3.35045 0.629984 4.13956C0.333319 4.90283 0.130505 5.77514 0.0721656 7.0524C0.0137901 8.33234 0 8.74101 0 12C0 15.259 0.0137901 15.6677 0.0721656 16.9476C0.130505 18.2249 0.333319 19.0972 0.629984 19.8604C0.936653 20.6495 1.347 21.3188 2.0141 21.9859C2.68124 22.653 3.35041 23.0634 4.13952 23.3701C4.90283 23.6666 5.77514 23.8695 7.0524 23.9278C8.33234 23.9862 8.74101 24 12 24C15.259 24 15.6677 23.9862 16.9476 23.9278C18.2249 23.8695 19.0972 23.6666 19.8604 23.3701C20.6495 23.0634 21.3188 22.653 21.9859 21.9859C22.653 21.3188 23.0634 20.6495 23.3701 19.8604C23.6666 19.0972 23.8695 18.2249 23.9278 16.9476C23.9862 15.6677 24 15.259 24 12C24 8.74101 23.9862 8.33234 23.9278 7.0524C23.8695 5.77514 23.6666 4.90283 23.3701 4.13956C23.0634 3.35045 22.653 2.68117 21.9859 2.01406C21.3188 1.34696 20.6495 0.936617 19.8604 0.629949C19.0972 0.333355 18.2249 0.13047 16.9476 0.0722013C15.6677 0.0138258 15.259 0 12 0ZM12 2.16215C15.2041 2.16215 15.5837 2.1744 16.849 2.23213C18.019 2.28547 18.6544 2.48096 19.0772 2.6453C19.6374 2.86301 20.0371 3.12302 20.457 3.54294C20.877 3.96286 21.137 4.36263 21.3547 4.92273C21.519 5.34558 21.7145 5.98099 21.7679 7.15097C21.8256 8.41633 21.8379 8.79588 21.8379 12C21.8379 15.2041 21.8256 15.5837 21.7679 16.849C21.7145 18.019 21.519 18.6544 21.3547 19.0772C21.137 19.6374 20.877 20.0371 20.457 20.457C20.0371 20.877 19.6374 21.137 19.0773 21.3547C18.6544 21.519 18.019 21.7145 16.849 21.7679C15.5839 21.8256 15.2044 21.8379 12 21.8379C8.79563 21.8379 8.41619 21.8256 7.15097 21.7678C5.98096 21.7145 5.34558 21.519 4.92277 21.3547C4.36259 21.137 3.96286 20.877 3.54297 20.457C3.12306 20.0371 2.86301 19.6374 2.6453 19.0773C2.48096 18.6544 2.28551 18.019 2.23213 16.849C2.1744 15.5837 2.16215 15.2041 2.16215 12C2.16215 8.79588 2.1744 8.41633 2.23213 7.15097C2.28551 5.98096 2.48096 5.34558 2.6453 4.92277C2.86301 4.36259 3.12306 3.96286 3.54294 3.54297C3.96286 3.12302 4.36263 2.86301 4.92273 2.6453C5.34558 2.48096 5.98099 2.28547 7.15097 2.23213C8.41633 2.1744 8.79588 2.16215 12 2.16215'
                    fill='#2D2D2D'
                  />
                  <path
                    d='M11.9999 16C9.79073 16 7.99988 14.2091 7.99988 12C7.99988 9.79079 9.79073 7.99994 11.9999 7.99994C14.2091 7.99994 15.9999 9.79079 15.9999 12C15.9999 14.2091 14.2091 16 11.9999 16ZM11.9999 5.83779C8.59661 5.83779 5.83774 8.59666 5.83774 12C5.83774 15.4032 8.59661 18.1621 11.9999 18.1621C15.4032 18.1621 18.1621 15.4032 18.1621 12C18.1621 8.59666 15.4032 5.83779 11.9999 5.83779ZM19.8455 5.59432C19.8455 6.38964 19.2008 7.03431 18.4055 7.03431C17.6103 7.03431 16.9655 6.38964 16.9655 5.59432C16.9655 4.79904 17.6103 4.1543 18.4055 4.1543C19.2008 4.1543 19.8455 4.79904 19.8455 5.59432Z'
                    fill='#2D2D2D'
                  />
                </svg>
              </a>
            </li>
          </ul>
        </section>
        <section class='footer__section'>
          <h3 class='footer__title'>Development</h3>
          <a href='https://github.com/algosail' class='footer__link'>
            {`algo ->) sail`}
          </a>
        </section>
      </footer>
    </>
  )
}
