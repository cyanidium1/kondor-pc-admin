import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "if6dzz62",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skHjXT6QS9WBER6qr3gOCV7weQBkiCj0lyV8uWCxfU09BJm2lGbEQHPGOoPkf6kV5TAp2HQgGnIzfTIOA",
  useCdn: false,
});

const games = [
  {_id: "game-cs2", slug: "cs2", name: "Counter-Strike 2", shortName: "CS2", enabled: true, isPopular: true},
  {
    _id: "game-warzone",
    slug: "warzone",
    name: "Call of Duty: Warzone",
    shortName: "Warzone",
    enabled: true,
    isPopular: true,
  },
  {_id: "game-gta5", slug: "gta5", name: "Grand Theft Auto V", shortName: "GTA 5", enabled: true, isPopular: true},
  {_id: "game-fortnite", slug: "fortnite", name: "Fortnite", shortName: "Fortnite", enabled: true, isPopular: true},
  {_id: "game-dota2", slug: "dota2", name: "Dota 2", shortName: "Dota 2", enabled: true, isPopular: true},
  {_id: "game-valorant", slug: "valorant", name: "Valorant", shortName: "Valorant", enabled: true, isPopular: true},
  {
    _id: "game-cyberpunk",
    slug: "cyberpunk",
    name: "Cyberpunk 2077",
    shortName: "CP 2077",
    enabled: true,
    isPopular: true,
    isSystemHeavy: true,
  },
];

function fpsRow(_key, gameRef, resolution, fpsAvg) {
  return {
    _key,
    game: {_type: "reference", _ref: gameRef},
    resolution,
    settings: "high",
    fpsAvg,
    verified: true,
  };
}

// ─── GPU: NVIDIA RTX 5060 8GB ─────────────────────────────────────────────────
// FPS базові значення беремо з VEGA (Ryzen 5 7400F + DDR5) як еталон.
const gpuRtx5060 = {
  _type: "gpu",
  _id: "gpu-rtx-5060-8gb",
  brand: "NVIDIA",
  model: "GeForce RTX 5060 8GB",
  vram: "8 GB",
  fps: [
    fpsRow("cs2-fhd", "game-cs2", "fullhd", 380),
    fpsRow("cs2-2k", "game-cs2", "2k", 280),
    fpsRow("cs2-4k", "game-cs2", "4k", 165),
    fpsRow("warzone-fhd", "game-warzone", "fullhd", 145),
    fpsRow("warzone-2k", "game-warzone", "2k", 110),
    fpsRow("gta5-fhd", "game-gta5", "fullhd", 140),
    fpsRow("gta5-2k", "game-gta5", "2k", 95),
    fpsRow("gta5-4k", "game-gta5", "4k", 60),
    fpsRow("fortnite-fhd", "game-fortnite", "fullhd", 180),
    fpsRow("fortnite-2k", "game-fortnite", "2k", 130),
    fpsRow("dota2-fhd", "game-dota2", "fullhd", 210),
    fpsRow("dota2-2k", "game-dota2", "2k", 170),
    fpsRow("valorant-fhd", "game-valorant", "fullhd", 380),
    fpsRow("valorant-2k", "game-valorant", "2k", 280),
    fpsRow("cyberpunk-fhd", "game-cyberpunk", "fullhd", 85),
    fpsRow("cyberpunk-2k", "game-cyberpunk", "2k", 62),
    fpsRow("cyberpunk-4k", "game-cyberpunk", "4k", 38),
  ],
};

