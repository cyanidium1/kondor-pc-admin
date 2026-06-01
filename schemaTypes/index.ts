// === Існуючі (НЕ ЧІПАЄМО) ===
import {gpu} from './gpu'
import {build} from './build'

// Orphan `game.ts` — окрема сутність для довідника ігор.
// У Спринті 1А реєструємо щоб structure.ts показав «🎮 Ігри».
// Інші orphan-об'єкти (buildColor/buildComponent/configOption/
// configOptionGroup/gpuFpsRow) НЕ реєструємо — buildColor вимагає
// плагіна @sanity/color-input який не встановлений, а решта це
// мертвий код з попередньої моделі.
import {game} from './game'

// === Нові документи ===
import {page} from './page'
import {tag} from './tag'
import {faqEntry} from './faqEntry'

// === Нові універсальні секції (Sprint 1А) ===
// === Blog (port from nbyg-adm — preserve original naming) ===
import {blogPost} from './documents/blogPost'
import {blogPage} from './documents/blogPage'
import {paymentRequisites} from './documents/paymentRequisites'
import {siteContacts} from './documents/siteContacts'
import {seoSettings} from './objects/seoSettings'
import {faqSection} from './objects/faqSection'
import {gallerySection} from './objects/gallerySection'

import {breadcrumbs} from './sections/breadcrumbs'
import {anchorNav} from './sections/anchorNav'
import {heroSimple} from './sections/heroSimple'
import {textBlock} from './sections/textBlock'
import {imageFull} from './sections/imageFull'
import {imageTextSplit} from './sections/imageTextSplit'
import {featureList} from './sections/featureList'
import {mediaVideo} from './sections/mediaVideo'
import {statsStrip} from './sections/statsStrip'
import {faqAccordion} from './sections/faqAccordion'
import {ctaPromoBanner} from './sections/ctaPromoBanner'

export const schemaTypes = [
  // documents
  build,
  gpu,
  game,
  page,
  tag,
  faqEntry,
  blogPost,
  blogPage,
  paymentRequisites,
  siteContacts,
  // blog support objects (port from nbyg-adm)
  seoSettings,
  faqSection,
  gallerySection,
  // section objects
  breadcrumbs,
  anchorNav,
  heroSimple,
  textBlock,
  imageFull,
  imageTextSplit,
  featureList,
  mediaVideo,
  statsStrip,
  faqAccordion,
  ctaPromoBanner,
]
