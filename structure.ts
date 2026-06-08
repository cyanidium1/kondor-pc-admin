import type {StructureBuilder, StructureResolver} from 'sanity/structure'

/**
 * Studio structure.
 *
 * Верхня частина — конструктор лендингів і його довідники.
 * Нижня (під дільником) — існуючий каталог ПК.
 */
export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Контент')
    .items([
      // === Конструктор лендингів ===
      S.listItem()
        .title('📄 Лендингові сторінки')
        .child(
          S.documentTypeList('page')
            .title('Сторінки')
            .defaultOrdering([
              {field: 'pathPrefix', direction: 'asc'},
              {field: 'slug.current', direction: 'asc'},
            ]),
        ),
      S.listItem().title('❓ FAQ').child(S.documentTypeList('faqEntry')),
      S.listItem().title('🎟️ Промокоди').child(S.documentTypeList('promoCode')),
      S.listItem().title('🏷️ Теги').child(S.documentTypeList('tag')),
      S.divider(),
      // === Блог ===
      S.listItem()
        .title('📰 Статті блогу')
        .child(
          S.documentTypeList('blogPost')
            .title('Статті блогу')
            .defaultOrdering([{field: '_createdAt', direction: 'desc'}]),
        ),
      S.listItem()
        .title('📰 Блог (SEO)')
        .child(S.document().schemaType('blogPage').documentId('blogPage')),
      S.divider(),
      S.listItem()
        .title('⚙️ Site settings')
        .child(
          S.list()
            .title('Site settings')
            .items([
              S.listItem()
                .title('Реквізити для оплати')
                .child(
                  S.document()
                    .schemaType('paymentRequisites')
                    .documentId('paymentRequisites')
                    .title('Реквізити для оплати'),
                ),
              S.listItem()
                .title('Контакти')
                .child(
                  S.document()
                    .schemaType('siteContacts')
                    .documentId('siteContacts')
                    .title('Контакти'),
                ),
              S.listItem()
                .title('Головна: для яких задач збираємо ПК')
                .child(
                  S.document()
                    .schemaType('homePcTasksSection')
                    .documentId('homePcTasksSection')
                    .title('Для яких задач збираємо ПК'),
                ),
            ]),
        ),
      S.divider(),
      // === Існуючий каталог (НЕ ЧІПАЄМО) ===
      S.listItem().title('🖥️ Ігрові ПК').child(S.documentTypeList('build')),
      S.listItem().title('💾 GPU').child(S.documentTypeList('gpu')),
      S.listItem().title('🎮 Ігри').child(S.documentTypeList('game')),
    ])
