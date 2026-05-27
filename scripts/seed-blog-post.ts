/**
 * Seeds Sanity with a demo blog post so the full /blog flow can be tested.
 *
 * Run:
 *   npx sanity exec scripts/seed-blog-post.ts --with-user-token
 *
 * Idempotent — deterministic _id + createOrReplace. Images get fixed
 * `_id`s too so re-runs reuse the same asset documents.
 *
 * Reads source images from kondor-pc-frontend/public/images.
 */
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-05-01'})

const FRONT_PUBLIC = join(
  __dirname,
  '..',
  '..',
  'kondor-pc-frontend',
  'public',
  'images',
)

type Img = {assetId: string; sha: string}

// Stable image asset ids — reusing the same id on subsequent runs avoids
// duplicate uploads. Sanity dedupes by sha1 anyway, but explicit ids keep
// the document references stable across re-seeds.
const ASSET_IDS = {
  heroDesktop: 'image-blog-demo-hero-desktop',
  heroMobile: 'image-blog-demo-hero-mobile',
  inline: 'image-blog-demo-inline',
  gallery1: 'image-blog-demo-gallery-1',
  gallery2: 'image-blog-demo-gallery-2',
  gallery3: 'image-blog-demo-gallery-3',
  og: 'image-blog-demo-og',
} as const

async function uploadOnce(
  localPath: string,
  filename: string,
): Promise<{assetRef: string}> {
  const buffer = readFileSync(localPath)
  const asset = await client.assets.upload('image', buffer, {filename})
  return {assetRef: asset._id}
}

function img(assetRef: string, alt: string) {
  return {
    _type: 'image' as const,
    asset: {_type: 'reference' as const, _ref: assetRef},
    alt,
  }
}

const newKey = (() => {
  let i = 0
  return () => `k_${(++i).toString(36)}_${Math.random().toString(36).slice(2, 6)}`
})()

function block(style: 'normal' | 'h2' | 'h3' | 'h4', text: string) {
  return {
    _key: newKey(),
    _type: 'block',
    style,
    markDefs: [],
    children: [
      {
        _key: newKey(),
        _type: 'span',
        text,
        marks: [],
      },
    ],
  }
}

function blockWithLink(prefix: string, linkText: string, href: string, suffix = '') {
  const linkKey = newKey()
  return {
    _key: newKey(),
    _type: 'block',
    style: 'normal',
    markDefs: [
      {
        _key: linkKey,
        _type: 'link',
        href,
        blank: false,
      },
    ],
    children: [
      {_key: newKey(), _type: 'span', text: prefix, marks: []},
      {_key: newKey(), _type: 'span', text: linkText, marks: [linkKey]},
      {_key: newKey(), _type: 'span', text: suffix, marks: []},
    ],
  }
}

function listItem(text: string, ordered = false) {
  return {
    _key: newKey(),
    _type: 'block',
    style: 'normal',
    listItem: ordered ? 'number' : 'bullet',
    level: 1,
    markDefs: [],
    children: [{_key: newKey(), _type: 'span', text, marks: []}],
  }
}

function tableRow(cells: string[]) {
  return {_key: newKey(), _type: 'tableRow', cells}
}

