import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import {
  STORAGE_KEY,
  SESSION_TTL_MS,
  __isSessionExpiredForTests,
  clearSession,
  readSession,
  writeSession,
  trackEvent,
} from './session'
import { EMPTY_ANSWERS } from './types'

class MemoryStorage implements Storage {
  private store = new Map<string, string>()
  get length(): number {
    return this.store.size
  }
  clear(): void {
    this.store.clear()
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) as string) : null
  }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null
  }
  removeItem(key: string): void {
    this.store.delete(key)
  }
  setItem(key: string, value: string): void {
    this.store.set(key, value)
  }
}

describe('stack assessment browser resume', () => {
  beforeEach(() => {
    vi.stubGlobal('window', {
      localStorage: new MemoryStorage(),
      sessionStorage: new MemoryStorage(),
      gtag: undefined,
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('persists opaque token in localStorage and resumes within TTL', () => {
    writeSession({
      assessmentId: 'assess_1',
      accessToken: 'token_value_with_enough_entropy_xxxxx',
      currentStep: 1,
      answers: { ...EMPTY_ANSWERS, registration: 'sec' },
      completed: false,
    })

    const restored = readSession()
    expect(restored?.assessmentId).toBe('assess_1')
    expect(restored?.accessToken).toContain('token_value')
    expect(restored?.currentStep).toBe(1)
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeTruthy()
  })

  it('expires sessions after 30 days and supports starting a new assessment', () => {
    expect(__isSessionExpiredForTests(Date.now() - SESSION_TTL_MS - 1, Date.now())).toBe(
      true,
    )

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        assessmentId: 'old',
        accessToken: 'old-token-with-enough-length-xxxxxx',
        currentStep: 0,
        answers: EMPTY_ANSWERS,
        completed: false,
        savedAt: Date.now() - SESSION_TTL_MS - 1000,
      }),
    )

    expect(readSession()).toBeNull()
    clearSession()
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('never sends assessment answers or email through gtag helpers', () => {
    const gtag = vi.fn()
    ;(window as unknown as { gtag: typeof gtag }).gtag = gtag
    trackEvent('ria_stack_assessment_completed', { score: 62 })
    expect(gtag).toHaveBeenCalledWith('event', 'ria_stack_assessment_completed', {
      score: 62,
    })
    const payload = JSON.stringify(gtag.mock.calls)
    expect(payload).not.toMatch(/@/)
    expect(payload).not.toMatch(/archive/)
  })
})
