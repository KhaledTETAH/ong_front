import { useState } from 'react';
import { ShieldCheck, Flag } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useAutoScroll } from '../hooks/useAutoScroll';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  conversationId:  string ;
}

export default function ChatWindow({ conversationId }: ChatWindowProps) {
  const [input, setInput] = useState('');
  const { messages, isLoading, isSending, error, sendMessage } = useChat(conversationId);
  const scrollRef = useAutoScroll<HTMLDivElement>([messages]);

  const handleSend = async () => {
    const trimmed = input.trim();

    if (!conversationId || !trimmed) return;

    await sendMessage(trimmed);
    setInput('');
  };

  if (!conversationId) {
    return (
      <div className="bg-white rounded-3 border h-100 d-flex align-items-center justify-content-center text-muted">
        Sélectionnez une conversation pour commencer à discuter.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3 border h-100 d-flex flex-column">
      {/* Header */}
      <div className="px-4 py-3 border-bottom d-flex align-items-start justify-content-between">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h3 className="fw-bold text-dark fs-6 mb-0">Association Lumière d'Oran</h3>
            <ShieldCheck size={16} style={{ color: '#0d5c5c' }} />
            <span className="badge rounded-pill fw-semibold" style={{ backgroundColor: '#e6f3f3', color: '#0d5c5c', fontSize: '0.7rem' }}>
              Vérifiée
            </span>
          </div>
          <p className="small text-muted mb-0">Candidature : Coordinateur éducation</p>
        </div>
        <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
          <Flag size={12} />
          <span className="small">Signaler</span>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-grow-1 overflow-auto px-4 py-4" style={{ backgroundColor: '#f8f9fa' }}>
        {isLoading && <p className="small text-muted text-center">Chargement...</p>}
        {error && <p className="small text-danger text-center">{error}</p>}

        {messages.map((msg) => (
          <MessageBubble 
    key={msg.id}  name={msg.senderName} time={msg.createdAt} isMe={msg.isMe}>
            {msg.text}
          </MessageBubble>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-top">
        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control form-control-sm bg-light border-0"
            placeholder="Écrire un message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            className="btn btn-sm text-white d-flex align-items-center gap-2"
            style={{ backgroundColor: '#0d5c5c' }}
            onClick={handleSend}
            disabled={isSending}
          >
            {isSending ? '...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  );
}