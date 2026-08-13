import { useConversations } from '../hooks/useConversations';
import ConversationItem from './ConversationItem';

interface ConversationListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function ConversationList({ selectedId, onSelect }: ConversationListProps) {
  const { conversations, isLoading, markAsRead } = useConversations();

  const handleClick = (id: string) => {
    markAsRead(id);   // from hook: marks unread dot + syncs backend
    onSelect(id);     // to parent: opens chat on the right
  };

  return (
    <div className="bg-white rounded-3 border h-100 d-flex flex-column">
      <div className="px-4 py-3 border-bottom">
        <h2 className="fw-bold text-dark fs-6 mb-0">Conversations</h2>
      </div>

      <div className="overflow-auto flex-grow-1">
        {isLoading && (
          <p className="small text-muted text-center py-4">Chargement...</p>
        )}

        {conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            org={conv.org}
            subject={conv.subject}
            time={conv.time}
            unread={conv.unread}
            active={conv.id === selectedId}
            onClick={() => handleClick(conv.id)}
          />
        ))}
      </div>
    </div>
  );
}