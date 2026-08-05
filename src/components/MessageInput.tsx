import { Paperclip, Send } from 'lucide-react';

export default function MessageInput() {
  return (
    <div className="p-3 bg-white border-top">
      <div className="d-flex align-items-center gap-2">
        <input
          type="text"
          className="form-control form-control-sm bg-light border-0"
          placeholder="Écrire un message..."
        />
        <button className="btn btn-link text-muted p-2">
          <Paperclip size={20} />
        </button>
        <button
          className="btn btn-sm text-white d-flex align-items-center gap-2"
          style={{ backgroundColor: '#0d5c5c' }}
        >
          Envoyer
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}