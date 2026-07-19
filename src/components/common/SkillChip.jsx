export function SkillChip({ skill, matched = false, onRemove }) {
  return (
    <span className={`skill-chip${matched ? ' is-matched' : ''}`}>
      {skill}
      {onRemove && (
        <button
          type="button"
          className="skill-chip__remove"
          onClick={() => onRemove(skill)}
          aria-label={`${skill} entfernen`}
        >
          ×
        </button>
      )}
    </span>
  )
}
