import { describe, expect, it } from 'vitest'
import {
  calculateGaps,
  calculateScore,
  emptyAnswers,
  headlineForScore,
  isStepComplete,
} from './scoring'

describe('stack assessment scoring', () => {
  it('matches production scoring for a complete strong stack', () => {
    const answers = {
      ...emptyAnswers(),
      registration: 'sec' as const,
      adviserCount: '6-15' as const,
      complianceModel: 'internal' as const,
      archive: 'yes' as const,
      crm: 'yes' as const,
      meetings: 'yes' as const,
      policyCentral: 'yes' as const,
      commReview: 'automated' as const,
      reviewEvidence: 'single' as const,
      issueTracking: 'workflow' as const,
      examRetrieval: 'minutes' as const,
      biggestPain: 'finding' as const,
      priority: 'time' as const,
    }

    expect(calculateScore(answers)).toBe(100)
    expect(headlineForScore(100).title).toMatch(/Strong foundation/)
    expect(isStepComplete(answers, 3)).toBe(true)
  })

  it('keeps basic results ungated and prioritizes archive gaps', () => {
    const answers = {
      ...emptyAnswers(),
      archive: 'no' as const,
      crm: 'no' as const,
      meetings: 'no' as const,
      policyCentral: 'no' as const,
      commReview: 'none' as const,
      reviewEvidence: 'undocumented' as const,
      issueTracking: 'none' as const,
      examRetrieval: 'days' as const,
      biggestPain: 'exam' as const,
      priority: 'exam' as const,
    }

    expect(calculateScore(answers)).toBe(0)
    expect(calculateGaps(answers)[0]?.title).toMatch(/retention foundation/i)
    expect(headlineForScore(0).title).toMatch(/Manual friction/)
  })
})
