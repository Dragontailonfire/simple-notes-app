export interface Note {
  id: number;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  access_token: string;
}
