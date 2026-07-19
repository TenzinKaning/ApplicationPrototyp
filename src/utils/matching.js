// Einfaches Skill-Matching: zählt Überschneidungen zwischen den Skills
// eines Profils und den benötigten Skills einer Stelle (case-insensitive).

export function computeMatch(candidateSkills = [], requiredSkills = []) {
  const normalizedCandidateSkills = new Set(candidateSkills.map((s) => s.toLowerCase()))
  const matchedSkills = requiredSkills.filter((skill) =>
    normalizedCandidateSkills.has(skill.toLowerCase())
  )

  return {
    matchedSkills,
    matchCount: matchedSkills.length,
    totalRequired: requiredSkills.length,
    ratio: requiredSkills.length === 0 ? 0 : matchedSkills.length / requiredSkills.length,
  }
}

export function sortJobsByMatch(jobs, candidateSkills) {
  return [...jobs].sort((a, b) => {
    const matchA = computeMatch(candidateSkills, a.requiredSkills)
    const matchB = computeMatch(candidateSkills, b.requiredSkills)
    return matchB.ratio - matchA.ratio || matchB.matchCount - matchA.matchCount
  })
}
