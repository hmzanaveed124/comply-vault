export type AreaStatus = 'covered' | 'partial' | 'gap' | 'effort'

export type AssessmentAnswers = {
  registration: '' | 'sec' | 'state' | 'mixed' | 'other'
  adviserCount: '' | '1-5' | '6-15' | '16-50' | '50+'
  complianceModel: '' | 'internal' | 'outsourced' | 'shared' | 'owner'
  archive: '' | 'yes' | 'unsure' | 'no'
  crm: '' | 'yes' | 'some' | 'no'
  meetings: '' | 'yes' | 'sometimes' | 'no'
  policyCentral: '' | 'yes' | 'partial' | 'no'
  commReview: '' | 'automated' | 'sampling' | 'manual' | 'none'
  reviewEvidence: '' | 'single' | 'scattered' | 'undocumented'
  issueTracking: '' | 'workflow' | 'spreadsheet' | 'inbox' | 'none'
  examRetrieval: '' | 'minutes' | 'hours' | 'days'
  biggestPain: '' | 'finding' | 'reviewing' | 'evidence' | 'exam'
  priority: '' | 'time' | 'visibility' | 'exam' | 'scale'
}

export type GapRecommendation = {
  title: string
  body: string
  priority: number
  product?: boolean
}

export type AssessmentAttribution = {
  landingPath?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
}

export type PersistedAssessmentSession = {
  assessmentId: string
  accessToken: string
  currentStep: number
  answers: AssessmentAnswers
  completed: boolean
  leadCaptured?: boolean
  savedAt?: number
}

export const EMPTY_ANSWERS: AssessmentAnswers = {
  registration: '',
  adviserCount: '',
  complianceModel: '',
  archive: '',
  crm: '',
  meetings: '',
  policyCentral: '',
  commReview: '',
  reviewEvidence: '',
  issueTracking: '',
  examRetrieval: '',
  biggestPain: '',
  priority: '',
}

export const STEPS = [
  { title: 'Your firm', short: 'Firm' },
  { title: 'Current stack', short: 'Stack' },
  { title: 'Supervision', short: 'Workflow' },
  { title: 'Priorities', short: 'Goals' },
] as const

export const STATUS_STYLES: Record<AreaStatus, string> = {
  covered:
    'border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  partial:
    'border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  gap: 'border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300',
  effort:
    'border-vault-coral-500/25 bg-vault-coral-500/10 text-vault-coral-700 dark:text-vault-coral-300',
}

export const STATUS_LABELS: Record<AreaStatus, string> = {
  covered: 'Covered',
  partial: 'Partial',
  gap: 'Gap',
  effort: 'High effort',
}
