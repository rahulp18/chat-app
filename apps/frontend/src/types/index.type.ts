type Chat = {
  id: string;
  name: string;
  isGroup: boolean;
  createdAt: string;
  updatedAt: string;
  participants: Participant[];
};

type Participant = {
  id: string;
  userId: string;
  chatId: string;
  joinedAt: string;
  lastReadAt: string | null;
  user: User;
};

type User = {
  id: string;
  fullname: string;
  avatarUrl: string | null;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};
type ApiResponse = {
  success: boolean;
  message?: string;
  data: any;
};

export type { Chat, Participant, User, ApiResponse };
