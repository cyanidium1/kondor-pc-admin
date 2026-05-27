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
      S.listItem().title('🏷️ Теги').child(S.documentTypeList('tag')),
      S.divider(),
      // === Існуючий каталог (НЕ ЧІПАЄМО) ===
      S.listItem().title('🖥️ Ігрові ПК').child(S.documentTypeList('build')),
      S.listItem().title('💾 GPU').child(S.documentTypeList('gpu')),
      S.listItem().title('🎮 Ігри').child(S.documentTypeList('game')),
    ])