// ─── VEGA ─────────────────────────────────────────────────────────────────────
const buildVega = {
  _type: "build",
  _id: "build-vega",
  name: "VEGA",
  slug: { _type: "slug", current: "vega" },
  tier: "base",
  status: "assemble_on_order",
  shortTagline: "Оптимально для Full HD геймінгу",
  priceUah: 34990,
  assemblyDays: 3,
  colorVariant: "white",
  targetResolution: "fullhd",
  cpu: "Ryzen 5 7400F",
  gpu: { _type: "reference", _ref: "gpu-rtx-5060-8gb" },
  fpsCoefficient: 1.0,
  baseRam: "32 GB DDR5",
  ramSpeed: "6000",
  baseStorage: "500 GB NVMe",
  powerConsumptionW: 350,
  noiseLevelDb: 28,
  upgradePathNotes: "Вільні M.2 слоти для +2 ТБ NVMe, можна поставити кулер Tower, PSU витримує GPU наступного покоління.",

  ramOptions: [
    { _key: "ram-32", id: "32", label: "32 GB DDR5", description: "6000 MHz", priceDelta: 0, isDefault: true },
    { _key: "ram-64", id: "64", label: "64 GB DDR5", description: "6000 MHz", priceDelta: 3000 },
  ],
  ssdOptions: [
    { _key: "ssd-500", id: "500gb", label: "500 GB NVMe", priceDelta: 0, isDefault: true },
    { _key: "ssd-1tb", id: "1tb",   label: "1 TB NVMe",   priceDelta: 1800 },
    { _key: "ssd-2tb", id: "2tb",   label: "2 TB NVMe",   priceDelta: 4500 },
    { _key: "ssd-4tb", id: "4tb",   label: "4 TB NVMe",   priceDelta: 9500 },
  ],
  warrantyOptions: [
    { _key: "w-1y", id: "1y", label: "1 рік",   description: "включено",              priceDelta: 0,    isDefault: true },
    { _key: "w-2y", id: "2y", label: "2 роки",  description: "захист компонентів",    priceDelta: 3500 },
    { _key: "w-3y", id: "3y", label: "3 роки",  description: "пріоритет + чистки",    priceDelta: 6500 },
  ],

  components: [
    { _key: "cpu",  category: "cpu",         brand: "AMD",       model: "Ryzen 5 7400F",          displayName: "AMD Ryzen 5 7400F",                   humanDescription: "6 ядер, 12 потоків. Достатньо для будь-якої сучасної гри у Full HD.", warrantyMonths: 36 },
    { _key: "gpu",  category: "gpu",         brand: "NVIDIA",    model: "GeForce RTX 5060 8GB",   displayName: "NVIDIA GeForce RTX 5060 8GB",          humanDescription: "144+ FPS у Full HD на високих налаштуваннях у більшості ігор.",     warrantyMonths: 24 },
    { _key: "ram",  category: "ram",         brand: "Kingston",  model: "FURY DDR5-6000 32GB",    displayName: "32 GB DDR5 6000 MHz Kingston FURY",    humanDescription: "Швидка пам'ять. 32 ГБ з запасом на Discord, Chrome, стрім.",       warrantyMonths: 120 },
    { _key: "ssd",  category: "ssd",         brand: "Kingston",  model: "KC3000 500GB NVMe",      displayName: "500 GB NVMe M.2 Kingston KC3000",      humanDescription: "Ігри завантажуються за 5–10 секунд.",                              warrantyMonths: 60 },
    { _key: "mb",   category: "motherboard", brand: "ASUS",      model: "PRIME B650M-A",          displayName: "ASUS PRIME B650M-A",                   humanDescription: "З'єднує всі компоненти. Підтримує Wi-Fi 6 та Bluetooth 5.2.",      warrantyMonths: 36 },
    { _key: "cool", category: "cooling",     brand: "DeepCool",  model: "AK400",                  displayName: "DeepCool AK400",                       humanDescription: "Тихе та ефективне повітряне охолодження. До 28 дБ на максимумі.", warrantyMonths: 36 },
    { _key: "psu",  category: "psu",         brand: "Chieftec",  model: "650W 80+ Bronze",        displayName: "Chieftec 650W 80+ Bronze",             humanDescription: "Сертифікований БЖ із запасом потужності на апгрейд.",             warrantyMonths: 60 },
    { _key: "case", category: "case",        brand: "Lian Li",   model: "LANCOOL 205 Mesh White", displayName: "Lian Li LANCOOL 205 Mesh Білий",       humanDescription: "Прозора стінка, RGB-підсвітка, хороша продувка.",                 warrantyMonths: 24 },
    { _key: "os",   category: "os",          brand: "Microsoft", model: "Windows 11 Home",        displayName: "Windows 11 Home",                      humanDescription: "Ліцензійна, попередньо встановлена, активована.",                  warrantyMonths: 9999 },
  ],

  includedFeatureKeys: ["assembly","stress-test","windows","office","video-report","delivery","warranty","support","consult","return"],
  useDefaultFaq: true,
};

