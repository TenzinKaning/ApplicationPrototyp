import { APPLICATION_STATUS_LABELS } from '../../data/mockApplications'

export function StatusPill({ status }) {
  return (
    <span className={`status-pill status-pill--${status}`}>
      {APPLICATION_STATUS_LABELS[status] ?? status}
    </span>
  )
}
