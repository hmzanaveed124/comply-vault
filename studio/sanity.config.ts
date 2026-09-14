import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { deskStructure } from './deskStructure'

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  '2997lgct'
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'complyvault',
  title: 'ComplyVault Blog',

  projectId,
  dataset,

  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool({ defaultApiVersion: '2025-01-01' }),
  ],

  schema: {
    types: schemaTypes,
  },
})
