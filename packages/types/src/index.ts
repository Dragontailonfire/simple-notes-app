export interface Note {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface UserSession {
  access_token: string;
}
