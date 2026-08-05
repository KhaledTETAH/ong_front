import { create } from 'zustand';
import type { Conversation, Message } from '../types/message';

interface ChatStore {
  conversations: Conversation[];
  messages: Record<string, Message[]>; // conversationId -> messages
  activeConversationId: string | null;
  isWsConnected: boolean;
  
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversation: (id: string | null) => void;
  addMessage: (message: Message) => void;
  setMessages: (conversationId: string, messages: Message[]) => void;
  replaceOptimisticMessage: (conversationId: string, tempId: number, realMessage: Message) => void;
  removeOptimisticMessage: (conversationId: string, tempId: number) => void;
  markConversationRead: (id: string) => void;
  setWsConnected: (connected: boolean) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: [],
  messages: {},
  activeConversationId: null,
  isWsConnected: false,

  setConversations: (conversations) => set({ conversations }),

  setActiveConversation: (id) => set({ activeConversationId: id }),

  addMessage: (message) =>
    set((state) => {
      const convMessages = state.messages[message.conversationId] || [];
      // Prevent duplicates
      if (convMessages.some((m) => m.id === message.id)) return state;
      
      return {
        messages: {
          ...state.messages,
          [message.conversationId]: [...convMessages, message],
        },
        conversations: state.conversations.map((c) =>
          c.id === message.conversationId
            ? { ...c, lastMessage: message, updatedAt: message.createdAt, unread: true }
            : c
        ),
      };
    }),

  setMessages: (conversationId, messages) =>
    set((state) => ({
      messages: { ...state.messages, [conversationId]: messages },
    })),

  replaceOptimisticMessage: (conversationId, tempId, realMessage) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: state.messages[conversationId]?.map((m) =>
          m.id === String(tempId) ? realMessage : m
        ) || [realMessage],
      },
    })),

  removeOptimisticMessage: (conversationId, tempId) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: state.messages[conversationId]?.filter(
          (m) => m.id !== String(tempId)
        ) || [],
      },
    })),

  markConversationRead: (id) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, unread: false } : c
      ),
    })),

  setWsConnected: (connected) => set({ isWsConnected: connected }),
}));