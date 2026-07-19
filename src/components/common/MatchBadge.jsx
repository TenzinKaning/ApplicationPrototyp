export function MatchBadge({ matchCount, totalRequired, ratio }) {
  const isHighMatch = ratio >= 0.75
  return (
    <span className={`match-badge${isHighMatch ? ' match-high' : ''}`}>
      {matchCount}/{totalRequired}
      <small>Skills</small>
    </span>
  )
}
