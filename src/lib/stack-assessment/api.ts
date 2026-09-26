import type { AssessmentAnswers, AssessmentAttribution } from './types'

const DEFAULT_API_BASE = 'https://app.complyvault.co'

export function getAssessmentApiBase(): string {
  return (
    process.env.NEXT_PUBLIC_ASSESSMENT_API_URL?.replace(/\/$/, '') ||
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ||
    DEFAULT_API_BASE
  )
}

type ApiSuccess<T> = { success: true; data: T }
type ApiFailure = { success: false; error?: string }

async function parseJson<T>(response: Response): Promise<ApiSuccess<T> | ApiFailure> {
  try {
    return (await response.json()) as ApiSuccess<T> | ApiFailure
  } catch {
    return { success: false, error: 'Invalid response' }
  }
}

export async function createAssessment(input: {
  answers?: Partial<AssessmentAnswers>
  currentStep?: number
  attribution?: AssessmentAttribution
}): Promise<{ assessmentId: string; accessToken: string } | null> {
  try {
    const response = await fetch(`${getAssessmentApiBase()}/api/assessments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...input.attribution,
        answers: input.answers,
        currentStep: input.currentStep ?? 0,
      }),
    })
    const json = await parseJson<{
      assessmentId: string
      accessToken: string
    }>(response)
    if (!response.ok || !json.success) return null
    return json.data
  } catch {
    return null
  }
}

export async function updateAssessment(input: {
  assessmentId: string
  accessToken: string
  answers?: Partial<AssessmentAnswers>
  currentStep?: number
  status?: 'IN_PROGRESS' | 'COMPLETED'
}): Promise<boolean> {
  try {
    const response = await fetch(
      `${getAssessmentApiBase()}/api/assessments/${input.assessmentId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Assessment-Token': input.accessToken,
        },
        body: JSON.stringify({
          accessToken: input.accessToken,
          answers: input.answers,
          currentStep: input.currentStep,
          status: input.status,
        }),
      },
    )
    const json = await parseJson<unknown>(response)
    return response.ok && json.success
  } catch {
    return false
  }
}

export async function resumeAssessment(input: {
  assessmentId: string
  accessToken: string
}): Promise<{
  answers: AssessmentAnswers
  currentStep: number
  status: string
  completed: boolean
} | null> {
  try {
    const response = await fetch(
      `${getAssessmentApiBase()}/api/assessments/${input.assessmentId}`,
      {
        method: 'GET',
        headers: {
          'X-Assessment-Token': input.accessToken,
        },
      },
    )
    const json = await parseJson<{
      answers: AssessmentAnswers
      currentStep: number
      status: string
      completedAt: string | null
    }>(response)
    if (!response.ok || !json.success) return null
    return {
      answers: json.data.answers,
      currentStep: json.data.currentStep,
      status: json.data.status,
      completed:
        json.data.status === 'COMPLETED' ||
        json.data.status === 'LEAD_CAPTURED' ||
        Boolean(json.data.completedAt),
    }
  } catch {
    return null
  }
}

export async function captureLead(input: {
  assessmentId: string
  accessToken: string
  email: string
  firmName?: string
  role?: string
}): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const response = await fetch(
      `${getAssessmentApiBase()}/api/assessments/${input.assessmentId}/lead`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Assessment-Token': input.accessToken,
        },
        body: JSON.stringify({
          accessToken: input.accessToken,
          email: input.email,
          firmName: input.firmName,
          role: input.role,
        }),
      },
    )
    const json = await parseJson<{ message?: string }>(response)
    if (!response.ok || !json.success) {
      return { success: false, error: json.success === false ? json.error : 'Request failed' }
    }
    return { success: true, message: json.data.message }
  } catch {
    return { success: false, error: 'Network error' }
  }
}
