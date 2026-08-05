import { useState, useEffect } from 'react';
import { useChatStore } from '../context/chatStore';
import type { Conversation, Message } from '../types/message';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1').replace(/\/$/, '');

const getAuthHeaders = () => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token') || '';

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const normalizeMessage = (raw: any): Message | null => {
  if (!raw || typeof raw !== 'object') return null;

  return {
    id: String(raw.id ?? raw.message_id ?? Date.now()),
    conversationId: String(raw.conversationId ?? raw.conversation_id ?? ''),
    senderId: String(raw.senderId ?? raw.sender_id ?? 'unknown'),
    senderName: raw.senderName ?? raw.sender_name ?? raw.sender?.name ?? 'Unknown',
    text: raw.text ?? raw.content ?? raw.message ?? '',
    createdAt: raw.createdAt ?? raw.created_at ?? raw.timestamp ?? new Date().toISOString(),
    isMe: Boolean(raw.isMe ?? raw.is_me ?? raw.isMine ?? false),
  };
};

const normalizeConversation = (raw: any): Conversation => ({
  id: String(raw.id ?? raw.conversation_id ?? raw.uuid ?? ''),
  title: raw.title ?? raw.subject ?? raw.name ?? 'Conversation',
  unread: Boolean(raw.unread ?? raw.unread_messages ?? false),
  lastMessage: raw.lastMessage ? normalizeMessage(raw.lastMessage) ?? undefined : raw.last_message ? normalizeMessage(raw.last_message) ?? undefined : undefined,
  updatedAt: raw.updatedAt ?? raw.updated_at ?? raw.createdAt ?? raw.created_at ?? new Date().toISOString(),
  org: raw.org ?? raw.organization?.name ?? raw.title ?? 'Organisation',
  subject: raw.subject ?? raw.title ?? raw.lastMessage?.text ?? raw.last_message?.text ?? 'Conversation',
  time: raw.time ?? raw.updatedAt ?? raw.updated_at ?? raw.createdAt ?? raw.created_at ?? '',
  active: false,
});

const fetchConversations = async (): Promise<Conversation[]> => {
  const urls = [`${API_BASE_URL}/messaging/conversations/`, `${API_BASE_URL}/conversations/`];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 404) continue;
        return [];
      }

      const text = await res.text();
      if (!text) return [];

      const payload = JSON.parse(text);
      const list = Array.isArray(payload) ? payload : payload.results ?? payload.conversations ?? [];
      return list.map(normalizeConversation);
    } catch {
      // Try the next endpoint if one fails.
    }
  }

  return [];
};

export function useConversations() {
  const [isLoading, setIsLoading] = useState(true);
  const conversations = useChatStore((s) => s.conversations);
  const setConversations = useChatStore((s) => s.setConversations);
  const markConversationRead = useChatStore((s) => s.markConversationRead);

  useEffect(() => {
    setIsLoading(true);
    fetchConversations()
      .then(setConversations)
      .finally(() => setIsLoading(false));
  }, [setConversations]);

  const markAsRead = (id: string) => {
    markConversationRead(id);

    const urls = [`${API_BASE_URL}/messaging/conversations/${id}/mark-read/`, `${API_BASE_URL}/conversations/${id}/mark-read/`];

    urls.forEach((url) => {
      fetch(url, {
        method: 'POST',
        headers: getAuthHeaders(),
      }).catch(() => undefined);
    });
  };

  return { conversations, isLoading, markAsRead };
}