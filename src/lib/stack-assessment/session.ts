import type { AssessmentAnswers, PersistedAssessmentSession } from './types'
import { EMPTY_ANSWERS } from './types'

export const STORAGE_KEY = 'complyvault.stack-assessment.v1'
export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000

type StoredSession = PersistedAssessmentSession & {
  savedAt: number
}

function isExpired(savedAt: number, now = Date.now()): boolean {
  return now - savedAt > SESSION_TTL_MS
}

function parseStored(raw: string): PersistedAssessmentSession | null {
  try {
    const parsed = JSON.parse(raw) as Partial<StoredSession>
    if (!parsed.assessmentId || !parsed.accessToken) return null
    if (typeof parsed.savedAt === 'number' && isExpired(parsed.savedAt)) {
      return null
    }
    return {
      assessmentId: parsed.assessmentId,
      accessToken: parsed.accessToken,
      currentStep: typeof parsed.currentStep === 'number' ? parsed.currentStep : 0,
      answers: { ...EMPTY_ANSWERS, ...(parsed.answers ?? {}) },
      completed: Boolean(parsed.completed),
      leadCaptured: Boolean(parsed.leadCaptured),
      savedAt: typeof parsed.savedAt === 'number' ? parsed.savedAt : Date.now(),
    }
  } catch {
    return null
  }
}

/**
 * Resume token lives in localStorage (30-day TTL).
 * Backend remains source of truth; never put tokens/PII in URLs.
 */
export function readSession(): PersistedAssessmentSession | null {
  if (typeof window === 'undefined') return null
  try {
    const local = window.localStorage.getItem(STORAGE_KEY)
    if (local) {
      const parsed = parseStored(local)
      if (parsed) return parsed
      window.localStorage.removeItem(STORAGE_KEY)
    }

    // One-time migration from the earlier sessionStorage prototype
    const legacy = window.sessionStorage.getItem(STORAGE_KEY)
    if (legacy) {
      const parsed = parseStored(legacy)
      window.sessionStorage.removeItem(STORAGE_KEY)
      if (parsed) {
        writeSession(parsed)
        return parsed
      }
    }
    return null
  } catch {
    return null
  }
}

export function writeSession(session: PersistedAssessmentSession): void {
  if (typeof window === 'undefined') return
  try {
    const payload: StoredSession = {
      ...session,
      savedAt: Date.now(),
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    window.sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore quota / private mode failures — assessment still works in-memory
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
    window.sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export function captureAttribution(): {
  landingPath?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
} {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const referrer = document.referrer || undefined
  return {
    landingPath: `${window.location.pathname}${window.location.search}`.slice(0, 500),
    referrer: referrer?.slice(0, 1000),
    utmSource: params.get('utm_source')?.slice(0, 200) || undefined,
    utmMedium: params.get('utm_medium')?.slice(0, 200) || undefined,
    utmCampaign: params.get('utm_campaign')?.slice(0, 200) || undefined,
    utmContent: params.get('utm_content')?.slice(0, 200) || undefined,
    utmTerm: params.get('utm_term')?.slice(0, 200) || undefined,
  }
}

/**
 * Funnel analytics only — never pass answers, email, firm, or role.
 */
export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean> = {},
): void {
  if (typeof window === 'undefined') return
  const gtag = (
    window as Window & {
      gtag?: (command: string, event: string, params?: Record<string, unknown>) => void
    }
  ).gtag
  gtag?.('event', name, params)
}

export function withAnswers(
  base: AssessmentAnswers,
  patch: Partial<AssessmentAnswers>,
): AssessmentAnswers {
  return { ...base, ...patch }
}

/** Exported for tests */
export function __isSessionExpiredForTests(savedAt: number, now: number): boolean {
  return isExpired(savedAt, now)
}
