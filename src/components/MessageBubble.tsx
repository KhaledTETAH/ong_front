import type { ReactNode } from 'react';

interface MessageBubbleProps {
  name: string;
  time: string;
  isMe: boolean;
  children: ReactNode;
}

export default function MessageBubble({ name, time, isMe, children }: MessageBubbleProps) {
  return (
    <div className={`d-flex flex-column mb-4 ${isMe ? 'align-items-end' : 'align-items-start'}`}>
      <div
        className="px-4 py-3 rounded-4 small"
        style={{
          maxWidth: '80%',
          backgroundColor: isMe ? '#0d5c5c' : '#fff',
          color: isMe ? '#fff' : '#212529',
          border: isMe ? 'none' : '1px solid #dee2e6',
          borderRadius: isMe ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
        }}
      >
        {children}
      </div>
      <span className="text-muted mt-1" style={{ fontSize: '0.7rem' }}>
        {name} · {time}
      </span>
    </div>
  );
}