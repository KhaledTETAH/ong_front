/* export interface Message {
  id: number;
  senderId: number;
  senderName: string;
  text: string;
  createdAt: string;
  isMe: boolean;
}

export interface Conversation {
  id: number;
  org: string;
  subject: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  active: boolean;
 
}*/



// types/message.ts
export interface User {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  unread: boolean;
  lastMessage?: Message;
  updatedAt: string;
  org: string;
  subject: string;
  time: string;
  active: boolean;
}