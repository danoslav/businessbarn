import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '@/importMap'
import configPromise from '@payload-config'

export default async function NotFound() {
  return NotFoundPage({
    config: configPromise,
    importMap,
    // These are required by the type but unused on the 404 view
    params: Promise.resolve({ segments: [] }),
    searchParams: Promise.resolve({}),
  })
}
