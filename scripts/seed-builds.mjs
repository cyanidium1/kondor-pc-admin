import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "0j0lqw3e",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skHjXT6QS9WBER6qr3gOCV7weQBkiCj0lyV8uWCxfU09BJm2lGbEQHPGOoPkf6kV5TAp2HQgGnIzfTIOA",
  useCdn: false,
});

// ─── GPU: NVIDIA RTX 5060 8GB ─────────────────────────────────────────────────
// FPS базові значення беремо з VEGA (Ryzen 5 7400F + DDR5) як еталон.
const gpuRtx5060 = {
  _type: "gpu",
  _id: "gpu-rtx-5060-8gb",
  brand: "NVIDIA",
  model: "GeForce RTX 5060 8GB",
  vram: "8 GB",
  fps: [
    { _key: "cs2-fhd",       gameSlug: "cs2",       resolution: "fullhd", settings: "high", fpsAvg: 380, verified: true },
    { _key: "cs2-2k",        gameSlug: "cs2",       resolution: "2k",     settings: "high", fpsAvg: 280, verified: true },
    { _key: "cs2-4k",        gameSlug: "cs2",       resolution: "4k",     settings: "high", fpsAvg: 165, verified: true },
    { _key: "warzone-fhd",   gameSlug: "warzone",   resolution: "fullhd", settings: "high", fpsAvg: 145, verified: true },
    { _key: "warzone-2k",    gameSlug: "warzone",   resolution: "2k",     settings: "high", fpsAvg: 110, verified: true },
    { _key: "gta5-fhd",      gameSlug: "gta5",      resolution: "fullhd", settings: "high", fpsAvg: 140, verified: true },
    { _key: "gta5-2k",       gameSlug: "gta5",      resolution: "2k",     settings: "high", fpsAvg: 95,  verified: true },
    { _key: "gta5-4k",       gameSlug: "gta5",      resolution: "4k",     settings: "high", fpsAvg: 60,  verified: true },
    { _key: "fortnite-fhd",  gameSlug: "fortnite",  resolution: "fullhd", settings: "high", fpsAvg: 180, verified: true },
    { _key: "fortnite-2k",   gameSlug: "fortnite",  resolution: "2k",     settings: "high", fpsAvg: 130, verified: true },
    { _key: "dota2-fhd",     gameSlug: "dota2",     resolution: "fullhd", settings: "high", fpsAvg: 210, verified: true },
    { _key: "dota2-2k",      gameSlug: "dota2",     resolution: "2k",     settings: "high", fpsAvg: 170, verified: true },
    { _key: "valorant-fhd",  gameSlug: "valorant",  resolution: "fullhd", settings: "high", fpsAvg: 380, verified: true },
    { _key: "valorant-2k",   gameSlug: "valorant",  resolution: "2k",     settings: "high", fpsAvg: 280, verified: true },
    { _key: "cyberpunk-fhd", gameSlug: "cyberpunk", resolution: "fullhd", settings: "high", fpsAvg: 85,  verified: true },
    { _key: "cyberpunk-2k",  gameSlug: "cyberpunk", resolution: "2k",     settings: "high", fpsAvg: 62,  verified: true },
    { _key: "cyberpunk-4k",  gameSlug: "cyberpunk", resolution: "4k",     settings: "high", fpsAvg: 38,  verified: true },
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
  faqKeys: ["b-gta6","b-monitor","b-power","b-upgrade","b-return"],
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
  faqKeys: ["b-gta6","b-monitor","b-power","b-upgrade","b-return"],
};

// ─── CREATE ───────────────────────────────────────────────────────────────────
async function main() {
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
