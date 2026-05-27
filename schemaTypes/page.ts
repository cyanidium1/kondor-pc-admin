import {defineField, defineType} from 'sanity'

/**
 * Page — лендингова сторінка конструктора.
 *
 * Один документ = одна сторінка /dlya/{slug} або /promo/{slug}.
 * Маркетолог обирає префікс, slug, добавляє блоки в sections[].
 *
 * У Спринті 1А — БЕЗ продуктових посилань. Усі секції універсальні
 * (текст, медіа, FAQ, CTA, навігація). Продуктові блоки додамо
 * наступним спринтом, коли механіка конструктора буде підтверджена.
 */
export const page = defineType({
  name: 'page',
  title: 'Лендингова сторінка',
  type: 'document',
  groups: [
    {name: 'main', title: 'Основне', default: true},
    {name: 'sections', title: 'Контент (блоки)'},
    {name: 'seo', title: 'SEO'},
    {name: 'lifecycle', title: 'Життєвий цикл'},
  ],
  fields: [
    defineField({
      name: 'internalTitle',
      title: 'Внутрішня назва',
      description: 'Для пошуку в Studio. На сайті не показується.',
      type: 'string',
      validation: (r) => r.required(),
      group: 'main',
    }),
    defineField({
      name: 'pathPrefix',
      title: 'Префікс URL',
      type: 'string',
      options: {
        list: [
          {title: '/dlya/* (вічнозелений: гра або сценарій)', value: 'dlya'},
          {title: '/promo/* (тимчасовий: подія або акція)', value: 'promo'},
        ],
        layout: 'radio',
      },
      initialValue: 'dlya',
      validation: (r) => r.required(),
      group: 'main',
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: {
        source: 'internalTitle',
        maxLength: 80,
        isUnique: async (slug, ctx) => {
          const {document, getClient} = ctx
          const client = getClient({apiVersion: '2026-05-01'})
          const id = document._id.replace(/^drafts\./, '')
          const params = {slug, prefix: document.pathPrefix, id}
          const q = `!defined(*[_type=='page' && pathPrefix==$prefix
                     && slug.current==$slug && !(_id in [$id, 'drafts.'+$id])][0])`
          return client.fetch(q, params)
        },
      },
      validation: (r) => r.required(),
      group: 'main',
    }),
    defineField({
      name: 'tags',
      title: 'Теги',
      description:
        'Для фільтрації та угрупувань. У хвилі 1 використовується для організації в Studio.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
      group: 'main',
    }),
    defineField({
      name: 'sections',
      title: 'Секції',
      type: 'array',
      of: [
        {type: 'breadcrumbs'},
        {type: 'heroSimple'},
        {type: 'anchorNav'},
        {type: 'statsStrip'},
        {type: 'textBlock'},
        {type: 'imageFull'},
        {type: 'imageTextSplit'},
        {type: 'featureList'},
        {type: 'mediaVideo'},
        {type: 'faqAccordion'},
        {type: 'ctaPromoBanner'},
      ],
      validation: (r) => r.required().min(1),
      group: 'sections',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({name: 'title', type: 'string', validation: (r) => r.required().max(70)}),
        defineField({
          name: 'description',
          type: 'text',
          rows: 3,
          validation: (r) => r.required().max(170),
        }),
        defineField({name: 'ogImage', type: 'image', options: {hotspot: true}}),
        defineField({name: 'noindex', type: 'boolean', initialValue: false}),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата першої публікації',
      type: 'datetime',
      group: 'lifecycle',
    }),
    defineField({
      name: 'expiresAt',
      title: 'Дата завершення (тільки для /promo)',
      description:
        'Після цієї дати показуємо банер «Подія завершилась», прибираємо з sitemap.',
      type: 'datetime',
      hidden: ({document}) => document?.pathPrefix !== 'promo',
      group: 'lifecycle',
    }),
    defineField({
      name: 'redirectsFrom',
      title: 'Старі URL (301-редиректи на цю сторінку)',
      description: 'Список legacy-шляхів без домену, напр. /pk-dlya-cs2',
      type: 'array',
      of: [{type: 'string'}],
      group: 'lifecycle',
    }),
  ],
  preview: {
    select: {title: 'internalTitle', prefix: 'pathPrefix', slug: 'slug.current'},
    prepare: ({title, prefix, slug}) => ({
      title,
      subtitle: `/${prefix}/${slug || '?'}`,
    }),
  },
})
