import {defineField, defineType} from 'sanity'

/**
 * FAQ entry — окремий документ з питанням-відповіддю.
 *
 * Використовується через reference у блоці faqAccordion на лендингах
 * та в полі customFaq збірки (build), щоб одне й те саме питання
 * можна було показувати в кількох місцях без копіпасти.
 * Відповідь — Portable Text з підтримкою посилань.
 */
export const faqEntry = defineType({
  name: 'faqEntry',
  title: 'FAQ — питання',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Відповідь',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                fields: [
                  defineField({name: 'href', type: 'url'}),
                  defineField({name: 'newTab', type: 'boolean', initialValue: false}),
                ],
              },
            ],
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {select: {title: 'question'}},
})
