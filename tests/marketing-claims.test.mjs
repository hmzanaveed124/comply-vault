import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name)
    return entry.isDirectory() ? files(file) : /\.(tsx?|txt)$/.test(file) && !/\.test\.ts$/.test(file) ? [file] : []
  })
}

test('public source and metadata do not reintroduce retired trust claims', () => {
  const forbidden = [
    /40\+\s*(hours|hrs)/i, /75%\s*(cost reduction|saved|recovered)/i,
    /3x\s*faster/i, /(?:under|<)\s*10\s*minutes/i,
    /SOC\s*2\s*(controls|readiness|in progress)/i,
    /actively working toward SOC\s*2/i, /WORM.{0,30}(?:Planned|In Progress)/i,
    /SEC[- ]ready/i, /CCO[- ]only finalization/i,
    /State-registered only \(no SEC/i, /\$100M\+ AUM/i,
    /Let AI do the heavy lifting/i, /FCA SYSC 9 compliant workflows/i,
  ]
  for (const file of ['app', 'components', 'src/content', 'public'].flatMap(dir => files(path.join(root, dir)))) {
    const source = readFileSync(file, 'utf8')
    for (const pattern of forbidden) assert.doesNotMatch(source, pattern, `${path.relative(root, file)} contains ${pattern}`)
  }
})
