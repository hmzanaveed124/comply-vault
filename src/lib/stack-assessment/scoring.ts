import type {
  AssessmentAnswers,
  AreaStatus,
  GapRecommendation,
} from './types'
import { EMPTY_ANSWERS } from './types'

export function emptyAnswers(): AssessmentAnswers {
  return { ...EMPTY_ANSWERS }
}

export function calculateScore(answers: AssessmentAnswers): number {
  const points = [
    answers.archive === 'yes' ? 2 : answers.archive === 'unsure' ? 1 : 0,
    answers.crm === 'yes' ? 2 : answers.crm === 'some' ? 1 : 0,
    answers.meetings === 'yes' ? 2 : answers.meetings === 'sometimes' ? 1 : 0,
    answers.policyCentral === 'yes' ? 2 : answers.policyCentral === 'partial' ? 1 : 0,
    answers.commReview === 'automated'
      ? 2
      : answers.commReview === 'sampling' || answers.commReview === 'manual'
        ? 1
        : 0,
    answers.reviewEvidence === 'single'
      ? 2
      : answers.reviewEvidence === 'scattered'
        ? 1
        : 0,
    answers.issueTracking === 'workflow'
      ? 2
      : answers.issueTracking === 'spreadsheet' || answers.issueTracking === 'inbox'
        ? 1
        : 0,
    answers.examRetrieval === 'minutes'
      ? 2
      : answers.examRetrieval === 'hours'
        ? 1
        : 0,
  ]
  return Math.round((points.reduce((a, b) => a + b, 0) / 16) * 100)
}

export function calculateAreaStatuses(
  answers: AssessmentAnswers,
): Record<string, AreaStatus> {
  return {
    archive:
      answers.archive === 'yes'
        ? 'covered'
        : answers.archive === 'unsure'
          ? 'partial'
          : 'gap',
    crm:
      answers.crm === 'yes' ? 'covered' : answers.crm === 'some' ? 'partial' : 'gap',
    meetings:
      answers.meetings === 'yes'
        ? 'covered'
        : answers.meetings === 'sometimes'
          ? 'partial'
          : 'gap',
    policies:
      answers.policyCentral === 'yes'
        ? 'covered'
        : answers.policyCentral === 'partial'
          ? 'partial'
          : 'gap',
    communications:
      answers.commReview === 'automated'
        ? 'covered'
        : answers.commReview === 'sampling' || answers.commReview === 'manual'
          ? 'partial'
          : 'gap',
    evidence:
      answers.reviewEvidence === 'single' && answers.issueTracking === 'workflow'
        ? 'covered'
        : answers.reviewEvidence === 'undocumented' || answers.issueTracking === 'none'
          ? 'gap'
          : 'partial',
    exam:
      answers.examRetrieval === 'minutes'
        ? 'covered'
        : answers.examRetrieval === 'hours'
          ? 'partial'
          : 'effort',
  }
}

export function calculateGaps(answers: AssessmentAnswers): GapRecommendation[] {
  const gaps: GapRecommendation[] = []

  if (answers.archive !== 'yes') {
    gaps.push({
      title: 'Confirm your communications retention foundation',
      body:
        answers.archive === 'no'
          ? 'A compliant archive is foundational. Put retention and retrieval in place before adding another supervisory layer.'
          : 'Confirm what your current archive retains, for how long, and how quickly your team can retrieve it before adding more tools.',
      priority: 1,
    })
  }

  if (
    answers.reviewEvidence !== 'single' ||
    answers.issueTracking !== 'workflow' ||
    answers.examRetrieval !== 'minutes'
  ) {
    gaps.push({
      title: 'Create one supervisory evidence trail',
      body: 'Bring the source item, reviewer judgement, follow-up and final resolution into one traceable workflow so the story does not need to be rebuilt later.',
      product: answers.archive !== 'no',
      priority: 2,
    })
  }

  if (answers.commReview === 'manual' || answers.commReview === 'none') {
    gaps.push({
      title: 'Reduce manual communications review',
      body: 'Start with a narrow risk set and surface only items that genuinely need human judgement. More alerts are not the goal; better-qualified review is.',
      product: answers.archive !== 'no',
      priority: 3,
    })
  }

  if (answers.examRetrieval === 'days' || answers.examRetrieval === 'hours') {
    gaps.push({
      title: 'Map your exam-retrieval path',
      body: 'Choose one representative client or issue and document every system your team must search to reconstruct the evidence. That map usually exposes the highest-friction handoffs.',
      priority: 4,
    })
  }

  if (answers.policyCentral !== 'yes') {
    gaps.push({
      title: 'Centralize the current policy set',
      body: 'Make it obvious which policy version is current, who owns it and where supporting attestations or review evidence live.',
      priority: 5,
    })
  }

  if (gaps.length === 0) {
    gaps.push({
      title: 'Stress-test retrieval, not just storage',
      body: 'Your foundation looks well covered. Test it with a realistic request: can someone unfamiliar with the matter reproduce the evidence and review history quickly?',
      product: true,
      priority: 6,
    })
  }

  return gaps.sort((a, b) => a.priority - b.priority).slice(0, 4)
}

export function headlineForScore(score: number): { title: string; body: string } {
  if (score >= 80) {
    return {
      title: 'Strong foundation. Focus on supervisory leverage.',
      body: 'Your core stack appears well covered. The next question is whether your team can turn retained information into clear, reviewable evidence without adding unnecessary manual work.',
    }
  }
  if (score >= 55) {
    return {
      title: 'The foundation is there, but the workflow is fragmented.',
      body: 'You have several important systems in place. The main opportunity is reducing the handoffs between finding an issue, reviewing it, recording judgement and producing evidence later.',
    }
  }
  return {
    title: 'Manual friction is doing too much of the work.',
    body: 'Your answers point to important gaps or high-effort workflows. Prioritize the underlying retention and evidence foundations before layering on more software.',
  }
}

export function labelMap(value: string, map: Record<string, string>): string {
  return map[value] || '—'
}

export const REGISTRATION_LABELS: Record<string, string> = {
  sec: 'SEC registered',
  state: 'State registered',
  mixed: 'Mixed / multi-firm',
  other: 'Other / unsure',
}

export const MODEL_LABELS: Record<string, string> = {
  internal: 'Internal team',
  outsourced: 'Outsourced / fractional',
  shared: 'Shared',
  owner: 'Principal / owner',
}

export const PAIN_LABELS: Record<string, string> = {
  finding: 'Finding information',
  reviewing: 'Review noise',
  evidence: 'Proving decisions',
  exam: 'Exam preparation',
}

export const PRIORITY_LABELS: Record<string, string> = {
  time: 'Reduce review time',
  visibility: 'Supervisory visibility',
  exam: 'Exam readiness',
  scale: 'Scale efficiently',
}

export function isStepComplete(answers: AssessmentAnswers, step: number): boolean {
  if (step === 0) {
    return !!(answers.registration && answers.adviserCount && answers.complianceModel)
  }
  if (step === 1) {
    return !!(answers.archive && answers.crm && answers.meetings && answers.policyCentral)
  }
  if (step === 2) {
    return !!(
      answers.commReview &&
      answers.reviewEvidence &&
      answers.issueTracking &&
      answers.examRetrieval
    )
  }
  return !!(answers.biggestPain && answers.priority)
}
