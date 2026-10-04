import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import ts from 'typescript'

const require = createRequire(import.meta.url)
const { NextRequest } = require('next/server')
const compiled = ts.transpileModule(readFileSync(new URL('../middleware.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText
const exports = {}
new Function('exports', 'require', compiled)(exports, require)
const middleware = exports.middleware
const request = (url, headers = {}) => new NextRequest(`https://www.complyvault.co${url}`, { headers })

test('UK geolocation does not displace the US RIA default', () => {
  const response = middleware(request('/', { 'x-vercel-ip-country': 'GB' }))
  assert.equal(response.headers.get('location'), null)
})
test('explicit UK selection redirects and persists on the redirect response', () => {
  const response = middleware(request('/?market=uk&utm_source=test'))
  assert.equal(response.headers.get('location'), 'https://www.complyvault.co/uk?utm_source=test')
  assert.equal(response.cookies.get('cv_market')?.value, 'uk')
})
test('explicit US selection handles the UK homepage and clears the query override', () => {
  const response = middleware(request('/uk?market=us'))
  assert.equal(response.headers.get('location'), 'https://www.complyvault.co/')
  assert.equal(response.cookies.get('cv_market')?.value, 'us')
})
test('UK selection never invents routes for about, features, contact, or checkout', () => {
  for (const route of ['/about', '/features', '/contact', '/checkout/success', '/api/geolocation']) {
    const response = middleware(request(route, { cookie: 'cv_market=uk' }))
    assert.equal(response.headers.get('location'), null, route)
  }
})
test('persisted selection maps the RIA solution to the existing UK solution route', () => {
  const response = middleware(request('/ria-compliance-software', { cookie: 'cv_market=uk' }))
  assert.equal(response.headers.get('location'), 'https://www.complyvault.co/uk/fca-compliance-software')
})
test('existing open-redirect validation and WordPress blocking remain effective', () => {
  assert.equal(middleware(request('/contact?next=https://untrusted.example')).status, 400)
  assert.equal(middleware(request('/wp-admin')).status, 404)
})
