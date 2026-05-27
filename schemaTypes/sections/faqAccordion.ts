import {defineField, defineType} from 'sanity'

/**
 * FAQ accordion — посилається на масив FAQ-entry документів.
 * Один FAQ можна використати на декількох сторінках без копіпасти.
 */
export const faqAccordion = defineType({
  name: 'faqAccordion',
  title: 'FAQ-аккордеон',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      initialValue: 'Часті питання',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'faqEntry'}]}],
      validation: (r) => r.required().min(1).max(20),
    }),
    defineField({name: 'anchor', type: 'string'}),
  ],
  preview: {
    select: {title: 'heading', items: 'items'},
    prepare: ({title, items}) => ({
      title: title || 'FAQ',
      subtitle: `${(items as unknown[] | undefined)?.length || 0} питань`,
    }),
  },
})
