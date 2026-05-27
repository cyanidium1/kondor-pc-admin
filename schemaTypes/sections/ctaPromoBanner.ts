import {defineField, defineType} from 'sanity'

/**
 * CTA / promo banner — призив до дії з опціональним кодом і дедлайном.
 * Не прив'язаний до конкретного візарду чи продукту — href вільний.
 */
export const ctaPromoBanner = defineType({
  name: 'ctaPromoBanner',
  title: 'CTA / промо-баннер',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'promoText', type: 'text', rows: 2}),
    defineField({name: 'endDate', title: 'Дійсний до', type: 'datetime'}),
    defineField({name: 'promoCode', type: 'string'}),
    defineField({
      name: 'button',
      type: 'object',
      fields: [
        defineField({name: 'text', type: 'string', validation: (r) => r.required()}),
        defineField({name: 'href', type: 'string', validation: (r) => r.required()}),
      ],
    }),
    defineField({name: 'anchor', type: 'string'}),
  ],
  preview: {
    select: {title: 'title', code: 'promoCode'},
    prepare: ({title, code}) => ({
      title: title || 'CTA',
      subtitle: code ? `Код: ${code}` : 'Promo banner',
    }),
  },
})
