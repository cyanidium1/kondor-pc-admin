/**
 * Backfills `sku` for all existing build documents.
 *
 * Run:
 *   npx sanity exec scripts/migrate-build-sku.ts --with-user-token
 *
 * Idempotent — skips documents that already have `sku`.
 * Format: KPC-{SLUG_UPPERCASE}, e.g. vega → KPC-VEGA, hyper-nova → KPC-HYPER-NOVA
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-05-01'})

const SKU_PREFIX = 'KPC'

function skuFromSlug(slug: string): string {
  return `${SKU_PREFIX}-${slug.toUpperCase()}`
}

type BuildRow = {
  _id: string
  slug?: {current?: string}
  sku?: string
}

async function run() {
  console.log('[migrate-build-sku] projectId =', client.config().projectId)

  const builds = await client.fetch<BuildRow[]>(
    `*[_type == "build"]{ _id, slug, sku } | order(_id asc)`,
    {},
    {perspective: 'raw'},
  )

  let tx = client.transaction()
  let pending = 0

  for (const build of builds) {
    const slug = build.slug?.current?.trim()
    if (!slug) {
      console.warn(`[migrate-build-sku] skip ${build._id}: missing slug`)
      continue
    }
    if (build.sku) {
      console.log(`[migrate-build-sku] skip ${build._id}: already ${build.sku}`)
      continue
    }

    const sku = skuFromSlug(slug)
    tx = tx.patch(build._id, {set: {sku}})
    pending++
    console.log(`[migrate-build-sku] ${build._id} → ${sku}`)
  }

  if (pending === 0) {
    console.log('[migrate-build-sku] nothing to update')
    return
  }

  await tx.commit()
  console.log(`[migrate-build-sku] done ✓ updated ${pending} document(s)`)
}

run().catch((err) => {
  console.error('[migrate-build-sku] failed:', err)
  process.exit(1)
})