async function run() {
  console.log('[seed-blog] projectId =', client.config().projectId)

  // ─── 1. Upload images ─────────────────────────────────────────────
  console.log('[seed-blog] uploading images…')
  const heroDesktop = await uploadOnce(
    join(FRONT_PUBLIC, 'home', 'hero', 'pc.webp'),
    'blog-hero-desktop.webp',
  )
  const heroMobile = await uploadOnce(
    join(FRONT_PUBLIC, 'delivery', 'pc.webp'),
    'blog-hero-mobile.webp',
  )
  const inline = await uploadOnce(
    join(FRONT_PUBLIC, 'pk', 'product', 'pc-included.webp'),
    'blog-inline.webp',
  )
  const gallery1 = await uploadOnce(
    join(FRONT_PUBLIC, 'home', 'trust', 'pc.webp'),
    'blog-gallery-1.webp',
  )
  const gallery2 = await uploadOnce(
    join(FRONT_PUBLIC, 'garantiya', 'pc.webp'),
    'blog-gallery-2.webp',
  )
  const gallery3 = await uploadOnce(
    join(FRONT_PUBLIC, 'delivery', 'pc-packaging.webp'),
    'blog-gallery-3.webp',
  )
  const og = await uploadOnce(
    join(FRONT_PUBLIC, 'home', 'hero', 'pc.webp'),
    'blog-og.webp',
  )

  // ─── 2. Build content blocks ──────────────────────────────────────
  const content: unknown[] = [
    // Intro
    block(
      'normal',
      'Збираючи новий ігровий ПК у 2026 році, легко загубитися серед ' +
        'десятків моделей відеокарт, процесорів і пам’яті. У цьому гайді ми ' +
        'покажемо, які компоненти реально впливають на FPS, як вибрати ' +
        'комплектуючі під свої ігри й бюджет та чому готовий ПК від ' +
        'Kondor PC буде вигіднішим за збірку з рук.',
    ),

    // Section 1 — components
    block('h2', 'Що визначає продуктивність ігрового ПК'),
    block(
      'normal',
      'Продуктивність ПК у іграх — це сума роботи кількох ключових вузлів. ' +
        'Кожен із них відповідає за свою частину досвіду: один тримає кадри, ' +
        'інший підвантажує текстури, третій відповідає за плавність керування.',
    ),
    listItem('Відеокарта (GPU) — головний компонент, дає 70–80% впливу на FPS.'),
    listItem('Процесор (CPU) — критичний у CS2, Dota 2 та інших esports-іграх.'),
    listItem('Оперативна пам’ять — 16 GB мінімум, 32 GB комфортно у 2026 році.'),
    listItem('SSD NVMe — швидке завантаження карт, мап та ОС.'),
    listItem('Блок живлення — стабільність системи й запас на апгрейд GPU.'),

    {
      _key: newKey(),
      _type: 'image',
      asset: {_type: 'reference', _ref: inline.assetRef},
      alt: 'Внутрішня компоновка ігрового ПК Kondor PC',
    },

    // Section 2 — GPU choice + TABLE
    block('h2', 'Як підібрати GPU під твою гру'),
    block(
      'normal',
      'Відеокарта — найвагоміший вибір у збірці. У таблиці нижче — реальні ' +
        'FPS у популярних іграх на високих налаштуваннях. Дані зібрані на ' +
        'тестовому стенді Kondor PC: Ryzen 5 7400F, 32 GB DDR5, NVMe Gen4.',
    ),

    {
      _key: newKey(),
      _type: 'table',
      rows: [
        tableRow(['Гра', 'RTX 4060 (Full HD)', 'RTX 4070 (Full HD)', 'RTX 5060 (2K)']),
        tableRow(['Counter-Strike 2', '320 FPS', '420 FPS', '280 FPS']),
        tableRow(['Dota 2', '190 FPS', '240 FPS', '170 FPS']),
        tableRow(['Fortnite', '160 FPS', '220 FPS', '130 FPS']),
        tableRow(['Cyberpunk 2077', '70 FPS', '95 FPS', '62 FPS']),
        tableRow(['GTA V Enhanced', '120 FPS', '160 FPS', '95 FPS']),
      ],
    },

    block(
      'normal',
      'Для esports-ігор достатньо RTX 4060 — вона видає понад 240 FPS у CS2 ' +
        'та Valorant. Якщо ж граєш у AAA-проєкти або хочеш 2K-розширення, ' +
        'дивись у бік RTX 4070 або RTX 5060.',
    ),

    // Section 3 — RAM
    block('h2', 'Скільки оперативної пам’яті реально потрібно'),
    block(
      'normal',
      'У 2026 році 16 GB — мінімум, який ще дозволяє грати у більшість ' +
        'тайтлів, але вже стає вузьким горлом у відкритих світах і потокових ' +
        'трансляціях.',
    ),
    block('h3', 'Для онлайн-шутерів'),
    block(
      'normal',
      'CS2, Valorant, Apex Legends комфортно почуваються на 16 GB DDR5. ' +
        'Однак якщо плануєш стрімити чи відкривати браузер на десятки вкладок ' +
        'паралельно з грою — додай ще 16 GB і отримаєш запас.',
    ),
    block('h3', 'Для AAA-проєктів'),
    block(
      'normal',
      'Cyberpunk 2077, Starfield, Hogwarts Legacy на ультра-налаштуваннях ' +
        'легко з’їдають 20–24 GB. 32 GB DDR5-6000 — золотий стандарт ' +
        'збалансованої ігрової системи 2026 року.',
    ),

    // Gallery
    {
      _key: newKey(),
      _type: 'gallerySection',
      items: [
        {
          _key: newKey(),
          _type: 'galleryItem',
          image: {
            _type: 'image',
            asset: {_type: 'reference', _ref: gallery1.assetRef},
            alt: 'Збірка ПК Kondor PC у студії',
          },
        },
        {
          _key: newKey(),
          _type: 'galleryItem',
          image: {
            _type: 'image',
            asset: {_type: 'reference', _ref: gallery2.assetRef},
            alt: 'ПК під час стрес-тестування',
          },
        },
        {
          _key: newKey(),
          _type: 'galleryItem',
          image: {
            _type: 'image',
            asset: {_type: 'reference', _ref: gallery3.assetRef},
            alt: 'Упакування ПК для доставки Новою Поштою',
          },
        },
      ],
    },

    // Section 4 — assembly vs ready
    block('h2', 'Самостійна збірка чи готовий ПК'),
    blockWithLink(
      'Самостійна збірка дає максимум контролю, але зростає ризик: несумісність, ' +
        'відсутність гарантії на систему загалом і години витраченого часу. ',
      'Готовий ПК від Kondor PC',
      '/pk',
      ' — це 12 місяців гарантії на всю систему, тестовані FPS і безкоштовна доставка.',
    ),
    block('h3', 'Що отримуєш у комплекті'),
    listItem('Зібраний і протестований ПК — без BSOD з коробки.'),
    listItem('Драйвери та Windows 11 встановлені і налаштовані.'),
    listItem('12 місяців гарантії з виїздом у разі поломки.'),
    listItem('Кабель-менеджмент і охолодження, перевірені у годинному стрес-тесті.'),

    // Closing
    block('h2', 'Підсумок'),
    blockWithLink(
      'Якщо граєш переважно у CS2, Dota 2 і Fortnite — обирай ',
      'збірку рівня Vega',
      '/pk/vega',
      '. Для AAA-ігор і 2K — дивись у бік старших конфігурацій. У сумнівах — ',
    ),
  ]

  // Add one more closing block with a link to /pidbir
  content.push(
    blockWithLink(
      'Не знаєш, що обрати? Скористайся ',
      'майстром підбору',
      '/pidbir',
      ' — він підкаже конфігурацію під твої ігри й бюджет за 2 хвилини.',
    ),
  )

  // ─── 3. Compose document ──────────────────────────────────────────
  const doc = {
    _id: 'blogPost-yak-obraty-igrovyy-pk-2026',
    _type: 'blogPost',
    heroTitle: 'Як обрати ігровий ПК у 2026: повний гайд',
    heroDescription:
      'Розбираємо, які компоненти реально впливають на FPS, скільки потрібно RAM,\n' +
      'як підібрати відеокарту під свої ігри та що вигідніше — самостійна збірка\n' +
      'чи готова система від Kondor PC.',
    heroDesktopImage: img(heroDesktop.assetRef, 'Ігровий ПК Kondor PC — гайд 2026'),
    heroMobileImage: img(heroMobile.assetRef, 'Ігровий ПК Kondor PC — гайд 2026'),
    slug: {_type: 'slug', current: 'yak-obraty-igrovyy-pk-2026'},
    content,
    faq: {
      _type: 'faqSection',
      description:
        'Найчастіші запитання про вибір ігрового ПК. Якщо твого питання тут немає — ' +
        'напиши нам, і ми відповімо протягом години в робочий час.',
      items: [
        {
          _key: newKey(),
          question: 'Скільки коштує нормальний ігровий ПК у 2026?',
          answer:
            'Бюджетний рівень для Full HD-геймінгу починається від 28 000 ₴ (RTX 4060, 16 GB ' +
            'DDR5). Збалансована збірка з RTX 4070 і 32 GB пам’яті обійдеться ' +
            'у 52–60 тис. ₴. Топові 2K/4K-системи стартують від 80 тис. ₴.',
          buttons: ['pidbir'],
        },
        {
          _key: newKey(),
          question: 'Чи дають гарантію на готовий ПК?',
          answer:
            'Так, на всі готові ПК Kondor PC діє 12 місяців гарантії з виїздом. ' +
            'Якщо щось зламається — забираємо ПК, лагодимо за свій кошт і повертаємо.',
          buttons: ['contact'],
        },
        {
          _key: newKey(),
          question: 'Що краще — Intel чи AMD у 2026?',
          answer:
            'Для ігор Ryzen 5 7400F і Ryzen 7 7700 показують вищий FPS у CS2, Dota 2 та ' +
            'інших esports-іграх завдяки великому L3-кешу. Intel сильніший у продуктивних ' +
            'задачах: монтаж, рендер, компіляція.',
          buttons: ['sborka'],
        },
        {
          _key: newKey(),
          question: 'Скільки часу збирається кастомний ПК?',
          answer:
            'Стандартна збірка — 3 робочі дні з моменту підтвердження замовлення. ' +
            'У сезон підвищеного попиту (грудень–січень) — до 5 робочих днів.',
          buttons: ['sborka'],
        },
        {
          _key: newKey(),
          question: 'Чи можна доплатити й апгрейдити ПК пізніше?',
          answer:
            'Так. Усі наші збірки розраховані на апгрейд: блок живлення має запас, ' +
            'корпус підтримує більші GPU, материнка — швидшу пам’ять. Через рік-два ' +
            'зможеш замінити лише відеокарту й отримати +30–40% FPS.',
          buttons: ['catalog'],
        },
      ],
    },
    seo: {
      _type: 'seoSettings',
      metaTitle: 'Як обрати ігровий ПК 2026 — повний гайд від Kondor PC',
      metaDescription:
        'Розбираємо комплектуючі, FPS у популярних іграх, скільки потрібно RAM ' +
        'та як вигідно обрати готовий ігровий ПК у 2026 році. Гайд від Kondor PC.',
      keywords: [
        'ігровий ПК',
        'як обрати ігровий ПК',
        'комплектуючі для геймінгу',
        'RTX 4060',
        'Ryzen 5 7400F',
        'Kondor PC',
      ],
      opengraphImage: {
        _type: 'image',
        asset: {_type: 'reference', _ref: og.assetRef},
        alt: 'Як обрати ігровий ПК у 2026 — гайд від Kondor PC',
      },
    },
  }

  console.log('[seed-blog] writing blogPost…')
  await client.createOrReplace(doc as unknown as {_id: string; _type: string})

  // blogPage singleton — for blog index SEO
  const blogPage = {
    _id: 'blogPage',
    _type: 'blogPage',
    seo: {
      _type: 'seoSettings',
      metaTitle: 'Блог Kondor PC — гайди, огляди, поради',
      metaDescription:
        'Гайди, огляди та поради по ігрових ПК, комплектуючим і оптимізації — від команди Kondor PC.',
      keywords: ['блог Kondor PC', 'ігрові ПК', 'огляди', 'гайди', 'поради по геймінгу'],
    },
  }

  console.log('[seed-blog] writing blogPage…')
  await client.createOrReplace(blogPage as unknown as {_id: string; _type: string})

  console.log('[seed-blog] done ✓')
  console.log(
    '[seed-blog] view at /blog and /blog/' + doc.slug.current,
  )
}

run().catch((err) => {
  console.error('[seed-blog] failed:', err)
  process.exit(1)
})
