import {defineField, defineType} from 'sanity'

function nonEmptyString(value: unknown): true | string {
  return typeof value === 'string' && value.trim().length > 0 ? true : 'Обовʼязкове поле'
}

export const siteContacts = defineType({
  name: 'siteContacts',
  title: 'Контакти',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (R) => R.required().custom(nonEmptyString).email(),
    }),
    defineField({
      name: 'telegram',
      title: 'Telegram',
      type: 'string',
      description: 'Нік (@username) або посилання t.me/…',
      validation: (R) =>
        R.required()
          .custom(nonEmptyString)
          .custom((value) => {
            if (typeof value !== 'string') return 'Обовʼязкове поле'
            const v = value.trim()
            if (/^@[\w\d_]{4,32}$/i.test(v)) return true
            if (/^https?:\/\/(t\.me|telegram\.me)\/[\w\d_]{4,32}\/?$/i.test(v)) return true
            if (/^[\w\d_]{4,32}$/i.test(v)) return true
            return 'Вкажіть @username, username або посилання t.me/…'
          }),
    }),
    defineField({
      name: 'phone',
      title: 'Телефон',
      type: 'string',
      description: 'Напр. +380501234567',
      validation: (R) =>
        R.required()
          .custom(nonEmptyString)
          .regex(/^\+380\d{9}$/)
          .error('Телефон у форматі +380 та 9 цифр після коду оператора.'),
    }),
  ],
  preview: {
    select: {email: 'email', phone: 'phone'},
    prepare({email, phone}) {
      return {
        title: 'Контакти',
        subtitle: [email, phone].filter(Boolean).join(' · '),
      }
    },
  },
})
