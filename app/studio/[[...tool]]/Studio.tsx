'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export function Studio(): React.ReactElement {
  return <NextStudio config={config} />
}