// ─── HYPER ─────────────────────────────────────────────────────────────────────
// Та сама відеокарта RTX 5060, але слабший CPU (Ryzen 5 5600) + DDR4.
// Коефіцієнт FPS ≈ 0.9 (середній по всіх іграх порівняно з VEGA).
const buildHyper = {
  _type: "build",
  _id: "build-hyper",
  name: "HYPER",
  slug: { _type: "slug", current: "hyper" },
  tier: "base",
  status: "in_stock",
  shortTagline: "Альтернатива на DDR4 для CS2 та Dota 2",
  priceUah: 31990,
  assemblyDays: 3,
  colorVariant: "black",
  targetResolution: "fullhd",
  cpu: "Ryzen 5 5600",
  gpu: { _type: "reference", _ref: "gpu-rtx-5060-8gb" },
  fpsCoefficient: 0.9,
  baseRam: "32 GB DDR4",
  ramSpeed: "3200",
  baseStorage: "500 GB NVMe",
  powerConsumptionW: 340,
  noiseLevelDb: 30,
  upgradePathNotes: "Апгрейд до Ryzen 7 на AM4 без заміни плати. Вільний M.2 слот.",

  ramOptions: [
    { _key: "ram-16", id: "16", label: "16 GB DDR4", description: "3200 MHz", priceDelta: 0 },
    { _key: "ram-32", id: "32", label: "32 GB DDR4", description: "3200 MHz", priceDelta: 1500, isDefault: true },
    { _key: "ram-64", id: "64", label: "64 GB DDR4", description: "3200 MHz", priceDelta: 3700 },
  ],
  ssdOptions: [
    { _key: "ssd-500", id: "500gb", label: "500 GB NVMe", priceDelta: 0, isDefault: true },
    { _key: "ssd-1tb", id: "1tb",   label: "1 TB NVMe",   priceDelta: 1800 },
    { _key: "ssd-2tb", id: "2tb",   label: "2 TB NVMe",   priceDelta: 4500 },
    { _key: "ssd-4tb", id: "4tb",   label: "4 TB NVMe",   priceDelta: 9500 },
  ],
  warrantyOptions: [
    { _key: "w-1y", id: "1y", label: "1 рік",   description: "включено",              priceDelta: 0,    isDefault: true },
    { _key: "w-2y", id: "2y", label: "2 роки",  description: "захист компонентів",    priceDelta: 3500 },
    { _key: "w-3y", id: "3y", label: "3 роки",  description: "пріоритет + чистки",    priceDelta: 6500 },
  ],

  components: [
    { _key: "cpu",  category: "cpu",         brand: "AMD",       model: "Ryzen 5 5600",           displayName: "AMD Ryzen 5 5600",                     humanDescription: "6 ядер, перевірений на роках. Ідеальний для CS2, Dota 2.",       warrantyMonths: 36 },
    { _key: "gpu",  category: "gpu",         brand: "NVIDIA",    model: "GeForce RTX 5060 8GB",   displayName: "NVIDIA GeForce RTX 5060 8GB",          humanDescription: "Стабільні 144+ FPS у Full HD.",                                   warrantyMonths: 24 },
    { _key: "ram",  category: "ram",         brand: "Kingston",  model: "FURY DDR4-3200 32GB",    displayName: "32 GB DDR4 3200 MHz",                  humanDescription: "32 ГБ DDR4 — більш ніж достатньо для поточних ігор.",            warrantyMonths: 120 },
    { _key: "ssd",  category: "ssd",         brand: "Kingston",  model: "NV2 500GB NVMe",         displayName: "500 GB NVMe M.2 Kingston",             humanDescription: "Швидкий SSD під систему та ігри.",                               warrantyMonths: 60 },
    { _key: "mb",   category: "motherboard", brand: "MSI",       model: "B550M-A PRO",            displayName: "MSI B550M-A PRO",                      humanDescription: "Надійна плата на AM4.",                                           warrantyMonths: 36 },
    { _key: "cool", category: "cooling",     brand: "DeepCool",  model: "AK400",                  displayName: "DeepCool AK400",                       humanDescription: "Тихе повітряне охолодження.",                                    warrantyMonths: 36 },
    { _key: "psu",  category: "psu",         brand: "GameMax",   model: "650W 80+ Bronze",        displayName: "GameMax 650W 80+ Bronze",              humanDescription: "Сертифікований БЖ.",                                              warrantyMonths: 36 },
    { _key: "case", category: "case",        brand: "GameMax",   model: "Black RGB",              displayName: "GameMax Black RGB",                    humanDescription: "Чорний корпус з RGB-підсвіткою.",                                 warrantyMonths: 24 },
    { _key: "os",   category: "os",          brand: "Microsoft", model: "Windows 11 Home",        displayName: "Windows 11 Home",                      humanDescription: "Ліцензійна.",                                                     warrantyMonths: 9999 },
  ],

  includedFeatureKeys: ["assembly","stress-test","windows","office","video-report","delivery","warranty","support","consult","return"],
  useDefaultFaq: true,
};

// ─── CREATE ───────────────────────────────────────────────────────────────────
async function main() {
  console.log("Creating/updating games...");
  for (const game of games) {
    await client.createOrReplace({
      _type: "game",
      _id: game._id,
      slug: game.slug,
      name: game.name,
      shortName: game.shortName,
      enabled: game.enabled,
      isPopular: game.isPopular,
      isSystemHeavy: game.isSystemHeavy ?? false,
    });
  }
  console.log(`✓ ${games.length} games created`);

  console.log("Creating GPU: NVIDIA RTX 5060 8GB...");
  await client.createOrReplace(gpuRtx5060);
  console.log("✓ GPU created");

  console.log("Creating Build: VEGA...");
  await client.createOrReplace(buildVega);
  console.log("✓ VEGA created");

  console.log("Creating Build: HYPER...");
  await client.createOrReplace(buildHyper);
  console.log("✓ HYPER created");

  console.log("\nДокументи успішно завантажені в Sanity!");
}

main().catch((err) => { console.error(err); process.exit(1); });
