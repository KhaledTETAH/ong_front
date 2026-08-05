import { useEffect, useRef, useCallback } from 'react';
import { useChatStore } from '../context/chatStore';
import type { Message } from '../types/message';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws/chat/';

export function useWebSocket() {
  const ws = useRef<WebSocket | null>(null);
  const addMessage = useChatStore((s) => s.addMessage);
  const setWsConnected = useChatStore((s) => s.setWsConnected);

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log('WS connected');
      setWsConnected(true);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'new_message') {
        const message: Message = {
          id: data.message.id,
          conversationId: data.message.conversation_id,
          senderId: data.message.sender.id,
          senderName: data.message.sender.name,
          text: data.message.content,
          createdAt: data.message.created_at,
          isMe: false, // Server tells us it's from someone else
        };
        addMessage(message);
      }

      if (data.type === 'message_sent_confirmation') {
        // Optional: server confirming our own message with real ID
        // Handle in useChat instead for tighter control
      }
    };

    socket.onclose = () => {
      setWsConnected(false);
      setTimeout(connect, 3000); // Reconnect
    };

    socket.onerror = () => socket.close();

    ws.current = socket;
  }, [addMessage, setWsConnected]);

  const disconnect = useCallback(() => {
    ws.current?.close();
    ws.current = null;
  }, []);

  const send = useCallback((data: object) => {
    ws.current?.send(JSON.stringify(data));
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return { send, isConnected: useChatStore((s) => s.isWsConnected) };
}