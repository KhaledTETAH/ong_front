interface ConversationItemProps {
  org: string;
  subject: string;
  time: string;
  unread: boolean;
  active: boolean;
  onClick: () => void;
}

export default function ConversationItem({
  org,
  subject,
  time,
  unread,
  active,
  onClick,
}: ConversationItemProps) {
  return (
    <div
      onClick={onClick}
      className="position-relative px-4 py-3 border-bottom"
      style={{
        backgroundColor: active ? '#f0f9f9' : 'transparent',
        borderLeft: active ? '4px solid #0d5c5c' : '4px solid transparent',
        cursor: 'pointer',
      }}
    >
      <div className="d-flex align-items-start justify-content-between mb-1">
        <h4 className={`small fw-bold mb-0 ${active ? 'text-dark' : 'text-secondary'}`}>
          {org}
        </h4>
        {unread && (
          <span
            className="rounded-circle flex-shrink-0 mt-1"
            style={{ width: 8, height: 8, backgroundColor: '#f4a261' }}
          />
        )}
      </div>
      <p className="small text-muted text-truncate mb-1">{subject}</p>
      <span className="text-muted" style={{ fontSize: '0.75rem' }}>{time}</span>
    </div>
  );
}