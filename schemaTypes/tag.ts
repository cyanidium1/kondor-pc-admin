import {defineField, defineType} from 'sanity'

/**
 * Tag — відкрита таксономія.
 *
 * Використовується для cross-cutting категоризації, яка не заслуговує
 * на окремий документ (жанри, фічі, бюджети). Редактор додає теги без
 * правок коду — це альтернатива закритим options.list.
 *
 * Не плутати з повноцінними документами (game, useCase) — теги це
 * leaf-сутності для фільтрування й групування.
 */
export const tag = defineType({
  name: 'tag',
  title: 'Тег',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Назва',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 60},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Категорія',
      type: 'string',
      options: {
        list: [
          {title: 'Гра', value: 'game'},
          {title: 'Сценарій (use-case)', value: 'useCase'},
          {title: 'Фіча', value: 'feature'},
          {title: 'Бюджет', value: 'budget'},
          {title: 'Інше', value: 'other'},
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Опис',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {title: 'name', category: 'category', slug: 'slug.current'},
    prepare: ({title, category, slug}) => ({
      title,
      subtitle: `${category} · ${slug}`,
    }),
  },
})
