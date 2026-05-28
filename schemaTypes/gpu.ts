import { defineField, defineType } from "sanity";

type FpsRow = {
  game?: { _ref?: string };
  gameSlug?: string;
  resolution?: string;
  settings?: string;
};

function fpsUniqKey(row: FpsRow): string | null {
  const gameKey = row.game?._ref || row.gameSlug?.trim();
  if (!gameKey || !row.resolution) return null;
  return [gameKey, row.resolution, row.settings ?? "high"].join("|");
}

export const gpu = defineType({
  name: "gpu",
  title: "Відеокарта",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Бренд",
      type: "string",
      options: { list: ["NVIDIA", "AMD"] },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "model",
      title: "Модель",
      type: "string",
      description: "Напр. RTX 5060, RX 7600 XT",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "vram",
      title: "VRAM",
      type: "string",
      description: "Напр. 8 GB, 16 GB",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "fps",
      title: "FPS дані",
      description: "Базові показники FPS для цієї відеокарти. В самому ПК можна задати коефіцієнт коригування.",
      type: "array",
      validation: (R) =>
        R.custom((rows) => {
          if (!Array.isArray(rows)) return true;
          const seen = new Set<string>();
          for (const raw of rows) {
            const key = fpsUniqKey((raw ?? {}) as FpsRow);
            if (!key) continue;
            if (seen.has(key)) {
              return "FPS рядки мають бути унікальні за комбінацією: game + resolution + settings.";
            }
            seen.add(key);
          }
          return true;
        }),
      of: [
        {
          type: "object",
          title: "FPS запис",
          fields: [
            defineField({
              name: "game",
              title: "Гра",
              type: "reference",
              to: [{ type: "game" }],
              description:
                "Основне поле зв'язку. Обери документ гри — це джерело істини для зв'язку FPS з game.",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "gameSlug",
              title: "Гра (slug) — legacy",
              type: "string",
              description:
                "Перехідне поле для зворотної сумісності. Нові записи заповнюй через поле «Гра» (reference).",
            }),
            defineField({
              name: "resolution",
              title: "Роздільна здатність",
              type: "string",
              options: {
                list: [
                  { title: "Full HD (1080p)", value: "fullhd" },
                  { title: "2K (1440p)", value: "2k" },
                  { title: "4K (2160p)", value: "4k" },
                ],
              },
              validation: (R) => R.required(),
            }),
            defineField({
              name: "settings",
              title: "Налаштування графіки",
              type: "string",
              options: {
                list: [
                  { title: "Низькі", value: "low" },
                  { title: "Середні", value: "medium" },
                  { title: "Високі", value: "high" },
                  { title: "Ультра", value: "ultra" },
                ],
              },
              initialValue: "high",
            }),
            defineField({
              name: "fpsAvg",
              title: "Середній FPS",
              type: "number",
              validation: (R) => R.required().min(1),
            }),
            defineField({
              name: "fpsMin",
              title: "Мінімальний FPS (1% low)",
              type: "number",
            }),
            defineField({
              name: "verified",
              title: "Перевірено в лабораторії",
              type: "boolean",
              initialValue: true,
            }),
            defineField({
              name: "notes",
              title: "Примітки",
              type: "string",
              description: "Напр. «з FSR», «без трасування»",
            }),
          ],
          preview: {
            select: {
              gameName: "game.name",
              gameSlug: "gameSlug",
              resolution: "resolution",
              settings: "settings",
              fpsAvg: "fpsAvg",
            },
            prepare({ gameName, gameSlug, resolution, settings, fpsAvg }) {
              const gameLabel = gameName || gameSlug || "unknown-game";
              return {
                title: `${gameLabel} · ${resolution} · ${settings}`,
                subtitle: `${fpsAvg} FPS avg`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      brand: "brand",
      model: "model",
      vram: "vram",
    },
    prepare({ brand, model, vram }) {
      return {
        title: `${brand} ${model}`,
        subtitle: vram,
      };
    },
  },
});
