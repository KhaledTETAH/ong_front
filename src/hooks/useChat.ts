import { useState, useEffect, useCallback } from 'react';
import { useChatStore } from '../context/chatStore';
import type { Message } from '../types/message';

const EMPTY_MESSAGES: Message[] = [];
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1').replace(/\/$/, '');

const getAuthHeaders = () => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  //const token = localStorage.getItem('accessToken') || localStorage.getItem('token') || '';
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg1OTUyMzE5LCJpYXQiOjE3ODU5NDg3MTksImp0aSI6Ijk4ZDk5OGIxZTIxNjQ0MDNhYWFjOTk1NmY0NWNlNmI0IiwidXNlcl9pZCI6IjA5N2VhYjk3LWUzNDYtNGRmNy1hYmI5LWJkNDczMWFmODY5NyJ9.RJbTOpLRmfwkln9IJe3nl499P0bCTFsz2QwGbG27USM"
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const parseJsonResponse = async <T,>(response: Response, fallback: T): Promise<T> => {
  if (!response.ok) return fallback;

  const text = await response.text();
  if (!text) return fallback;

  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
};

const normalizeMessage = (raw: any): Message | null => {
  if (!raw || typeof raw !== 'object') return null;

  const id = raw.id ?? raw.message_id ?? raw.uuid ?? String(Date.now());
  const conversationId = raw.conversationId ?? raw.conversation_id ?? raw.conversation?.id ?? raw.conversation?.conversation_id ?? '';
  const senderId = raw.senderId ?? raw.sender_id ?? raw.sender?.id ?? raw.user?.id ?? 'unknown';
  const senderName = raw.senderName ?? raw.sender_name ?? raw.sender?.name ?? raw.user?.name ?? raw.username ?? 'Unknown';
  const text = raw.text ?? raw.content ?? raw.message ?? raw.body ?? '';
  const createdAt = raw.createdAt ?? raw.created_at ?? raw.timestamp ?? new Date().toISOString();
  const isMe = Boolean(raw.isMe ?? raw.is_me ?? raw.isMine ?? false);

  return {
    id: String(id),
    conversationId: String(conversationId),
    senderId: String(senderId),
    senderName,
    text,
    createdAt,
    isMe,
  };
};

const normalizeMessageList = (payload: unknown): Message[] => {
  if (Array.isArray(payload)) {
    return payload.map(normalizeMessage).filter(Boolean) as Message[];
  }

  if (payload && typeof payload === 'object') {
    const value = payload as Record<string, unknown>;

    if (Array.isArray(value.results)) {
      return value.results.map(normalizeMessage).filter(Boolean) as Message[];
    }

    if (Array.isArray(value.messages)) {
      return value.messages.map(normalizeMessage).filter(Boolean) as Message[];
    }

    const single = normalizeMessage(value);
    return single ? [single] : [];
  }

  return [];
};

const getMessageUrls = (conversationId: string) => [
  `${API_BASE_URL}/messaging/conversations/${conversationId}/messages/`,
  `${API_BASE_URL}/conversations/${conversationId}/messages/`,
];

const fetchMessages = async (conversationId: string): Promise<Message[]> => {
  for (const url of getMessageUrls(conversationId)) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 404) continue;
        return [];
      }

      const payload = await parseJsonResponse<unknown>(res, []);
      return normalizeMessageList(payload);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  }

  return [];
};

const sendMessageApi = async (conversationId: string, text: string): Promise<Message | null> => {
  for (const url of getMessageUrls(conversationId)) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ text, content: text }),
      });

      if (!res.ok) {
        if (res.status === 404) continue;
        return null;
      }

      const payload = await parseJsonResponse<unknown>(res, null);
      return normalizeMessage(payload as any);
    } catch (error) {
      console.error('Failed to send message', error);
    }
  }

  return null;
};

export function useChat(conversationId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Read from Zustand instead of local state
  const messages = useChatStore(
    (state) => state.messages[conversationId] ?? EMPTY_MESSAGES
  );
  const setMessages = useChatStore((s) => s.setMessages);
  const replaceOptimistic = useChatStore((s) => s.replaceOptimisticMessage);
  const removeOptimistic = useChatStore((s) => s.removeOptimisticMessage);

  // Load initial messages
  useEffect(() => {
    let cancelled = false;

    if (!conversationId) {
      setMessages(conversationId, EMPTY_MESSAGES);
      setIsLoading(false);
      setError(null);
      return () => {
        cancelled = true;
      };
    }

    setIsLoading(true);
    setError(null);

    fetchMessages(conversationId)
      .then((data) => {
        if (!cancelled) setMessages(conversationId, data);
      })
      .catch(() => {
        if (!cancelled) setError('Impossible de charger les messages.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [conversationId, setMessages]);

  // Send message — keep your optimistic pattern!
  const sendMessage = useCallback(async (text: string) => {
    const trimmedText = text.trim();

    if (!trimmedText || !conversationId) return;
    setIsSending(true);
    setError(null);

    const tempId = Date.now();
    const optimistic: Message = {
      id: String(tempId),
      conversationId,
      senderId: 'me',
      senderName: 'Vous',
      text: trimmedText,
      createdAt: new Date().toISOString(),
      isMe: true,
    };

    // Write optimistic to Zustand so UI updates immediately
    setMessages(conversationId, [...messages, optimistic]);

    try {
      const saved = await sendMessageApi(conversationId, trimmedText);
      if (saved) {
        replaceOptimistic(conversationId, tempId, { ...saved, isMe: true });
      } else {
        removeOptimistic(conversationId, tempId);
      }
    } catch {
      setError('Erreur d\'envoi.');
      removeOptimistic(conversationId, tempId);
    } finally {
      setIsSending(false);
    }
  }, [conversationId, messages, setMessages, replaceOptimistic, removeOptimistic]);

  return { messages, isLoading, isSending, error, sendMessage };
}