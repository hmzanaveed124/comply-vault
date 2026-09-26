export type {
  AssessmentAnswers,
  AreaStatus,
  AssessmentAttribution,
  GapRecommendation,
  PersistedAssessmentSession,
} from './types'
export {
  EMPTY_ANSWERS,
  STATUS_LABELS,
  STATUS_STYLES,
  STEPS,
} from './types'
export {
  calculateAreaStatuses,
  calculateGaps,
  calculateScore,
  emptyAnswers,
  headlineForScore,
  isStepComplete,
} from './scoring'
